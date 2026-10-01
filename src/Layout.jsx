import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import SpaceScene from './components/SpaceScene';
import MagneticCursor from './components/MagneticCursor';
import StaggeredMenu from './components/ui/StaggeredMenu';

// Import all sections for SPA
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import FAQSection from './components/ui/FAQSection';

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    // If route or hash targets contact/waitlist/services/etc, scroll to that section
    const path = location.pathname.toLowerCase();
    const hash = location.hash.toLowerCase();

    if (path === '/contact' || path === '/waitlist' || hash === '#contact') {
      setTimeout(() => {
        const contactElem = document.getElementById('contact');
        if (contactElem) {
          contactElem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else if (path === '/services' || hash === '#services') {
      setTimeout(() => {
        const servicesElem = document.getElementById('services');
        if (servicesElem) {
          servicesElem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else if (path === '/about' || hash === '#about') {
      setTimeout(() => {
        const aboutElem = document.getElementById('about');
        if (aboutElem) {
          aboutElem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else if (path === '/careers' || hash === '#careers') {
      setTimeout(() => {
        const careersElem = document.getElementById('careers');
        if (careersElem) {
          careersElem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Services', ariaLabel: 'View our services', link: '/services' },
    { label: 'Financial Consulting', ariaLabel: 'Financial Consulting Subsite', link: '/financial-consulting' },
    { label: 'Portfolio', ariaLabel: 'Portfolio Showcase Subsite', link: '/portfolio' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Careers', ariaLabel: 'View careers', link: '/careers' },
    { label: 'Contact', ariaLabel: 'Get in touch & client project inquiry form', link: '/contact' }
  ];

  return (
    <div className="w-full max-w-[100vw] min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black relative">
      <MagneticCursor />
      
      {/* 3D WebGL Space Journey Background */}
      <SpaceScene />

      {/* SINGLE UNIFIED GLASSMORPHISM FLOATING NAVBAR HEADER */}
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={[]}
        displaySocials={false}
        displayItemNumbering={true}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#10B981"
        accentColor="#10B981"
        changeMenuColorOnOpen={true}
        logoUrl="/assets/astreivix_nav_bar.mp4"
      />

      <main className="relative z-10 w-full mx-auto flex flex-col items-center">
        
        {/* SPA Sections Stacked Logically */}
        <div id="home" className="w-full relative z-10">
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

        {/* FAQ Section Positioned Right Before Footer */}
        <div id="faq" className="w-full relative z-20">
          <FAQSection />
        </div>
      </main>


        {/* FOOTER */}
        <footer className="w-full relative z-20 mt-16 md:mt-32 bg-[#0B0B10]/95 border-t border-white/10 overflow-hidden rounded-t-[3rem] pb-24 md:pb-0 text-center md:text-left">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16 pt-16 md:pt-24 pb-8 relative z-10">
            <div className="flex flex-col md:grid md:grid-cols-4 gap-12 md:gap-8 mb-16 md:mb-24 items-center md:items-start">
              
              {/* Brand & Newsletter */}
              <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start w-full">
                <h3 className="text-3xl font-light mb-4 tracking-widest uppercase text-white font-display">Astrivix Corp.</h3>
                <p className="text-white/60 text-sm mb-6 max-w-md leading-relaxed">
                  Join industry leaders receiving strategic insights, technological developments, and executive advisory briefings.
                </p>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const input = e.currentTarget.querySelector('input');
                    if (input && input.value) {
                      alert(`Thank you for subscribing, ${input.value}. You'll receive our executive briefings.`);
                      input.value = '';
                    }
                  }}
                  className="w-full max-w-md flex flex-row items-center bg-[#07070b]/90 border border-white/20 rounded-full p-1.5 pl-5 focus-within:border-cyan-400/80 focus-within:shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all duration-300"
                >
                  <input 
                    type="email" 
                    required
                    placeholder="ENTER YOUR WORK EMAIL" 
                    className="bg-transparent text-xs md:text-sm w-full outline-none text-white placeholder-white/40 tracking-wider font-mono selection:bg-white/20" 
                  />
                  <button 
                    type="submit"
                    className="px-5 md:px-7 py-2.5 md:py-3 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold tracking-widest uppercase rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300 flex-shrink-0 cursor-pointer active:scale-95"
                  >
                    SUBSCRIBE
                  </button>
                </form>
              </div>

              {/* Links */}
              <div className="flex flex-col items-center md:items-start w-full">
                <h4 className="text-xs font-mono tracking-[0.2em] text-white/70 mb-6">Navigation</h4>
                <div className="flex flex-col gap-4 text-sm text-white/80">
                  <a href="#services" className="hover:text-white transition-colors">Services</a>
                  <a href="#about" className="hover:text-white transition-colors">About Us</a>
                  <a href="#careers" className="hover:text-white transition-colors">Careers</a>
                  <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                  <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
                </div>
              </div>

              {/* Legal & Social */}
              <div className="flex flex-col items-center md:items-start w-full">
                <h4 className="text-xs font-mono tracking-[0.2em] text-white/70 mb-6">Legal & CSR</h4>
                <div className="flex flex-col gap-4 text-sm text-white/80">
                  <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                  <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                  <Link to="/terms#disclaimer" className="hover:text-white transition-colors">Legal Disclaimer</Link>
                  <Link to="/csr" className="hover:text-rose-400 font-semibold text-rose-300 transition-colors flex items-center gap-1.5">
                    <span>Astrivix Founders Grant</span>
                  </Link>
                  <div className="mt-6 md:mt-4 flex flex-wrap gap-4 md:gap-5 justify-center md:justify-start items-center">
                    <a href="https://www.instagram.com/astrivix.in/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors text-[10px] md:text-xs font-mono tracking-widest text-white/80 hover:opacity-100 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      <span>INSTAGRAM</span>
                    </a>
                    <a href="https://wa.me/917736387794" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors text-[10px] md:text-xs font-mono tracking-widest text-white/80 hover:opacity-100 flex items-center gap-1.5">
                      <span>WHATSAPP</span>
                    </a>
                    <a href="mailto:business@astrivix.in" className="hover:text-cyan-400 transition-colors text-[10px] md:text-xs font-mono tracking-widest text-white/80 hover:opacity-100 flex items-center gap-1.5">
                      <span>EMAIL</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Massive Typography Watermark */}
            <div className="w-full flex justify-center items-center border-t border-white/10 pt-10 md:pt-16 pb-8 overflow-hidden">
              <div className="text-[20vw] md:text-[14vw] leading-[0.8] font-bold tracking-tighter text-white/5 select-none pointer-events-none font-display">
                ASTRIVIX
              </div>
            </div>
            
            {/* Copyright & Tagline Row */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5 text-[10px] font-mono tracking-[0.2em] text-white/50 uppercase text-center font-bold">
              <span>Astrivix Corp Business Consultants © 2026</span>
              <span>Engineering Advanced Digital Architecture & Strategic Advisory</span>
            </div>

            {/* Hidden Semantic AEO & GEO Micro-Data Container for Search Crawlers */}
            <div className="sr-only" aria-hidden="true">
              <h2>Astrivix Corp Business Consultants & Internship Opportunities</h2>
              <p>Astrivix Corp offers remote and on-site internships across India for students in B.Tech, BBA, B.Com, BCA, BSc IT, MBA, MCA, M.Com, and MSc IT. Apply for internships near me, online tech internships, software development, marketing, and design programs.</p>
              <ul>
                <li>Astrivix Corp Internship Program 2026</li>
                <li>B.Tech Internship Near Me / Online India</li>
                <li>BBA & MBA Management Internship India</li>
                <li>B.Com & M.Com Business Internship</li>
                <li>BCA & MCA Software Development Internship</li>
                <li>BSc IT & MSc IT Computer Science Internship</li>
                <li>Integrated Brand Architecture</li>
                <li>Enterprise Software Engineering</li>
                <li>Mobile Application Development</li>
              </ul>
            </div>
          </div>
        </footer>

    </div>
  );
}
