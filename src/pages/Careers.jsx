import React from 'react';
import { motion } from 'framer-motion';
import Lanyard from '../components/ui/Lanyard';

export default function Careers() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div id="careers" className="py-12 sm:py-24 relative z-10 w-full min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
          className="glass-metallic p-6 sm:p-10 md:p-12 rounded-[2.5rem] border border-white/30 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50" />
          
          {/* Left Column: Text & CTA */}
          <div className="relative z-10 lg:col-span-5 flex flex-col justify-center">
            <h1 className="text-xs sm:text-sm tracking-[0.4em] font-bold text-white/70 mb-4 uppercase border-b border-white/10 pb-3 inline-block">
              Careers & Culture
            </h1>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 tracking-tight uppercase leading-[0.95] text-white">
              Join <br /> Astrivix.
            </h2>
            <p className="text-white text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 font-medium">
              We look for exceptional engineers, designers, and strategists passionate about product craftsmanship, web performance, and brand architecture.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <a 
                href="#contact"
                className="inline-block skeuo-button text-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-[10px] sm:text-xs font-black tracking-widest uppercase shadow-xl active:scale-95 transition-transform"
              >
                EXPLORE OPPORTUNITIES →
              </a>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                [Drag lanyard tag to test physics]
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Centered R3F Physics Lanyard */}
          <div className="relative w-full lg:col-span-7 flex justify-center items-center h-[460px] sm:h-[520px] md:h-[580px] rounded-3xl overflow-hidden bg-black/30 border border-white/10">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/5 via-transparent to-transparent z-10" />
            <Lanyard lanyardWidth={2.2} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
