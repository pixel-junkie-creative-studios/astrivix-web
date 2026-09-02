import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function About() {
    // screwState: 0 = all intact, 1 = Trio fell (Duo talks to Uno), 2 = Uno fell (Duo talks to viewer), 3 = Duo fell (Total Collapse!), 4 = Left Broken Forever
  const [screwState, setScrewState] = useState(0);

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

  // Step 1: Trio (Top-Left) falls first
  const triggerTrioFall = () => {
    if (screwState === 0) {
      setScrewState(1); // Trio falls! Duo talks to Uno
      // Keep Duo -> Uno dialogue visible for 4.2 seconds
      setTimeout(() => {
        setScrewState(prev => prev === 1 ? 2 : prev);
      }, 4200);
    }
  };

  // Step 2: Uno (Top-Right) falls second
  const triggerUnoFall = () => {
    if (screwState <= 1) {
      setScrewState(2); // Uno falls! Duo talks to viewer
      // Keep Duo -> Viewer dialogue visible for 5.5 seconds before total collapse!
      setTimeout(() => {
        setScrewState(prev => prev === 2 ? 3 : prev);
      }, 5500);
    }
  };

  // Step 3: Duo (Bottom-Left) falls last (Total Collapse)
  const triggerDuoFall = () => {
    if (screwState <= 2) {
      setScrewState(3); // Duo falls! Total Collapse!
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
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
        >
          
          {/* Cell 1: Main Headline (Spans 2 columns on desktop) */}
          <motion.div 
            variants={itemVariants}
            viewport={{ amount: 0.65, once: true }}
            onViewportEnter={() => {
              // Only start falling AFTER the user is directly looking at this card (65% in view)
              setTimeout(triggerTrioFall, 2000);
            }}
            animate={
              screwState === 0 ? { rotate: 0, y: 0 } :
              screwState === 1 ? { rotate: -4, y: 8 } :
              screwState === 2 ? { rotate: -16, y: 25 } :
              { rotate: -28, y: 110, opacity: 0.88 }
            }
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
            className="md:col-span-2 glass-metallic gpu-layer rounded-[2.5rem] p-8 sm:p-12 flex flex-col justify-between border border-white/30 border-t-white/50 shadow-[0_30px_70px_rgba(0,0,0,0.95)] relative overflow-visible group min-h-[320px]"
          >
            {/* --- POPUP SPEECH DIALOGUES (ANCHORED INSIDE CARD TOP BAR) --- */}
            <AnimatePresence mode="wait">
              {/* Dialogue 1: After Trio falls, Duo talks to Uno */}
              {screwState === 1 && (
                <motion.div 
                  key="dialogue-1"
                  initial={{ opacity: 0, scale: 0.8, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute top-14 right-6 sm:right-12 z-30 bg-red-600/95 text-white font-mono text-[10px] sm:text-xs font-black uppercase px-4 py-2 rounded-2xl shadow-[0_10px_30px_rgba(239,68,68,0.8)] border border-red-400 flex items-center gap-2 pointer-events-none"
                >
                  <span className="animate-ping text-yellow-300">🚨</span>
                  <span>DUO: YO UNO! TRIO JUST DIPPED! HOLD ON TO YOUR METAL BRO!</span>
                </motion.div>
              )}

              {/* Dialogue 2: After Uno falls, ONLY Duo remains talking to the viewer */}
              {screwState === 2 && (
                <motion.div 
                  key="dialogue-2"
                  initial={{ opacity: 0, scale: 0.8, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute top-14 left-6 sm:left-12 z-30 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-mono text-[10px] sm:text-xs font-black uppercase px-4 py-2.5 rounded-2xl shadow-[0_10px_35px_rgba(234,88,12,0.9)] border-2 border-orange-300 flex items-center gap-2 pointer-events-none max-w-[85vw] sm:max-w-none"
                >
                  <span className="animate-bounce text-lg">😭</span>
                  <span>DUO: I'M DUO AND I'M THE LAST SURVIVING SCREW! DO NOT TOUCH ME YOU CRAZY ANIMAL!</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* --- SCREW 1: TRIO (Top-Left Screw - Falls 1st) --- */}
            <motion.div 
              onClick={triggerTrioFall}
              animate={screwState >= 1 ? { 
                y: [0, -20, 420], 
                x: [0, -30, -80], 
                rotate: [0, 720, 1800], 
                opacity: [1, 1, 0] 
              } : {}}
              transition={{ duration: 1.2, ease: "easeIn" }}
              className="absolute top-5 left-5 skeuo-screw z-20 cursor-pointer hover:scale-125 transition-transform" 
              title="Trio Screw (Click to unscrew)"
            />

            {/* --- SCREW 2: UNO (Top-Right Screw - Falls 2nd) --- */}
            <motion.div 
              onClick={triggerUnoFall}
              animate={screwState >= 2 ? { 
                y: [0, -20, 420], 
                x: [0, 30, 80], 
                rotate: [0, -720, -1800], 
                opacity: [1, 1, 0] 
              } : {}}
              transition={{ duration: 1.2, ease: "easeIn" }}
              className="absolute top-5 right-5 skeuo-screw z-20 cursor-pointer hover:scale-125 transition-transform" 
              title="Uno Screw (Click to unscrew)"
            />

            {/* --- SCREW 3: DUO (Bottom-Left Screw - Falls 3rd, Last Surviving Screw) --- */}
            <motion.div 
              onClick={triggerDuoFall}
              animate={screwState >= 3 ? { 
                y: [0, 20, 450], 
                x: [0, -20, -60], 
                rotate: [0, 540, 1440], 
                opacity: [1, 1, 0] 
              } : {}}
              transition={{ duration: 1.2, ease: "easeIn" }}
              className="absolute bottom-5 left-5 skeuo-screw z-20 cursor-pointer hover:scale-125 transition-transform" 
              title="Duo Screw (The Last Screw!)"
            />

            {/* --- REPAIR / SAVAGE CHOICE BUTTONS (WHEN COLLAPSED) --- */}
            <AnimatePresence>
              {screwState === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 m-auto w-max h-max z-40 flex flex-col sm:flex-row items-center gap-3.5 p-3 pointer-events-auto"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setScrewState(0);
                    }}
                    className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-mono text-[11px] sm:text-xs font-black uppercase px-5 py-3 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.8)] border border-emerald-300 flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  >
                    <span className="animate-spin text-base">🛠️</span>
                    <span>REPAIR BOX (SCREW BACK TOGETHER)</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setScrewState(4);
                    }}
                    className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-mono text-[11px] sm:text-xs font-black uppercase px-5 py-3 rounded-2xl shadow-[0_0_30px_rgba(225,29,72,0.9)] border border-red-400 flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  >
                    <span className="text-base">💀</span>
                    <span>LEAVE IT BROKEN LIKE YO DADDY LEFT YOU HAHHA</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Permanent Broken Badge if screwState === 4 */}
            {screwState === 4 && (
              <div 
                onClick={() => setScrewState(0)}
                className="absolute top-4 right-4 z-40 bg-black/80 text-red-400 font-mono text-[10px] font-bold uppercase px-3 py-1.5 rounded-xl border border-red-500/40 cursor-pointer hover:scale-105 transition-transform flex items-center gap-1.5"
                title="Click to finally repair"
              >
                <span>💀 LEFT BROKEN FOREVER (CLICK TO RESET)</span>
              </div>
            )}

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
            className="glass-metallic gpu-layer rounded-[2.5rem] p-6 sm:p-8 flex flex-col items-center justify-center border border-white/30 border-t-white/50 shadow-[0_30px_70px_rgba(0,0,0,0.95)] relative overflow-hidden group min-h-[300px] w-full"
          >
            <div className="absolute w-40 h-40 bg-white/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            <div className="relative z-10 text-center flex flex-col items-center w-full px-2">
              <span className="text-5xl sm:text-6xl md:text-5xl lg:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400 drop-shadow-2xl block mb-3 font-mono">
                100%
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-mono font-bold text-white/90 bg-white/10 px-3.5 py-2 rounded-2xl border border-white/20 backdrop-blur-md block max-w-full leading-relaxed shadow-lg">
                BESPOKE ARCHITECTURE & UNMATCHED SPEED
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

