import React, { useEffect, useRef } from 'react';

export default function MagneticCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const requestRef = useRef(null);

  // Disable custom cursor on mobile / touch devices for maximum mobile FPS
  if (typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches)) {
    return null;
  }

  // Use refs for mutable state to completely bypass React re-renders (ZERO LAG, 240Hz+)
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Hardware-instant 1-to-1 tracking for the inner dot
    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      const target = e.target;
      if (target) {
        if (target.closest('a, button, input, textarea, .interactive') || target.style?.cursor === 'pointer') {
          if (cursorRef.current) cursorRef.current.classList.add('hovering');
          if (dotRef.current) dotRef.current.classList.add('hovering');
        } else {
          if (cursorRef.current) cursorRef.current.classList.remove('hovering');
          if (dotRef.current) dotRef.current.classList.remove('hovering');
        }
      }
    };

    const onMouseDown = () => {
      if (cursorRef.current) cursorRef.current.classList.add('clicking');
    };
    
    const onMouseUp = () => {
      if (cursorRef.current) cursorRef.current.classList.remove('clicking');
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });

    // Hyper-speed 240Hz ring interpolation (lerp = 0.65 for ultra-snappy instant response)
    const render = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.65;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.65;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }
      
      requestRef.current = requestAnimationFrame(render);
    };
    requestRef.current = requestAnimationFrame(render);

    // Global cursor override
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(requestRef.current);
      document.body.style.cursor = 'auto';
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <style>{`
        .custom-cursor-ring {
          position: fixed;
          top: -18px;
          left: -18px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.85);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
          pointer-events: none;
          z-index: 99999;
          mix-blend-mode: difference;
          transition: width 0.15s cubic-bezier(0.16, 1, 0.3, 1), height 0.15s cubic-bezier(0.16, 1, 0.3, 1), top 0.15s cubic-bezier(0.16, 1, 0.3, 1), left 0.15s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.15s;
          will-change: transform;
        }
        .custom-cursor-ring.hovering {
          width: 64px;
          height: 64px;
          top: -32px;
          left: -32px;
          background-color: rgba(255, 255, 255, 0.18);
          border-color: rgba(255, 255, 255, 0.95);
          box-shadow: 0 0 25px rgba(255, 255, 255, 0.4);
        }
        .custom-cursor-ring.clicking {
          width: 22px;
          height: 22px;
          top: -11px;
          left: -11px;
        }
        .custom-cursor-dot {
          position: fixed;
          top: -4px;
          left: -4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #ffffff;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
          pointer-events: none;
          z-index: 100000;
          mix-blend-mode: difference;
          transition: opacity 0.12s ease-out;
          will-change: transform;
        }
        .custom-cursor-dot.hovering {
          opacity: 0;
        }
      `}</style>
      <div ref={cursorRef} className="custom-cursor-ring" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  );
}

