import { Test, TestingModule } from '@nestjs/testing';
import { AiService } from './ai.service';
import { ConfigService } from '@nestjs/config';

describe('AiService', () => {
  let service: AiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test-key'),
          },
        },
      ],
    }).compile();

    service = module.get<AiService>(AiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('summarize', () => {
    it('should return a summary and simplified version', async () => {
      const text = 'This is a test text for summarization.';
      const result = await service.summarize(text);

      expect(result).toHaveProperty('summary');
      expect(result).toHaveProperty('simplified');
      expect(result.summary).toContain('AI-generated summary');
    });
  });

  describe('generateSpeech', () => {
    it('should return a buffer', async () => {
      const text = 'This is a test text for speech generation.';
      const result = await service.generateSpeech(text);

      expect(result).toBeInstanceOf(Buffer);
    });
  });
});
