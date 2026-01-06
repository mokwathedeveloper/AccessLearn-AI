import { Controller, Post, Logger, UseInterceptors } from '@nestjs/common';
import { RegistryService } from './registry.service';
import { PerformanceInterceptor } from '../common/interceptors/performance.interceptor';

@Controller('registry')
@UseInterceptors(PerformanceInterceptor)
export class RegistryController {
  private readonly logger = new Logger(RegistryController.name);

  constructor(private readonly registryService: RegistryService) {}

  @Post('sync')
  async sync() {
    this.logger.log('[API] Triggering full registry sync...');
    return await this.registryService.fullSync();
  }
}
