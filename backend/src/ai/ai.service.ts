import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY || '',
      baseURL: 'https://api.deepseek.com',
    });
  }

  /**
   * Real AI Summarization and Simplification using DeepSeek AI.
   */
  async summarize(
    text: string,
  ): Promise<{ summary: string; simplified: string }> {
    this.logger.log('Calling DeepSeek AI for summarization...');

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
        model: 'deepseek-chat',
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
   * Placeholder for Text-to-Speech logic.
   */
  async generateSpeech(): Promise<Buffer> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    this.logger.log('Generating placeholder speech buffer...');
    return Buffer.from(
      'Dummy MP3 content - real TTS requires Cloud API integration',
    );
  }
}
