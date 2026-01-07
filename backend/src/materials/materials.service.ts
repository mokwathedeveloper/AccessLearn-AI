/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Logger } from '@nestjs/common';
import {
  createClient,
  SupabaseClient,
  PostgrestError,
} from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { AiService } from '../ai/ai.service';
import { PDFParse } from 'pdf-parse';

// Define the shape of the material record to avoid 'any'
interface MaterialRecord {
  id: string;
  file_url: string;
  uploaded_by: string;
  status: string;
  file_type: string;
  enable_summary: boolean;
  enable_logic: boolean;
  enable_encryption: boolean;
}

@Injectable()
export class MaterialsService {
  private readonly logger = new Logger(MaterialsService.name);
  private supabase: SupabaseClient;

  constructor(
    private readonly aiService: AiService,
    private readonly configService: ConfigService,
  ) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>(
      'SUPABASE_SERVICE_ROLE_KEY',
    );

    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        'SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not defined in environment variables',
      );
    }

    this.supabase = createClient(supabaseUrl, supabaseKey) as SupabaseClient;
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
        this.logger.log(`[EXTRACT] Parsing PDF content via Neural Parser...`);
        const buffer = Buffer.from(await fileBlob.arrayBuffer());

        try {
          const parser = new PDFParse({ data: buffer });
          const textResult = await parser.getText();
          text = textResult.text;
        } catch (parseError: any) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const msg = parseError?.message || 'Unknown PDF error';
          this.logger.error('Neural PDF extraction failed', parseError);
          throw new Error(`PDF decoding failed: ${msg}`);
        }
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

      // 4. AI Analysis Stage (Conditional)
      let summary: string | null = null;
      let simplified: string | null = null;
      let audioPath: string | null = null;

      if (material.enable_summary || material.enable_logic) {
        this.logger.log(
          `[AI] Initializing Neural Analysis for material: ${materialId}`,
        );
        const aiRes = await this.aiService.summarize(text);

        if (material.enable_summary) {
          summary = aiRes.summary;
        }

        if (material.enable_logic) {
          simplified = aiRes.simplified;
        }

        // --- OPTIMIZATION: Partial Update ---
        // Save the text content immediately so the user can start reading
        // while the slower Audio Synthesis (TTS) runs in the background.
        this.logger.log(`[SYNC] Pushing partial neural data to registry...`);
        await this.supabase
          .from('materials')
          .update({
            summary,
            simplified_content: simplified,
            updated_at: new Date().toISOString(),
          })
          .eq('id', materialId);
      }

      // 5. Audio Synthesis Stage (Conditional)
      if (summary && material.enable_summary) {
        this.logger.log(`[TTS] Synthesizing speech for summary...`);
        const audioBuffer = await this.aiService.generateSpeech(summary);

        // 6. Upload Audio to Storage
        const userFolder = material.file_url.split('/')[0];
        audioPath = `${userFolder}/audio_${materialId}.mp3`;

        this.logger.log(`[STORAGE] Uploading neural audio: ${audioPath}`);
        const { error: uploadError } = await this.supabase.storage
          .from('lecture-materials')
          .upload(audioPath, audioBuffer, {
            contentType: 'audio/mpeg',
            upsert: true,
          });

        if (uploadError) {
          this.logger.warn(
            `[STORAGE] Audio upload failed but continuing: ${uploadError.message}`,
          );
          audioPath = null;
        }
      }

      // 7. Update Database with final results
      const { error: updateError } = await this.supabase
        .from('materials')
        .update({
          summary,
          simplified_content: simplified,
          audio_url: audioPath,
          status: 'completed',
          updated_at: new Date().toISOString(),
        })
        .eq('id', materialId);

      if (updateError) throw updateError;

      this.logger.log(`[SUCCESS] Material processed: ${materialId}`);
      return { success: true };
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const errorMessage = error?.message || 'Unknown neural error';
      const errorStack = error instanceof Error ? error.stack : '';

      this.logger.error(
        `[ERROR] Processing failed for ${materialId}: ${errorMessage}`,
        errorStack,
      );

      // Save the specific error message to the database for user/admin diagnostics
      await this.supabase
        .from('materials')
        .update({
          status: 'failed',
          description: `Engine Error: ${errorMessage}`,
          updated_at: new Date().toISOString(),
        })
        .eq('id', materialId);

      throw error;
    }
  }
}
