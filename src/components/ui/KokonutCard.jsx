import React from 'react';
import { motion } from 'motion/react';
import { LucideSparkles, LucideTerminal, LucideZap } from 'lucide-react';

export const KokonutCard = ({ 
  title = "HIGH-PERFORMANCE ARCHITECTURE", 
  subtitle = "Zero-Lag Engineering", 
  description = "Engineered with Kokonut UI micro-interactions, motion.dev fluid spring physics, and obsidian liquid glass surfaces.",
  badge = "KOKONUT UI",
  icon: Icon = LucideSparkles
}) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass-metallic p-6 sm:p-8 rounded-[2rem] border border-white/20 relative overflow-hidden group shadow-2xl gpu-layer flex flex-col justify-between min-h-[260px]"
    >
      {/* Ambient Neon Highlight Blur */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
      
      {/* Top Header Badge */}
      <div className="flex items-center justify-between relative z-10 mb-4">
        <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 uppercase flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          {badge}
        </span>
        <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:border-white/40 transition-colors">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 my-auto">
        <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase block mb-1 font-semibold">{subtitle}</span>
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
          {description}
        </p>
      </div>

      {/* Bottom Corner Brackets (BKLIT / Synthu Aesthetic) */}
      <div className="absolute top-3 left-3 text-[10px] font-mono text-white/20 pointer-events-none">┌</div>
      <div className="absolute top-3 right-3 text-[10px] font-mono text-white/20 pointer-events-none">┐</div>
      <div className="absolute bottom-3 left-3 text-[10px] font-mono text-white/20 pointer-events-none">└</div>
      <div className="absolute bottom-3 right-3 text-[10px] font-mono text-white/20 pointer-events-none">┘</div>
    </motion.div>
  );
};

export default KokonutCard;
