import { Logo } from "./Logo";
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUp } from 'lucide-react';

type ChatMessage = { role: 'user' | 'assistant'; text: string; time: string };

const SUGGESTIONS = ['What can Framr do?', 'How does pricing work?', 'Show me integrations'];

export function FloatingHelpChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!open) return;
      if (panelRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open, isTyping]);

  const autoresize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  const send = (preset?: string) => {
    const content = (preset ?? message).trim();
    if (!content || isTyping) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { role: 'user', text: content, time: timestamp }]);
    setMessage('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    setIsTyping(true);
    setTimeout(() => {
      const t = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Absolutely — I can help with that. Ask about features, pricing, or integrations and I\'ll keep it concise.', time: t }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 h-[600px] max-h-[85vh] w-[calc(100vw-32px)] sm:w-[400px] overflow-hidden rounded-3xl border border-[rgba(0,0,0,0.06)] bg-white/95 shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_12px_32px_-8px_rgba(0,0,0,0.12),0_24px_64px_-16px_rgba(0,0,0,0.18)] backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex h-full flex-col">
              <div className="flex h-16 items-center justify-between border-b border-neutral-100 px-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100"><Logo size={20} alt="" /></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-neutral-900">Framr Assistant</p>
                      <span className="ml-1 h-1.5 w-1.5 rounded-full bg-green-500" />
                    </div>
                    <p className="text-xs text-neutral-500">AI design copilot</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-black"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="group flex-1 space-y-4 overflow-y-auto px-5 py-6 [scrollbar-width:thin] [scrollbar-color:transparent_transparent] hover:[scrollbar-color:#e5e5e5_transparent]">
                {messages.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center"><Logo size={40} alt="" /></div>
                    <p className="text-base font-medium text-neutral-900">Hi, I&apos;m Framr</p>
                    <p className="mt-1 max-w-[260px] text-sm text-neutral-500">Ask me about features, pricing, or how to ship faster.</p>
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                      {SUGGESTIONS.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => send(item)}
                          className="rounded-full border border-neutral-200 px-3 py-1.5 text-xs text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  messages.map((m, i) => (
                    <motion.div
                      key={`${m.time}-${i}`}
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      className={`group/msg ${m.role === 'user' ? 'ml-auto max-w-[85%]' : 'max-w-[85%]'}`}
                    >
                      <div
                        className={`px-4 py-2.5 text-sm leading-relaxed ${
                          m.role === 'user'
                            ? 'rounded-2xl rounded-br-md bg-black text-white'
                            : 'rounded-2xl rounded-bl-md border border-neutral-100 bg-neutral-50 text-neutral-900'
                        }`}
                      >
                        {m.text}
                      </div>
                      <p className="mt-1 text-[10px] text-neutral-400 opacity-0 transition-opacity group-hover/msg:opacity-100">{m.time}</p>
                    </motion.div>
                  ))
                )}

                {isTyping && (
                  <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-neutral-100 bg-neutral-50 px-4 py-3">
                    <div className="flex items-center gap-1">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="h-1.5 w-1.5 rounded-full bg-neutral-400"
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.12 }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div ref={endRef} />
              </div>

              <div className="sticky bottom-0 border-t border-neutral-100 p-3">
                <div className="flex items-end gap-2 rounded-2xl border border-neutral-200 bg-white p-2 transition-all focus-within:border-neutral-900 focus-within:ring-4 focus-within:ring-black/5">
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      autoresize();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        send();
                      }
                    }}
                    rows={1}
                    className="max-h-[120px] min-h-[24px] flex-1 resize-none bg-transparent px-1 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                    placeholder="Message Framr…"
                    aria-label="Message Framr"
                  />
                  <button
                    type="button"
                    onClick={() => send()}
                    disabled={message.trim().length === 0 || isTyping}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:bg-neutral-200"
                    aria-label="Send"
                  >
                    <ArrowUp size={16} />
                  </button>
                </div>
                <p className="mt-2 text-center text-[10px] text-neutral-400">Powered by Framr AI</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={buttonRef}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(0,0,0,0.08)] bg-white text-neutral-700 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.12),0_16px_40px_-8px_rgba(0,0,0,0.15)] transition-all duration-200 ease-out hover:scale-105 hover:shadow-[0_2px_4px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.16),0_20px_48px_-8px_rgba(0,0,0,0.2)] active:scale-95 focus-visible:ring-4 focus-visible:ring-black/10 focus-visible:ring-offset-2"
        id="floating-help"
        aria-label={open ? "Close Framr assistant" : "Open Framr assistant"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.15 }}>
              <X size={20} />
            </motion.span>
          ) : (
            <motion.span key="logo" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.15 }}>
              <Logo size={28} variant="black" alt="" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </>
  );
}
