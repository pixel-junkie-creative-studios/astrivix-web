import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { id: '01', title: 'INTEGRATED BRANDING', category: 'Brand Architecture', color: '#ff4d4d', desc: 'Custom brand identities, typography systems, and visual guidelines engineered to establish instant market authority.' },
  { id: '02', title: 'ENTERPRISE WEB DEV', category: 'High-Performance Web Apps', color: '#4d79ff', desc: 'Custom, high-performance web applications built with modern frontend frameworks, 3D WebGL graphics, and clean architecture.' },
  { id: '03', title: 'MOBILE APP ENGINEERING', category: 'Native iOS & Android', color: '#4dff88', desc: 'Native iOS and Android mobile platforms featuring fluid gesture interaction, offline synchronization, and intuitive user experiences.' },
  { id: '04', title: 'DIGITAL MARKETING', category: 'Targeted Acquisition', color: '#ff4dff', desc: 'Data-driven performance campaigns, programmatic growth engines, and high-ROI client acquisition strategies.' },
  { id: '05', title: 'CONVERSION OPTIMIZATION', category: 'Frictionless Growth', color: '#ffff4d', desc: 'Rigorous user flow analysis, checkout optimization, and A/B testing designed to maximize customer lifetime value.' },
  { id: '06', title: 'GRAPHIC & UI/UX DESIGN', category: 'Design Systems', color: '#ff884d', desc: 'Comprehensive design systems, liquid glass UI components, and accessible interfaces tailored for modern enterprises.' },
  { id: '07', title: 'MOTION & VIDEO PRODUCTION', category: 'Visual Storytelling', color: '#4dffff', desc: 'High-impact 3D animation, brand films, and motion graphics that capture attention and elevate your digital narrative.' },
  { id: '08', title: 'BUSINESS CONSULTING', category: 'Strategic Execution', color: '#b34dff', desc: 'Streamlining operational workflows, eliminating process bottlenecks, and scaling enterprise delivery mechanisms.' },
  { id: '09', title: 'FINANCE CONSULTING', category: 'Capital Architecture', color: '#4dffb3', desc: 'Financial modeling, revenue optimization, and capital allocation frameworks designed for sustainable enterprise expansion.' }
];

