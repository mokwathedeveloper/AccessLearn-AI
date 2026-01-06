import { Test, TestingModule } from '@nestjs/testing';
import { MaterialsService } from './materials.service';
import { AiService } from '../ai/ai.service';
import { createClient } from '@supabase/supabase-js';

// Mock Supabase Client
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn(),
    update: jest.fn().mockReturnThis(),
    storage: {
      from: jest.fn().mockReturnThis(),
      download: jest.fn(),
      upload: jest.fn(),
    },
  })),
}));

describe('MaterialsService', () => {
  let service: MaterialsService;
  let aiService: AiService;
  let supabaseMock: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MaterialsService,
        {
          provide: AiService,
          useValue: {
            summarize: jest.fn().mockResolvedValue({
              summary: 'Summary',
              simplified: 'Simplified',
            }),
            generateSpeech: jest.fn().mockResolvedValue(Buffer.from('audio')),
          },
        },
      ],
    }).compile();

    service = module.get<MaterialsService>(MaterialsService);
    aiService = module.get<AiService>(AiService);
    // @ts-ignore
    supabaseMock = service.supabase;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should attempt to process a material', async () => {
    const materialId = 'test-id';
    
    // Fix mock return values for chaining
    // The mock factory in jest.mock above sets up the structure, here we define return values.
    // Important: .from() returns 'this', .select() returns 'this', .eq() returns 'this'.
    // The terminal method .single() needs to return the promise resolving to data.
    
    // We need to ensure the methods return the SAME object reference so chaining works.
    const queryBuilder = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({
        data: { id: materialId, file_url: 'user/file.txt', uploaded_by: 'user' },
        error: null,
      }),
      update: jest.fn().mockReturnThis(),
    };

    supabaseMock.from.mockReturnValue(queryBuilder);
    
    supabaseMock.storage.from.mockReturnValue({
      download: jest.fn().mockResolvedValue({
        data: { text: () => Promise.resolve('Content') },
        error: null,
      }),
      upload: jest.fn().mockResolvedValue({
        error: null,
      }),
    });

    const result = await service.processMaterial(materialId);
    expect(result).toEqual({ success: true });
    expect(aiService.summarize).toHaveBeenCalled();
    expect(aiService.generateSpeech).toHaveBeenCalled();
  });
});
