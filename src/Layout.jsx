import React from 'react';
import { motion } from 'framer-motion';
import SpaceScene from './components/SpaceScene';
import MagneticCursor from './components/MagneticCursor';
import { FloatingNav } from './components/ui/FloatingNav';

// Import all sections for SPA
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Careers from './pages/Careers';
import Contact from './pages/Contact';

export default function Layout() {
  const navItems = [
    { name: "Services", link: "#services" },
    { name: "Portfolio", link: "https://www.astrivix.in/portfolio-showcase" },
    { name: "About", link: "#about" },
    { name: "Careers", link: "#careers" },
  ];

  return (
    <div className="w-full max-w-[100vw] min-h-screen bg-zinc-50 dark:bg-[#050505] text-zinc-900 dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-500 relative">
      <MagneticCursor />
      
      {/* 3D WebGL Space Journey Background */}
      <SpaceScene />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,0,0,0.05),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,120,120,0.1),rgba(255,255,255,0))]" />

      {/* ACETERNITY FLOATING NAV */}
      <FloatingNav navItems={navItems} />

      <div className="relative z-10 w-full mx-auto flex flex-col items-center">
        
        {/* SPA Sections Stacked Logically */}
        <div id="home" className="w-full">
          <Home />
        </div>
        
        <div className="w-full relative z-20">
          <Services />
        </div>
        
        <div id="about" className="w-full relative z-20">
          <About />
        </div>

        <div id="careers" className="w-full relative z-20">
          <Careers />
        </div>
        
        <div id="contact" className="w-full relative z-20">
          <Contact />
        </div>

        {/* FOOTER */}
        <footer className="w-full relative z-20 mt-16 md:mt-32 bg-white/5 backdrop-blur-xl border-t border-white/10 overflow-hidden rounded-t-[3rem] pb-24 md:pb-0 text-center md:text-left">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16 pt-16 md:pt-24 pb-8 relative z-10">
            <div className="flex flex-col md:grid md:grid-cols-4 gap-12 md:gap-8 mb-16 md:mb-24 items-center md:items-start">
              
              {/* Brand & Newsletter */}
              <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start w-full">
                <h3 className="text-3xl font-light mb-6 tracking-widest uppercase text-white">Astrivix Corp.</h3>
                <p className="text-white/50 text-sm mb-8 max-w-md leading-relaxed">
                  Engineering digital perfection. Subscribe to our newsletter to receive the latest updates, case studies, and industry insights.
                </p>
                <div className="flex w-full max-w-md bg-white/5 border border-white/10 rounded-full p-1 pl-4 md:pl-6 backdrop-blur-md focus-within:border-white/30 transition-colors">
                  <input type="email" placeholder="ENTER EMAIL ADDRESS" className="bg-transparent text-[10px] md:text-sm w-full outline-none text-white placeholder-white/30 tracking-widest" />
                  <button className="px-4 md:px-6 py-3 bg-white text-black text-[10px] md:text-xs font-bold tracking-widest rounded-full hover:bg-zinc-200 transition-colors">SUBSCRIBE</button>
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-col items-center md:items-start w-full">
                <h4 className="text-xs font-mono tracking-[0.2em] text-white/40 mb-6">Navigation</h4>
                <div className="flex flex-col gap-4 text-sm text-white/70">
                  <a href="#services" className="hover:text-white transition-colors">Services</a>
                  <a href="#about" className="hover:text-white transition-colors">About Us</a>
                  <a href="#careers" className="hover:text-white transition-colors">Careers</a>
                  <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                </div>
              </div>

              {/* Legal & Social */}
              <div className="flex flex-col items-center md:items-start w-full">
                <h4 className="text-xs font-mono tracking-[0.2em] text-white/40 mb-6">Legal / Social</h4>
                <div className="flex flex-col gap-4 text-sm text-white/70">
                  <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
                  <div className="mt-6 md:mt-4 flex gap-6 md:gap-4 justify-center md:justify-start">
                    <a href="#twitter" className="hover:text-white transition-colors text-[10px] md:text-xs font-mono tracking-widest opacity-60 hover:opacity-100">X / TWITTER</a>
                    <a href="#linkedin" className="hover:text-white transition-colors text-[10px] md:text-xs font-mono tracking-widest opacity-60 hover:opacity-100">LINKEDIN</a>
                  </div>
                </div>
              </div>

            </div>

            {/* Massive Typography Watermark */}
            <div className="w-full flex justify-center items-center border-t border-white/10 pt-10 md:pt-16 pb-8 overflow-hidden">
              <h1 className="text-[20vw] md:text-[14vw] leading-[0.8] font-bold tracking-tighter text-white/5 select-none pointer-events-none">
                ASTRIVIX
              </h1>
            </div>
            
            {/* Copyright Row */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5 text-[10px] font-mono tracking-[0.3em] text-white/30 uppercase text-center">
              <span>Astrivix Corp © 2026</span>
              <span>Engineering Digital Perfection</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
