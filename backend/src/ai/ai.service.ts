import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('DEEPSEEK_API_KEY') || '';
    this.openai = new OpenAI({
      apiKey: apiKey,
      baseURL: 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer': 'https://github.com/mokwathedeveloper/AccessLearn-AI', // Optional, for OpenRouter rankings
        'X-Title': 'AccessLearn AI', // Optional
      },
    });
  }

  /**
   * Real AI Summarization and Simplification using DeepSeek AI via OpenRouter.
   */
  async summarize(
    text: string,
  ): Promise<{ summary: string; simplified: string }> {
    this.logger.log(
      'Calling DeepSeek AI (via OpenRouter) for summarization...',
    );

    const prompt = `
      You are an expert accessibility educator. I will provide you with academic lecture material.
      Please provide two outputs in a clean JSON format:
      1. "summary": A concise summary (max 3 sentences) highlighting the core academic concepts.
      2. "simplified": A simplified version of the text using "Plain English" principles (shorter sentences, simpler vocabulary, no jargon) to help students with learning or cognitive disabilities understand the material better.

      Text to process:
      ${text.substring(0, 10000)} 
    `;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'deepseek/deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
      });

      const responseText = response.choices[0].message.content;

      if (!responseText) {
        throw new Error('DeepSeek returned an empty response.');
      }

      // Attempt to parse JSON from the response
      try {
        const parsed = JSON.parse(responseText) as {
          summary?: string;
          simplified?: string;
        };

        return {
          summary:
            parsed.summary ||
            'Summary generation succeeded but format was unexpected.',
          simplified:
            parsed.simplified ||
            'Simplification succeeded but format was unexpected.',
        };
      } catch (parseError) {
        this.logger.error('Failed to parse DeepSeek JSON response', parseError);
        return {
          summary: responseText.substring(0, 300),
          simplified: responseText,
        };
      }
    } catch (error) {
      this.logger.error('DeepSeek API call failed', error);
      throw new Error('AI processing failed. Please check your API key.');
    }
  }

  /**
   * Real Text-to-Speech implementation using OpenAI's TTS model.
   */
  async generateSpeech(text: string): Promise<Buffer> {
    this.logger.log('Generating neural audio via OpenAI TTS...');
    
    const openaiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!openaiKey) {
      this.logger.warn('OPENAI_API_KEY not found, falling back to dummy buffer');
      return Buffer.from('Dummy MP3 content - API Key Missing');
    }

    const openaiReal = new OpenAI({ apiKey: openaiKey });

    try {
      const mp3 = await openaiReal.audio.speech.create({
        model: 'tts-1',
        voice: 'alloy',
        input: text.substring(0, 4096), // OpenAI limit
      });

      const buffer = Buffer.from(await mp3.arrayBuffer());
      return buffer;
    } catch (error) {
      this.logger.error('OpenAI TTS failed', error);
      throw new Error('Audio generation failed.');
    }
  }
}
