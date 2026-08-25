import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

export const FloatingNav = ({ navItems, className }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1, y: -100 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex max-w-fit fixed top-8 inset-x-0 mx-auto bg-[#0a0a0a]/60 backdrop-blur-3xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] z-[5000] px-6 py-3 items-center justify-center space-x-8 border border-white/10 transition-all duration-500",
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
          className="h-10 w-10 md:h-12 md:w-12 object-contain hover:scale-110 transition-transform duration-300 mix-blend-screen"
        />
      </a>

      {navItems.map((navItem, idx) => (
        <a
          key={`link=${idx}`}
          href={navItem.link}
          onClick={(e) => handleScroll(e, navItem.link)}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative text-neutral-400 items-center flex px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold hover:text-white transition-colors"
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
          className="relative text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white px-4 md:px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/50 to-blue-600/50 hover:from-purple-500 hover:to-blue-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] border border-white/20 transition-all duration-300 active:scale-95 ml-4"
        >
          Make a Wish
        </button>

        <a 
          href="#contact" 
          onClick={(e) => handleScroll(e, '#contact')}
          className="relative text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-black px-6 md:px-8 py-3 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:bg-gray-100 transition-all duration-300 active:scale-95"
        >
          <span>Contact</span>
        </a>
      </div>
    </motion.div>
  );
};
