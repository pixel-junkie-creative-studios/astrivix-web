import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SpaceScene from './components/SpaceScene';
import Starfield from './components/Starfield';
import MagneticCursor from './components/MagneticCursor';
import { MorphicNavbar } from './components/ui/MorphicNavbar';
import SEOManager from './components/ui/SEOManager';
import Breadcrumbs from './components/ui/Breadcrumbs';
import FAQSection from './components/ui/FAQSection';
import CookieConsent from './components/ui/CookieConsent';

// Import all sections for SPA
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Careers from './pages/Careers';
import Contact from './pages/Contact';

export default function Layout() {
  useEffect(() => {
    // Ensure homepage layout ALWAYS starts at top (0, 0) Hero section
    window.scrollTo(0, 0);
  }, []);

  const navItems = [
    { name: "Services", link: "#services" },
    { name: "Financial Consulting", link: "/financial-consulting" },
    { name: "Portfolio", link: "/portfolio" },
    { name: "About", link: "#about" },
    { name: "Careers", link: "#careers" },
    { name: "FAQ", link: "#faq" },
  ];

  return (
    <div className="w-full max-w-[100vw] min-h-screen bg-transparent text-zinc-900 dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-500 relative">
      <SEOManager />
      <MagneticCursor />
      <CookieConsent />
      
      {/* 3D WebGL Space Journey & 2D Canvas Starfield Background */}
      <Starfield />
      <SpaceScene />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-30 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,0,0,0.05),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,120,120,0.1),rgba(255,255,255,0))]" />

      {/* KOKONUT UI MORPHIC NAVBAR */}
      <MorphicNavbar navItems={navItems} />

      <main className="relative z-10 w-full mx-auto flex flex-col items-center">
        
        {/* SPA Sections Stacked Logically */}
        <div id="home" className="w-full">
          <Home />
        </div>

        <div className="w-full relative z-20 pt-4">
          <Breadcrumbs />
        </div>
        
        <div id="services" className="w-full relative z-20">
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

        {/* FAQ AT LAST — Placed directly above Footer as requested */}
        <div id="faq" className="w-full relative z-20">
          <FAQSection />
        </div>

        {/* FOOTER */}
        <footer className="w-full relative z-20 mt-16 md:mt-32 bg-white/5 backdrop-blur-xl border-t border-white/10 overflow-hidden rounded-t-[3rem] pb-24 md:pb-0 text-center md:text-left">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16 pt-16 md:pt-24 pb-8 relative z-10">
            <div className="flex flex-col md:grid md:grid-cols-4 gap-12 md:gap-8 mb-16 md:mb-24 items-center md:items-start">
              
              {/* Brand & Newsletter */}
              <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start w-full">
                <h2 className="text-3xl font-light mb-6 tracking-widest uppercase text-white">Astrivix Corp.</h2>
                <p className="text-white/50 text-sm mb-8 max-w-md leading-relaxed">
                  Engineering digital perfection across branding, web, mobile, marketing, and enterprise consulting.
                </p>
                <div className="flex w-full max-w-md bg-white/5 border border-white/10 rounded-full p-1 pl-4 md:pl-6 backdrop-blur-md focus-within:border-white/30 transition-colors">
                  <input type="email" placeholder="ENTER EMAIL ADDRESS" aria-label="Enter Email Address" className="bg-transparent text-[10px] md:text-sm w-full outline-none text-white placeholder-white/30 tracking-widest" />
                  <button aria-label="Subscribe to Newsletter" className="px-4 md:px-6 py-3 bg-white text-black text-[10px] md:text-xs font-bold tracking-widest rounded-full hover:bg-zinc-200 transition-colors">SUBSCRIBE</button>
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
                  <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
                </div>
              </div>

              {/* Legal & Social */}
              <div className="flex flex-col items-center md:items-start w-full">
                <h4 className="text-xs font-mono tracking-[0.2em] text-white/40 mb-6">Legal / Access</h4>
                <div className="flex flex-col gap-4 text-sm text-white/70">
                  <Link to="/waitlist" className="hover:text-white transition-colors text-white/80 font-semibold">VIP Waitlist</Link>
                  <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                  <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
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
            
            {/* Copyright & Tagline Row */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5 text-[10px] font-mono tracking-[0.3em] text-white/50 uppercase text-center font-bold">
              <span>Astrivix Corp © 2026</span>
              <span>Engineering Digital Perfection & Modern Architecture</span>
            </div>

            {/* Hidden Semantic AEO Micro-Data Container for Search Crawlers */}
            <div className="sr-only" aria-hidden="true">
              <h2>Astrivix Corp Global Digital Agency & Enterprise Engineering</h2>
              <p>Astrivix Corp (www.astrivix.in) is an elite global agency specializing in enterprise web development, mobile app engineering, custom branding systems, conversion rate optimization, digital marketing, graphic design, motion graphics, and business consulting.</p>
              <ul>
                <li>Integrated Branding & Logo Architecture</li>
                <li>Enterprise Web Development & React Engineering</li>
                <li>Mobile App Engineering for iOS and Android</li>
                <li>Performance Digital Marketing & Programmatic SEO</li>
                <li>Conversion Rate Optimization & Checkout Perfection</li>
                <li>Graphic Design & Custom UI UX Systems</li>
                <li>Motion Graphics & Video Production</li>
                <li>Enterprise Business & Financial Consulting</li>
              </ul>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
