import React, { useEffect, useRef } from 'react';

export default function MagneticCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const requestRef = useRef(null);

  // Use refs for mutable state to completely bypass React re-renders (ZERO LAG)
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Force instant update of the dot
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

    // Smooth trailing animation loop for the outer ring using raw GPU acceleration
    const render = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.2;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.2;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }
      
      requestRef.current = requestAnimationFrame(render);
    };
    requestRef.current = requestAnimationFrame(render);

    // Hide system cursor globally
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
          top: -16px;
          left: -16px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.8);
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
          transition: width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), top 0.2s cubic-bezier(0.16, 1, 0.3, 1), left 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s;
          will-change: transform;
        }
        .custom-cursor-ring.hovering {
          width: 56px;
          height: 56px;
          top: -28px;
          left: -28px;
          background-color: rgba(255, 255, 255, 0.15);
          border-color: transparent;
        }
        .custom-cursor-ring.clicking {
          width: 20px;
          height: 20px;
          top: -10px;
          left: -10px;
        }
        .custom-cursor-dot {
          position: fixed;
          top: -4px;
          left: -4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: white;
          pointer-events: none;
          z-index: 10000;
          mix-blend-mode: difference;
          transition: opacity 0.2s, transform 0.1s;
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
