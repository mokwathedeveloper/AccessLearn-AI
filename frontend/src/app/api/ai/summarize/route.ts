import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Summarize this academic text in a clear, concise way for students: ${text}`;
    
    const result = await model.generateContent(prompt);
    const summary = result.response.text();
    
    return NextResponse.json({ summary });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
  }
}