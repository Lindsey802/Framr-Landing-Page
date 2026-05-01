import { NextRequest } from 'next/server';

const SYSTEM_PROMPT = `You are Framr Assistant — the in-product guide for Framr, a multi-agent AI platform.

About Framr:
- Framr lets users build, run, and orchestrate multiple AI agents that work together to perform real tasks and automate workflows.
- Framr is NOT a design tool. It does not generate frames, mockups, or UI designs.
- Users come to Framr to create agents, connect tools, and ship automations.

Your role:
- Guide users on how to use Framr: creating agents, connecting integrations, configuring workflows, debugging runs, understanding pricing and features.
- Be concise, friendly, and practical. Prefer short answers with clear next steps.
- When relevant, point to specific sections (Features, Use Cases, Integrations, Pricing) or suggest concrete actions inside the product.
- If asked about design/frame generation, gently clarify: "Framr is a multi-agent platform — it orchestrates AI agents, not visual designs."
- If asked something fully unrelated, redirect kindly back to Framr.

Tone: direct, helpful, on-brand. No fluff. No emojis.`;

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
