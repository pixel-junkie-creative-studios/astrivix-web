import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform, animate } from 'framer-motion';

function Counter100() {
  const [displayCount, setDisplayCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  const countValue = useSpring(0, {
    stiffness: 35,
    damping: 14,
    restDelta: 0.001
  });

  const strokeDashoffset = useTransform(countValue, [0, 100], [circumference, 0]);

  useEffect(() => {
    if (isInView) {
      countValue.set(100);
      const unsubscribe = countValue.on("change", (latest) => {
        const val = Math.floor(latest);
        setDisplayCount(val);
        if (val >= 100 && !isCompleted) {
          setIsCompleted(true);
        }
      });
      return () => unsubscribe();
    }
  }, [isInView, countValue, isCompleted]);

  // Traveling particle calculations
  const angle = (displayCount / 100) * 360 - 90;
  const angleRad = (angle * Math.PI) / 180;
  const dotX = 64 + radius * Math.cos(angleRad);
  const dotY = 64 + radius * Math.sin(angleRad);

  // 24 mechanical perimeter ticks
  const ticks = Array.from({ length: 24 }, (_, i) => {
    const tickAngle = (i / 24) * 360 - 90;
    const rad = (tickAngle * Math.PI) / 180;
    const innerR = 45;
    const outerR = 49;
    const active = displayCount >= Math.round(((i + 1) / 24) * 100);
    return {
      x1: 64 + innerR * Math.cos(rad),
      y1: 64 + innerR * Math.sin(rad),
      x2: 64 + outerR * Math.cos(rad),
      y2: 64 + outerR * Math.sin(rad),
      active
    };
  });

  return (
    <div ref={ref} className="relative flex flex-col items-center justify-center my-2 select-none w-full max-w-sm group/hud">
      {/* Outer Obsidian Glass HUD Capsule */}
      <div className="relative w-full bg-[#07070E]/90 backdrop-blur-xl border border-white/15 rounded-3xl p-6 flex flex-col items-center shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden">
        
        {/* Corner HUD Bracket Accents */}
        <span className="absolute top-2.5 left-3 text-[9px] font-mono text-emerald-400/60 select-none">+</span>
        <span className="absolute top-2.5 right-3 text-[9px] font-mono text-emerald-400/60 select-none">+</span>
        <span className="absolute bottom-2.5 left-3 text-[9px] font-mono text-emerald-400/60 select-none">+</span>
        <span className="absolute bottom-2.5 right-3 text-[9px] font-mono text-emerald-400/60 select-none">+</span>

        {/* Header Telemetry Status Bar */}
        <div className="flex items-center justify-between w-full mb-4 px-1 border-b border-white/10 pb-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 absolute" />
            <span className="text-[9px] font-mono tracking-[0.2em] text-emerald-300 font-bold uppercase">
              SYSTEM OPTIMAL
            </span>
          </div>
          <span className="text-[9px] font-mono tracking-widest text-white/50 font-bold">
            100/100 SCORE
          </span>
        </div>

        {/* SVG Radial Gauge */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center my-2">
          {/* Ambient Glow Backdrop */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/30 via-cyan-500/20 to-purple-600/30 blur-3xl group-hover/hud:scale-125 transition-transform duration-700 pointer-events-none" />
          
          <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 128 128">
            <defs>
              <linearGradient id="godTierGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="35%" stopColor="#06B6D4" />
                <stop offset="70%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
              <filter id="godGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Perimeter Mechanical Micro-Ticks */}
            {ticks.map((t, idx) => (
              <line
                key={idx}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                stroke={t.active ? '#10B981' : 'rgba(255,255,255,0.12)'}
                strokeWidth={t.active ? '1.8' : '1'}
                className="transition-colors duration-300"
              />
            ))}

            {/* Base Background Track Circle */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              className="stroke-white/10"
              strokeWidth="5.5"
              fill="transparent"
            />

            {/* Animated Liquid Progress Circle */}
            <motion.circle
              cx="64"
              cy="64"
              r={radius}
              stroke="url(#godTierGradient)"
              strokeWidth="7"
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray={circumference}
              style={{ 
                strokeDashoffset,
                filter: "url(#godGlow)"
              }}
            />

            {/* Traveling Orbital Light Particle */}
            <circle
              cx={dotX}
              cy={dotY}
              r="4.5"
              fill="#6EE7B7"
              className="transform rotate-90 origin-center"
              style={{ filter: "drop-shadow(0 0 10px #10B981) drop-shadow(0 0 4px #6EE7B7)" }}
            />
          </svg>

          {/* Center Digital Counter display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
            <div className="flex items-baseline justify-center">
              <span className="text-4xl sm:text-5xl font-black font-mono tracking-tighter bg-gradient-to-br from-white via-emerald-100 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                {displayCount}
              </span>
              <span className="text-xl font-mono font-black text-emerald-400 ml-0.5 animate-pulse">
                %
              </span>
            </div>

            <span className="text-[9px] font-mono tracking-[0.25em] text-white/60 uppercase font-bold mt-1">
              PERFECT SCORE
            </span>

            {/* Shockwave Aura Flash on 100% Completion */}
            {isCompleted && (
              <>
                <motion.div
                  initial={{ scale: 0.7, opacity: 0.9 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  transition={{ duration: 1.0, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border-2 border-emerald-400/80 pointer-events-none"
                />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.6 }}
                  animate={{ scale: 1.85, opacity: 0 }}
                  transition={{ duration: 1.3, ease: "easeOut", delay: 0.1 }}
                  className="absolute inset-0 rounded-full border border-cyan-400/60 pointer-events-none"
                />
              </>
            )}
          </div>
        </div>

        {/* Sub-Metrics Telemetry Grid */}
        <div className="grid grid-cols-3 gap-2 w-full mt-4 pt-3 border-t border-white/10 text-center">
          <div className="flex flex-col items-center bg-white/5 rounded-xl p-2 border border-white/10">
            <span className="text-[8px] font-mono tracking-wider text-white/50 uppercase">PERF</span>
            <span className="text-xs font-mono font-bold text-emerald-400">100/100</span>
          </div>
          <div className="flex flex-col items-center bg-white/5 rounded-xl p-2 border border-white/10">
            <span className="text-[8px] font-mono tracking-wider text-white/50 uppercase">SEO</span>
            <span className="text-xs font-mono font-bold text-cyan-400">100/100</span>
          </div>
          <div className="flex flex-col items-center bg-white/5 rounded-xl p-2 border border-white/10">
            <span className="text-[8px] font-mono tracking-wider text-white/50 uppercase">VITAL</span>
            <span className="text-xs font-mono font-bold text-purple-400">100/100</span>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function About() {
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
    <div id="about" className="py-16 sm:py-24 relative z-10 w-full min-h-screen flex flex-col justify-center font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12 text-left"
        >
          <div className="flex items-center gap-4 mb-3">
            <h1 className="text-3xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white skeuo-engraved font-display">
              About Us.
            </h1>
            <div className="flex-grow h-[2px] bg-white/20 mt-2"></div>
          </div>
          <p className="text-[10px] sm:text-sm font-mono tracking-[0.25em] text-white/70 uppercase font-semibold">
            ENGINEERING HIGH-PERFORMANCE DIGITAL INFRASTRUCTURE & ADVANCED DESIGN
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
            className="md:col-span-2 glass-metallic gpu-layer rounded-[2.5rem] p-6 sm:p-12 flex flex-col justify-between border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.95)] relative overflow-hidden group min-h-[280px] sm:min-h-[320px]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 my-auto">
              <span className="text-[10px] tracking-[0.3em] font-mono font-bold text-white/70 uppercase block mb-4">01 // CORE MANIFESTO</span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-white drop-shadow-md font-display">
                We build next-generation digital products <br className="hidden sm:inline" />
                <span className="text-white">
                  that set new global benchmarks for performance and design.
                </span>
              </h2>
            </div>
          </motion.div>

          {/* Cell 2: Visual Stat (Spans 1 column) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -4 }}
            className="glass-metallic gpu-layer rounded-[2.5rem] p-6 sm:p-8 flex flex-col items-center justify-center border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.95)] relative overflow-hidden group min-h-[300px] w-full"
          >
            <div className="absolute w-40 h-40 bg-white/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            <div className="relative z-10 text-center flex flex-col items-center w-full px-2">
              <Counter100 />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.18em] font-mono font-bold text-white bg-[#0E0E16] px-3 py-2 rounded-2xl border border-white/30 max-w-full leading-normal shadow-lg block text-center">
                CUSTOM ARCHITECTURE & PERFORMANCE
              </span>
            </div>
          </motion.div>

          {/* Cell 3: Vision Statement (Spans 1 column) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.01, y: -4 }}
            className="glass-metallic gpu-layer rounded-[2.5rem] p-8 flex flex-col justify-between border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.95)] relative overflow-hidden min-h-[280px]"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] tracking-[0.3em] font-mono font-bold text-white/70 uppercase">02 // PRECISION & EXECUTION</span>
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/30 flex items-center justify-center">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,1)]" />
              </div>
            </div>
            
            <p className="text-base sm:text-lg text-white font-medium relative z-10 leading-relaxed font-sans">
              We architect custom digital platforms engineered for high conversion, responsive performance, and business growth.
            </p>
          </motion.div>

          {/* Cell 4: Innovation Statement (Spans 2 columns on desktop) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.01, y: -4 }}
            className="md:col-span-2 glass-metallic gpu-layer rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-center border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.95)] relative overflow-hidden min-h-[240px]"
          >


            <span className="text-[10px] tracking-[0.3em] font-mono font-bold text-white/70 uppercase block mb-3">03 // DIRECT COLLABORATION</span>
            <h3 className="text-xl sm:text-3xl md:text-4xl font-black mb-3 text-white tracking-tight">
              Transparent strategy. Modern engineering.
            </h3>
            <p className="text-sm sm:text-lg text-white leading-relaxed font-normal max-w-3xl">
              We combine modern web technology, rigorous code standards, and executive design precision to position your brand at the absolute summit of your industry.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}

