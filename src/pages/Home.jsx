import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ParticleText from '../components/ParticleText';
import SplitFlapText from '../components/SplitFlapText';
import LogoLoop from '../components/ui/LogoLoop';
import { Spotlight } from '../components/ui/Spotlight';

export default function Home() {
  const clientLogos = Array.from({ length: 24 }, (_, i) => ({
    src: `/assets/logos/${i + 1}.jpg`,
    alt: `Client ${i + 1}`
  }));

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const { scrollYProgress } = useScroll();
  const spotlightX = useTransform(scrollYProgress, [0, 1], [0, 1200]);

  return (
    <div className="flex flex-col relative w-full pt-16">
      <motion.div style={{ x: spotlightX }} className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <Spotlight className="-top-40 left-0 md:left-20 md:-top-20" fill="white" />
      </motion.div>
      
      <section className="min-h-[85vh] flex flex-col justify-center items-center relative pt-8 md:pt-12 pb-16 md:pb-24">
        
        {/* Centered Hero Container */}
        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp}
          className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-4"
        >
          {/* ASTRIVIX Particle Text Container */}
          <div className="w-full h-[220px] sm:h-[320px] md:h-[450px] relative flex justify-center items-center cursor-crosshair">
            <ParticleText
              text="ASTRIVIX"
              particleSize={2}
              density={5}
              color="#ffffff"
              highlightColor="#aaaaaa"
              scatter={150}
              gatherDuration={1500}
              stagger={100}
              pointerRepel={150}
              repelRadius={400}
              fontSize="clamp(2.8rem, 13.5vw, 12rem)"
              fontWeight={900}
            />
          </div>
          
          {/* Subtitle Row - Clean side-by-side layout on PC & Mobile */}
          <div className="flex flex-row items-center justify-between w-full px-4 sm:px-12 md:px-16 mt-2 sm:mt-2 md:-mt-20">
            {/* Left Side: CORP + Dot */}
            <div className="flex items-center space-x-1">
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-light uppercase tracking-widest text-ax-text">
                CORP<span className="text-ax-text text-3xl sm:text-5xl md:text-7xl leading-none font-bold">.</span>
              </h2>
            </div>

            {/* Right Side: BUSINESS CONSULTANTS */}
            <div className="flex flex-col items-end text-right pt-1 md:pt-2">
              <h3 className="text-xs sm:text-sm md:text-2xl font-medium uppercase tracking-[0.2em] text-ax-text leading-tight">
                BUSINESS
              </h3>
              <h3 className="text-sm sm:text-xl md:text-2xl font-medium uppercase tracking-[0.2em] text-ax-text leading-tight">
                CONSULTANTS
              </h3>
            </div>
          </div>
        </motion.div>
          
        {/* Sleek Mechanical SplitFlap Banner (GPU Accelerated) */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="w-full flex justify-center mt-12 md:mt-24 px-4 z-10 gpu-layer"
        >
          <div className="glass-fast px-6 py-4 md:px-10 md:py-6 rounded-2xl md:rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden max-w-full">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="relative z-10 flex justify-center">
              <SplitFlapText
                words={['BRANDS APPS & TECH', 'CREATIVE ENGINEERING', 'BUSINESS GROWTH ENGINE', 'STABILITY AT VELOCITY']}
                fontSize={typeof window !== 'undefined' && window.innerWidth < 640 ? 14 : 22}
                tileColor="#09090e"
                textColor="#ffffff"
                gap={typeof window !== 'undefined' && window.innerWidth < 640 ? 3 : 6}
                stagger={0.05}
              />
            </div>
          </div>
        </motion.div>
      </section>

      <section id="clients" className="py-24 relative z-10">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
          className="w-full rounded-[2.5rem] bg-white/5 backdrop-blur-xl shadow-liquid-glass py-16 border-t border-l border-white/20 border-b border-r border-black/80 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50" />
          <div className="text-center mb-12 relative z-10">
            <h3 className="text-[11px] tracking-[0.3em] font-bold text-white/40 uppercase">Brands & Visionaries We've Had The Pleasure of Building With</h3>
          </div>
          <div className="relative z-10 w-full overflow-hidden mask-edges px-8">
            <LogoLoop
              logos={clientLogos}
              speed={100}
              direction="left"
              logoHeight={75}
              gap={60}
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
