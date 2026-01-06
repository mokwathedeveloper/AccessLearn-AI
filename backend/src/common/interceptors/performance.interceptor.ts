import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  private readonly logger = new Logger('Performance');
  private supabase: SupabaseClient;

  constructor(private readonly configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>(
      'SUPABASE_SERVICE_ROLE_KEY',
    );

    if (supabaseUrl && supabaseKey) {
      this.supabase = createClient(supabaseUrl, supabaseKey);
    }
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const { method, url, ip } = request;
    const userAgent = request.get('user-agent') || '';

    return next.handle().pipe(
      tap(async () => {
        const duration = Date.now() - now;
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;

        this.logger.log(`[${method}] ${url} - ${statusCode} - ${duration}ms`);

        if (this.supabase) {
          try {
            // Attempt to get user id if available (from auth header)
            // Note: This assumes some auth middleware has already run and attached user to request
            const user = request.user;
            
            await this.supabase.from('performance_logs').insert({
              method,
              route: url,
              status_code: statusCode,
              duration_ms: duration,
              user_id: user?.id || null,
              ip_address: ip,
              user_agent: userAgent,
            });
          } catch (error) {
            this.logger.error('Failed to save performance log to Supabase', error);
          }
        }
      }),
    );
  }
}
