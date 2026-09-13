import React from 'react';
import { Shield, Lock, Eye, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12 relative overflow-hidden font-sans selection:bg-white selection:text-black">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-mono tracking-widest uppercase mb-8 hover:bg-white hover:text-black transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN HOME</span>
        </Link>

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono tracking-widest uppercase mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>SIMPLE & TRANSPARENT</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-3">
            Privacy Policy
          </h1>
          <p className="text-white/50 text-xs font-mono tracking-widest uppercase">
            ASTRIVIX CORP | LAST UPDATED SEPTEMBER 2026
          </p>
        </div>

        {/* Human-written content */}
        <div className="space-y-8 text-white/80 text-sm md:text-base leading-relaxed font-light">
          
          <div className="p-6 rounded-2xl bg-[#0E0E16] border border-white/10">
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>The Short Version</span>
            </h2>
            <p className="text-white/70 text-sm leading-relaxed">
              We respect your privacy. We don't sell your data, track you across the web, or flood your inbox with spam. Any information you share with us stays strictly between you and Astrivix Corp under NDA.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">1. What We Collect</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              When you send us an inquiry or reach out via WhatsApp/email, we collect your name, email, budget range, and project brief. This is solely so we can evaluate your requirements and get back to you with an estimate.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">2. How We Use It</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              We use your contact details exclusively to communicate with you about your project, send quotes, and deliver your codebase. We never share, sell, or rent client data to any third-party advertisers or data brokers.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">3. Cookies & Analytics</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Our site uses standard session cookies only for basic user preferences (like dark mode). We do not use invasive tracking pixels or cross-site tracking scripts.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">4. Data Security & Confidentiality</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Your project blueprints, code repositories, and communications are kept confidential. We execute mutual non-disclosure agreements (NDAs) before reviewing sensitive project data.
            </p>
          </div>

          {/* Contact Box */}
          <div className="mt-10 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-white">Have questions about your data?</h4>
              <p className="text-xs text-white/50 font-mono mt-0.5">Reach out to us directly anytime at business@astrivix.in</p>
            </div>
            <a 
              href="mailto:business@astrivix.in" 
              className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-cyan-300 transition-colors shrink-0"
            >
              EMAIL US
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
