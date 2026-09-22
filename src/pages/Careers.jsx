import React from 'react';
import { motion } from 'framer-motion';
import Lanyard from '../components/ui/Lanyard';

export default function Careers() {
  const [showLanyard, setShowLanyard] = React.useState(false);

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
            <span className="text-xs sm:text-sm tracking-[0.4em] font-bold text-white/70 mb-4 uppercase border-b border-white/10 pb-3 inline-block font-mono">
              // CAREERS & INTERNSHIPS
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 tracking-tight uppercase leading-[0.95] text-white font-display">
              JOIN ASTRIVIX.
            </h1>
            <p className="text-white text-sm sm:text-base leading-relaxed mb-6 max-w-md font-medium">
              We are seeking elite software engineers, brand designers, and digital strategists driven by craftsmanship, speed, and continuous innovation.
            </p>

            {/* ACCEPTING INTERNS ELIGIBILITY BOX */}
            <div className="bg-[#050508]/90 border border-white/15 p-5 rounded-2xl mb-8 backdrop-blur-md shadow-inner max-w-md">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                  ACTIVE INTERNSHIP PROGRAM
                </span>
              </div>
              <p className="text-xs text-white/90 leading-relaxed font-sans mb-3 font-semibold">
                Accepting Internship Applications Across All Undergraduate & Postgraduate Disciplines:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-white/80">
                <div className="bg-white/5 border border-white/10 px-3 py-2 rounded-lg">
                  <span className="text-cyan-400 font-bold block mb-0.5">BACHELORS</span>
                  <span>B.Tech, BBA, B.Com, BCA, BSc IT & CS</span>
                </div>
                <div className="bg-white/5 border border-white/10 px-3 py-2 rounded-lg">
                  <span className="text-purple-400 font-bold block mb-0.5">MASTERS</span>
                  <span>MBA, MCA, M.Com, MSc IT & Tech Studies</span>
                </div>
              </div>
            </div>

            <a 
              href="#contact"
              className="inline-block skeuo-button text-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-[10px] sm:text-xs font-black tracking-widest uppercase shadow-xl active:scale-95 transition-transform"
            >
              APPLY NOW FOR INTERNSHIP / FULL-TIME →
            </a>
          </div>

          {/* Right Column: 3D Lanyard (Liquid Glass Box) */}
          <div className="relative h-[280px] sm:h-[340px] lg:h-[420px] w-full flex justify-center items-center z-10 overflow-hidden rounded-3xl border border-white/30 glass-metallic gpu-layer shadow-2xl p-2">
            <Lanyard position={[0, 1.5, 32]} gravity={[0, -40, 0]} transparent={true} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
