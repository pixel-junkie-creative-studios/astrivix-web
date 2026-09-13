import React from 'react';
import { Scale, ShieldCheck, CheckCircle2, ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#050508] text-white pt-32 pb-24 px-6 md:px-12 relative overflow-hidden font-sans selection:bg-white selection:text-black">
      
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0E0E16] border border-white/10 text-white/70 text-xs font-mono tracking-widest uppercase mb-8 hover:bg-white hover:text-black transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO HOME</span>
        </Link>

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono tracking-widest uppercase mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>COMMERCIAL & LEGAL TERMS</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-3">
            Terms of Service
          </h1>
          <p className="text-white/40 text-xs font-mono tracking-widest uppercase">
            ASTRIVIX CORP | REVISION 2026.09 | MASTER SERVICE TERMS
          </p>
        </div>

        {/* Executive Summary Card */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#0B0B10] border border-white/15 mb-10">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>100% Code & IP Ownership Guarantee</span>
          </h2>
          <p className="text-white/80 text-sm leading-relaxed font-light">
            Upon project completion and milestone finalization, 100% of all intellectual property, source code repositories, Figma design systems, vector logo assets, and custom media belong exclusively to your organization. Zero recurring licensing fees, zero platform lock-in.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-6">
          
          <div className="p-6 rounded-xl bg-[#0E0E16] border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
              <span>CLAUSE 01</span>
              <span>•</span>
              <span>DELIVERY VELOCITY & MILESTONES</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Sprint Delivery Timelines</h3>
            <p className="text-white/70 text-sm leading-relaxed font-light mb-4">
              Express brand and web sprints deploy in 24 to 72 hours. Full custom platforms, enterprise applications, and mobile apps typically range between 2 to 6 weeks. Timelines begin when initial project deposits and kick-off assets are confirmed.
            </p>
            <ul className="space-y-2 text-xs font-mono text-white/80">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Express Sprint Velocity: 24 to 72 Hours</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Custom Web & Mobile Platforms: 2 to 6 Weeks</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-xl bg-[#0E0E16] border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
              <span>CLAUSE 02</span>
              <span>•</span>
              <span>PAYMENT & MILESTONE BILLING</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Milestone Pricing Structure</h3>
            <p className="text-white/70 text-sm leading-relaxed font-light">
              Projects operate on itemized fixed-price statements of work (typically 50% deposit on kick-off, 50% on final production launch) or dedicated monthly studio retainers. No surprise charges or unvetted expenses.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#0E0E16] border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
              <span>CLAUSE 03</span>
              <span>•</span>
              <span>CONFIDENTIALITY & MUTUAL NDA</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Proprietary Protection</h3>
            <p className="text-white/70 text-sm leading-relaxed font-light">
              Client trade secrets, product blueprints, and technical architecture are kept strictly confidential. We execute mutual non-disclosure agreements prior to reviewing sensitive source code or strategic roadmaps.
            </p>
          </div>

          <div id="disclaimer" className="p-6 rounded-xl bg-[#0E0E16] border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
              <span>CLAUSE 04</span>
              <span>•</span>
              <span>LEGAL DISCLAIMER & SLA WARRANTY</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Engineering SLA Warranty</h3>
            <p className="text-white/70 text-sm leading-relaxed font-light">
              Deliverables are engineered following industry best practices and thoroughly audited across browsers and viewports prior to deployment. Post-launch support SLAs cover technical maintenance and performance stability.
            </p>
          </div>

          {/* MSA Contact Box */}
          <div className="mt-10 p-6 md:p-8 rounded-2xl bg-[#0B0B10] border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-base font-semibold text-white">Require a custom Master Services Agreement (MSA)?</h4>
              <p className="text-xs text-white/50 font-mono mt-1">We provide tailored enterprise contracts and procurement billing.</p>
            </div>
            <a 
              href="mailto:business@astrivix.in" 
              className="px-5 py-2.5 rounded-lg bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors shrink-0"
            >
              TALK TO LEGAL
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
