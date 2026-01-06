import { Injectable, Logger } from '@nestjs/common';
import {
  createClient,
  SupabaseClient,
  PostgrestError,
} from '@supabase/supabase-js';
import { AiService } from '../ai/ai.service';
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment
const pdf = require('pdf-parse');

// Define the shape of the material record to avoid 'any'
interface MaterialRecord {
  id: string;
  file_url: string;
  uploaded_by: string;
  status: string;
  file_type: string;
}

interface PdfData {
  text: string;
}

@Injectable()
export class MaterialsService {
  private readonly logger = new Logger(MaterialsService.name);
  private supabase: SupabaseClient;

  constructor(private readonly aiService: AiService) {
    this.supabase = createClient(
      process.env.SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    ) as SupabaseClient;
  }

  async processMaterial(materialId: string) {
    this.logger.log(
      `[PROCESS] Starting processing for material: ${materialId}`,
    );

    try {
      // 1. Fetch material metadata
      const response = await this.supabase
        .from('materials')
        .select('*')
        .eq('id', materialId)
        .single();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = response.data;

      const fetchError: PostgrestError | null = response.error;

      if (fetchError || !data) {
        throw new Error(`Material not found: ${fetchError?.message}`);
      }

      const material = data as MaterialRecord;

      // Update status to processing
      await this.supabase
        .from('materials')
        .update({ status: 'processing' })
        .eq('id', materialId);

      // 2. Download file from Storage
      this.logger.log(
        `[DOWNLOAD] Fetching file from Storage: ${material.file_url}`,
      );
      const { data: fileBlob, error: downloadError } =
        await this.supabase.storage
          .from('lecture-materials')
          .download(material.file_url);

      if (downloadError || !fileBlob) {
        throw new Error(`Failed to download file: ${downloadError?.message}`);
      }

      // 3. Extract text based on file type
      let text = '';
      if (material.file_type === 'application/pdf') {
        this.logger.log(`[EXTRACT] Parsing PDF content...`);
        const buffer = Buffer.from(await fileBlob.arrayBuffer());
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const pdfData = (await pdf(buffer)) as PdfData;
        text = pdfData.text;
      } else {
        this.logger.log(`[EXTRACT] Reading plain text content...`);
        text = await fileBlob.text();
      }

      if (!text || text.trim().length === 0) {
        throw new Error('Extracted text is empty. Cannot process material.');
      }

      this.logger.log(
        `[EXTRACT] Successfully extracted ${text.length} characters.`,
      );

      // 4. Summarize and Simplify using Gemini AI
      const { summary, simplified } = await this.aiService.summarize(text);

      // 5. Generate Audio (TTS)
      const audioBuffer = await this.aiService.generateSpeech();

      // 6. Upload Audio to Storage
      const userFolder = material.file_url.split('/')[0];
      const audioPath = `${userFolder}/audio_${materialId}.mp3`;

      this.logger.log(`[UPLOAD] Uploading audio to storage: ${audioPath}`);
      const { error: uploadError } = await this.supabase.storage
        .from('lecture-materials')
        .upload(audioPath, audioBuffer, {
          contentType: 'audio/mpeg',
          upsert: true,
        });

      // 7. Update Database
      const { error: updateError } = await this.supabase
        .from('materials')
        .update({
          summary,
          simplified_content: simplified,
          audio_url: uploadError ? null : audioPath,
          status: 'completed',
          updated_at: new Date().toISOString(),
        })
        .eq('id', materialId);

      if (updateError) throw updateError;

      this.logger.log(`[SUCCESS] Material processed: ${materialId}`);
      return { success: true };
    } catch (error) {
      const errorStack = error instanceof Error ? error.stack : '';
      this.logger.error(
        `[ERROR] Processing failed for ${materialId}`,
        errorStack,
      );

      await this.supabase
        .from('materials')
        .update({ status: 'failed' })
        .eq('id', materialId);

      throw error;
    }
  }
}
