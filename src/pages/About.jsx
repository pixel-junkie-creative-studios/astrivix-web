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
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, y: 0, scale: 1, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div id="about" className="py-32 relative z-10 w-full min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-6 mb-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-[#e0e0e0] to-[#555] drop-shadow-[0_2px_20px_rgba(255,255,255,0.15)]">
              About Us.
            </h1>
            <div className="flex-grow h-[2px] bg-gradient-to-r from-white/20 via-white/5 to-transparent mt-4"></div>
          </div>
        </motion.div>

        {/* Bento Grid Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]"
        >
          
          {/* Cell 1: Main Headline (Spans 2 columns) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            className="md:col-span-2 bg-gradient-to-br from-[#111] to-[#050505] backdrop-blur-3xl rounded-[2.5rem] p-10 flex flex-col justify-center border-t border-l border-white/10 border-b border-r border-black/80 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.8)] hover:shadow-[inset_0_2px_20px_rgba(255,255,255,0.15),0_30px_60px_rgba(0,0,0,1)] transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Subtle light sweep on hover */}
            <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-45deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out"></div>

            <h2 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight text-white drop-shadow-2xl z-10">
              We engineer <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-300 to-gray-600 drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">digital perfection.</span>
            </h2>
          </motion.div>

          {/* Cell 2: Visual/Abstract (Spans 1 column) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-bl from-[#151515] to-[#050505] backdrop-blur-2xl rounded-[2.5rem] p-8 flex flex-col items-center justify-center border-t border-l border-white/10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.8)] hover:shadow-[inset_0_2px_20px_rgba(255,255,255,0.15),0_30px_60px_rgba(0,0,0,1)] relative overflow-hidden group transition-all duration-500"
          >
            {/* Glowing animated orb */}
            <div className="absolute w-32 h-32 bg-white/10 blur-2xl rounded-full group-hover:scale-150 group-hover:bg-white/20 transition-all duration-700 ease-out"></div>
            <div className="relative z-10 text-center">
              <span className="text-6xl md:text-7xl font-black tracking-tighter text-white drop-shadow-md mb-2 block">10x</span>
              <span className="text-sm uppercase tracking-[0.3em] font-bold text-white/80">Conversion Lift</span>
            </div>
          </motion.div>

          {/* Cell 3: Paragraph 1 (Spans 1 column) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-gradient-to-br from-[#222] via-[#111] to-[#050505] rounded-[2.5rem] p-8 flex flex-col justify-between border-t-2 border-l-2 border-white/20 border-b-[6px] border-r-[4px] border-black/90 shadow-[inset_0_6px_12px_rgba(255,255,255,0.15),inset_0_-6px_12px_rgba(0,0,0,0.8),0_20px_40px_rgba(0,0,0,0.9)] hover:shadow-[inset_0_6px_15px_rgba(255,255,255,0.25),inset_0_-6px_15px_rgba(0,0,0,1),0_30px_60px_rgba(0,0,0,1)] transition-all duration-500 group relative overflow-hidden"
          >
            {/* Skeuomorphic Glass/Metal Lens Indicator - Added flex-shrink-0 so it NEVER squishes into a pill shape! */}
            <div className="w-14 h-14 flex-shrink-0 rounded-full bg-gradient-to-br from-[#2a2a2a] to-[#0a0a0a] border border-[#444] shadow-[inset_0_4px_6px_rgba(255,255,255,0.2),_0_10px_20px_rgba(0,0,0,0.8)] flex items-center justify-center mb-6 relative overflow-hidden group-hover:shadow-[inset_0_4px_8px_rgba(255,255,255,0.3),_0_15px_30px_rgba(0,0,0,0.9)] transition-shadow duration-500">
              <div className="absolute inset-[4px] rounded-full bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] shadow-[inset_0_4px_10px_rgba(0,0,0,1)] flex items-center justify-center">
                <span className="w-3 h-3 bg-white rounded-full animate-pulse shadow-[0_0_15px_rgba(255,255,255,1),_inset_0_0_4px_rgba(255,255,255,1)]"></span>
              </div>
              {/* Glass Glare */}
              <div className="absolute top-1 left-2 w-8 h-4 bg-white/20 rounded-full blur-[1px] rotate-[-45deg] group-hover:bg-white/30 transition-colors"></div>
            </div>
            
            <p className="text-lg md:text-xl text-[#e0e0e0] drop-shadow-md leading-relaxed font-semibold relative z-10">
              We create digital designs that help brands move faster and convert better. Your business deserves more than just a website. It needs results.
            </p>
          </motion.div>

          {/* Cell 4: Paragraph 2 (Spans 2 columns) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            className="md:col-span-2 bg-gradient-to-br from-[#111] to-[#050505] backdrop-blur-3xl rounded-[2.5rem] p-8 flex flex-col justify-between border-t border-l border-white/10 border-b border-r border-black/80 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.8)] hover:shadow-[inset_0_2px_20px_rgba(255,255,255,0.15),0_30px_60px_rgba(0,0,0,1)] overflow-hidden relative group transition-all duration-500"
          >
            {/* Background pattern or subtle gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:scale-125 transition-transform duration-1000 ease-out"></div>
            
            <h3 className="text-2xl md:text-4xl font-black mb-4 text-white drop-shadow-md z-10">Discover the power of creative innovation.</h3>
            <p className="text-lg md:text-xl text-white/80 drop-shadow-sm leading-relaxed font-semibold max-w-3xl z-10">
              We transform ideas into stunning digital experiences that captivate and convert. Join our creative team and help build amazing digital experiences that make a difference.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
