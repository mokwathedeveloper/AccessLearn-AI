import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
export async function POST(request: NextRequest) {
  try {
    const { materialId } = await request.json();

    if (!materialId) {
      return NextResponse.json({ error: 'Material ID is required' }, { status: 400 });
    }

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdf = require('pdf-parse');

    const supabase = createClient(
      process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const openai = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY!,
      baseURL: 'https://openrouter.ai/api/v1',
    });

    // 1. Fetch material metadata
    const { data: material, error: fetchError } = await supabase
      .from('materials')
      .select('*')
      .eq('id', materialId)
      .single();

    if (fetchError || !material) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 });
    }

    // Update status to processing
    await supabase.from('materials').update({ status: 'processing' }).eq('id', materialId);

    // 2. Download file from Storage
    const { data: fileBlob, error: downloadError } = await supabase.storage
      .from('lecture-materials')
      .download(material.file_url);

    if (downloadError || !fileBlob) {
      throw new Error(`Failed to download file: ${downloadError?.message}`);
    }

    // 3. Extract text
    let text = '';
    if (material.file_type === 'application/pdf') {
      const buffer = Buffer.from(await fileBlob.arrayBuffer());
      const pdfData = await pdf(buffer);
      text = pdfData.text;
    } else {
      text = await fileBlob.text();
    }

    if (!text || text.trim().length === 0) {
      throw new Error('Extracted text is empty');
    }

    // 4. Summarize and Simplify using DeepSeek via OpenRouter
    const prompt = `
      You are an expert accessibility educator. Provide two outputs in a clean JSON format:
      1. "summary": A concise summary (max 3 sentences) highlighting core concepts.
      2. "simplified": A simplified version using "Plain English" principles for students with disabilities.

      Text: ${text.substring(0, 8000)}
    `;

    const aiResponse = await openai.chat.completions.create({
      model: 'deepseek/deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const aiContent = aiResponse.choices[0].message.content;
    let parsedAi;
    try {
      parsedAi = JSON.parse(aiContent!);
    } catch {
      parsedAi = { summary: aiContent, simplified: aiContent };
    }

    // 5. Generate Audio (TTS) Placeholder
    // In production, you would call a real TTS API here
    const audioBuffer = Buffer.from('Dummy MP3 content');
    const userFolder = material.file_url.split('/')[0];
    const audioPath = `${userFolder}/audio_${materialId}.mp3`;

    const { error: uploadError } = await supabase.storage
      .from('lecture-materials')
      .upload(audioPath, audioBuffer, {
        contentType: 'audio/mpeg',
        upsert: true,
      });

    // 6. Update Database
    const { error: updateError } = await supabase
      .from('materials')
      .update({
        summary: parsedAi.summary,
        simplified_content: parsedAi.simplified,
        audio_url: uploadError ? null : audioPath,
        status: 'completed',
        updated_at: new Date().toISOString(),
      })
      .eq('id', materialId);

    if (updateError) throw updateError;

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Processing error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
