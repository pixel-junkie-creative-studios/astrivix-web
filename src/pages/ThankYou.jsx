import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Home, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOManager from '../components/ui/SEOManager';

export default function ThankYou() {
  return (
    <div className="min-h-screen w-full bg-black text-white relative flex flex-col justify-between p-6 md:p-12 overflow-hidden selection:bg-pink-500 selection:text-white">
      <SEOManager
        title="Thank You | Astrivix Corp"
        description="Thank you for reaching out to Astrivix Corp. Our team has received your message and will get back to you within 24 hours."
        url="https://www.astrivix.in/thank-you"
      />

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-pink-600/20 to-purple-600/20 rounded-full blur-[150px] pointer-events-none" />

      <header className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-pink-500/40 text-xs font-mono tracking-wider text-white/80 hover:text-white transition-all backdrop-blur-md"
        >
          <Home className="w-4 h-4 text-pink-400" />
          <span>RETURN HOME</span>
        </Link>
        <span className="text-xs font-mono tracking-[0.3em] text-white/40 uppercase">ASTRIVIX CONFIRMATION</span>
      </header>

      <main className="relative z-10 my-auto max-w-xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-2xl shadow-2xl shadow-pink-500/10 flex flex-col items-center"
        >
          <div className="w-20 h-20 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-6 shadow-xl shadow-pink-500/25">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h1 className="text-3xl md:text-4xl font-light text-white tracking-tight">
            Inquiry <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 font-normal">Received</span>
          </h1>

          <p className="text-white/70 text-sm md:text-base mt-4 leading-relaxed">
            Thank you for reaching out to Astrivix. One of our Senior Technical Leads will review your request and reply within <strong>24 hours</strong>.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full">
            <Link
              to="/"
              className="w-full sm:w-auto flex-1 py-3.5 px-6 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-full border border-white/10 transition-colors tracking-widest uppercase flex items-center justify-center gap-2"
            >
              <span>Explore Website</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/919946808726?text=Hello%20Astrivix!%20I%20just%20submitted%20an%20inquiry%20on%20your%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 py-3.5 px-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-semibold text-xs rounded-full shadow-lg shadow-pink-500/25 transition-all tracking-widest uppercase flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Instant WhatsApp Chat</span>
            </a>
          </div>
        </motion.div>
      </main>

      <footer className="relative z-10 w-full max-w-7xl mx-auto text-center text-xs font-mono text-white/40 uppercase tracking-widest">
        Astrivix Corp © 2026 • Engineering Perfection
      </footer>
    </div>
  );
}
