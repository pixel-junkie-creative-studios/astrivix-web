import React, { useEffect, useRef } from 'react';

export default function TargetCursor() {
  const reticleRef = useRef(null);
  const dotRef = useRef(null);
  const labelRef = useRef(null);
  const requestRef = useRef(null);

  // Disable custom cursor on mobile / touch devices for maximum mobile performance
  if (typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches)) {
    return null;
  }

  // Refs for 240Hz+ mutable state bypassing React re-renders
  const mouse = useRef({ x: -100, y: -100 });
  const reticle = useRef({ x: -100, y: -100 });

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
          if (reticleRef.current) reticleRef.current.classList.add('target-locked');
          if (dotRef.current) dotRef.current.classList.add('target-locked');
          if (labelRef.current) labelRef.current.classList.add('target-locked');
        } else {
          if (reticleRef.current) reticleRef.current.classList.remove('target-locked');
          if (dotRef.current) dotRef.current.classList.remove('target-locked');
          if (labelRef.current) labelRef.current.classList.remove('target-locked');
        }
      }
    };

    const onMouseDown = () => {
      if (reticleRef.current) reticleRef.current.classList.add('target-click');
    };

    const onMouseUp = () => {
      if (reticleRef.current) reticleRef.current.classList.remove('target-click');
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });

    // Smooth lerp (0.65) for ultra-snappy 240Hz target tracking
    const render = () => {
      reticle.current.x += (mouse.current.x - reticle.current.x) * 0.65;
      reticle.current.y += (mouse.current.y - reticle.current.y) * 0.65;

      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${reticle.current.x}px, ${reticle.current.y}px, 0)`;
      }

      requestRef.current = requestAnimationFrame(render);
    };
    requestRef.current = requestAnimationFrame(render);

    // Scoped cursor override
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.id = 'target-cursor-scoped-style';
    style.innerHTML = `body, a, button, input, select, textarea, [role="button"], .interactive { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(requestRef.current);
      document.body.style.cursor = 'auto';
      const existingStyle = document.getElementById('target-cursor-scoped-style');
      if (existingStyle) existingStyle.remove();
    };
  }, []);

  return (
    <>
      <style>{`
        /* Target Reticle Outer Frame */
        .target-reticle {
          position: fixed;
          top: -22px;
          left: -22px;
          width: 44px;
          height: 44px;
          pointer-events: none;
          z-index: 99999;
          mix-blend-mode: difference;
          will-change: transform;
          transition: width 0.2s cubic-bezier(0.16, 1, 0.3, 1), 
                      height 0.2s cubic-bezier(0.16, 1, 0.3, 1), 
                      top 0.2s cubic-bezier(0.16, 1, 0.3, 1), 
                      left 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* 4 Corner Brackets (┌ ┐ └ ┘) */
        .target-corner {
          position: absolute;
          width: 10px;
          height: 10px;
          border-color: rgba(255, 255, 255, 0.95);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .target-corner-tl {
          top: 0;
          left: 0;
          border-top: 2px solid;
          border-left: 2px solid;
        }
        .target-corner-tr {
          top: 0;
          right: 0;
          border-top: 2px solid;
          border-right: 2px solid;
        }
        .target-corner-bl {
          bottom: 0;
          left: 0;
          border-bottom: 2px solid;
          border-left: 2px solid;
        }
        .target-corner-br {
          bottom: 0;
          right: 0;
          border-bottom: 2px solid;
          border-right: 2px solid;
        }

        /* Crosshair Tick Marks (+) */
        .target-tick {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.7);
          transition: all 0.2s ease-out;
        }
        .target-tick-top { top: -6px; left: 50%; width: 1.5px; height: 5px; transform: translateX(-50%); }
        .target-tick-bottom { bottom: -6px; left: 50%; width: 1.5px; height: 5px; transform: translateX(-50%); }
        .target-tick-left { left: -6px; top: 50%; width: 5px; height: 1.5px; transform: translateY(-50%); }
        .target-tick-right { right: -6px; top: 50%; width: 5px; height: 1.5px; transform: translateY(-50%); }

        /* Laser Dot Core */
        .target-laser-dot {
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
          transition: transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.15s, opacity 0.15s;
          will-change: transform;
        }

        /* Target HUD Lock Status */
        .target-hud-label {
          position: absolute;
          top: 48px;
          left: 50%;
          transform: translateX(-50%);
          font-family: monospace;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: #ffffff;
          opacity: 0;
          white-space: nowrap;
          pointer-events: none;
          transition: opacity 0.2s ease-out, transform 0.2s ease-out;
        }

        /* Locked / Hovering State */
        .target-reticle.target-locked {
          top: -28px;
          left: -28px;
          width: 56px;
          height: 56px;
          transform: rotate(45deg) !important;
        }
        .target-reticle.target-locked .target-corner {
          width: 14px;
          height: 14px;
          border-color: #ffffff;
          filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.8));
        }
        .target-reticle.target-locked .target-tick {
          opacity: 0.3;
        }
        .target-laser-dot.target-locked {
          transform: scale(1.8) !important;
          background-color: #38bdf8;
          box-shadow: 0 0 15px #38bdf8;
        }
        .target-hud-label.target-locked {
          opacity: 0.9;
        }

        /* Click State */
        .target-reticle.target-click {
          top: -16px;
          left: -16px;
          width: 32px;
          height: 32px;
        }
        .target-reticle.target-click .target-corner {
          width: 8px;
          height: 8px;
        }
      `}</style>

      {/* Target Reticle Outer Bracket System */}
      <div ref={reticleRef} className="target-reticle">
        <div className="target-corner target-corner-tl" />
        <div className="target-corner target-corner-tr" />
        <div className="target-corner target-corner-bl" />
        <div className="target-corner target-corner-br" />
        
        <div className="target-tick target-tick-top" />
        <div className="target-tick target-tick-bottom" />
        <div className="target-tick target-tick-left" />
        <div className="target-tick target-tick-right" />

        <div ref={labelRef} className="target-hud-label">
          [TARGET_LOCKED]
        </div>
      </div>

      {/* Laser Precision Dot Core */}
      <div ref={dotRef} className="target-laser-dot" />
    </>
  );
}

