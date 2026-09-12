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
      {/* Glass Speed Ring */}
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center rounded-full glass-metallic shadow-2xl border border-white/20 p-2">
        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="6"
            fill="transparent"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="url(#gaugeMonochromeGradient)"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-300 ease-out"
          />
          <defs>
            <linearGradient id="gaugeMonochromeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#888888" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Number + Inline % Symbol */}
        <div className="relative z-10 flex items-baseline justify-center">
          <span className="text-3xl sm:text-5xl font-black font-mono tracking-tighter text-white drop-shadow-md">
            {count}
          </span>
          <span className="text-lg sm:text-2xl font-bold font-sans text-white/90 ml-0.5">
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
            <h2 className="text-3xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white skeuo-engraved">
              About Us.
            </h2>
            <div className="flex-grow h-[2px] bg-gradient-to-r from-white/40 via-white/10 to-transparent mt-2"></div>
          </div>
          <p className="text-[10px] sm:text-sm font-mono tracking-[0.25em] text-white/70 uppercase font-semibold">
            GLOBAL SOFTWARE ENGINEERING & BRAND ARCHITECTURE
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
            className="md:col-span-2 glass-metallic gpu-layer rounded-[2.5rem] p-6 sm:p-12 flex flex-col justify-between border border-white/30 border-t-white/50 shadow-[0_30px_70px_rgba(0,0,0,0.95)] relative overflow-hidden group min-h-[280px] sm:min-h-[320px]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 my-auto">
              <span className="text-[10px] tracking-[0.3em] font-mono font-bold text-white/70 uppercase block mb-4">01 // CORE MANIFESTO</span>
              <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-white drop-shadow-md">
                We build custom digital products <br className="hidden sm:inline" />
                <span className="text-white/70">
                  that set new global benchmarks for performance and design.
                </span>
              </h3>
            </div>
          </motion.div>

          {/* Cell 2: Visual Gauge Stat (Spans 1 column) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -4 }}
            className="glass-metallic gpu-layer rounded-[2.5rem] p-6 sm:p-8 flex flex-col items-center justify-center border border-white/30 border-t-white/50 shadow-[0_30px_70px_rgba(0,0,0,0.95)] relative overflow-hidden group min-h-[300px] w-full"
          >
            <div className="absolute w-40 h-40 bg-white/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            <div className="relative z-10 text-center flex flex-col items-center w-full px-1">
              <Counter100Gauge />
              <div className="text-[10px] sm:text-xs uppercase tracking-[0.14em] font-mono font-bold text-white bg-white/15 px-3 py-2 rounded-2xl border border-white/30 backdrop-blur-md w-full max-w-[240px] leading-tight shadow-lg text-center mt-1">
                <div>CUSTOM ARCHITECTURE</div>
                <div className="text-white/70 text-[9px] sm:text-[10px] mt-0.5">& OPTIMIZED SPEED</div>
              </div>
            </div>
          </motion.div>

          {/* Cell 3: Precision Execution (Spans 1 column) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.01, y: -4 }}
            className="glass-metallic gpu-layer rounded-[2.5rem] p-8 flex flex-col justify-between border border-white/30 border-t-white/50 shadow-[0_30px_70px_rgba(0,0,0,0.95)] relative overflow-hidden min-h-[280px]"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] tracking-[0.3em] font-mono font-bold text-white/70 uppercase">02 // PRECISION EXECUTION</span>
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/30 flex items-center justify-center">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              </div>
            </div>
            
            <p className="text-base sm:text-lg text-white font-medium relative z-10 leading-relaxed font-sans">
              We architect custom digital platforms engineered for high conversion rates, fluid user interaction, and global enterprise scaling.
            </p>
          </motion.div>

          {/* Cell 4: Innovation Statement (Spans 2 columns on desktop) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.01, y: -4 }}
            className="md:col-span-2 glass-metallic gpu-layer rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-center border border-white/30 border-t-white/50 shadow-[0_30px_70px_rgba(0,0,0,0.95)] relative overflow-hidden min-h-[240px]"
          >
            <span className="text-[10px] tracking-[0.3em] font-mono font-bold text-white/70 uppercase block mb-3">03 // DIRECT PARTNERSHIP</span>
            <h3 className="text-xl sm:text-3xl md:text-4xl font-black mb-3 text-white tracking-tight">
              Transparent strategy. Modern engineering.
            </h3>
            <p className="text-sm sm:text-lg text-white leading-relaxed font-normal max-w-3xl">
              We combine modern frontend technology, clean code standards, and executive design precision to position your brand at the summit of your industry.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
