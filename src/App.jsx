import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';

import Layout from './Layout';

// Ultra-fast Code Splitting
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const PortfolioShowcase = lazy(() => import('./pages/PortfolioShowcase'));

function App() {
  useEffect(() => {
    // Force browser to ALWAYS start at the top of the page on refresh/new tab
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Ultra-Smooth 120Hz Lenis Config
    const lenis = new Lenis({
      lerp: 0.05,
      wheelMultiplier: 1.2,
      smoothWheel: true,
      syncTouch: true,
    });
    
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <Suspense fallback={null}>
              <Home />
            </Suspense>
          } />
          <Route path="services" element={
            <Suspense fallback={null}>
              <Services />
            </Suspense>
          } />
          <Route path="about" element={
            <Suspense fallback={null}>
              <About />
            </Suspense>
          } />
          <Route path="contact" element={
            <Suspense fallback={null}>
              <Contact />
            </Suspense>
          } />
        </Route>
        
        {/* ISOLATED PREVIEW ROUTE */}
        <Route path="/portfolio-preview" element={
          <Suspense fallback={<div className="bg-black w-full h-screen"></div>}>
            <PortfolioShowcase />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
