/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Logger } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

interface SyncResult {
  status: string;
  total?: number;
  repaired?: number;
  message?: string;
  checked?: number;
  missingFiles?: number;
  cleaned?: number;
}

interface MaterialSyncRecord {
  id: string;
  file_url: string;
  status: string;
  description: string | null;
}

@Injectable()
export class RegistryService {
  private readonly logger = new Logger(RegistryService.name);
  private supabase: SupabaseClient;

  constructor(private readonly configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>(
      'SUPABASE_SERVICE_ROLE_KEY',
    );

    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        'SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not defined',
      );
    }

    this.supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }) as SupabaseClient;
  }

  async fullSync() {
    this.logger.log('[SYNC] Starting full registry synchronization...');
    const results = {
      users: await this.syncUsers(),
      materials: await this.syncMaterials(),
      cleanup: await this.cleanupStuckMaterials(),
    };
    this.logger.log('[SYNC] Full synchronization completed.');
    return results;
  }

  private async syncUsers(): Promise<SyncResult> {
    this.logger.log('[SYNC] Synchronizing users...');
    const {
      data: { users },
      error,
    } = await this.supabase.auth.admin.listUsers();

    if (error) {
      this.logger.error('Failed to list auth users', error.message);
      return { status: 'error', message: error.message };
    }

    let repaired = 0;
    for (const authUser of users) {
      const { data } = await this.supabase
        .from('users')
        .select('id')
        .eq('id', authUser.id)
        .single();

      const profile = data as { id: string } | null;

      if (!profile) {
        this.logger.warn(
          `[SYNC] Missing profile for user ${authUser.id}, creating...`,
        );
        const { error: insertError } = await this.supabase
          .from('users')
          .insert({
            id: authUser.id,
            email: authUser.email,
            role: authUser.user_metadata?.role || 'student',
            full_name: authUser.user_metadata?.full_name || 'Legacy User',
          });

        if (!insertError) repaired++;
        else
          this.logger.error(
            `Failed to repair user ${authUser.id}`,
            insertError.message,
          );
      }
    }

    return { status: 'success', total: users.length, repaired };
  }

  private async syncMaterials(): Promise<SyncResult> {
    this.logger.log('[SYNC] Synchronizing materials with storage...');

    const { data: materials, error } = await this.supabase
      .from('materials')
      .select('id, file_url, status, description');

    if (error) return { status: 'error', message: error.message };

    const materialRecords = materials as MaterialSyncRecord[];
    let missingFiles = 0;
    for (const material of materialRecords) {
      const pathParts = material.file_url.split('/');
      const folder = pathParts[0];
      const filename = pathParts[1];

      const { data: fileExists } = await this.supabase.storage
        .from('lecture-materials')
        .list(folder, {
          search: filename,
        });

      const files = fileExists as any[];

      if (!files || files.length === 0) {
        this.logger.warn(
          `[SYNC] Material ${material.id} has missing file: ${material.file_url}`,
        );
        if (material.status !== 'failed') {
          await this.supabase
            .from('materials')
            .update({
              status: 'failed',
              description:
                (material.description || '') + ' [System: File Missing]',
            })
            .eq('id', material.id);
          missingFiles++;
        }
      }
    }

    return { status: 'success', checked: materialRecords.length, missingFiles };
  }

  private async cleanupStuckMaterials(): Promise<SyncResult> {
    this.logger.log('[SYNC] Cleaning up stuck processing materials...');
    const thirtyMinsAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();

    const { data, error } = await this.supabase
      .from('materials')
      .update({ status: 'failed' })
      .eq('status', 'processing')
      .lt('updated_at', thirtyMinsAgo)
      .select();

    const cleanedData = data as any[];

    if (error) return { status: 'error', message: error.message };
    return { status: 'success', cleaned: cleanedData?.length || 0 };
  }
}
