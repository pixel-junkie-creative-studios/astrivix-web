import React, { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let targetMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Create 1500 smaller, ultra-sharp micro-stars with varying depth, brightness, and colors
    const stars = Array.from({ length: 1500 }).map(() => {
      const z = Math.random() * 3 + 0.5;
      const isBright = Math.random() > 0.8;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: z,
        size: isBright ? z * 0.35 + 0.3 : z * 0.2 + 0.1, // Micro-star sizing (0.2px to 1.1px)
        baseAlpha: isBright ? Math.random() * 0.4 + 0.5 : Math.random() * 0.3 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.003 + 0.0015, // Dynamic shine/dim frequency
        color: isBright 
          ? (Math.random() > 0.4 ? '255, 255, 255' : (Math.random() > 0.5 ? '200, 225, 255' : '255, 240, 210')) 
          : '255, 255, 255'
      };
    });

    const handleMouseMove = (e) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      stars.forEach((star) => {
        const offsetX = (mouse.x - centerX) * (star.z * 0.018);
        const offsetY = (mouse.y - centerY) * (star.z * 0.018);
        
        let drawX = star.x - offsetX;
        let drawY = star.y - offsetY;
        
        if (drawX < 0) drawX += canvas.width;
        if (drawX > canvas.width) drawX -= canvas.width;
        if (drawY < 0) drawY += canvas.height;
        if (drawY > canvas.height) drawY -= canvas.height;

        // Pronounced shine and dim pulsing physics
        const pulse = Math.sin(Date.now() * star.speed + star.phase);
        const alpha = Math.max(0.08, Math.min(0.95, star.baseAlpha + pulse * 0.45));

        ctx.fillStyle = `rgba(${star.color}, ${alpha})`;
        if (star.size > 0.8 && pulse > 0.2) {
          ctx.shadowBlur = star.z * 2;
          ctx.shadowColor = `rgba(${star.color}, ${alpha * 0.8})`;
        }
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none w-full h-full opacity-100" />;
}
