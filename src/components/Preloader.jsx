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
            {/* Logo Badge with Dual Futuristic Orbital HUD Rings */}
            <div className="relative mb-10 flex items-center justify-center">
              {/* Outer Counter-Rotating Ring */}
              <div className="absolute -inset-4 rounded-full border border-emerald-400/30 border-t-emerald-400 border-b-cyan-400 animate-[spin_5s_linear_infinite]" />
              
              {/* Middle Dashed Ring */}
              <div className="absolute -inset-2 rounded-full border border-dashed border-white/20 animate-[spin_10s_linear_infinite_reverse]" />

              <motion.div 
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center bg-[#08080E] overflow-hidden shadow-[0_0_40px_rgba(56,189,248,0.35)] relative"
              >
                <video 
                  src="/assets/astreivix_nav_bar.mp4"
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover mix-blend-screen scale-125"
                />
              </motion.div>
            </div>

            {/* Glowing Gradient Progress Bar Container */}
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-5 relative shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
              <motion.div 
                className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-500 shadow-[0_0_16px_rgba(56,189,248,0.9)] relative"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {/* Leading Edge Sparkle */}
                <div className="absolute top-0 right-0 w-2 h-full bg-white blur-[1px] shadow-[0_0_8px_#ffffff]" />
              </motion.div>
            </div>

            {/* Status Text & Dynamic 100% Counter */}
            <div className="flex justify-between items-center w-full text-[10px] font-mono tracking-[0.2em] text-white/60 uppercase">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>{getStatusMessage(roundedProgress)}</span>
              </div>
              <span className="font-bold text-white text-xs drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
                {roundedProgress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

