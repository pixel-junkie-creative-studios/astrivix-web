import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

export const MorphicNavbar = ({ navItems }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
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
          setIsMobileMenuOpen(false);
        }
      }
    }
  });

  const handleScroll = (e, link, idx) => {
    if (link && link.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(link);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      setActiveTab(idx);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="fixed top-4 md:top-6 inset-x-0 mx-auto w-[92vw] max-w-4xl z-[5000] bg-[#0a0a0f]/85 backdrop-blur-2xl rounded-full p-2 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.95)] flex items-center justify-between"
      >
        {/* Brand Logo */}
        <a href="#" aria-label="Astrivix Homepage" className="flex items-center gap-2.5 pl-3 pr-2 group">
          <img 
            src="/astrivix-logo-sq.png"
            alt="Astrivix Official Logo" 
            className="h-9 w-9 object-cover rounded-full border border-pink-500/30 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_12px_rgba(236,72,153,0.3)]"
          />
          <span className="hidden sm:inline font-mono font-black text-xs tracking-widest text-white uppercase">
            ASTRIVIX
          </span>
        </a>

        {/* Morphic Desktop Nav Tabs */}
        <div className="hidden md:flex items-center bg-white/5 rounded-full p-1 border border-pink-500/20 relative">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              onClick={(e) => handleScroll(e, item.link, idx)}
              className="relative px-5 py-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors z-10"
            >
              {activeTab === idx && (
                <motion.span
                  layoutId="morphicTabIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-pink-500/35 via-fuchsia-500/30 to-purple-600/35 rounded-full border border-pink-400/60 shadow-[0_0_15px_rgba(236,72,153,0.45)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </a>
          ))}
        </div>

        {/* Right CTA Button & Status Indicator */}
        <div className="flex items-center gap-3 pr-1">
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact', 4)}
            className="skeuo-button text-black text-[10px] font-mono font-black tracking-widest uppercase px-5 py-2.5 rounded-full shadow-lg active:scale-95 transition-transform"
          >
            CONTACT →
          </a>

          {/* Mobile Hamburger Button */}
          <button 
            aria-label="Toggle navigation menu"
            className="md:hidden relative flex flex-col justify-center items-center w-9 h-9 rounded-full bg-white/10 border border-white/20 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className={`block w-4 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[2px]' : '-translate-y-1'}`} />
            <span className={`block w-4 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[2px]' : 'translate-y-1'}`} />
          </button>
        </div>
      </motion.div>

      {/* Mobile Fullscreen Menu (Synthu Agency Style) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 top-16 bottom-24 bg-[#050508]/98 backdrop-blur-3xl border border-white/20 rounded-[2.5rem] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.98)] z-[4900] md:hidden flex flex-col justify-between overflow-y-auto"
          >
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-pink-400 uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(236,72,153,1)]" />
                AST. // CREATIVE AGENCY
              </span>
              <span className="text-[10px] font-mono text-white/40 uppercase">CLOSE [X]</span>
            </div>

            <div className="flex flex-col gap-3 my-auto py-6">
              {navItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  onClick={(e) => handleScroll(e, item.link, idx)}
                  className="text-3xl font-black tracking-tighter uppercase text-white hover:text-pink-400 transition-colors text-left flex items-center justify-between"
                >
                  <span>{item.name}</span>
                  <span className="text-xs font-mono text-white/30 font-normal">0{idx + 1} →</span>
                </a>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 font-mono text-[10px] tracking-widest text-white/60 uppercase">
              <span>hello@astrivix.in | www.astrivix.in</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MorphicNavbar;
