import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useLenis } from 'lenis/react';
import StaggeredMenu from './StaggeredMenu';

export const MorphicNavbar = ({
  navItems = [
    { name: 'ABOUT', link: '#about' },
    { name: 'SERVICES', link: '#services' },
    { name: 'CONTACT', link: '#contact' }
  ]
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const lenis = useLenis();

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

  const handleScroll = (e, link, idx) => {
    if (link && link.startsWith('#')) {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(link, { offset: 0, duration: 1.2 });
      } else {
        const target = document.querySelector(link);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
      setActiveTab(idx);
    }
  };

  const staggeredItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '#home' },
    { label: 'Services', ariaLabel: 'View our services', link: '#services' },
    { label: 'Financial Consulting', ariaLabel: 'Financial Consulting Subsite', link: '/financial-consulting' },
    { label: 'Portfolio', ariaLabel: 'Portfolio Showcase Subsite', link: '/portfolio' },
    { label: 'About', ariaLabel: 'Learn about us', link: '#about' },
    { label: 'Careers', ariaLabel: 'View careers', link: '#careers' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' }
  ];

  return (
    <>
      {/* Desktop Glass Morphic Navbar Pill */}
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="hidden md:flex fixed top-6 inset-x-0 mx-auto w-[92vw] max-w-4xl z-[5000] glass-metallic rounded-full p-2 border border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.95)] items-center justify-between backdrop-blur-3xl"
      >
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 pl-3 pr-2 group">
          <video 
            src="/assets/astreivix_nav_bar.mp4"
            autoPlay 
            loop 
            muted 
            playsInline 
            className="h-9 w-9 object-contain group-hover:scale-110 transition-transform duration-300"
          />
          <span className="font-mono font-black text-xs tracking-widest text-white uppercase">
            ASTRIVIX
          </span>
        </a>

        {/* Morphic Desktop Nav Tabs: ABOUT, SERVICES, CONTACT */}
        <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10 relative">
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
                  className="absolute inset-0 bg-white/20 rounded-full border border-white/30 shadow-lg"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </a>
          ))}
        </div>

        {/* Right CTA Button */}
        <div className="flex items-center gap-3 pr-1">
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact', 2)}
            className="skeuo-button text-black text-[10px] font-mono font-black tracking-widest uppercase px-5 py-2.5 rounded-full shadow-lg active:scale-95 transition-transform"
          >
            CONTACT →
          </a>
        </div>
      </motion.div>

      {/* Global StaggeredMenu (React Bits Drawer - available on all screens, no socials) */}
      <StaggeredMenu
        position="right"
        colors={['#0A0A10', '#12121A', '#050508']}
        accentColor="#10B981"
        menuButtonColor="#ffffff"
        openMenuButtonColor="#10B981"
        changeMenuColorOnOpen={true}
        displaySocials={false}
        displayItemNumbering={true}
        logoUrl="/assets/astreivix_nav_bar.mp4"
        items={staggeredItems}
        socialItems={[]}
        isFixed={true}
      />

      {/* Fixed Bottom Glass Pill Dock for Mobile */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="md:hidden fixed bottom-6 inset-x-0 mx-auto w-[92vw] max-w-sm z-[4900] glass-metallic rounded-full p-1.5 border border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.95)] flex items-center justify-between backdrop-blur-3xl pointer-events-auto"
      >
        <a
          href="#clients"
          onClick={(e) => handleScroll(e, '#clients', 0)}
          className="flex items-center justify-center px-3.5 py-2.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase text-white/80 hover:text-white hover:bg-white/10 transition-all"
        >
          WORK
        </a>
        <a
          href="#services"
          onClick={(e) => handleScroll(e, '#services', 1)}
          className="flex items-center justify-center px-3.5 py-2.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase text-white/80 hover:text-white hover:bg-white/10 transition-all"
        >
          SERVICES
        </a>
        <a
          href="#about"
          onClick={(e) => handleScroll(e, '#about', 2)}
          className="flex items-center justify-center px-3.5 py-2.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase text-white/80 hover:text-white hover:bg-white/10 transition-all"
        >
          ABOUT
        </a>
        <a
          href="#contact"
          onClick={(e) => handleScroll(e, '#contact', 4)}
          className="flex items-center justify-center px-4 py-2.5 rounded-full text-[10px] font-mono font-black tracking-widest uppercase bg-white text-black shadow-lg active:scale-95 transition-transform shrink-0"
        >
          CONTACT
        </a>
      </motion.div>
    </>
  );
};

export default MorphicNavbar;
