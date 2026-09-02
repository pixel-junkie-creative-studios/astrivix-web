import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function About() {
  const [screwFell, setScrewFell] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div id="about" className="py-24 relative z-10 w-full min-h-screen flex flex-col justify-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-left"
        >
          <div className="flex items-center gap-4 mb-3">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white skeuo-engraved">
              About Us.
            </h1>
            <div className="flex-grow h-[2px] bg-gradient-to-r from-white/40 via-white/10 to-transparent mt-2"></div>
          </div>
          <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-white/70 uppercase font-semibold">
            ENGINEERING HIGH-PERFORMANCE DIGITAL INFRASTRUCTURE & CREATIVE MAGIC
          </p>
        </motion.div>

        {/* Bento Grid Container */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
        >
          
          {/* Cell 1: Main Headline (Spans 2 columns on desktop) */}
          <motion.div 
            variants={itemVariants}
            onViewportEnter={() => {
              setTimeout(() => setScrewFell(true), 300);
            }}
            onClick={() => setScrewFell(true)}
            animate={{ rotate: screwFell ? -2.5 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="md:col-span-2 glass-metallic gpu-layer rounded-[2.5rem] p-8 sm:p-12 flex flex-col justify-between border border-white/30 border-t-white/50 shadow-[0_30px_70px_rgba(0,0,0,0.95)] relative overflow-visible group min-h-[300px] cursor-pointer"
          >
            {/* Panic Speech Bubble when Screw Falls */}
            <AnimatePresence>
              {screwFell && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.7, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-3.5 left-14 z-30 bg-red-600/95 text-white font-mono text-[10px] sm:text-xs font-black uppercase px-3.5 py-1.5 rounded-xl shadow-[0_10px_25px_rgba(239,68,68,0.8)] border border-red-400 flex items-center gap-2 pointer-events-none"
                >
                  <span className="animate-ping text-yellow-300">🚨</span>
                  <span>OH SHIT NOT AGAIN! SCROLL DOWN FAST I CAN'T HOLD ON...</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Falling Top-Left Screw Animation */}
            <motion.div 
              animate={screwFell ? { 
                y: [0, -15, 380], 
                x: [0, -25, -60], 
                rotate: [0, 720, 1440], 
                opacity: [1, 1, 0] 
              } : {}}
              transition={{ duration: 1.4, ease: "easeIn" }}
              className="absolute top-5 left-5 skeuo-screw z-20" 
            />

            {/* Remaining Stable Screws */}
            <div className="absolute top-5 right-5 skeuo-screw opacity-80" />
            <div className="absolute bottom-5 left-5 skeuo-screw opacity-80" />
            <div className="absolute bottom-5 right-5 skeuo-screw opacity-80" />

            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 my-auto">
              <span className="text-[10px] tracking-[0.3em] font-mono font-bold text-white/40 uppercase block mb-4">01 // CORE MANIFESTO</span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-white drop-shadow-md">
                We build digital products <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                  that trigger existential crises in your competitors.
                </span>
              </h2>
            </div>
          </motion.div>

          {/* Cell 2: Visual Stat (Spans 1 column) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -4 }}
            className="glass-metallic gpu-layer rounded-[2.5rem] p-8 flex flex-col items-center justify-center border border-white/30 border-t-white/50 shadow-[0_30px_70px_rgba(0,0,0,0.95)] relative overflow-hidden group min-h-[300px]"
          >
            <div className="absolute w-36 h-36 bg-white/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            <div className="relative z-10 text-center">
              <span className="text-6xl sm:text-8xl font-black tracking-tighter text-white drop-shadow-2xl block mb-2 font-mono">100%</span>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-mono font-bold text-white/90 bg-white/10 px-3 py-1.5 rounded-full border border-white/20 inline-block">
                Dark Magic & Dev Suffering
              </span>
            </div>
          </motion.div>

          {/* Cell 3: Vision Statement (Spans 1 column) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.01, y: -4 }}
            className="glass-metallic gpu-layer rounded-[2.5rem] p-8 flex flex-col justify-between border border-white/30 border-t-white/50 shadow-[0_30px_70px_rgba(0,0,0,0.95)] relative overflow-hidden min-h-[280px]"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] tracking-[0.3em] font-mono font-bold text-white/40 uppercase">02 // REALITY CHECK</span>
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/30 flex items-center justify-center">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,1)]" />
              </div>
            </div>
            
            <p className="text-base sm:text-lg text-white/90 font-medium relative z-10 leading-relaxed font-sans">
              Most agencies charge <strong className="text-white font-bold">$50k for 12 slides</strong> and a broken template. We ship custom, zero-lag web apps while suffering in deep dark mode.
            </p>
          </motion.div>

          {/* Cell 4: Innovation Statement (Spans 2 columns on desktop) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.01, y: -4 }}
            className="md:col-span-2 glass-metallic gpu-layer rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-center border border-white/30 border-t-white/50 shadow-[0_30px_70px_rgba(0,0,0,0.95)] relative overflow-hidden min-h-[280px]"
          >
            {/* Skeuomorphic Screws */}
            <div className="absolute top-5 left-5 skeuo-screw opacity-70" />
            <div className="absolute top-5 right-5 skeuo-screw opacity-70" />
            <div className="absolute bottom-5 left-5 skeuo-screw opacity-70" />
            <div className="absolute bottom-5 right-5 skeuo-screw opacity-70" />

            <span className="text-[10px] tracking-[0.3em] font-mono font-bold text-white/40 uppercase block mb-3">03 // NO FILTER PHILOSOPHY</span>
            <h3 className="text-xl sm:text-3xl md:text-4xl font-black mb-3 text-white tracking-tight">
              No corporate speak. No fake synergy.
            </h3>
            <p className="text-sm sm:text-lg text-white/80 leading-relaxed font-normal max-w-3xl">
              We drink dangerous amounts of espresso, roast bad UX in code reviews, and build digital weapons that make your brand unbeatable.
            </p>
          </motion.div>

          {/* Cell 5: Hilarious Copywriter Resignation Joke (Spans full width) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.01, y: -2 }}
            className="md:col-span-3 glass-metallic gpu-layer rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/30 bg-white/5 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono shadow-2xl"
          >
            <div className="flex items-center gap-3.5">
              <span className="text-lg text-yellow-400">⚠️</span>
              <span className="text-white/90 leading-relaxed">
                <strong className="text-white">SYSTEM WARNING:</strong> Our copywriter suddenly quit for some corporate MNC fantasy. The dev team hijacked the typewriter. Expect zero corporate filter, caffeine overload, and pure dark mode.
              </span>
            </div>
            <span className="text-[10px] tracking-widest text-white/50 bg-white/10 px-3 py-1 rounded-md border border-white/20 uppercase font-bold shrink-0">DEV TEAM MODE</span>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}

