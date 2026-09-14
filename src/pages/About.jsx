import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform, animate } from 'framer-motion';

function Counter100() {
  const [displayCount, setDisplayCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const countValue = useSpring(0, {
    stiffness: 40,
    damping: 18,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isInView) {
      countValue.set(100);
      const unsubscribe = countValue.on("change", (latest) => {
        setDisplayCount(Math.floor(latest));
      });
      return () => unsubscribe();
    }
  }, [isInView, countValue]);

  return (
    <div ref={ref} className="relative flex flex-col items-center justify-center my-4 select-none w-full max-w-md">
      {/* Sleek Minimalist Luxury Bento Card */}
      <div className="relative w-full bg-[#0E0E16] backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col shadow-2xl overflow-hidden group">
        
        {/* Subtle Background Grid Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40" />

        {/* Card Header Tag */}
        <div className="flex items-center justify-between w-full mb-8 relative z-10">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-mono tracking-widest text-white/70 font-semibold uppercase">
              PERFORMANCE ARCHITECTURE
            </span>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
            AUDIT VERIFIED
          </span>
        </div>

        {/* Massive Minimalist Numeric Counter */}
        <div className="flex items-baseline space-x-1 relative z-10 my-2">
          <span className="text-6xl sm:text-7xl font-bold font-mono tracking-tighter text-white">
            {displayCount}
          </span>
          <span className="text-3xl font-mono font-light text-emerald-400">
            %
          </span>
        </div>

        <p className="text-xs text-white/60 font-mono tracking-wide uppercase mt-1 mb-6 relative z-10">
          LIGHTHOUSE PERFORMANCE & OPTIMIZATION GUARANTEE
        </p>

        {/* Minimalist Precision Progress Bar */}
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden relative z-10 mb-6">
          <motion.div 
            className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-white rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${displayCount}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>

        {/* Clean Metrics Row */}
        <div className="grid grid-cols-3 gap-3 w-full relative z-10 pt-4 border-t border-white/10 text-center font-mono">
          <div>
            <div className="text-[9px] text-white/40 uppercase tracking-widest">PERFORMANCE</div>
            <div className="text-xs font-bold text-white mt-1">100 / 100</div>
          </div>
          <div>
            <div className="text-[9px] text-white/40 uppercase tracking-widest">STRUCTURED SEO</div>
            <div className="text-xs font-bold text-emerald-400 mt-1">100 / 100</div>
          </div>
          <div>
            <div className="text-[9px] text-white/40 uppercase tracking-widest">WEB Vitals</div>
            <div className="text-xs font-bold text-white mt-1">PASS</div>
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

