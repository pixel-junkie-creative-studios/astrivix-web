import React from 'react';
import { motion } from 'framer-motion';

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
      opacity: 1, y: 0, scale: 1, 
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div id="about" className="py-16 sm:py-24 md:py-32 relative z-10 w-full min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-14"
        >
          <div className="flex items-center gap-4 sm:gap-6 mb-2">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white drop-shadow-lg">
              About Us.
            </h1>
            <div className="flex-grow h-[2px] bg-gradient-to-r from-white/40 via-white/20 to-transparent mt-2"></div>
          </div>
          <p className="text-xs sm:text-sm font-mono tracking-widest text-white/90 uppercase font-semibold">
            Engineering High-Performance Digital Experiences
          </p>
        </motion.div>

        {/* Bento Grid Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
        >
          
          {/* Cell 1: Main Headline (Spans 2 columns on desktop) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.01, y: -3 }}
            className="md:col-span-2 glass-metallic gpu-layer rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 flex flex-col justify-center border border-white/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden group"
          >
            {/* Skeuomorphic Screws */}
            <div className="absolute top-4 left-4 skeuo-screw opacity-60" />
            <div className="absolute top-4 right-4 skeuo-screw opacity-60" />
            <div className="absolute bottom-4 left-4 skeuo-screw opacity-60" />
            <div className="absolute bottom-4 right-4 skeuo-screw opacity-60" />

            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-black leading-tight tracking-tight text-white z-10">
              We build digital experiences <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-100 to-gray-300">
                that make people stop, stare, and smile.
              </span>
            </h2>
          </motion.div>

          {/* Cell 2: Visual Stat (Spans 1 column) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -3 }}
            className="glass-fast gpu-layer rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 flex flex-col items-center justify-center border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden group min-h-[160px] sm:min-h-[220px]"
          >
            <div className="absolute w-28 h-28 bg-white/15 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-500" />
            <div className="relative z-10 text-center">
              <span className="text-5xl sm:text-7xl font-black tracking-tighter text-white drop-shadow-md block mb-1">100%</span>
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-white">Dark Magic & Dev Tears</span>
            </div>
          </motion.div>

          {/* Cell 3: Vision Statement */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.01, y: -3 }}
            className="glass-fast gpu-layer rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 flex flex-col justify-between border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 border border-white/30 flex items-center justify-center mb-4 sm:mb-6 flex-shrink-0">
              <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,1)]" />
            </div>
            
            <p className="text-base sm:text-lg md:text-xl text-white font-medium relative z-10 leading-relaxed">
              Your business shouldn't blend into the background. We craft memorable, lightning-fast sites that get you noticed, loved, and hired.
            </p>
          </motion.div>

          {/* Cell 4: Innovation Statement (Spans 2 columns on desktop) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.01, y: -3 }}
            className="md:col-span-2 glass-fast gpu-layer rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 flex flex-col justify-center border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden"
          >
            <h3 className="text-xl sm:text-3xl md:text-4xl font-black mb-3 text-white tracking-tight">
              High energy, zero ego, relentless execution.
            </h3>
            <p className="text-sm sm:text-lg text-white/95 leading-relaxed font-normal max-w-3xl">
              Building your dream web platform or mobile app should be the most exciting part of growing your company. We bring creative energy, raw speed, and true passion to every build!
            </p>
          </motion.div>

          {/* Cell 5: Hilarious Copywriter Resignation Joke */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -3 }}
            className="md:col-span-3 glass-fast gpu-layer rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/15 bg-white/5 backdrop-blur-md flex items-center justify-between gap-4 text-xs font-mono"
          >
            <div className="flex items-center gap-3">
              <span className="text-base">⚠️</span>
              <span className="text-white/80">
                <strong className="text-white">FUN FACT:</strong> Our copywriter quit because the dumb guy got a job at a tiny media company. The dev team is writing the website copy now. Send help.
              </span>
            </div>
            <span className="text-[10px] tracking-widest text-white/40 uppercase font-bold shrink-0 hidden sm:inline">DEV TEAM MODE</span>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}

