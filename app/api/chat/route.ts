import { NextRequest } from 'next/server';

const SYSTEM_PROMPT =
  'You are Framr Assistant — a concise, friendly AI helper for the Framr landing page. Framr is an AI design copilot that turns ideas into UI frames. Help users understand features, pricing, integrations, and use cases. Keep replies short, helpful, and on-brand. If asked something unrelated, gently redirect.';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return new Response('Invalid payload', { status: 400 });
    }

    const apiKey = process.env.NVIDIA_NIM_API_KEY;
    if (!apiKey) {
      return new Response('Missing NVIDIA_NIM_API_KEY', { status: 500 });
    }

    const upstream = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        stream: true,
        temperature: 0.7,
        top_p: 1,
        max_tokens: 1024,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      }),
    });

    if (!upstream.ok || !upstream.body) {
      const text = await upstream.text();
      return new Response(text || 'Upstream request failed', { status: upstream.status || 500 });
    }

    return new Response(upstream.body, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    });
  } catch {
    return new Response('Server error', { status: 500 });
  }
}
