import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const { active, progress } = useProgress();
  const [show, setShow] = useState(true);
  const roundedProgress = Math.round(progress);

  useEffect(() => {
    // Safety max timeout: guarantee preloader screen closes in 1400ms max under all network conditions
    const maxTimer = setTimeout(() => {
      setShow(false);
    }, 1400);

    // When progress hits 100%, wait a tiny bit, then trigger the out-animation
    if (progress === 100 || !active) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 500);
      return () => {
        clearTimeout(timer);
        clearTimeout(maxTimer);
      };
    }

    return () => clearTimeout(maxTimer);
  }, [progress, active]);

  const getStatusMessage = (p) => {
    if (p < 30) return "INITIALIZING SHADER CORE";
    if (p < 70) return "COMPOSITING 3D ASSETS";
    if (p < 100) return "OPTIMIZING RENDER PIPELINE";
    return "SYSTEM 100% READY";
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed top-0 left-0 w-full h-[100dvh] z-[99999] flex flex-col items-center justify-center bg-[#050508] text-white overflow-hidden select-none"
        >
          {/* Ambient Glowing Background Orb */}
          <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-purple-600/10 via-cyan-500/10 to-emerald-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
          
          {/* Aesthetic Noise Texture for Preloader */}
          <div className="absolute inset-0 pointer-events-none opacity-15 mix-blend-screen bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />
          
          <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-8">
            {/* Logo Badge */}
            <div className="relative mb-10 flex items-center justify-center">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-24 h-24 rounded-2xl border border-white/20 flex items-center justify-center bg-[#08080E] overflow-hidden shadow-2xl relative"
              >
                <img 
                  src="/astrivix-logo-sq.png" 
                  alt="Astrivix Corp Logo"
                  className="w-full h-full object-contain p-2 rounded-xl"
                />
              </motion.div>
            </div>

            {/* Clean Progress Bar Container */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-4 relative">
              <motion.div 
                className="h-full bg-white relative"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </div>

            {/* Minimal Agency Footer */}
            <div className="flex justify-between items-center w-full text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase font-semibold">
              <span>ASTRIVIX CORP</span>
              <span className="font-bold text-white text-xs">
                {roundedProgress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

