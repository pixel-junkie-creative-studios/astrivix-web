import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ParticleButton = ({ 
  children = "TRANSMIT PROJECT", 
  onClick, 
  className = "",
  variant = "primary"
}) => {
  const [particles, setParticles] = useState([]);

  const triggerParticles = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      angle: (i / 12) * 360,
      speed: Math.random() * 40 + 20,
      size: Math.random() * 4 + 2,
      color: i % 2 === 0 ? '#10b981' : '#ffffff'
    }));

    setParticles(prev => [...prev.slice(-24), ...newParticles]);

    if (onClick) onClick(e);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={triggerParticles}
      className={`relative overflow-hidden skeuo-button px-8 py-4 rounded-2xl text-xs font-black tracking-[0.2em] uppercase text-black shadow-[0_10px_30px_rgba(0,0,0,0.8)] active:scale-95 transition-all group border border-white/90 ${className}`}
    >
      {/* Particle Sparkle Emitted Elements */}
      <AnimatePresence>
        {particles.map(p => (
          <motion.span
            key={p.id}
            initial={{ opacity: 1, x: p.x, y: p.y, scale: 1 }}
            animate={{
              opacity: 0,
              x: p.x + Math.cos((p.angle * Math.PI) / 180) * p.speed,
              y: p.y + Math.sin((p.angle * Math.PI) / 180) * p.speed,
              scale: 0
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: p.color,
              pointerEvents: 'none',
              zIndex: 30
            }}
          />
        ))}
      </AnimatePresence>

      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

export default ParticleButton;
