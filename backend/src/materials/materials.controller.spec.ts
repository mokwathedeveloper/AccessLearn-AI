import { Test, TestingModule } from '@nestjs/testing';
import { MaterialsController } from './materials.controller';
import { MaterialsService } from './materials.service';

describe('MaterialsController', () => {
  let controller: MaterialsController;
  let materialsService: MaterialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaterialsController],
      providers: [
        {
          provide: MaterialsService,
          useValue: {
            processMaterial: jest.fn().mockResolvedValue({ success: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<MaterialsController>(MaterialsController);
    materialsService = module.get<MaterialsService>(MaterialsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('process', () => {
    it('should trigger material processing', async () => {
      const materialId = 'test-id';
      const result = await controller.process(materialId);

      expect(result).toEqual({
        message: 'Processing started',
        id: materialId,
      });
      // We can't easily await the un-awaited promise inside the controller method from here without changing implementation,
      // but we can verify the mock was called if we wait a tick.
      await new Promise((resolve) => setTimeout(resolve, 0));
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(materialsService.processMaterial).toHaveBeenCalledWith(materialId);
    });
  });
});
