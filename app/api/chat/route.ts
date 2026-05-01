import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const SYSTEM_PROMPT = `You are Framr Assistant — the in-product guide for Framr, a multi-agent AI platform.
Framr lets users build, run, and orchestrate multiple AI agents to automate real tasks and workflows.
Framr is not a design tool and does not generate frames or UI mockups.
Be concise, practical, and helpful. Guide users on agents, integrations, workflows, debugging, features, and pricing.`;

export async function POST(req: NextRequest) {
  try {
    const { prompt, messages } = await req.json();

    if (!prompt && !messages) {
      return NextResponse.json({ error: 'prompt or messages required' }, { status: 400 });
    }

    const apiKey = process.env.NVIDIA_NIM_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing NVIDIA_NIM_API_KEY' }, { status: 500 });
    }

    const model = process.env.NVIDIA_NIM_MODEL ?? 'openai/gpt-oss-120b';
    const baseURL = process.env.NVIDIA_NIM_BASE_URL ?? 'https://integrate.api.nvidia.com/v1';

    const chatMessages = Array.isArray(messages)
      ? messages
      : [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: String(prompt ?? '') },
        ];

    const upstream = await fetch(`${baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: chatMessages,
        temperature: 0.7,
        top_p: 0.95,
        max_tokens: 1024,
        stream: true,
      }),
    });

    if (!upstream.ok || !upstream.body) {
      const text = await upstream.text();
      return NextResponse.json({ error: text || 'Upstream request failed' }, { status: upstream.status || 500 });
    }

    return new Response(upstream.body, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Internal error' }, { status: 500 });
  }
}
