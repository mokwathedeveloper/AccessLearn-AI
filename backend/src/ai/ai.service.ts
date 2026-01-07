import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private openai: OpenAI;
  private genAI: GoogleGenerativeAI | null = null;

  constructor(private readonly configService: ConfigService) {
    const deepseekKey =
      this.configService.get<string>('DEEPSEEK_API_KEY') || '';
    this.openai = new OpenAI({
      apiKey: deepseekKey,
      baseURL: 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer': 'https://github.com/mokwathedeveloper/AccessLearn-AI',
        'X-Title': 'AccessLearn AI',
      },
    });

    const geminiKey = this.configService.get<string>('GOOGLE_GENAI_API_KEY');
    if (geminiKey) {
      this.genAI = new GoogleGenerativeAI(geminiKey);
    }
  }

  /**
   * Summarization and Simplification using either DeepSeek or Gemini fallback.
   */
  async summarize(
    text: string,
  ): Promise<{ summary: string; simplified: string }> {
    const timeoutPromise = new Promise<{ summary: string; simplified: string }>(
      (_, reject) =>
        setTimeout(() => reject(new Error('AI Analysis Timeout')), 35000),
    );

    try {
      return await Promise.race([this.executeSummarize(text), timeoutPromise]);
    } catch (error) {
      this.logger.error('AI Processing failed or timed out', error);
      return {
        summary:
          'Automated summary unavailable. Please check API configurations.',
        simplified:
          text.substring(0, 1000) + '... [Auto-simplification failed]',
      };
    }
  }

  private async executeSummarize(
    text: string,
  ): Promise<{ summary: string; simplified: string }> {
    // Priority 1: DeepSeek (if key available)
    if (this.configService.get<string>('DEEPSEEK_API_KEY')) {
      try {
        return await this.summarizeWithDeepSeek(text);
      } catch (error) {
        this.logger.warn(
          'DeepSeek failed, attempting Gemini fallback...',
          error,
        );
      }
    }

    // Priority 2: Gemini
    if (this.genAI) {
      try {
        return await this.summarizeWithGemini(text);
      } catch (error) {
        this.logger.error('Gemini summarization failed', error);
      }
    }

    throw new Error('No AI providers available');
  }

  private async summarizeWithDeepSeek(text: string) {
    this.logger.log('Executing DeepSeek Analysis...');
    const prompt = this.getPrompt(text);

    const response = await this.openai.chat.completions.create({
      model: 'deepseek/deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const responseText = response.choices[0].message.content;
    if (!responseText) throw new Error('Empty response from DeepSeek');

    return JSON.parse(responseText) as { summary: string; simplified: string };
  }

  private async summarizeWithGemini(text: string) {
    this.logger.log('Executing Gemini Neural Analysis...');
    if (!this.genAI) throw new Error('Gemini not initialized');

    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `${this.getPrompt(text)}\n\nIMPORTANT: Return ONLY valid JSON.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Clean up potential markdown formatting in Gemini response
    const cleanJson = responseText.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanJson) as { summary: string; simplified: string };
  }

  private getPrompt(text: string): string {
    return `
      You are an expert accessibility educator. I will provide you with academic lecture material.
      Please provide two outputs in a clean JSON format:
      1. "summary": A concise summary (max 3 sentences) highlighting the core academic concepts.
      2. "simplified": A simplified version of the text using "Plain English" principles (shorter sentences, simpler vocabulary, no jargon) to help students with learning or cognitive disabilities understand the material better.

      Text to process:
      ${text.substring(0, 15000)} 
    `;
  }

  /**
   * Real Text-to-Speech implementation using OpenAI's TTS model.
   */
  async generateSpeech(text: string): Promise<Buffer> {
    this.logger.log('Generating neural audio via OpenAI TTS...');

    const openaiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!openaiKey) {
      this.logger.warn(
        'OPENAI_API_KEY not found, falling back to dummy buffer',
      );
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
