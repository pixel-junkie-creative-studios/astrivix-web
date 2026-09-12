import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

export const FloatingNav = ({ navItems, className }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
          setIsMobileMenuOpen(false); // Close menu on scroll down
        }
      }
    }
  });

  const handleScroll = (e, link) => {
    if (link && link.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(link);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
    <motion.div
      initial={{ opacity: 1, y: -100 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex max-w-[92vw] md:max-w-fit fixed top-4 md:top-8 inset-x-0 mx-auto bg-[#0a0a0a]/80 backdrop-blur-3xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] z-[5000] px-4 md:px-6 py-2 md:py-3 items-center justify-between md:justify-center space-x-0 md:space-x-8 border border-white/10 transition-all duration-500",
        className
      )}
    >
      <a href="#" className="flex-shrink-0 relative group">
        <video 
          src="/assets/astreivix_nav_bar.mp4"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="h-10 w-10 md:h-12 md:w-12 object-contain hover:scale-110 transition-transform duration-300"
        />
      </a>

      {navItems.map((navItem, idx) => (
        <a
          key={`link=${idx}`}
          href={navItem.link}
          onClick={(e) => handleScroll(e, navItem.link)}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="hidden md:flex relative text-neutral-400 items-center px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold hover:text-white transition-colors"
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 bg-white/10 rounded-full"
                layoutId="navHover"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.2, ease: "easeOut" } }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2, ease: "easeIn" } }}
              />
            )}
          </AnimatePresence>
          <span className="relative z-10 block">{navItem.name}</span>
        </a>
      ))}
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => window.dispatchEvent(new Event('make-a-wish'))}
          className="hidden md:block relative text-xs font-bold uppercase tracking-[0.2em] text-white px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/50 to-blue-600/50 hover:from-purple-500 hover:to-blue-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] border border-white/20 transition-all duration-300 active:scale-95 ml-4"
        >
          Make a Wish
        </button>

        <a 
          href="#contact" 
          onClick={(e) => handleScroll(e, '#contact')}
          className="hidden md:block relative text-xs font-bold uppercase tracking-[0.2em] text-black px-8 py-3 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:bg-gray-100 transition-all duration-300 active:scale-95"
        >
          <span>Contact</span>
        </a>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden relative flex flex-col justify-center items-center w-10 h-10 rounded-full bg-white/5 border border-white/10 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[2px]' : '-translate-y-1'}`} />
          <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[2px]' : 'translate-y-1'}`} />
        </button>
      </div>
    </motion.div>

    {/* Mobile Fullscreen Menu (Reference Screenshot Synth/Agency Design) */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-3 top-16 bottom-24 bg-[#050508]/98 backdrop-blur-3xl border border-white/20 rounded-[2.5rem] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.98)] z-[4900] md:hidden flex flex-col justify-between overflow-y-auto"
        >
          {/* Top Header Tag */}
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-emerald-400 uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              AST. // CREATIVE AGENCY
            </span>
            <span className="text-[10px] font-mono text-white/40 uppercase">CLOSE [X]</span>
          </div>

          {/* Huge Stacked Navigation Typography (Exact synthu. Reference Style) */}
          <div className="flex flex-col gap-3 my-auto py-6">
            {navItems.map((navItem, idx) => (
              <a
                key={idx}
                href={navItem.link}
                onClick={(e) => handleScroll(e, navItem.link)}
                className="text-3xl sm:text-4xl font-black tracking-tighter uppercase text-white hover:text-emerald-400 transition-colors text-left flex items-center justify-between group"
              >
                <span>{navItem.name}</span>
                <span className="text-xs font-mono text-white/30 group-hover:text-emerald-400 font-normal">0{idx + 1} →</span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, '#contact')}
              className="text-3xl sm:text-4xl font-black tracking-tighter uppercase text-emerald-400 hover:text-white transition-colors text-left"
            >
              CONTACT
            </a>
          </div>

          {/* Bottom Agency Contact Details */}
          <div className="border-t border-white/10 pt-4 flex flex-col gap-2 font-mono text-[10px] tracking-widest text-white/60 uppercase">
            <a href="mailto:hello@astrivix.in" className="hover:text-white text-emerald-400 font-bold">
              &gt; GET CONSULTATION #
            </a>
            <span>hello@astrivix.in | www.astrivix.in</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Fixed Bottom Glass Pill Dock for Mobile Viewports (Reference Screenshot Aesthetic) */}
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="md:hidden fixed bottom-6 inset-x-0 mx-auto w-[92vw] max-w-sm z-[5000] glass-metallic rounded-full p-1.5 border border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.95)] flex items-center justify-between backdrop-blur-3xl"
    >
      <a
        href="#clients"
        onClick={(e) => handleScroll(e, '#clients')}
        className="flex items-center justify-center px-3.5 py-2.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase text-white/80 hover:text-white hover:bg-white/10 transition-all"
      >
        WORK
      </a>
      <a
        href="#services"
        onClick={(e) => handleScroll(e, '#services')}
        className="flex items-center justify-center px-3.5 py-2.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase text-white/80 hover:text-white hover:bg-white/10 transition-all"
      >
        SERVICES
      </a>
      <a
        href="#about"
        onClick={(e) => handleScroll(e, '#about')}
        className="flex items-center justify-center px-3.5 py-2.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase text-white/80 hover:text-white hover:bg-white/10 transition-all"
      >
        ABOUT
      </a>
      <a
        href="#contact"
        onClick={(e) => handleScroll(e, '#contact')}
        className="flex items-center justify-center px-4 py-2.5 rounded-full text-[10px] font-mono font-black tracking-widest uppercase bg-white text-black shadow-lg active:scale-95 transition-transform shrink-0"
      >
        CONTACT
      </a>
    </motion.div>
    </>
  );
};
