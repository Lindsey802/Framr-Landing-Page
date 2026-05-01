'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, X } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { useChat } from '../lib/useChat';

export function FramrChat() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { messages, input, setInput, isTyping, canSend, sendMessage } = useChat();

  const hasMessages = useMemo(() => messages.length > 0, [messages]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
      if (event.key === 'Tab' && dialogRef.current) {
        const nodes = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
        );
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    const onClickOutside = (event: MouseEvent) => {
      if (!dialogRef.current) return;
      if (!dialogRef.current.contains(event.target as Node) && !triggerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);

    const autofocus = dialogRef.current?.querySelector<HTMLTextAreaElement>('textarea');
    autofocus?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [open]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, isTyping, open]);

  useEffect(() => {
    if (!open) triggerRef.current?.focus();
  }, [open]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mb-3 h-[540px] max-h-[80vh] w-[calc(100vw-32px)] sm:w-[380px] rounded-2xl border border-neutral-200 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.12)]"
          >
            <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-neutral-900">Framr Assistant</p>
                <span className="h-2 w-2 rounded-full bg-neutral-900" aria-hidden="true" />
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                aria-label="Close Framr assistant"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={listRef} className="h-[calc(100%-132px)] overflow-y-auto px-4 py-4">
              {!hasMessages ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white">
                    Framr
                  </div>
                  <p className="text-sm text-neutral-500">Hi, I'm Framr. Ask me anything.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((message) => (
                    <ChatMessage key={message.id} role={message.role} content={message.content} />
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl bg-neutral-100 px-4 py-2 text-sm text-neutral-500">Typing...</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="border-t border-neutral-200 p-3">
              <div className="flex items-end gap-2 rounded-xl border border-neutral-200 px-3 py-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      void sendMessage();
                    }
                  }}
                  rows={1}
                  className="max-h-24 flex-1 resize-none bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
                  placeholder="Ask about features, pricing, or integrations"
                  aria-label="Message Framr"
                />
                <button
                  type="button"
                  onClick={() => void sendMessage()}
                  disabled={!canSend}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Send message"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white shadow-[0_10px_24px_rgba(0,0,0,0.2)] transition-transform hover:scale-105"
        aria-label="Open Framr assistant"
      >
        Framr
      </button>
    </div>
  );
}
