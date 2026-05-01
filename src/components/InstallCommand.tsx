import { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check } from 'lucide-react';

export function InstallCommand() {
  const [copied, setCopied] = useState(false);
  const command = 'npx create-framr-app@latest';

  const copy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.3, duration: 0.5 }}
      className="flex justify-center mt-12"
      id="install-command"
    >
      <div className="flex items-center gap-4 px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200/80 transition-colors rounded-full font-mono text-sm group cursor-pointer" onClick={copy}>
        <span className="text-zinc-400">&gt;</span>
        <span className="text-zinc-700">{command}</span>
        <button className="ml-2 text-zinc-400 group-hover:text-black transition-colors">
          {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
        </button>
      </div>
    </motion.div>
  );
}
