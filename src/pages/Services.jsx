import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const services = [
  { id: '01', title: 'INTEGRATED BRANDING', category: 'Brand Architecture', color: '#F59E0B', desc: 'Custom brand identities, typography systems, and visual guidelines engineered to establish instant market authority.' },
  { id: '02', title: 'ENTERPRISE WEB DEV', category: 'High-Performance Web', color: '#10B981', desc: 'Custom web applications built with modern frontend frameworks, 3D WebGL physics, and clean architecture.' },
  { id: '03', title: 'MOBILE APP ENGINEERING', category: 'Native Mobile Apps', color: '#8B5CF6', desc: 'Native iOS and Android mobile platforms featuring fluid gesture physics, offline synchronization, and intuitive user experiences.' },
  { id: '04', title: 'DIGITAL MARKETING', category: 'Targeted Acquisition', color: '#F43F5E', desc: 'Data-driven performance campaigns, programmatic growth engines, and high-ROI client acquisition strategies.' },
  { id: '05', title: 'CONVERSION OPTIMIZATION', category: 'Frictionless Growth', color: '#06B6D4', desc: 'Rigorous user flow analysis, checkout optimization, and A/B testing designed to maximize customer lifetime value.' },
  { id: '06', title: 'GRAPHIC & UI/UX DESIGN', category: 'Executive Systems', color: '#EC4899', desc: 'Comprehensive design systems, liquid glass UI components, and accessible interfaces tailored for modern enterprises.' },
  { id: '07', title: 'MOTION & VIDEO PRODUCTION', category: 'Visual Storytelling', color: '#6366F1', desc: 'High-impact 3D animation, brand films, and motion graphics that capture attention and elevate your digital narrative.' },
  { id: '08', title: 'BUSINESS CONSULTING', category: 'Strategic Execution', color: '#14B8A6', desc: 'Streamlining operational workflows, eliminating process bottlenecks, and scaling enterprise delivery mechanisms.' },
  { id: '09', title: 'FINANCE CONSULTING', category: 'Capital Architecture', color: '#EAB308', desc: 'Financial modeling, revenue optimization, and capital allocation frameworks designed for sustainable enterprise expansion.' }
];

