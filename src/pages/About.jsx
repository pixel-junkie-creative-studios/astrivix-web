import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

function Counter100() {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  useEffect(() => {
    if (isInView) {
      const end = 100;
      const duration = 1400;
      let startTime = null;

      const animateCount = (now) => {
        if (!startTime) startTime = now;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeProgress * end));

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };

      requestAnimationFrame(animateCount);
    }
  }, [isInView]);

  return (
    <div ref={ref} className="relative flex flex-col items-center justify-center my-4">
      <div className="text-6xl sm:text-7xl font-black font-display tracking-tighter text-white drop-shadow-md flex items-baseline justify-center">
        <span>{count}</span>
        <span className="text-2xl sm:text-3xl text-emerald-400 font-mono ml-1">%</span>
      </div>
      <div className="w-12 h-[2px] bg-emerald-400/80 my-3 rounded-full" />
      <span className="text-[10px] font-mono tracking-[0.25em] text-white/70 uppercase font-bold">
        PERFORMANCE & CODE METRIC
      </span>
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

