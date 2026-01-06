import { Test, TestingModule } from '@nestjs/testing';
import { MaterialsService } from './materials.service';
import { AiService } from '../ai/ai.service';
import { ConfigService } from '@nestjs/config';
// import { createClient } from '@supabase/supabase-js'; // Removed unused import

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'SUPABASE_URL') return 'https://test.supabase.co';
              if (key === 'SUPABASE_SERVICE_ROLE_KEY') return 'test-key';
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<MaterialsService>(MaterialsService);
    aiService = module.get<AiService>(AiService);
    // @ts-expect-error - Access private property for testing mock
    supabaseMock = service['supabase'];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should attempt to process a material', async () => {
    const materialId = 'test-id';

    const queryBuilder = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({
        data: {
          id: materialId,
          file_url: 'user/file.txt',
          uploaded_by: 'user',
        },
        error: null,
      }),
      update: jest.fn().mockReturnThis(),
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    supabaseMock.from.mockReturnValue(queryBuilder);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
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
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(aiService.summarize).toHaveBeenCalled();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(aiService.generateSpeech).toHaveBeenCalled();
  });
});
