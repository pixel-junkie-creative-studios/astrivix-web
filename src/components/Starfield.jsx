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

    // Create 1200 high-density stars with varying depth, size, brightness, and colors
    const stars = Array.from({ length: 1200 }).map(() => {
      const z = Math.random() * 3.5 + 0.5;
      const isBright = Math.random() > 0.82;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: z,
        size: isBright ? z * 0.9 + 0.6 : z * 0.5 + 0.3,
        baseAlpha: isBright ? Math.random() * 0.5 + 0.5 : Math.random() * 0.4 + 0.35,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.0015 + 0.0005,
        color: isBright 
          ? (Math.random() > 0.5 ? '255, 255, 255' : (Math.random() > 0.5 ? '210, 230, 255' : '255, 245, 230')) 
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
        const offsetX = (mouse.x - centerX) * (star.z * 0.02);
        const offsetY = (mouse.y - centerY) * (star.z * 0.02);
        
        let drawX = star.x - offsetX;
        let drawY = star.y - offsetY;
        
        if (drawX < 0) drawX += canvas.width;
        if (drawX > canvas.width) drawX -= canvas.width;
        if (drawY < 0) drawY += canvas.height;
        if (drawY > canvas.height) drawY -= canvas.height;

        const twinkle = Math.sin(Date.now() * star.speed + star.phase) * 0.35;
        const alpha = Math.max(0.15, Math.min(1, star.baseAlpha + twinkle));

        ctx.fillStyle = `rgba(${star.color}, ${alpha})`;
        if (star.size > 1.2) {
          ctx.shadowBlur = star.z * 2.5;
          ctx.shadowColor = `rgba(${star.color}, 0.85)`;
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
