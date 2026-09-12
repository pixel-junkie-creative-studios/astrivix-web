import React from 'react';
import { Scale, ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12 relative overflow-hidden font-sans selection:bg-white selection:text-black">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-purple-500/10 via-cyan-500/5 to-transparent blur-[140px] pointer-events-none" />

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono tracking-widest uppercase mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>TRANSPARENT TERMS</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-3">
            Terms of Service
          </h1>
          <p className="text-white/50 text-xs font-mono tracking-widest uppercase">
            ASTRIVIX CORP | LAST UPDATED SEPTEMBER 2026
          </p>
        </div>

        {/* Human-written content */}
        <div className="space-y-8 text-white/80 text-sm md:text-base leading-relaxed font-light">
          
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>100% Code & IP Ownership</span>
            </h2>
            <p className="text-white/70 text-sm leading-relaxed">
              When you pay for a project, you own it completely. Upon project completion, 100% of all source code, Figma design files, logos, and vector assets are transferred to your organization. Zero recurring licensing fees, zero vendor lock-in.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">1. Delivery Velocity</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Express sprints (landing pages, brand assets) deploy in 24 to 72 hours. Full custom web platforms and mobile apps typically take 2 to 6 weeks. Delivery timelines begin when project kick-off assets and initial deposits are confirmed.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">2. Milestone Pricing & Payments</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              We work on itemized fixed-price quotes (typically 50% deposit on kick-off, 50% on final launch) or dedicated monthly studio retainers. No hidden fees or surprise charges.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">3. Confidentiality & NDAs</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Your business logic, product roadmaps, and trade secrets are kept 100% confidential. We execute mutual non-disclosure agreements (NDAs) prior to any project kick-off or code audit.
            </p>
          </div>

          <div id="disclaimer" className="border-t border-b border-white/10 py-6 my-6 space-y-2">
            <h3 className="text-lg font-semibold text-white">4. Legal Disclaimer</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              We engineer clean, modern, zero-latency code and test extensively prior to launch. Deliverables are provided with our standard SLA guarantees and post-launch technical support.
            </p>
          </div>

          {/* Contact Box */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-white">Need a custom contract or MSA?</h4>
              <p className="text-xs text-white/50 font-mono mt-0.5">We provide tailored Master Services Agreements for enterprise clients.</p>
            </div>
            <a 
              href="mailto:business@astrivix.in" 
              className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-cyan-300 transition-colors shrink-0"
            >
              TALK TO US
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
