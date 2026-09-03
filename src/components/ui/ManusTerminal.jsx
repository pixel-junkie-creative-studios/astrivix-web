import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LucideTerminal, LucideArrowRight, LucideCheckCircle2 } from 'lucide-react';

export const ManusTerminal = () => {
  const [command, setCommand] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!command.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setCommand('');
    }, 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-metallic p-6 sm:p-8 rounded-[2.5rem] border border-white/20 relative overflow-hidden shadow-2xl my-8 max-w-4xl mx-auto w-full"
    >
      {/* Top Terminal Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          <span className="text-[10px] font-mono text-white/50 uppercase ml-2 tracking-widest font-bold">
            MANUS.IM // COMMAND ENGINE
          </span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-bold uppercase flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          ONLINE 120 FPS
        </span>
      </div>

      {/* Terminal Content */}
      <div className="font-mono text-xs sm:text-sm text-white/90 space-y-3 mb-6">
        <p className="text-white/60">
          &gt; AST.ENGINE_INIT --mode=zero-lag --framework=motion.dev
        </p>
        <p className="text-emerald-400 font-semibold">
          ✓ Loaded Kokonut.UI + Manus.im + BKLIT.UI Design Systems
        </p>
        <p className="text-white">
          &gt; What would you like Astrivix to build for your enterprise today?
        </p>
      </div>

      {/* Interactive Command Input Form */}
      <form onSubmit={handleSubmit} className="relative flex items-center gap-3">
        <span className="text-emerald-400 font-mono font-bold text-sm">$</span>
        <input 
          type="text" 
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="e.g. Build an ultra-fast SaaS platform with AI..."
          className="w-full bg-[#08080c] border border-white/20 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:border-emerald-400 focus:outline-none transition-all placeholder:text-white/30 font-mono"
        />
        <motion.button 
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-white text-black font-mono font-black text-xs px-5 py-3 rounded-xl uppercase tracking-wider shrink-0 hover:bg-emerald-400 transition-colors flex items-center gap-1.5"
        >
          <span>RUN</span>
          <LucideArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </form>

      {/* Confirmation Feedback */}
      {submitted && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl font-mono text-xs text-emerald-400 flex items-center gap-2"
        >
          <LucideCheckCircle2 className="w-4 h-4 shrink-0" />
          <span>COMMAND RECEIVED: Transmitting proposal to Astrivix core engineers...</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ManusTerminal;
