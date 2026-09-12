import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileCheck, Scale, AlertTriangle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12 relative overflow-hidden font-sans selection:bg-white selection:text-black">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-purple-500/10 via-cyan-500/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-mono tracking-widest uppercase mb-8 hover:bg-white hover:text-black transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO HOME</span>
        </Link>

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono tracking-widest uppercase mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>TERMS, CONDITIONS & LEGAL DISCLAIMER</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-white/50 text-xs md:text-sm font-mono tracking-widest uppercase">
            EFFECTIVE DATE: SEPTEMBER 2026 | VERSION 3.1 | ASTRIVIX CORP
          </p>
        </div>

        {/* Policy Content Sections */}
        <div className="space-y-12 text-white/80 text-sm md:text-base leading-relaxed font-light">
          
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <FileCheck className="w-5 h-5 text-cyan-400" />
              <span>1. Agreement & Binding Acceptance</span>
            </h2>
            <p className="mb-4">
              These Terms of Service ("Terms") constitute a legally binding agreement between Astrivix Corp ("Astrivix", "Company", "we", or "us") and any individual, entity, or client ("Client", "you") accessing our website (www.astrivix.in) or executing a statement of work (SOW) for digital design, software engineering, branding, marketing, or financial consulting services.
            </p>
            <p>
              By accessing our digital properties or signing a project proposal, you confirm that you have read, understood, and agreed to be bound by all terms, conditions, and legal disclaimers herein.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-white flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>2. Intellectual Property & Code Ownership</span>
            </h2>
            <p>We believe in complete client ownership and autonomy:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
              <li><strong className="text-white">Full IP Transfer:</strong> Upon 100% completion of agreed milestone payments, Astrivix transfers full legal title, copyright, trademark rights, and intellectual property ownership of all custom deliverables (including React source code, Figma design files, logos, and vector assets) to the Client.</li>
              <li><strong className="text-white">Zero Royalty or License Lock-Ins:</strong> Clients retain perpetual, unrestricted rights to commercialize, modify, host, or transfer their software applications without paying ongoing hidden licensing fees to Astrivix.</li>
              <li><strong className="text-white">Open Source Components:</strong> Deliverables incorporating third-party open-source packages (e.g. React, Vite, Framer Motion, Tailwind CSS) remain subject to their respective open-source licenses (MIT, Apache 2.0).</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-white">3. Delivery Timelines & Express Sprints</h2>
            <p>
              Delivery schedules vary by scope: Express sprints (landing pages, brand assets) are deployed within 24 to 72 hours. Full-scale enterprise web applications and mobile apps range between 2 to 6 weeks. Timelines commence upon receipt of initial deposit and client asset handover. Client delays in feedback or asset delivery will proportionally adjust milestone completion dates.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-white">4. Payment Terms & Billing Schedules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="font-mono text-xs text-cyan-300 font-bold uppercase mb-2">Milestone Payments</h4>
                <p className="text-xs text-white/70">Standard project engagements are structured under phased milestone payments (e.g. 50% deposit, 25% staging preview, 25% final cutover).</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="font-mono text-xs text-purple-300 font-bold uppercase mb-2">Dedicated Retainers</h4>
                <p className="text-xs text-white/70">Monthly studio retainers are billed at the beginning of each 30-day billing cycle for dedicated engineering sprint hours.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-white">5. Confidentiality & Non-Disclosure (NDA)</h2>
            <p>
              Astrivix enforces strict confidentiality for all client business logic, trade secrets, data schemas, and unreleased product roadmaps. Both parties agree to protect confidential information with reasonable enterprise security measures during and after the engagement lifecycle.
            </p>
          </section>

          <section id="disclaimer" className="space-y-4 border-t border-b border-white/10 py-8 my-8">
            <h2 className="text-xl md:text-2xl font-semibold text-white flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>6. Legal Disclaimer & Warranty Limitation</span>
            </h2>
            <p className="text-white/70">
              DISCLAIMER OF WARRANTY: ALL SERVICES AND DIGITAL DELIVERABLES PROVIDED BY ASTRIVIX CORP ARE DELIVERED "AS IS" AND "AS AVAILABLE" WITH INDUSTRY-STANDARD SLA GUARANTEES. EXCEPT AS EXPRESSLY WRITTEN IN A FORMAL SOW, ASTRIVIX DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.
            </p>
            <p className="text-white/70">
              LIMITATION OF LIABILITY: IN NO EVENT SHALL ASTRIVIX CORP, ITS DIRECTORS, OR ENGINEERS BE LIABLE FOR INDIRECT, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM CLIENT SERVER MISCONFIGURATIONS, THIRD-PARTY HOSTING OUTAGES, OR UNAUTHORIZED THIRD-PARTY API ALTERATIONS BEYOND THE TOTAL CONTRACT VALUE PAID BY CLIENT.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-white">7. Governing Law & Dispute Resolution</h2>
            <p>
              These Terms shall be governed by and construed in accordance with international commercial law standards and the laws of India. Any disputes or claims arising out of or relating to these Terms shall be resolved through good-faith negotiations or binding arbitration.
            </p>
          </section>

          {/* Contact Box */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-white/10 via-white/5 to-transparent border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Require Custom Master Services Agreement (MSA)?</h3>
              <p className="text-xs text-white/60 font-mono">We execute enterprise MSAs, SLAs, and custom payment schedules for corporate clients.</p>
            </div>
            <a 
              href="mailto:business@astrivix.in" 
              className="px-6 py-3 rounded-full bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-cyan-300 transition-colors shrink-0"
            >
              CONTACT LEGAL COUNSEL
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