export default function Services() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const prevIndexRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newIndex = Math.min(
      services.length - 1,
      Math.floor(latest * services.length)
    );
    if (newIndex !== prevIndexRef.current) {
      setDirection(newIndex > prevIndexRef.current ? 1 : -1);
      prevIndexRef.current = newIndex;
      setActiveIndex(newIndex);
    }
  });

  const prevIndex = (activeIndex - 1 + services.length) % services.length;
  const nextIndex = (activeIndex + 1) % services.length;

  const activeService = services[activeIndex];
  const prevService = services[prevIndex];
  const nextService = services[nextIndex];

  // 3D Card Flip Spring Variants
  const cardVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 320 : -320,
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
      x: dir < 0 ? 320 : -320,
      rotateY: dir < 0 ? 45 : -45,
      scale: 0.85,
      opacity: 0,
    }),
  };

  return (
    <div id="services" ref={containerRef} className="relative z-10 w-full h-[450vh] md:h-[400vh] bg-transparent">
      {/* Native CSS Sticky Stage (Zero GSAP Pin Spacer Overhead) */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden pt-16 md:pt-20 pb-10">
        {/* Header section */}
        <div className="text-center mb-4 md:mb-8 z-30 pointer-events-none">
          <h2 className="text-xs tracking-[0.4em] font-bold text-white/40 uppercase flex items-center justify-center gap-4 mb-2">
            <span className="w-8 h-px bg-white/20"></span>
            What We Do
            <span className="w-8 h-px bg-white/20"></span>
          </h2>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-white leading-none font-display">
            OUR SERVICES
          </h1>
          <p className="text-xs md:text-sm text-white/50 font-mono mt-2 uppercase tracking-widest">
            Scroll down to flip cards
          </p>
        </div>

        {/* Dynamic Liquid Floating Glow Orbs */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.25, 1],
              opacity: [0.25, 0.45, 0.25],
              rotate: [0, 90, 180]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="w-96 h-96 rounded-full blur-[100px] transition-colors duration-700"
            style={{ backgroundColor: activeService.color }}
          />
        </div>

        {/* 3D Card Deck Stage */}
        <div 
          className="relative w-full max-w-6xl mx-auto px-4 flex items-center justify-center h-[420px] md:h-[480px]"
          style={{ perspective: '1200px' }}
        >
          {/* LEFT PEEK CARD */}
          <div 
            onClick={() => {
              setDirection(-1);
              const idx = Math.max(0, activeIndex - 1);
              prevIndexRef.current = idx;
              setActiveIndex(idx);
            }}
            className="hidden sm:flex absolute left-2 lg:left-8 z-10 w-[220px] md:w-[280px] h-[340px] md:h-[400px] rounded-3xl p-6 flex-col justify-between cursor-pointer opacity-40 hover:opacity-80 transition-all duration-500 border border-white/20 shadow-2xl backdrop-blur-xl bg-[#08080c]/90"
            style={{ 
              transform: 'rotateY(25deg) translateZ(-60px)',
              background: `radial-gradient(circle at top left, ${prevService.color}30, #08080c 80%)`
            }}
          >
            <div className="text-5xl md:text-7xl font-mono font-black text-white/80">
              {prevService.id}
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-widest text-white/50 uppercase mb-1">
                {prevService.category}
              </div>
              <div className="text-lg md:text-xl font-black text-white/90 line-clamp-2 uppercase">
                {prevService.title}
              </div>
            </div>
          </div>

          {/* ACTIVE CENTER CARD WITH 3D FLIP */}
          <div className="relative z-20 w-full max-w-[320px] sm:max-w-[420px] md:max-w-[480px] h-[400px] md:h-[460px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 24,
                  mass: 0.8
                }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  background: `radial-gradient(circle at top right, ${activeService.color}45, #08080d 85%)`
                }}
                className="absolute inset-0 w-full h-full rounded-[2.5rem] p-7 md:p-10 flex flex-col justify-between border border-white/25 shadow-[0_30px_80px_rgba(0,0,0,0.95)] overflow-hidden bg-[#08080d]/90 backdrop-blur-2xl"
              >
                {/* Metallic Shimmer Surface */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/50 pointer-events-none" />

                {/* Accent Line Header */}
                <div 
                  className="absolute top-0 left-0 h-1.5 w-full transition-all duration-500 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                  style={{ background: `linear-gradient(90deg, ${activeService.color}, transparent)` }}
                />

                {/* Card Header: Number & Category */}
                <div className="flex justify-between items-start w-full pt-2 relative z-10">
                  <span className="text-4xl md:text-6xl font-mono tracking-widest font-black text-white drop-shadow-md">
                    {activeService.id}
                  </span>
                  <span 
                    className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white px-4 py-2 rounded-full border border-white/30 backdrop-blur-md shadow-lg"
                    style={{ backgroundColor: `${activeService.color}50`, borderColor: activeService.color }}
                  >
                    {activeService.category}
                  </span>
                </div>

                {/* Card Body: Title & Description */}
                <div className="my-auto pt-2 relative z-10">
                  <h4 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-[0.95] mb-4">
                    {activeService.title}
                  </h4>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed font-medium">
                    {activeService.desc}
                  </p>
                </div>

                {/* Card Footer: Progress Bar & Step Count */}
                <div className="flex justify-between items-center w-full pt-4 border-t border-white/15 relative z-10">
                  <div className="flex items-center gap-2">
                    {services.map((s, idx) => (
                      <div 
                        key={s.id}
                        onClick={() => {
                          setDirection(idx > activeIndex ? 1 : -1);
                          prevIndexRef.current = idx;
                          setActiveIndex(idx);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${idx === activeIndex ? 'w-8 bg-white shadow-[0_0_10px_#ffffff]' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] md:text-xs font-mono font-bold text-white/50 uppercase tracking-widest hidden sm:inline-block">
                      Scroll to flip
                    </span>
                    <span 
                      className="text-xs md:text-sm font-mono font-black text-white px-3 py-1 rounded-full bg-white/10 border border-white/20 shadow-md"
                      style={{ borderColor: `${activeService.color}80` }}
                    >
                      {activeService.id} / 09
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT PEEK CARD */}
          <div 
            onClick={() => {
              setDirection(1);
              const idx = Math.min(services.length - 1, activeIndex + 1);
              prevIndexRef.current = idx;
              setActiveIndex(idx);
            }}
            className="hidden sm:flex absolute right-2 lg:right-8 z-10 w-[220px] md:w-[280px] h-[340px] md:h-[400px] rounded-3xl p-6 flex-col justify-between cursor-pointer opacity-40 hover:opacity-75 transition-all duration-500 border border-white/20 shadow-2xl glass-metallic bg-[#08080c]"

            style={{ 
              transform: 'rotateY(-25deg) translateZ(-60px)',
              background: `radial-gradient(circle at top right, ${nextService.color}20, #08080c 75%)`
            }}
          >
            <div className="text-xs font-bold tracking-widest text-white/40 uppercase">
              Next Service
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-widest text-white/40 uppercase mb-1">
                {nextService.category}
              </div>
              <div className="text-lg md:text-xl font-black text-white/80 line-clamp-2 uppercase">
                {nextService.title}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex sm:hidden items-center justify-center gap-6 mt-6 z-30">
          <button
            onClick={() => {
              setDirection(-1);
              const idx = Math.max(0, activeIndex - 1);
              prevIndexRef.current = idx;
              setActiveIndex(idx);
            }}
            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white active:scale-95 text-lg"
          >
            ←
          </button>
          <span className="text-xs font-mono font-bold text-white/70">
            {activeService.id} / 09
          </span>
          <button
            onClick={() => {
              setDirection(1);
              const idx = Math.min(services.length - 1, activeIndex + 1);
              prevIndexRef.current = idx;
              setActiveIndex(idx);
            }}
            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white active:scale-95 text-lg"
          >
            →
          </button>
        </div>

      </div>
    </div>
  );
}









