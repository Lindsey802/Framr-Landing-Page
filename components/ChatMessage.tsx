import React from 'react';

export type ChatRole = 'user' | 'assistant';

interface ChatMessageProps {
  role: ChatRole;
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2 text-sm leading-relaxed ${
          isUser ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-900'
        }`}
      >
        {content}
      </div>
    </div>
  );
}
