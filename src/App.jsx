import React, { useEffect, useRef, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import Layout from './Layout';

// Subsites Code Splitting
const NotFound = lazy(() => import('./pages/NotFound'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const PortfolioSubsite = lazy(() => import('./pages/PortfolioSubsite'));
const FinancialConsultingSubsite = lazy(() => import('./pages/FinancialConsultingSubsite'));

function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Force browser to ALWAYS start at top of page on refresh or reload
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Force Lenis to scroll to top immediately on mount
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      if (lenisRef.current?.lenis) {
        lenisRef.current.lenis.scrollTo(0, { immediate: true });
      }
    }, 100);

    // Sync GSAP ScrollTrigger ticker for lag smoothing
    gsap.ticker.lagSmoothing(0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/services" element={<Layout />} />
          <Route path="/about" element={<Layout />} />
          <Route path="/careers" element={<Layout />} />
          <Route path="/contact" element={<Layout />} />
          <Route path="/privacy" element={
            <Suspense fallback={<div className="bg-black w-full h-screen" />}>
              <Privacy />
            </Suspense>
          } />
          <Route path="/terms" element={
            <Suspense fallback={<div className="bg-black w-full h-screen" />}>
              <Terms />
            </Suspense>
          } />
          <Route path="*" element={
            <Suspense fallback={<div className="bg-black w-full h-screen" />}>
              <NotFound />
            </Suspense>
          } />
          
          {/* ISOLATED SUBSITE ROUTES */}
          <Route path="/portfolio" element={
            <Suspense fallback={<div className="bg-black w-full h-screen" />}>
              <PortfolioSubsite />
            </Suspense>
          } />
          <Route path="/portfolio-showcase" element={
            <Suspense fallback={<div className="bg-black w-full h-screen" />}>
              <PortfolioSubsite />
            </Suspense>
          } />
          <Route path="/financial-consulting" element={
            <Suspense fallback={<div className="bg-black w-full h-screen" />}>
              <FinancialConsultingSubsite />
            </Suspense>
          } />
        </Routes>
      </BrowserRouter>
    </ReactLenis>
  );
}

export default App;
