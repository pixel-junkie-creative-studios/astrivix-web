import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, CheckCircle, Mail, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
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
    <div className="min-h-screen w-full bg-black text-white relative flex flex-col justify-between p-6 md:p-12 overflow-hidden selection:bg-pink-500 selection:text-white">
      <SEOManager
        title="VIP Waitlist Access | Astrivix Corp"
        description="Join the exclusive Astrivix VIP Waitlist to receive priority access to our next-generation digital products, AI tools, and enterprise design frameworks."
        url="https://www.astrivix.in/waitlist"
      />

      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Header link back */}
      <header className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-pink-500/40 text-xs font-mono tracking-wider text-white/80 hover:text-white transition-all backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4 text-pink-400" />
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
          className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-2xl shadow-2xl shadow-pink-500/10"
        >
          <div className="w-16 h-16 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 mx-auto mb-6 shadow-lg shadow-pink-500/20">
            <Sparkles className="w-8 h-8" />
          </div>

          <h1 className="text-3xl md:text-4xl font-light text-white tracking-tight">
            Join the Exclusive <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 font-normal">Astrivix Waitlist</span>
          </h1>

          <p className="text-white/60 text-sm md:text-base mt-4 leading-relaxed">
            Be the first to access our upcoming zero-lag AI design tools, enterprise micro-frameworks, and priority client consulting slots.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-6 bg-pink-500/10 border border-pink-500/30 rounded-2xl flex flex-col items-center gap-3 text-pink-300"
            >
              <CheckCircle className="w-10 h-10 text-pink-400" />
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
                  className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/15 rounded-full text-sm text-white placeholder-white/40 focus:outline-none focus:border-pink-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-semibold text-sm rounded-full shadow-lg shadow-pink-500/25 transition-all tracking-wider uppercase flex items-center justify-center gap-2"
              >
                {loading ? 'RESERVING YOUR SPOT...' : 'CLAIM YOUR VIP ACCESS →'}
              </button>
            </form>
          )}

          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-white/40 font-mono">
            <ShieldCheck className="w-4 h-4 text-pink-400" />
            <span>Zero Spam. Unsubscribe anytime with 1 click.</span>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto text-center text-xs font-mono text-white/40 uppercase tracking-widest">
        Astrivix Corp © 2026 • All Rights Reserved
      </footer>
    </div>
  );
}
