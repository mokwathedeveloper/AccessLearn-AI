import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'AccessLearn AI API is live',
    version: '1.0.0',
    endpoints: [
      '/api/health',
      '/api/materials',
      '/api/materials/process',
      '/api/ai/summarize'
    ]
  });
}
