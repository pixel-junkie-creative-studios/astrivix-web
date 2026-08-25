import React, { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Default mouse to center of screen
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    // Track target mouse position for smooth interpolation
    let targetMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Create 300 stars with varying depth (z)
    const stars = Array.from({ length: 300 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 3 + 0.5,
      baseAlpha: Math.random() * 0.6 + 0.2,
      phase: Math.random() * Math.PI * 2
    }));

    const handleMouseMove = (e) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Smoothly interpolate mouse position for fluid parallax
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      stars.forEach((star) => {
        // Deeper parallax based on mouse
        const offsetX = (mouse.x - centerX) * (star.z * 0.025);
        const offsetY = (mouse.y - centerY) * (star.z * 0.025);
        
        let drawX = star.x - offsetX;
        let drawY = star.y - offsetY;
        
        // Wrap stars infinitely around the screen
        if (drawX < 0) drawX += canvas.width;
        if (drawX > canvas.width) drawX -= canvas.width;
        if (drawY < 0) drawY += canvas.height;
        if (drawY > canvas.height) drawY -= canvas.height;

        // Slow, elegant twinkle effect
        const twinkle = Math.sin(Date.now() * 0.0005 + star.phase) * 0.5;
        const alpha = Math.max(0, Math.min(1, star.baseAlpha + twinkle));

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.shadowBlur = star.z * 1.5;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        // Smaller stars (multiplied by 0.4 instead of 0.8)
        ctx.arc(drawX, drawY, star.z * 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset for next
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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-80" />;
}
