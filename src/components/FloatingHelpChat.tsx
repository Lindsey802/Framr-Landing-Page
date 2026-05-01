import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUp } from 'lucide-react';
import { Logo } from './Logo';

export function FloatingHelpChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

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
  }, [messages, open]);

  const send = () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }, { role: 'assistant', text: 'Thanks — our Framr assistant will help you right away.' }]);
    setMessage('');
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-18 right-0 w-[min(380px,calc(100vw-32px))] h-[540px] max-h-[80vh] rounded-2xl border border-neutral-200 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.12)] overflow-hidden"
          >
            <div className="h-full flex flex-col">
              <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-neutral-900">Framr Assistant</p>
                  <span className="w-2 h-2 rounded-full bg-neutral-900" />
                </div>
                <button onClick={() => setOpen(false)} className="p-1 rounded-md hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900" aria-label="Close">
                  <X size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 ? (
                  <p className="text-sm text-neutral-500">Hi, I&apos;m Framr. Ask me anything.</p>
                ) : (
                  messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${m.role === 'user' ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-900'}`}>
                        {m.text}
                      </div>
                    </div>
                  ))
                )}
                <div ref={endRef} />
              </div>

              <div className="p-3 border-t border-neutral-200">
                <div className="rounded-xl border border-neutral-200 flex items-end gap-2 px-3 py-2">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        send();
                      }
                    }}
                    rows={1}
                    className="flex-1 resize-none bg-transparent outline-none text-sm text-neutral-900 placeholder:text-neutral-400 max-h-24"
                    placeholder="Message Framr"
                    aria-label="Message Framr"
                  />
                  <button onClick={send} className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 transition-transform" aria-label="Send">
                    <ArrowUp size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        className="h-14 w-14 rounded-full bg-black text-white shadow-2xl flex items-center justify-center hover:scale-105 transition-transform"
        id="floating-help"
        aria-label="Open chat"
      >
        <Logo height={20} className="-rotate-12" />
      </button>
    </div>
  );
}
