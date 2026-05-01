import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'nodejs';

const SYSTEM_PROMPT = `You are Framr Assistant — the in-product guide for Framr, a multi-agent AI platform.

About Framr:
- Framr lets users build, run, and orchestrate multiple AI agents that work together to perform real tasks and automate workflows.
- Framr is NOT a design tool. It does not generate frames, mockups, or UI designs.
- Users come to Framr to create agents, connect tools, and ship automations.

Your role:
- Guide users on how to use Framr: creating agents, connecting integrations, configuring workflows, debugging runs, understanding pricing and features.
- Be concise, friendly, and practical. Prefer short answers with clear next steps.
- If asked about design/frame generation, gently clarify: "Framr is a multi-agent platform — it orchestrates AI agents, not visual designs."
- If asked something fully unrelated, redirect kindly back to Framr.`;

const client = new OpenAI({
  apiKey: process.env.NVIDIA_NIM_API_KEY,
  baseURL: process.env.NVIDIA_NIM_BASE_URL ?? 'https://integrate.api.nvidia.com/v1',
});

export async function POST(req: NextRequest) {
  try {
    const { prompt, messages } = await req.json();

    if (!prompt && !messages) {
      return NextResponse.json({ error: 'prompt or messages required' }, { status: 400 });
    }

    const chatMessages =
      messages ??
      [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ];

    const stream = await client.chat.completions.create({
      model: process.env.NVIDIA_NIM_MODEL ?? 'openai/gpt-oss-120b',
      messages: Array.isArray(chatMessages) ? chatMessages : [{ role: 'user', content: String(prompt) }],
      temperature: 0.7,
      top_p: 0.95,
      max_tokens: 2048,
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const token = chunk.choices?.[0]?.delta?.content ?? '';
            if (token) controller.enqueue(encoder.encode(token));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Internal error' }, { status: 500 });
  }
}
