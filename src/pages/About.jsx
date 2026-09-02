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
            className="md:col-span-2 glass-fast gpu-layer rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 flex flex-col justify-center border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-black leading-tight tracking-tight text-white z-10">
              We don't do 9-to-5. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-100 to-gray-300">
                We do caffeine, dark mode & total market domination.
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
              <span className="text-5xl sm:text-7xl font-black tracking-tighter text-white drop-shadow-md block mb-1">0%</span>
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-white">Canva & WordPress Slop</span>
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
              Your business deserves more than a $5 Upwork template that crashes on mobile. We build digital warheads that convert traffic into cash.
            </p>
          </motion.div>

          {/* Cell 4: Innovation Statement (Spans 2 columns on desktop) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.01, y: -3 }}
            className="md:col-span-2 glass-fast gpu-layer rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 flex flex-col justify-center border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden"
          >
            <h3 className="text-xl sm:text-3xl md:text-4xl font-black mb-3 text-white tracking-tight">
              We roast bad UX in code reviews for fun.
            </h3>
            <p className="text-sm sm:text-lg text-white/95 leading-relaxed font-normal max-w-3xl">
              While other agencies host 3-hour Zoom meetings to decide button gradients, we ship 120 FPS custom web apps that put your competitors out of business.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}

