import React from 'react';
import { motion } from 'framer-motion';
import Lanyard from '../components/ui/Lanyard';

export default function Careers() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="py-24 relative z-10 w-full min-h-screen flex items-center justify-center">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 w-full">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="bg-white/5 backdrop-blur-xl shadow-liquid-glass p-8 md:p-12 rounded-[2.5rem] border-t border-l border-white/20 border-b border-r border-black/80 relative overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50" />
          {/* Left Column: Text */}
          <div className="relative z-10">
            <h1 className="text-sm tracking-[0.5em] font-bold text-ax-text/40 mb-8 uppercase border-b border-ax-text/10 pb-4 inline-block">
              Careers
            </h1>
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-[0.9]">
              Join <br /> Astrivix.
            </h2>
            <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8 max-w-sm font-medium">
              We are looking for the absolute best. We provide elite training, internships, and certifications for engineers and designers who refuse to compromise on quality. 
            </p>
            <a 
              href="#contact"
              className="inline-block bg-white text-black px-8 py-4 rounded-none text-[10px] md:text-xs font-black tracking-widest uppercase shadow-[4px_4px_10px_rgba(0,0,0,0.5),inset_2px_2px_4px_rgba(255,255,255,0.8)] hover:translate-y-1 hover:shadow-[2px_2px_5px_rgba(0,0,0,0.5),inset_1px_1px_2px_rgba(255,255,255,0.8)] transition-all duration-200"
            >
              Apply Now
            </a>
          </div>

          {/* Right Column: 3D Lanyard (Compact Metallic Glass Container) */}
          <div className="relative h-[220px] sm:h-[280px] lg:h-[450px] w-full flex justify-center items-center z-10 overflow-hidden rounded-3xl border border-white/20 border-t-white/40 glass-metallic gpu-layer shadow-2xl">
            <Lanyard position={[0, 2, 24]} gravity={[0, -40, 0]} transparent={true} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
