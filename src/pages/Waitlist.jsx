import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Mail, CheckCircle, ShieldCheck } from 'lucide-react';
import SEOManager from '../components/ui/SEOManager';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen w-full bg-black text-white relative flex flex-col justify-between p-6 md:p-12 overflow-hidden selection:bg-white selection:text-black">
      <SEOManager
        title="VIP Waitlist Access | Astrivix Corp"
        description="Join the exclusive Astrivix VIP Waitlist to receive priority access to our next-generation digital products, AI tools, and enterprise design frameworks."
        url="https://www.astrivix.in/waitlist"
      />

      {/* Header link back */}
      <header className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-xs font-mono tracking-wider text-white/80 hover:text-white transition-all backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4 text-white/80" />
          <span>RETURN TO HOME</span>
        </Link>
        <span className="text-xs font-mono tracking-[0.3em] text-white/40 uppercase">ASTRIVIX VIP ACCESS</span>
      </header>

      {/* Main Content Card */}
      <main className="relative z-10 my-auto max-w-xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-2xl shadow-2xl"
        >
          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/90 mx-auto mb-6 shadow-lg">
            <Sparkles className="w-8 h-8" />
          </div>

          <h1 className="text-3xl md:text-4xl font-light text-white tracking-tight">
            Join the Exclusive <span className="text-white font-normal underline decoration-white/30">Astrivix Waitlist</span>
          </h1>

          <p className="text-white/60 text-sm md:text-base mt-4 leading-relaxed">
            Be the first to access our upcoming zero-lag AI design tools, enterprise micro-frameworks, and priority client consulting slots.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-6 bg-white/10 border border-white/20 rounded-2xl flex flex-col items-center gap-3 text-white"
            >
              <CheckCircle className="w-10 h-10 text-white" />
              <span className="font-semibold text-lg">You're on the list!</span>
              <p className="text-xs text-white/70">
                We've reserved your VIP position. Keep an eye on <strong className="text-white">{email}</strong> for launch updates.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  required
                  placeholder="Enter your business email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/15 rounded-full text-sm text-white placeholder-white/40 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-white text-black hover:bg-zinc-200 font-bold text-sm rounded-full shadow-lg transition-all tracking-wider uppercase flex items-center justify-center gap-2"
              >
                {loading ? 'RESERVING YOUR SPOT...' : 'CLAIM YOUR VIP ACCESS →'}
              </button>
            </form>
          )}

          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-white/40 font-mono">
            <ShieldCheck className="w-4 h-4 text-white/60" />
            <span>Zero Spam. Unsubscribe anytime with 1 click.</span>
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
