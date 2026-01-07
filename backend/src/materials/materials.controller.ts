import { Controller, Post, Body, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { MaterialsService } from './materials.service';

@Controller('materials')
export class MaterialsController {
  private readonly logger = new Logger(MaterialsController.name);
  constructor(private readonly materialsService: MaterialsService) {}

  @Post('process')
  @HttpCode(HttpStatus.OK)
  async process(@Body('materialId') materialId: string) {
    this.logger.log(`[TRIGGER] Received processing request for ID: ${materialId}`);

    // We trigger this asynchronously so the frontend doesn't wait
    this.materialsService.processMaterial(materialId).catch((err) => {
      this.logger.error(`[TRIGGER] Async processing failed for ${materialId}: ${err.message}`);
    });

    return { message: 'Processing started', id: materialId };
  }
}
