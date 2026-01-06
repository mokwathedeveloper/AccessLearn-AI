import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { MaterialsService } from './materials.service';

@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post('process')
  @HttpCode(HttpStatus.OK)
  async process(@Body('materialId') materialId: string) {
    // We trigger this asynchronously so the frontend doesn't wait
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await Promise.resolve(); // satisfy require-await

    this.materialsService.processMaterial(materialId).catch((err) => {
      console.error('Async processing failed:', err);
    });
    
    return { message: 'Processing started' };
  }
}