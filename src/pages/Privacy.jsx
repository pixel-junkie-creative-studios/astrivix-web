import React from 'react';
import { Shield, Lock, Eye, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Privacy() {
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
            <Shield className="w-3.5 h-3.5" />
            <span>DATA GOVERNANCE & PRIVACY SPECIFICATION</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-3">
            Privacy Policy
          </h1>
          <p className="text-white/40 text-xs font-mono tracking-widest uppercase">
            ASTRIVIX CORP | REVISION 2026.09 | GOVERNANCE SPECIFICATION
          </p>
        </div>

        {/* Executive Summary Card */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#0B0B10] border border-white/15 mb-10">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-400" />
            <span>Executive Privacy Commitment</span>
          </h2>
          <p className="text-white/80 text-sm leading-relaxed font-light">
            Astrivix Corp operates under strict confidentiality protocols. We do not sell client data, employ cross-site tracking scripts, or share proprietary project blueprints. All communications, code specifications, and business disclosures remain confidential under mutual non-disclosure agreements.
          </p>
        </div>

        {/* Policy Sections Grid */}
        <div className="space-y-6">
          
          <div className="p-6 rounded-xl bg-[#0E0E16] border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
              <span>SECTION 01</span>
              <span>•</span>
              <span>INFORMATION COLLECTION</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Data Collected</h3>
            <p className="text-white/70 text-sm leading-relaxed font-light mb-4">
              We collect information explicitly submitted via inquiry forms or communication channels, including name, business email address, project scope, and budget estimation.
            </p>
            <ul className="space-y-2 text-xs font-mono text-white/80">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Contact Details: Name, Email Address, WhatsApp Handle</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Project Specifications: Scope, Budget Ranges, Technical Architecture</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-xl bg-[#0E0E16] border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
              <span>SECTION 02</span>
              <span>•</span>
              <span>PURPOSE & UTILIZATION</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">How Data Is Used</h3>
            <p className="text-white/70 text-sm leading-relaxed font-light">
              Submitted information is used exclusively to evaluate technical feasibility, generate proposal statements of work, and communicate project milestones. We never sell, rent, or trade client information to data brokers or third-party ad platforms.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#0E0E16] border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
              <span>SECTION 03</span>
              <span>•</span>
              <span>COOKIES & TELEMETRY</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Cookie & Telemetry Standards</h3>
            <p className="text-white/70 text-sm leading-relaxed font-light">
              Our website uses minimal, non-invasive session cookies required strictly for user preference persistence (such as theme preferences). We do not load advertising tracking pixels or third-party fingerprinting scripts.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#0E0E16] border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
              <span>SECTION 04</span>
              <span>•</span>
              <span>CONFIDENTIALITY & NDA HANDOVER</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Repository & Asset Security</h3>
            <p className="text-white/70 text-sm leading-relaxed font-light">
              All proprietary project code, repository links, Figma files, and internal documents are handled using encrypted storage protocols. Mutual NDAs are executed prior to onboarding.
            </p>
          </div>

          {/* Contact Box */}
          <div className="mt-10 p-6 md:p-8 rounded-2xl bg-[#0B0B10] border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-base font-semibold text-white">Have questions regarding data governance?</h4>
              <p className="text-xs text-white/50 font-mono mt-1">Direct inquiries to business@astrivix.in</p>
            </div>
            <a 
              href="mailto:business@astrivix.in" 
              className="px-5 py-2.5 rounded-lg bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors shrink-0"
            >
              EMAIL PRIVACY OFFICER
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
