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
    let lastTarget = null;
    const interactiveTags = new Set(['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT']);

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      const target = e.target;
      if (target && target !== lastTarget) {
        lastTarget = target;
        const isInteractive = interactiveTags.has(target.tagName) || 
          target.classList?.contains('interactive') || 
          !!target.closest('a, button, input, textarea, select, .interactive');
          
        if (isInteractive) {
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

    // Hyper-speed 240Hz ring interpolation (lerp = 0.75 for ultra-snappy instant response)
    const render = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.75;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.75;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }
      
      requestRef.current = requestAnimationFrame(render);
    };
    requestRef.current = requestAnimationFrame(render);

    // Scoped cursor override (avoids '*' wildcard style recalculation)
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.id = 'custom-cursor-scoped-style';
    style.innerHTML = `body, a, button, input, select, textarea, [role="button"], .interactive { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(requestRef.current);
      document.body.style.cursor = 'auto';
      const existingStyle = document.getElementById('custom-cursor-scoped-style');
      if (existingStyle) existingStyle.remove();
    };
  }, []);

  return (
    <>
      <style>{`
        .custom-cursor-ring {
          position: fixed;
          top: -12px;
          left: -12px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1.2px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.25);
          pointer-events: none;
          z-index: 99999;
          mix-blend-mode: difference;
          transition: transform 0.14s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.14s, background-color 0.14s;
          will-change: transform;
        }
        .custom-cursor-ring.hovering {
          transform: scale(1.8);
          background-color: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.95);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.35);
        }
        .custom-cursor-ring.clicking {
          width: 16px;
          height: 16px;
          top: -8px;
          left: -8px;
        }
        .custom-cursor-dot {
          position: fixed;
          top: -2.5px;
          left: -2.5px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #ffffff;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.9);
          pointer-events: none;
          z-index: 100000;
          mix-blend-mode: difference;
          transition: opacity 0.1s ease-out;
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

