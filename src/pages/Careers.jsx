import React from 'react';
import { motion } from 'framer-motion';

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
              We look for exceptional engineers, designers, and strategists passionate about product craftsmanship, web performance, and brand architecture.
            </p>
            <a 
              href="#contact"
              className="inline-block skeuo-button text-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-[10px] sm:text-xs font-black tracking-widest uppercase shadow-xl active:scale-95 transition-transform"
            >
              EXPLORE OPPORTUNITIES →
            </a>
          </div>

          {/* Right Column: Interactive Executive Pass Card */}
          <div className="relative w-full flex justify-center items-center py-4">
            <motion.div 
              whileHover={{ scale: 1.03, rotateY: 6, rotateX: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[1/1.45] glass-metallic rounded-[2rem] p-6 border border-white/40 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden group cursor-pointer"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-white to-blue-500" />
              <div className="absolute -right-12 -top-12 w-36 h-36 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform pointer-events-none" />

              {/* Top Pass Header */}
              <div className="flex items-center justify-between border-b border-white/15 pb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,1)]" />
                  <span className="text-[10px] font-mono font-bold tracking-widest text-white/90 uppercase">AST.PERMIT #2026</span>
                </div>
                <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full uppercase">VERIFIED</span>
              </div>

              {/* Center Hologram Branding */}
              <div className="my-auto flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 border border-white/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-2xl backdrop-blur-md">
                  <span className="text-2xl sm:text-3xl font-black text-white">★</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase drop-shadow-md">ASTRIVIX CORP.</h3>
                <p className="text-[10px] font-mono tracking-[0.25em] text-white/70 uppercase mt-1 font-semibold">CREATIVE & TECH STUDIO</p>
              </div>

              {/* Bottom Bar */}
              <div className="border-t border-white/15 pt-3 flex items-center justify-between text-[9px] font-mono text-white/70 relative z-10">
                <span className="font-semibold">GLOBAL PASS // 2026</span>
                <span className="text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">APPLY NOW →</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
