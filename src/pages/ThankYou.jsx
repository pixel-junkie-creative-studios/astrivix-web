import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, Home, ArrowRight } from 'lucide-react';
import SEOManager from '../components/ui/SEOManager';

export default function ThankYou() {
  return (
    <div className="min-h-screen w-full bg-black text-white relative flex flex-col justify-between p-6 md:p-12 overflow-hidden selection:bg-white selection:text-black">
      <SEOManager
        title="Inquiry Confirmed | Astrivix Corp"
        description="Thank you for contacting Astrivix Corp. Our team has received your message and will reach out within 24 hours."
        url="https://www.astrivix.in/thank-you"
      />

      {/* Header link back */}
      <header className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-xs font-mono tracking-wider text-white/80 hover:text-white transition-all backdrop-blur-md"
        >
          <Home className="w-4 h-4 text-emerald-400" />
          <span>RETURN HOME</span>
        </Link>
        <span className="text-xs font-mono tracking-[0.3em] text-white/40 uppercase">ASTRIVIX CONFIRMATION</span>
      </header>

      {/* Main Content Card */}
      <main className="relative z-10 my-auto max-w-xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-2xl shadow-2xl flex flex-col items-center"
        >
          <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-emerald-400 mb-6 shadow-xl">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight">
            Inquiry <span className="text-white/80 font-normal">Received</span>
          </h1>

          <p className="text-white/60 text-sm md:text-base mt-4 leading-relaxed max-w-md">
            Thank you for reaching out. An Astrivix project strategist will review your requirements and respond within <strong className="text-white">24 hours</strong>.
          </p>

          <div className="w-full h-px bg-white/10 my-8" />

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Link
              to="/"
              className="w-full sm:w-auto flex-1 py-3.5 px-6 bg-white text-black hover:bg-zinc-200 font-bold text-xs rounded-full shadow-lg transition-all tracking-widest uppercase flex items-center justify-center gap-2"
            >
              <span>Back to Home</span>
            </Link>
            <a
              href="https://wa.me/917736387794?text=Hi%20Astrivix%20Team%2C%20I%20just%20submitted%20an%20inquiry%20on%20your%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 py-3.5 px-6 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-full border border-white/15 transition-all tracking-widest uppercase flex items-center justify-center gap-2"
            >
              <span>WhatsApp Direct</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto text-center text-xs font-mono text-white/40 uppercase tracking-widest">
        <span>Astrivix Corp © 2026</span>
      </footer>
    </div>
  );
}
