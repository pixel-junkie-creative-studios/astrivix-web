import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ParticleText from '../components/ParticleText';
import SplitFlapText from '../components/SplitFlapText';
import LogoLoop from '../components/ui/LogoLoop';
import { Spotlight } from '../components/ui/Spotlight';

export default function Home() {
  const clientLogos = Array.from({ length: 24 }, (_, i) => ({
    src: `/assets/logos/${i + 1}.jpg`,
    alt: `Astrivix Client Brand Partner Logo ${i + 1}`
  }));

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  const { scrollYProgress } = useScroll();
  const spotlightX = useTransform(scrollYProgress, [0, 1], [0, 1200]);

  return (
    <div className="flex flex-col relative w-full pt-16 font-sans">
      {/* Semantic Primary H1 Tag for SEO */}
      <h1 className="sr-only">Astrivix Corp Business Consultants — Enterprise Digital Consultancy & Software Engineering Studio</h1>

      {/* Hero Section */}
      <section id="hero" className="min-h-[85vh] sm:min-h-[90vh] flex flex-col items-center justify-center relative z-10 px-4 sm:px-6">
        {/* Centered Hero Container */}
        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp}
          className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-2 sm:px-4"
        >
          {/* ASTRIVIX Particle Text Container */}
          <div className="w-full h-[260px] sm:h-[340px] md:h-[450px] relative flex justify-center items-center cursor-crosshair">
            <ParticleText
              text="ASTRIVIX"
              particleSize={2.2}
              density={typeof window !== 'undefined' && window.innerWidth < 640 ? 3 : 5}
              rainbowMode={true}
              scatter={120}
              gatherDuration={1500}
              stagger={100}
              pointerRepel={85}
              repelRadius={180}
              idleDrift={0}
              fontSize="clamp(2.8rem, 14vw, 12rem)"
              fontWeight={900}
            />
          </div>
          
          {/* Subtitle Row - Clean side-by-side alignment directly under ASTRIVIX */}
          <div className="flex flex-row items-center justify-between w-full max-w-4xl px-6 sm:px-12 md:px-16 mt-2 sm:-mt-8 md:-mt-20 z-20">
            {/* Left Side: CORP + Dot */}
            <div className="flex items-center space-x-1">
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-light uppercase tracking-widest text-white drop-shadow-md">
                CORP<span className="text-white text-3xl sm:text-5xl md:text-7xl leading-none font-bold">.</span>
              </h2>
            </div>

            {/* Right Side: BUSINESS CONSULTANTS */}
            <div className="flex flex-col items-end text-right">
              <h3 className="text-[11px] sm:text-sm md:text-2xl font-medium uppercase tracking-[0.2em] text-white/90 leading-tight drop-shadow-md">
                BUSINESS
              </h3>
              <h3 className="text-xs sm:text-xl md:text-2xl font-medium uppercase tracking-[0.2em] text-white/90 leading-tight drop-shadow-md">
                CONSULTANTS
              </h3>
            </div>
          </div>
        </motion.div>
          
        {/* Sleek Mechanical SplitFlap Banner (GPU Accelerated & Responsive Tile Scale) */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="w-full flex justify-center mt-8 sm:mt-12 md:mt-24 px-2 sm:px-4 z-10 gpu-layer"
        >
          <div className="glass-fast px-3 py-3 sm:px-8 sm:py-5 md:px-10 md:py-6 rounded-2xl md:rounded-[2.5rem] border border-white/20 shadow-2xl relative overflow-hidden max-w-full">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="relative z-10 flex justify-center overflow-hidden">
              <SplitFlapText
                words={['BUILDING DIGITAL LEGENDS', 'UNMATCHED PERFORMANCE', 'CUSTOM ENGINEERING', 'DOMINATE DIGITAL']}
                fontSize={typeof window !== 'undefined' && window.innerWidth < 640 ? 12 : 24}
                tileColor="#050509"
                textColor="#ffffff"
                gap={typeof window !== 'undefined' && window.innerWidth < 640 ? 2 : 6}
                stagger={0.05}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Selected Clients & Partners Carousel */}
      <section id="clients" className="py-12 sm:py-24 relative z-10">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
          className="w-full rounded-[2.5rem] bg-[#0B0B10]/90 shadow-liquid-glass py-10 sm:py-16 border-t border-l border-white/20 border-b border-r border-black/80 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50" />
          <div className="text-center mb-8 sm:mb-12 relative z-10 px-4">
            <h3 className="text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] font-bold text-white/40 uppercase">Brands & Visionaries We've Had The Pleasure of Building With</h3>
          </div>
          <div className="relative z-10 w-full overflow-hidden mask-edges px-2 sm:px-8">
            <LogoLoop
              logos={clientLogos}
              speed={100}
              direction="left"
              logoHeight={typeof window !== 'undefined' && window.innerWidth < 640 ? 48 : 75}
              gap={typeof window !== 'undefined' && window.innerWidth < 640 ? 36 : 60}
              hoverSpeed={20}
              scaleOnHover={true}
              fadeOut={true}
              fadeOutColor="transparent"
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
