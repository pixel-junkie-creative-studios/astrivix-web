import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
      {/* Aesthetic Background */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(40,40,40,0.4),rgba(0,0,0,1))] mix-blend-screen" />
      
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-purple-500/20 mb-4">
          404
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Lost in Space</h2>
        <p className="text-lg md:text-xl text-white/50 mb-10 max-w-lg mx-auto">
          The page you are looking for has drifted beyond the observable universe. Let's get you back to mission control.
        </p>
        
        <Link 
          to="/"
          className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-black font-bold tracking-widest uppercase hover:scale-105 transition-transform duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
