import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function MagneticCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTextHover, setIsTextHover] = useState(false);
  
  // Spring physics for the outer ring (fast, liquid trailing)
  const cursorX = useSpring(0, { stiffness: 1200, damping: 30, mass: 0.1 });
  const cursorY = useSpring(0, { stiffness: 1200, damping: 30, mass: 0.1 });
  
  // Spring physics for the inner dot (instantaneous 1000hz tracking)
  const dotX = useSpring(0, { stiffness: 3000, damping: 20, mass: 0.01 });
  const dotY = useSpring(0, { stiffness: 3000, damping: 20, mass: 0.01 });

  useEffect(() => {
    const mouseMove = (e) => {
      // Outer ring centered (40px / 2 = 20)
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);
      // Inner dot centered (8px / 2 = 4)
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);

      // Ultra-fast hover detection (No DOM Reflows/Layout Thrashing)
      const target = e.target;
      if (!target) {
        setIsHovering(false);
        setIsTextHover(false);
        return;
      }

      if (target.closest('input, textarea') || target.style?.cursor === 'text') {
        setIsTextHover(true);
        setIsHovering(false);
      } else if (
        target.closest('a, button, .interactive') ||
        target.style?.cursor === 'pointer' ||
        target.style?.cursor === 'grab'
      ) {
        setIsHovering(true);
        setIsTextHover(false);
      } else {
        setIsHovering(false);
        setIsTextHover(false);
      }
    };

    const mouseDown = () => setIsClicking(true);
    const mouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', mouseMove, { passive: true });
    window.addEventListener('mousedown', mouseDown, { passive: true });
    window.addEventListener('mouseup', mouseUp, { passive: true });

    // Hide system cursor globally
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(styleTag);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
      document.head.removeChild(styleTag);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  return (
    <>
      {/* Outer Reactive Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] rounded-full border border-white/40 bg-white/5 flex items-center justify-center shadow-sm"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isClicking ? 0.8 : isTextHover ? 0.5 : 1,
          backgroundColor: isHovering ? "rgba(255,255,255,0.2)" : isTextHover ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.05)",
          borderWidth: isHovering || isTextHover ? "0px" : "1px"
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
      
      {/* Inner Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[10000] rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          scale: (isHovering || isTextHover) ? 0 : isClicking ? 0.5 : 1,
          opacity: (isHovering || isTextHover) ? 0 : 1
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}
