import { Controller, Get, Logger, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import { PerformanceInterceptor } from '../common/interceptors/performance.interceptor';

@Controller('admin')
@UseInterceptors(PerformanceInterceptor)
export class AdminController {
  private readonly logger = new Logger(AdminController.name);

  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  async getStats() {
    this.logger.log('[API] GET /admin/stats');
    return await this.adminService.getStats();
  }
}
