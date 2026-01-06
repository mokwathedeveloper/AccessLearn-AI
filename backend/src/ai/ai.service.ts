import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor() {
    const apiKey = process.env.GOOGLE_GENAI_API_KEY || '';
    this.genAI = new GoogleGenerativeAI(apiKey);
    // Use gemini-1.5-flash for speed and cost-efficiency in hackathon context
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  /**
   * Real AI Summarization and Simplification using Google Gemini.
   */
  async summarize(
    text: string,
  ): Promise<{ summary: string; simplified: string }> {
    this.logger.log('Calling Gemini AI for summarization...');

    const prompt = `
      You are an expert accessibility educator. I will provide you with academic lecture material.
      Please provide two outputs in a clean JSON format:
      1. "summary": A concise summary (max 3 sentences) highlighting the core academic concepts.
      2. "simplified": A simplified version of the text using "Plain English" principles (shorter sentences, simpler vocabulary, no jargon) to help students with learning or cognitive disabilities understand the material better.

      Text to process:
      ${text.substring(0, 10000)} 
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const responseText = response.text();

      // Attempt to parse JSON from the response
      try {
        // Clean up markdown if AI wrapped it in ```json
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const jsonStr = jsonMatch ? jsonMatch[0] : responseText;
        const parsed = JSON.parse(jsonStr) as {
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
        this.logger.error('Failed to parse Gemini JSON response', parseError);
        return {
          summary: responseText.substring(0, 300),
          simplified: responseText,
        };
      }
    } catch (error) {
      this.logger.error('Gemini API call failed', error);
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
