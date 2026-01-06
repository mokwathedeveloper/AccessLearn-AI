import { Test, TestingModule } from '@nestjs/testing';
import { AiService } from './ai.service';
import { ConfigService } from '@nestjs/config';

// Mock OpenAI
jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [
            {
              message: {
                content: JSON.stringify({
                  summary: 'AI-generated summary',
                  simplified: 'Simplified version',
                }),
              },
            },
          ],
        }),
      },
    },
    audio: {
      speech: {
        create: jest.fn().mockResolvedValue({
          arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(8)),
        }),
      },
    },
  }));
});

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
      expect(result.summary).toBe('AI-generated summary');
    });
  });

  describe('generateSpeech', () => {
    it('should return a buffer', async () => {
      const result = await service.generateSpeech('test text');

      expect(result).toBeInstanceOf(Buffer);
    });
  });
});
