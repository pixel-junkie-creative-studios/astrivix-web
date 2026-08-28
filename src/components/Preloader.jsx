import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  const [show, setShow] = useState(true);

  useEffect(() => {
    // When progress hits 100%, wait a tiny bit, then trigger the out-animation
    if (progress === 100 || !active) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 500); // 500ms delay for a smooth cinematic transition
      return () => clearTimeout(timer);
    } else {
      setShow(true);
    }
  }, [progress, active]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed top-0 left-0 w-full h-[100dvh] z-[99999] flex flex-col items-center justify-center bg-[#050505] text-white"
        >
          {/* Aesthetic Background for Preloader */}
          <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>
          
          <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-8">
            {/* Logo placeholder / Icon */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-24 h-24 rounded-full border border-white/10 mb-8 flex items-center justify-center bg-black/50 backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.3)]"
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

            {/* Progress Bar Container */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-4">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-600 to-blue-500"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </div>

            {/* Status Text */}
            <div className="flex justify-between w-full text-xs font-mono tracking-widest text-white/50 uppercase">
              <span>Bribing the servers...</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
