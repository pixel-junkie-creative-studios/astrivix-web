import React, { useEffect, useRef } from 'react';

export default function MagneticCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const requestRef = useRef(null);

  // Disable custom cursor on mobile / touch devices for maximum mobile performance (120FPS)
  if (typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches)) {
    return null;
  }

  // Mutable refs for 240Hz+ state bypassing React re-renders completely
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
        const isInteractive =
          interactiveTags.has(target.tagName) ||
          target.classList?.contains('interactive') ||
          !!target.closest('a, button, input, textarea, select, .interactive, [role="button"]');

        if (isInteractive) {
          if (ringRef.current) ringRef.current.classList.add('cursor-hover');
          if (dotRef.current) dotRef.current.classList.add('cursor-hover');
        } else {
          if (ringRef.current) ringRef.current.classList.remove('cursor-hover');
          if (dotRef.current) dotRef.current.classList.remove('cursor-hover');
        }
      }
    };

    const onMouseDown = () => {
      if (ringRef.current) ringRef.current.classList.add('cursor-click');
      if (dotRef.current) dotRef.current.classList.add('cursor-click');
    };

    const onMouseUp = () => {
      if (ringRef.current) ringRef.current.classList.remove('cursor-click');
      if (dotRef.current) dotRef.current.classList.remove('cursor-click');
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });

    // Buttery smooth lerp (0.22) for luxury agency spring inertia
    const render = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.22;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }

      requestRef.current = requestAnimationFrame(render);
    };
    requestRef.current = requestAnimationFrame(render);

    // Scoped cursor override for clean hardware hide
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.id = 'magnetic-cursor-scoped-style';
    style.innerHTML = `body, a, button, input, select, textarea, [role="button"], .interactive { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(requestRef.current);
      document.body.style.cursor = 'auto';
      const existingStyle = document.getElementById('magnetic-cursor-scoped-style');
      if (existingStyle) existingStyle.remove();
    };
  }, []);

  return (
    <>
      <style>{`
        /* Outer Fluid Glass Aura Ring */
        .magnetic-cursor-ring {
          position: fixed;
          top: -18px;
          left: -18px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.85);
          box-shadow: 0 0 16px rgba(255, 255, 255, 0.2);
          pointer-events: none;
          z-index: 99999;
          mix-blend-mode: difference;
          will-change: transform;
          transition: width 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                      height 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                      top 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                      left 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.22s ease-out,
                      border-color 0.22s ease-out,
                      box-shadow 0.22s ease-out;
        }

        /* Inner Precision Core Dot */
        .magnetic-cursor-dot {
          position: fixed;
          top: -3px;
          left: -3px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #ffffff;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.9);
          pointer-events: none;
          z-index: 100000;
          mix-blend-mode: difference;
          transition: width 0.15s ease-out, height 0.15s ease-out, top 0.15s ease-out, left 0.15s ease-out, opacity 0.15s ease-out;
        }

        /* Hovering State */
        .magnetic-cursor-ring.cursor-hover {
          top: -28px;
          left: -28px;
          width: 56px;
          height: 56px;
          background-color: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.95);
          box-shadow: 0 0 25px rgba(255, 255, 255, 0.35);
        }
        .magnetic-cursor-dot.cursor-hover {
          opacity: 0.5;
          width: 8px;
          height: 8px;
          top: -4px;
          left: -4px;
        }

        /* Clicking State */
        .magnetic-cursor-ring.cursor-click {
          top: -12px;
          left: -12px;
          width: 24px;
          height: 24px;
          border-color: #ffffff;
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.6);
        }
        .magnetic-cursor-dot.cursor-click {
          opacity: 0.8;
          width: 4px;
          height: 4px;
          top: -2px;
          left: -2px;
        }
      `}</style>

      <div ref={ringRef} className="magnetic-cursor-ring" />
      <div ref={dotRef} className="magnetic-cursor-dot" />
    </>
  );
}

