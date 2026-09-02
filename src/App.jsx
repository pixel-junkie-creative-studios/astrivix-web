import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
const PortfolioSubsite = lazy(() => import('./pages/PortfolioSubsite'));
const FinancialConsultingSubsite = lazy(() => import('./pages/FinancialConsultingSubsite'));



function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Force browser to ALWAYS start at the top of the page (Hero Section) on refresh or reload
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
        
        {/* ISOLATED FULL-SCREEN SUBSITE ROUTES */}
        <Route path="/portfolio" element={
          <Suspense fallback={<div className="bg-black w-full h-screen"></div>}>
            <PortfolioSubsite />
          </Suspense>
        } />
        <Route path="/portfolio-showcase" element={
          <Suspense fallback={<div className="bg-black w-full h-screen"></div>}>
            <PortfolioSubsite />
          </Suspense>
        } />
        <Route path="/financial-consulting" element={
          <Suspense fallback={<div className="bg-black w-full h-screen"></div>}>
            <FinancialConsultingSubsite />
          </Suspense>
        } />
        <Route path="/portfolio-preview" element={
          <Suspense fallback={<div className="bg-black w-full h-screen"></div>}>
            <PortfolioShowcase />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
    </ReactLenis>
  );
}

export default App;