export default function Services() {
  const containerRef = useRef(null);
  const pinTargetRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const prevIndexRef = useRef(0);

  // GSAP ScrollTrigger Hardware Pin Engine
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: isMobile ? '+=2700' : '+=2200', // 1 light trackpad scroll stroke per card across 9 cards
        pin: pinTargetRef.current,
        pinSpacing: true,
        scrub: 0.1, // Ultra-responsive instant scrub without delay
        onUpdate: (self) => {
          const newIndex = Math.min(
            services.length - 1,
            Math.floor(self.progress * services.length)
          );
          if (newIndex !== prevIndexRef.current) {
            setDirection(newIndex > prevIndexRef.current ? 1 : -1);
            prevIndexRef.current = newIndex;
            setActiveIndex(newIndex);
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const prevIndex = (activeIndex - 1 + services.length) % services.length;
  const nextIndex = (activeIndex + 1) % services.length;

  const activeService = services[activeIndex];
  const prevService = services[prevIndex];
  const nextService = services[nextIndex];

  // 3D Card Flip Variants
  const cardVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 280 : -280,
      rotateY: dir > 0 ? 40 : -40,
      scale: 0.88,
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
      x: dir < 0 ? 280 : -280,
      rotateY: dir < 0 ? 40 : -40,
      scale: 0.88,
      opacity: 0,
    }),
  };

  return (
    <div id="services" ref={containerRef} className="relative z-10 w-full bg-transparent">
      {/* GSAP ScrollTrigger Pinned Target Stage */}
      <div 
        ref={pinTargetRef}
        className="w-full h-screen flex flex-col justify-center items-center overflow-hidden pt-16 md:pt-20 pb-10"
      >
        {/* Header section */}
        <div className="text-center mb-4 md:mb-8 z-30 pointer-events-none">
          <h2 className="text-xs tracking-[0.4em] font-bold text-white/40 uppercase flex items-center justify-center gap-4 mb-2">
            <span className="w-8 h-px bg-white/20"></span>
            Full Agency Offerings
            <span className="w-8 h-px bg-white/20"></span>
          </h2>
          <h3 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-white leading-none">
            OUR SERVICES
          </h3>
          <p className="text-xs md:text-sm text-white/50 font-mono mt-2 uppercase tracking-widest">
            Scroll down to explore capabilities
          </p>
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
            className="hidden sm:flex absolute left-2 lg:left-8 z-10 w-[220px] md:w-[280px] h-[340px] md:h-[400px] rounded-3xl p-6 flex-col justify-between cursor-pointer opacity-40 hover:opacity-75 transition-all duration-500 border border-white/20 border-t-white/40 shadow-2xl glass-metallic bg-[#08080c]"
            style={{ 
              transform: 'rotateY(25deg) translateZ(-60px)',
              background: `radial-gradient(circle at top left, ${prevService.color}20, #08080c 75%)`
            }}
          >
            <div className="text-5xl md:text-7xl font-mono font-black text-white/80">
              {prevService.id}
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-widest text-white/40 uppercase mb-1">
                {prevService.category}
              </div>
              <div className="text-lg md:text-xl font-black text-white/80 line-clamp-2 uppercase">
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
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  background: `radial-gradient(circle at top right, ${activeService.color}35, #0a0a0f 80%)`
                }}
                className="absolute inset-0 w-full h-full rounded-[2.5rem] p-7 md:p-10 flex flex-col justify-between border border-white/30 hover:border-white/50 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden bg-[#0a0a0f] glass-fast gpu-layer transition-colors"
              >
                {/* Accent Line Header */}
                <div 
                  className="absolute top-0 left-0 h-1.5 w-full transition-colors duration-500"
                  style={{ background: `linear-gradient(90deg, ${activeService.color}, transparent)` }}
                />

                {/* Card Header: Number & Category */}
                <div className="flex justify-between items-start w-full pt-2">
                  <span className="text-4xl md:text-6xl font-mono tracking-widest font-black text-white drop-shadow-md">
                    {activeService.id}
                  </span>
                  <span 
                    className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white px-4 py-2 rounded-full border border-white/30 backdrop-blur-md"
                    style={{ backgroundColor: `${activeService.color}40` }}
                  >
                    {activeService.category}
                  </span>
                </div>

                {/* Card Body: Title & Description */}
                <div className="my-auto pt-2">
                  <h4 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-[0.95] mb-4">
                    {activeService.title}
                  </h4>
                  <p className="text-white text-sm md:text-base leading-relaxed font-medium">
                    {activeService.desc}
                  </p>
                </div>

                {/* Card Footer: Progress Bar & Step Count */}
                <div className="flex justify-between items-center w-full pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    {services.map((s, idx) => (
                      <div 
                        key={s.id}
                        onClick={() => {
                          setDirection(idx > activeIndex ? 1 : -1);
                          prevIndexRef.current = idx;
                          setActiveIndex(idx);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${idx === activeIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-bold text-white/70">
                    0{activeIndex + 1} / 09
                  </span>
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
            className="hidden sm:flex absolute right-2 lg:right-8 z-10 w-[220px] md:w-[280px] h-[340px] md:h-[400px] rounded-3xl p-6 flex-col justify-between cursor-pointer opacity-40 hover:opacity-75 transition-all duration-500 border border-white/20 border-t-white/40 shadow-2xl glass-metallic bg-[#08080c]"
            style={{ 
              transform: 'rotateY(-25deg) translateZ(-60px)',
              background: `radial-gradient(circle at top right, ${nextService.color}20, #08080c 75%)`
            }}
          >
            <div className="text-5xl md:text-7xl font-mono font-black text-white/80">
              {nextService.id}
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

        {/* Mobile Swipe Navigation Controls */}
        <div className="flex sm:hidden items-center justify-between gap-4 mt-6 z-30 px-6 w-full max-w-[320px]">
          <button 
            onClick={() => {
              setDirection(-1);
              const idx = Math.max(0, activeIndex - 1);
              prevIndexRef.current = idx;
              setActiveIndex(idx);
            }}
            className="text-xs font-mono font-bold text-white/80 bg-white/10 border border-white/20 px-4 py-2 rounded-full uppercase tracking-wider active:scale-95 transition-transform"
          >
            ← PREV
          </button>
          <span className="text-xs font-mono text-white/60 font-bold">
            0{activeIndex + 1} / 09
          </span>
          <button 
            onClick={() => {
              setDirection(1);
              const idx = Math.min(services.length - 1, activeIndex + 1);
              prevIndexRef.current = idx;
              setActiveIndex(idx);
            }}
            className="text-xs font-mono font-bold text-white/80 bg-white/10 border border-white/20 px-4 py-2 rounded-full uppercase tracking-wider active:scale-95 transition-transform"
          >
            NEXT →
          </button>
        </div>

      </div>
    </div>
  );
}
