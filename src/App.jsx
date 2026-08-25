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
const NotFound = lazy(() => import('./pages/NotFound'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));

import Preloader from './components/Preloader';

function App() {
  useEffect(() => {
    // Force browser to ALWAYS start at the top of the page on refresh/new tab
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Ultra-Smooth 120Hz Lenis Config (Butter smooth for '9000000 FPS' feel)
    const lenis = new Lenis({
      lerp: 0.07,
      wheelMultiplier: 1.0,
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
      <Preloader />
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
          <Route path="privacy" element={
            <Suspense fallback={null}>
              <Privacy />
            </Suspense>
          } />
          <Route path="terms" element={
            <Suspense fallback={null}>
              <Terms />
            </Suspense>
          } />
          {/* Catch-all route for Custom 404 */}
          <Route path="*" element={
            <Suspense fallback={null}>
              <NotFound />
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
