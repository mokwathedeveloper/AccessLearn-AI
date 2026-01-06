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
import { Request, Response } from 'express';

interface RequestWithUser extends Request {
  user?: {
    id: string;
  };
}

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  private readonly logger = new Logger('Performance');
  private supabase: SupabaseClient | null = null;

  constructor(private readonly configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>(
      'SUPABASE_SERVICE_ROLE_KEY',
    );

    if (supabaseUrl && supabaseKey) {
      this.supabase = createClient(supabaseUrl, supabaseKey);
    }
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<RequestWithUser>();
    const { method, url, ip } = request;
    const userAgent = request.get('user-agent') || '';

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - now;
        const response = httpContext.getResponse<Response>();
        const statusCode = response.statusCode;

        this.logger.log(`[${method}] ${url} - ${statusCode} - ${duration}ms`);

        if (this.supabase) {
          const user = request.user;

          this.supabase
            .from('performance_logs')
            .insert({
              method,
              route: url,
              status_code: statusCode,
              duration_ms: duration,
              user_id: user?.id || null,
              ip_address: ip,
              user_agent: userAgent,
            })
            .then(({ error }) => {
              if (error) {
                this.logger.error(
                  'Failed to save performance log to Supabase',
                  error,
                );
              }
            });
        }
      }),
    );
  }
}
