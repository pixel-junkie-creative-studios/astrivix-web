import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

function Counter100Gauge() {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { amount: 0.35, once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 1600;
      const startTime = performance.now();

      const animateCount = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * 100);
        setCount(current);
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };

      requestAnimationFrame(animateCount);
    }
  }, [isInView]);

  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (count / 100) * circumference;

  return (
    <div ref={ref} className="relative flex flex-col items-center justify-center my-2">
      {/* Liquid Glass Radial Speed Ring with Neon Pink/Purple Accent */}
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center rounded-full glass-metallic shadow-[0_0_40px_rgba(236,72,153,0.3)] border border-pink-500/40 p-2">
        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="7"
            fill="transparent"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="url(#gaugeNeonGradient)"
            strokeWidth="7"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-300 ease-out"
          />
          <defs>
            <linearGradient id="gaugeNeonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#d946ef" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Number + Inline % Symbol */}
        <div className="relative z-10 flex items-baseline justify-center">
          <span className="text-4xl sm:text-6xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-purple-200 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
            {count}
          </span>
          <span className="text-xl sm:text-3xl font-black font-sans text-pink-400 ml-0.5">
            %
          </span>
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
    <div id="about" className="py-16 sm:py-24 relative z-10 w-full min-h-screen flex flex-col justify-center">
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
            <h2 className="text-3xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-400 to-purple-500">Astrivix.</span>
            </h2>
            <div className="flex-grow h-[2px] bg-gradient-to-r from-pink-500/50 via-purple-500/20 to-transparent mt-2"></div>
          </div>
          <p className="text-[10px] sm:text-sm font-mono tracking-[0.25em] text-white/70 uppercase font-semibold">
            ENGINEERING HIGH-PERFORMANCE DIGITAL INFRASTRUCTURE & CREATIVE EXCELLENCE
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
          
          {/* Cell 1: Main Manifesto (Spans 2 columns on desktop) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-2 glass-metallic gpu-layer rounded-[2.5rem] p-6 sm:p-12 flex flex-col justify-between border border-white/30 hover:border-pink-500/50 shadow-[0_30px_70px_rgba(0,0,0,0.95)] relative overflow-hidden group min-h-[280px] sm:min-h-[320px] transition-colors"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-pink-500/20 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            
            <div className="relative z-10 my-auto">
              <span className="text-[10px] tracking-[0.3em] font-mono font-bold text-pink-400 uppercase block mb-4">
                01 // CORE MANIFESTO
              </span>
              <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-white drop-shadow-md">
                We build high-performance digital products <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-300 to-purple-400">
                  that set new global benchmarks for performance and design.
                </span>
              </h3>
            </div>
          </motion.div>

          {/* Cell 2: Visual Gauge Stat (Spans 1 column) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -4 }}
            className="glass-metallic gpu-layer rounded-[2.5rem] p-6 sm:p-8 flex flex-col items-center justify-center border border-white/30 hover:border-pink-500/50 shadow-[0_30px_70px_rgba(0,0,0,0.95)] relative overflow-hidden group min-h-[300px] w-full transition-colors"
          >
            <div className="absolute w-48 h-48 bg-pink-500/15 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            <div className="relative z-10 text-center flex flex-col items-center w-full px-1">
              <Counter100Gauge />
              <div className="text-[10px] sm:text-xs uppercase tracking-[0.14em] font-mono font-bold text-white bg-pink-500/15 px-4 py-2.5 rounded-2xl border border-pink-500/30 backdrop-blur-md w-full max-w-[250px] leading-tight shadow-lg text-center mt-2">
                <div>CUSTOM CODE QUALITY</div>
                <div className="text-pink-300 text-[9px] sm:text-[10px] mt-0.5">& ZERO-LAG PERFORMANCE</div>
              </div>
            </div>
          </motion.div>

          {/* Cell 3: Precision Execution (Spans 1 column) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.01, y: -4 }}
            className="glass-metallic gpu-layer rounded-[2.5rem] p-8 flex flex-col justify-between border border-white/30 hover:border-pink-500/50 shadow-[0_30px_70px_rgba(0,0,0,0.95)] relative overflow-hidden min-h-[280px] transition-colors"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] tracking-[0.3em] font-mono font-bold text-pink-400 uppercase">
                02 // PRECISION EXECUTION
              </span>
              <div className="w-8 h-8 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,1)]" />
              </div>
            </div>
            
            <p className="text-base sm:text-lg text-white font-medium relative z-10 leading-relaxed font-sans">
              We architect custom, ultra-fast web and mobile platforms engineered for smooth 120 FPS gesture physics, instant load times, and high customer conversion.
            </p>
          </motion.div>

          {/* Cell 4: Direct Collaboration (Spans 2 columns on desktop) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.01, y: -4 }}
            className="md:col-span-2 glass-metallic gpu-layer rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-center border border-white/30 hover:border-pink-500/50 shadow-[0_30px_70px_rgba(0,0,0,0.95)] relative overflow-hidden min-h-[240px] transition-colors"
          >
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-purple-600/15 blur-3xl rounded-full pointer-events-none" />
            <span className="text-[10px] tracking-[0.3em] font-mono font-bold text-pink-400 uppercase block mb-3">
              03 // DIRECT PARTNERSHIP
            </span>
            <h4 className="text-xl sm:text-3xl md:text-4xl font-black mb-3 text-white tracking-tight">
              Transparent strategy. Modern engineering.
            </h4>
            <p className="text-sm sm:text-lg text-white leading-relaxed font-normal max-w-3xl">
              We combine modern frontend technology, clean code standards, and executive design precision to set your brand apart as a market leader.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
