import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { id: '01', title: 'INTEGRATED BRANDING', category: 'Brand Rescue', color: '#ff4d4d', desc: 'We fix your logo and brand before your relatives ask if you made it in Microsoft Paint.' },
  { id: '02', title: 'ENTERPRISE WEB DEV', category: 'Zero-Jank Engineering', color: '#4d79ff', desc: 'Code so clean even your angry senior engineer can’t find anything to complain about.' },
  { id: '03', title: 'MOBILE APP ENGINEERING', category: 'Pure Fluidity', color: '#4dff88', desc: 'Gesture physics so ridiculously fluid your users will open the app 50 times a day just to swipe around.' },
  { id: '04', title: 'DIGITAL MARKETING', category: 'Real Traffic', color: '#ff4dff', desc: 'Getting you actual paying customers instead of 5,000 fake bots from random countries.' },
  { id: '05', title: 'CONVERSION OPTIMIZATION', category: 'Checkout Perfection', color: '#ffff4d', desc: 'Fixing your site so visitors stop abandoning their carts like their bad habits.' },
  { id: '06', title: 'GRAPHIC & UI DESIGN', category: 'Custom Pixels', color: '#ff884d', desc: 'Custom designs that don’t look like a $12 Fiverr template from 2014.' },
  { id: '07', title: 'MOTION & VIDEO', category: 'Visual Hypnosis', color: '#4dffff', desc: 'Animations so pretty your users forget why they even opened the browser tab.' },
  { id: '08', title: 'BUSINESS CONSULTING', category: 'Meeting Eraser', color: '#b34dff', desc: 'We kill your useless 8 AM Zoom calls so your team can actually get real work done.' },
  { id: '09', title: 'FINANCE CONSULTING', category: 'Capital Growth', color: '#4dffb3', desc: 'Making sure your company bank account grows faster than your daily caffeine addiction.' }
];

export default function Services() {
  const containerRef = useRef(null);
  const pinTargetRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const prevIndexRef = useRef(0);

  // GSAP ScrollTrigger Hardware Pin Engine (Mobile Responsive Speed Tuning)
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: isMobile ? '+=4800' : '+=1800', // 4800px on mobile for 1-swipe-per-card control
        pin: pinTargetRef.current,
        pinSpacing: true,
        scrub: isMobile ? 0.8 : 0.1,
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
            What We Do
            <span className="w-8 h-px bg-white/20"></span>
          </h2>
          <h3 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-white leading-none">
            OUR SERVICES
          </h3>
          <p className="text-xs md:text-sm text-white/50 font-mono mt-2 uppercase tracking-widest">
            Scroll down to flip cards
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
                className="absolute inset-0 w-full h-full rounded-[2.5rem] p-7 md:p-10 flex flex-col justify-between border border-white/30 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden bg-[#0a0a0f] glass-fast gpu-layer"
              >
                {/* Skeuomorphic Metallic Corner Screws */}
                <div className="absolute top-4 left-4 skeuo-screw opacity-70" />
                <div className="absolute top-4 right-4 skeuo-screw opacity-70" />
                <div className="absolute bottom-4 left-4 skeuo-screw opacity-70" />
                <div className="absolute bottom-4 right-4 skeuo-screw opacity-70" />

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

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] md:text-xs font-mono font-bold text-white/50 uppercase tracking-widest hidden sm:inline-block">
                      Scroll to flip
                    </span>
                    <span className="text-xs md:text-sm font-mono font-black text-white/90 px-3 py-1 rounded-full bg-white/5 border border-white/10">
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
            className="hidden sm:flex absolute right-2 lg:right-8 z-10 w-[220px] md:w-[280px] h-[340px] md:h-[400px] rounded-3xl p-6 flex-col justify-between cursor-pointer opacity-40 hover:opacity-75 transition-all duration-500 border border-white/20 border-t-white/40 shadow-2xl glass-metallic bg-[#08080c]"
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









