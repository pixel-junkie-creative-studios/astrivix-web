import React from 'react';
import { motion } from 'framer-motion';
import Lanyard from '../components/ui/Lanyard';

export default function Careers() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="py-12 sm:py-24 relative z-10 w-full min-h-screen flex items-center justify-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
          className="glass-metallic p-6 sm:p-10 md:p-12 rounded-[2.5rem] border border-white/30 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50" />
          {/* Left Column: Text */}
          <div className="relative z-10">
            <h1 className="text-xs sm:text-sm tracking-[0.4em] font-bold text-white/70 mb-4 uppercase border-b border-white/10 pb-3 inline-block">
              Careers
            </h1>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 tracking-tight uppercase leading-[0.95] text-white">
              Join <br /> Astrivix.
            </h2>
            <p className="text-white text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-sm font-medium">
              If you enjoy drinking 4 coffees a day, writing zero-lag code, and roasting 9-to-5 corporate slop, apply now. We don't do boring.
            </p>
            <a 
              href="#contact"
              className="inline-block skeuo-button text-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-[10px] sm:text-xs font-black tracking-widest uppercase shadow-xl active:scale-95 transition-transform"
            >
              JOIN THE REBELLION →
            </a>
          </div>

          {/* Right Column: 3D Lanyard (Liquid Glass Box) */}
          <div className="relative h-[260px] sm:h-[320px] lg:h-[420px] w-full flex justify-center items-center z-10 overflow-hidden rounded-3xl border border-white/30 glass-metallic gpu-layer shadow-2xl">
            <Lanyard position={[0, 2, 24]} gravity={[0, -40, 0]} transparent={true} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
