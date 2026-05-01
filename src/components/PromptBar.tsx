import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Settings, Sparkles, ChevronDown, ArrowUp, Hourglass } from 'lucide-react';
import { OpenAI, ClaudeLogo, GeminiLogo, AzureLogo, MetaLogo, DeepSeekLogo } from './logos';

const placeholders = [
  "Build a landing page for a coffee subscription startup",
  "Design a dashboard for an AI analytics platform",
  "Create a mobile app UI for a plant watering tracker",
  "Generate a minimalist portfolio for a visual designer"
];

const models = [
  { id: 'gpt-5', name: 'GPT-5', logo: OpenAI },
  { id: 'claude-4.5', name: 'Claude 4.5 Sonnet', logo: ClaudeLogo },
  { id: 'gemini-2.5', name: 'Gemini 2.5 Pro', logo: GeminiLogo },
  { id: 'gpt-5-azure', name: 'GPT-5 (Azure)', logo: AzureLogo },
  { id: 'llama-4', name: 'Llama 4', logo: MetaLogo },
  { id: 'deepseek-3.1', name: 'DeepSeek V3.1', logo: DeepSeekLogo },
];

export function PromptBar() {
  const [prompt, setPrompt] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsModelMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!prompt.trim()) return;
    
    const url = new URL('https://cloud.onyx.app/');
    url.searchParams.set('prompt', prompt);
    url.searchParams.set('source', 'framr-hero');
    window.location.href = url.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.9, duration: 0.6 }}
      className="relative w-full max-w-2xl mx-auto group"
      id="prompt-bar-container"
    >
      {/* Floating Glow */}
      <div className="hidden" />
      <div className="hidden" />
      
      <div className={`relative bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-200 ${isFocused ? 'border-neutral-900 ring-4 ring-black/5' : 'border-[#E5E7EB]'}`}>
        <div className="relative">
          <textarea
            ref={textareaRef}
            className="w-full bg-transparent border-none focus:ring-0 text-xl font-medium placeholder:text-neutral-400 min-h-[60px] max-h-[200px] resize-none outline-none overflow-hidden relative z-10"
            value={prompt}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => {
                setPrompt(e.target.value);
                // Simple auto-resize
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            id="prompt-input"
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={placeholderIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: prompt ? 0.08 : 0.3, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 left-0 pointer-events-none text-xl font-medium text-neutral-400 z-0"
            >
              {placeholders[placeholderIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <button className="p-2 text-zinc-400 hover:text-black transition-colors rounded-lg hover:bg-zinc-100" title="Attach">
              <Plus size={18} />
            </button>
            <button className="p-2 text-zinc-400 hover:text-black transition-colors rounded-lg hover:bg-zinc-100" title="Settings">
              <Settings size={18} />
            </button>
            <div className="h-4 w-[1px] bg-zinc-200 mx-1" />
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-50 text-zinc-600 rounded-full text-xs font-semibold hover:bg-zinc-100 transition-colors">
              <Hourglass size={14} className="text-zinc-400" />
              Research
            </button>
          </div>

          <div className="flex items-center gap-3 relative" ref={menuRef}>
            <button 
              onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 text-zinc-600 font-medium text-xs rounded-lg hover:bg-zinc-100 transition-colors"
            >
              <selectedModel.logo className="w-4 h-4" />
              {selectedModel.name}
              <ChevronDown size={14} className={`opacity-50 transition-transform ${isModelMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isModelMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-full right-0 mb-2 w-56 bg-white border border-zinc-200 rounded-2xl shadow-2xl overflow-hidden z-50 p-1"
                >
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setSelectedModel(model);
                        setIsModelMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm transition-colors ${
                        selectedModel.id === model.id ? 'bg-zinc-50 text-black font-medium' : 'text-zinc-500 hover:bg-zinc-50 hover:text-black'
                      }`}
                    >
                      <model.logo className="w-4 h-4 shrink-0" />
                      <span className="flex-1 truncate">{model.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              onClick={handleSubmit}
              className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ${
                prompt.trim() ? 'bg-black text-white shadow-lg' : 'bg-zinc-100 text-zinc-400'
              }`}
              id="submit-prompt"
            >
              <ArrowUp size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
