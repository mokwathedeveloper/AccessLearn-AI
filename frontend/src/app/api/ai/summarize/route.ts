import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    
    if (!process.env.DEEPSEEK_API_KEY) {
      return NextResponse.json({ error: 'AI API Key missing' }, { status: 500 });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'HTTP-Referer': 'https://github.com/mokwathedeveloper/AccessLearn-AI',
        'X-Title': 'AccessLearn AI',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat',
        messages: [
          {
            role: 'user',
            content: `You are an expert accessibility educator. Summarize this academic text in a clear, concise way for students: ${text}`
          }
        ],
        response_format: { type: 'json_object' }
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter error:', errorData);
      return NextResponse.json({ error: 'AI provider error' }, { status: response.status });
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Attempt to parse if it's a stringified JSON
    let result;
    try {
      result = JSON.parse(content);
    } catch {
      result = { summary: content };
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Summarize API error:', error);
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
  }
}
