import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  { id: '01', title: 'Branding & Identity', category: 'Strategy & Identity', color: '#2563eb', desc: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.' },
  { id: '02', title: 'Publishing Excellence', category: 'Creative & Editorial', color: '#1d4ed8', desc: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.' },
  { id: '03', title: 'Ad Campaigns & Marketing', category: 'Growth & Outreach', color: '#2563eb', desc: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.' },
  { id: '04', title: 'Graphic & Visual Communication', category: 'Visual Identity', color: '#1e40af', desc: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.' },
  { id: '05', title: 'Enterprise Web Dev', category: 'Engineering & Scale', color: '#2563eb', desc: 'Building robust, scalable, and high-performance web applications tailored to modern digital ecosystems.' },
  { id: '06', title: 'Mobile App Engineering', category: 'Native & PWA', color: '#1d4ed8', desc: 'Designing seamless mobile experiences for iOS and Android platforms with fluid motion and top performance.' },
  { id: '07', title: 'Conversion Optimization', category: 'UX/UI & Analytics', color: '#2563eb', desc: 'Turning visitors into loyal customers through expert UX/UI methodologies and data-driven design.' },
  { id: '08', title: 'Motion & Video Production', category: 'Creative Production', color: '#1e40af', desc: 'Bringing brand stories to life with cinematic video production, 3D motion graphics, and visual effects.' }
];

export default function Services() {
  const [[page, direction], setPage] = useState([0, 0]);

  const activeIndex = (page % services.length + services.length) % services.length;
  const prevIndex = (activeIndex - 1 + services.length) % services.length;
  const nextIndex = (activeIndex + 1) % services.length;

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const activeService = services[activeIndex];
  const prevService = services[prevIndex];
  const nextService = services[nextIndex];

  // 3D Card Flip Variants
  const cardVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      rotateY: dir > 0 ? 45 : -45,
      scale: 0.85,
      opacity: 0,
    }),
    center: {
      zIndex: 20,
      x: 0,
      rotateY: 0,
      scale: 1,
      opacity: 1,
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir < 0 ? 300 : -300,
      rotateY: dir < 0 ? 45 : -45,
      scale: 0.85,
      opacity: 0,
    }),
  };

  return (
    <div id="services" className="relative z-10 w-full bg-transparent pt-24 pb-32 min-h-screen overflow-hidden flex flex-col items-center justify-center">
      
      {/* Header section */}
      <div className="text-center mb-10 md:mb-16 z-20">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-2">
          What We Do
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mt-3 shadow-[0_0_15px_rgba(37,99,235,0.8)]" />
      </div>

      {/* 3D Card Deck Carousel Stage */}
      <div 
        className="relative w-full max-w-6xl mx-auto px-4 flex items-center justify-center min-h-[460px] md:min-h-[520px]"
        style={{ perspective: '1200px' }}
      >
        {/* LEFT PEEK CARD */}
        <div 
          onClick={() => paginate(-1)}
          className="hidden sm:flex absolute left-4 lg:left-12 z-10 w-[240px] md:w-[300px] h-[360px] md:h-[420px] rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-950 p-6 flex-col justify-between cursor-pointer opacity-50 hover:opacity-80 transition-all duration-300 transform -rotate-y-12 scale-90 border border-white/10 shadow-2xl"
          style={{ transform: 'rotateY(25deg) translateZ(-60px)' }}
        >
          <div className="text-6xl md:text-8xl font-black text-white/90">
            {prevService.id}
          </div>
          <div className="text-xl md:text-2xl font-bold text-white/80 line-clamp-2">
            {prevService.title}
          </div>
        </div>

        {/* ACTIVE CENTER CARD WITH 3D FLIP */}
        <div className="relative z-20 w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] h-[440px] md:h-[480px]">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={page}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="absolute inset-0 w-full h-full rounded-[2.5rem] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-950 p-8 md:p-10 flex flex-col justify-between border border-white/20 shadow-[0_20px_60px_rgba(29,78,216,0.45)] backdrop-blur-xl overflow-hidden"
            >
              {/* Card Header: Number or Title */}
              <div className="flex justify-between items-start w-full">
                <div className="text-5xl md:text-6xl font-black text-white/90 tracking-tighter">
                  {activeService.id}
                </div>
                <div className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white/70 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                  {activeService.category}
                </div>
              </div>

              {/* Card Body: Main Title & Description */}
              <div className="my-auto pt-4">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.05] mb-4 drop-shadow-md">
                  {activeService.title}
                </h3>
                <p className="text-white/80 text-sm md:text-base leading-relaxed line-clamp-4 font-normal">
                  {activeService.desc}
                </p>
              </div>

              {/* Card Footer: Interactive Flip Trigger Button */}
              <div className="flex justify-between items-center w-full pt-4 border-t border-white/10">
                <div className="flex gap-1.5">
                  {services.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/30'}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => paginate(1)}
                  className="relative group flex items-center gap-2 bg-blue-500/80 hover:bg-blue-400 text-white font-bold text-xs md:text-sm uppercase tracking-wider px-5 py-3 rounded-full border border-white/30 shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:shadow-[0_0_30px_rgba(59,130,246,0.9)] transition-all duration-300 active:scale-95"
                >
                  <span>Click here</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT PEEK CARD */}
        <div 
          onClick={() => paginate(1)}
          className="hidden sm:flex absolute right-4 lg:right-12 z-10 w-[240px] md:w-[300px] h-[360px] md:h-[420px] rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-950 p-6 flex-col justify-between cursor-pointer opacity-50 hover:opacity-80 transition-all duration-300 transform rotate-y-12 scale-90 border border-white/10 shadow-2xl"
          style={{ transform: 'rotateY(-25deg) translateZ(-60px)' }}
        >
          <div className="text-sm font-bold tracking-widest text-white/50 uppercase">
            Next Up
          </div>
          <div className="text-xl md:text-2xl font-bold text-white/80 line-clamp-2">
            {nextService.title}
          </div>
        </div>
      </div>

      {/* Mobile Controls */}
      <div className="flex sm:hidden items-center justify-center gap-6 mt-8 z-30">
        <button
          onClick={() => paginate(-1)}
          className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white active:scale-95"
        >
          ←
        </button>
        <span className="text-sm font-mono font-bold text-white/60">
          {activeIndex + 1} / {services.length}
        </span>
        <button
          onClick={() => paginate(1)}
          className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white active:scale-95"
        >
          →
        </button>
      </div>

    </div>
  );
}

