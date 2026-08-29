import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const services = [
  { id: '01', title: 'INTEGRATED BRANDING', category: 'Strategy & Identity', color: '#ff4d4d', desc: 'Crafting unique brand identities that resonate and leave a lasting impression.' },
  { id: '02', title: 'ENTERPRISE WEB DEV', category: 'Engineering & Scale', color: '#4d79ff', desc: 'Building robust, scalable, and high-performance web applications.' },
  { id: '03', title: 'MOBILE APP ENGINEERING', category: 'Native & PWA', color: '#4dff88', desc: 'Designing seamless mobile experiences for iOS and Android platforms.' },
  { id: '04', title: 'DIGITAL MARKETING', category: 'Growth, SEO, AEO & More', color: '#ff4dff', desc: 'Driving growth through data-driven marketing and SEO dominance.' },
  { id: '05', title: 'CONVERSION OPTIMIZATION', category: 'UX/UI & Analytics', color: '#ffff4d', desc: 'Turning visitors into loyal customers through expert UI/UX methodologies.' },
  { id: '06', title: 'GRAPHIC & UI DESIGN', category: 'Visual Identity', color: '#ff884d', desc: 'Creating visually stunning interfaces that elevate your digital presence.' },
  { id: '07', title: 'MOTION & VIDEO', category: 'Creative Production', color: '#4dffff', desc: 'Bringing ideas to life with cinematic video production and motion graphics.' },
  { id: '08', title: 'BUSINESS CONSULTING', category: 'Strategy & Growth', color: '#b34dff', desc: 'Providing strategic insights to scale operations and maximize revenue.' },
  { id: '09', title: 'FINANCE CONSULTING', category: 'Management & Scaling', color: '#4dffb3', desc: 'Expert financial management to ensure sustainable and profitable scaling.' }
];

export default function Services() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newIndex = Math.min(
      services.length - 1,
      Math.max(0, Math.floor(latest * services.length))
    );
    if (newIndex !== activeIndex) {
      setDirection(newIndex > activeIndex ? 1 : -1);
      setActiveIndex(newIndex);
    }
  });

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
    <div id="services" ref={containerRef} className="relative z-10 w-full bg-transparent h-[380vh]">
      
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden pt-12 pb-8">
        
        {/* Header section */}
        <div className="text-center mb-6 md:mb-10 z-30 pointer-events-none">
          <h2 className="text-xs tracking-[0.4em] font-bold text-white/40 uppercase flex items-center justify-center gap-4 mb-2">
            <span className="w-8 h-px bg-white/20"></span>
            What We Do
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
              setActiveIndex(prevIndex);
            }}
            className="hidden sm:flex absolute left-2 lg:left-8 z-10 w-[220px] md:w-[280px] h-[340px] md:h-[400px] rounded-3xl p-6 flex-col justify-between cursor-pointer opacity-40 hover:opacity-75 transition-all duration-500 border border-white/10 shadow-2xl backdrop-blur-xl bg-[#09090e]"
            style={{ 
              transform: 'rotateY(25deg) translateZ(-60px)',
              background: `radial-gradient(circle at top left, ${prevService.color}25, #09090e 70%)`
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
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  background: `radial-gradient(circle at top right, ${activeService.color}35, #0a0a0f 80%)`
                }}
                className="absolute inset-0 w-full h-full rounded-[2.5rem] p-7 md:p-10 flex flex-col justify-between border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden bg-[#0a0a0f]"
              >
                {/* Accent Line Header */}
                <div 
                  className="absolute top-0 left-0 h-1.5 w-full transition-colors duration-500"
                  style={{ background: `linear-gradient(90deg, ${activeService.color}, transparent)` }}
                />

                {/* Card Header: Number & Category */}
                <div className="flex justify-between items-start w-full pt-2">
                  <span className="text-4xl md:text-6xl font-mono tracking-widest font-black text-white/90">
                    {activeService.id}
                  </span>
                  <span 
                    className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white px-4 py-2 rounded-full border border-white/20 backdrop-blur-md"
                    style={{ backgroundColor: `${activeService.color}30` }}
                  >
                    {activeService.category}
                  </span>
                </div>

                {/* Card Body: Title & Description */}
                <div className="my-auto pt-2">
                  <h4 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-[0.95] mb-4">
                    {activeService.title}
                  </h4>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed font-medium">
                    {activeService.desc}
                  </p>
                </div>

                {/* Card Footer: Progress Indicators */}
                <div className="flex justify-between items-center w-full pt-4 border-t border-white/10">
                  <div className="flex items-center gap-1.5">
                    {services.map((s, idx) => (
                      <div 
                        key={s.id}
                        onClick={() => {
                          setDirection(idx > activeIndex ? 1 : -1);
                          setActiveIndex(idx);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
                      />
                    ))}
                  </div>

                  <span className="text-xs font-mono font-bold text-white/60">
                    {activeService.id} / 09
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT PEEK CARD */}
          <div 
            onClick={() => {
              setDirection(1);
              setActiveIndex(nextIndex);
            }}
            className="hidden sm:flex absolute right-2 lg:right-8 z-10 w-[220px] md:w-[280px] h-[340px] md:h-[400px] rounded-3xl p-6 flex-col justify-between cursor-pointer opacity-40 hover:opacity-75 transition-all duration-500 border border-white/10 shadow-2xl backdrop-blur-xl bg-[#09090e]"
            style={{ 
              transform: 'rotateY(-25deg) translateZ(-60px)',
              background: `radial-gradient(circle at top right, ${nextService.color}25, #09090e 70%)`
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
              setActiveIndex(prevIndex);
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
              setActiveIndex(nextIndex);
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


