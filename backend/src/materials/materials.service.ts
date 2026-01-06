import { Injectable, Logger } from '@nestjs/common';
import {
  createClient,
  SupabaseClient,
  PostgrestError,
} from '@supabase/supabase-js';
import { AiService } from '../ai/ai.service';

// Define the shape of the material record to avoid 'any'
interface MaterialRecord {
  id: string;
  file_url: string;
  uploaded_by: string;
  status: string;
}

@Injectable()
export class MaterialsService {
  private readonly logger = new Logger(MaterialsService.name);
  private supabase: SupabaseClient;

  constructor(private readonly aiService: AiService) {
    // Cast to generic SupabaseClient to avoid strict type mismatch in this specific lint config
    // or ensure @supabase/supabase-js version matches strict expectations.
    this.supabase = createClient(
      process.env.SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    ) as SupabaseClient;
  }

  async processMaterial(materialId: string) {
    this.logger.log(`Starting processing for material: ${materialId}`);

    try {
      // 1. Fetch material metadata with typed response
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
      const { data: fileData, error: downloadError } =
        await this.supabase.storage
          .from('lecture-materials')
          .download(material.file_url);

      if (downloadError || !fileData) {
        throw new Error(`Failed to download file: ${downloadError?.message}`);
      }

      // 3. Extract text
      const text = await fileData.text();

      // 4. Summarize and Simplify
      const { summary, simplified } = await this.aiService.summarize(text);

      // 5. Generate Audio (TTS) from the simplified text (or summary)
      const audioBuffer = await this.aiService.generateSpeech(simplified);

      // 6. Upload Audio to Storage
      // Uploading to the user's folder structure might be better, but keeping it simple for now or using the same path structure
      const userFolder = material.file_url.split('/')[0];
      const audioPath = `${userFolder}/audio_${materialId}.mp3`;

      const { error: uploadError } = await this.supabase.storage
        .from('lecture-materials')
        .upload(audioPath, audioBuffer, {
          contentType: 'audio/mpeg',
          upsert: true,
        });

      if (uploadError) {
        this.logger.error(`Failed to upload audio: ${uploadError.message}`);
        // We continue even if audio fails, just logging it
      }

      // 7. Update Database with all results
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

      this.logger.log(`Successfully processed material: ${materialId}`);
      return { success: true };
    } catch (error) {
      const errorStack = error instanceof Error ? error.stack : '';

      this.logger.error(
        `Failed to process material: ${materialId}`,
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
