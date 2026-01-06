import { Injectable, Logger } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AiService } from '../ai/ai.service';

@Injectable()
export class MaterialsService {
  private readonly logger = new Logger(MaterialsService.name);
  private supabase: SupabaseClient;

  constructor(private readonly aiService: AiService) {
    this.supabase = createClient(
      process.env.SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    );
  }

  async processMaterial(materialId: string) {
    this.logger.log(`Starting processing for material: ${materialId}`);

    try {
      // 1. Fetch material metadata
      const { data: material, error: fetchError } = await this.supabase
        .from('materials')
        .select('*')
        .eq('id', materialId)
        .single();

      if (fetchError || !material) {
        throw new Error(`Material not found: ${fetchError?.message}`);
      }

      // Update status to processing
      await this.supabase
        .from('materials')
        .update({ status: 'processing' })
        .eq('id', materialId);

      // 2. Download file from Storage
      const { data: fileData, error: downloadError } = await this.supabase.storage
        .from('lecture-materials')
        .download(material.file_url);

      if (downloadError || !fileData) {
        throw new Error(`Failed to download file: ${downloadError?.message}`);
      }

      // 3. Extract text (Simple implementation for .txt, PDF would need a library)
      const text = await fileData.text();

      // 4. Summarize and Simplify
      const { summary, simplified } = await this.aiService.summarize(text);

      // 5. Update Database
      const { error: updateError } = await this.supabase
        .from('materials')
        .update({
          summary,
          simplified_content: simplified,
          status: 'completed',
          updated_at: new Date().toISOString(),
        })
        .eq('id', materialId);

      if (updateError) throw updateError;

      this.logger.log(`Successfully processed material: ${materialId}`);
      return { success: true };
    } catch (error) {
      this.logger.error(`Failed to process material: ${materialId}`, error.stack);
      
      await this.supabase
        .from('materials')
        .update({ status: 'failed' })
        .eq('id', materialId);
        
      throw error;
    }
  }
}