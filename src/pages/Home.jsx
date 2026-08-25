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
      
      <section className="min-h-[85vh] flex flex-col justify-center items-center relative pt-12 pb-24">
        
        {/* Centered Hero Container */}
        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp}
          className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl mx-auto"
        >
          {/* ASTRIVIX Particle Text Container */}
          <div className="w-full h-[300px] md:h-[450px] relative flex justify-center items-center cursor-crosshair">
            <ParticleText
              text="ASTRIVIX"
              particleSize={3}
              density={8}
              color="#ffffff"
              highlightColor="#888888"
              scatter={150}
              gatherDuration={1500}
              stagger={100}
              pointerRepel={150}
              repelRadius={400}
              fontSize="clamp(4rem, 15vw, 12rem)"
              fontWeight={900}
            />
          </div>
          
          {/* Bottom Text Row - Perfectly aligned under ASTRIVIX */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between w-full px-4 md:px-16 -mt-8 md:-mt-24 gap-4 md:gap-0">
            {/* Left Side: CORP + Dot */}
            <div className="flex items-center space-x-1">
              <h2 className="text-3xl md:text-6xl font-light uppercase tracking-widest text-ax-text">
                CORP<span className="text-ax-text text-4xl md:text-7xl leading-none font-bold">.</span>
              </h2>
            </div>

            {/* Right Side: BUSINESS CONSULTANTS */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right md:pt-2">
              <h3 className="text-sm md:text-2xl font-medium uppercase tracking-[0.2em] text-ax-text leading-tight">
                BUSINESS
              </h3>
              <h3 className="text-xl md:text-2xl font-medium uppercase tracking-[0.2em] text-ax-text leading-tight">
                CONSULTANTS
              </h3>
            </div>
          </div>
        </motion.div>
          
        <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="w-full flex justify-center mt-12 md:mt-24 px-4 z-10"
          >
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-liquid-glass border-t border-l border-white/20 border-b border-r border-black/80 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50" />
              <div className="relative z-10">
                <SplitFlapText
                  words={['ENGINEERING', 'STABILITY', 'AT VELOCITY']}
                  fontSize={20}
                  tileColor="#050505"
                  textColor="#ffffff"
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
            <h3 className="text-[11px] tracking-[0.3em] font-bold text-white/40 uppercase">Trusted by Industry Leaders</h3>
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
