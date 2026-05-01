'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
}

const STORAGE_KEY = 'framr-chat';

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as ChatMessage[];
      if (Array.isArray(parsed)) setMessages(parsed);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const canSend = useMemo(() => input.trim().length > 0 && !isTyping, [input, isTyping]);

  const sendMessage = useCallback(async () => {
    const content = input.trim();
    if (!content || isTyping) return;

    const userMessage: ChatMessage = { id: uid(), role: 'user', content };
    const assistantId = uid();

    setInput('');
    setIsTyping(true);
    setMessages((prev) => [...prev, userMessage, { id: assistantId, role: 'assistant', content: '' }]);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const payload = {
        messages: [...messages, userMessage].map((m) => ({ role: m.role, content: m.content })),
      };

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) throw new Error('Failed to connect to assistant');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let buffer = '';

      while (!done) {
        const chunk = await reader.read();
        done = chunk.done;
        if (chunk.value) {
          buffer += decoder.decode(chunk.value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6).trim();
            if (!data || data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const token = parsed.choices?.[0]?.delta?.content ?? '';
              if (!token) continue;
              setMessages((prev) =>
                prev.map((msg) => (msg.id === assistantId ? { ...msg, content: msg.content + token } : msg)),
              );
            } catch {
              // ignore malformed chunks
            }
          }
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId && msg.content.length === 0
            ? { ...msg, content: 'Sorry, something went wrong. Please try again.' }
            : msg,
        ),
      );
    } finally {
      setIsTyping(false);
    }
  }, [input, isTyping, messages]);

  const clearChat = useCallback(() => {
    setMessages([]);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    messages,
    input,
    setInput,
    isTyping,
    canSend,
    sendMessage,
    clearChat,
  };
}
