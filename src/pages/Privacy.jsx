import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, FileText, Globe, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12 relative overflow-hidden font-sans selection:bg-white selection:text-black">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent blur-[140px] pointer-events-none" />

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono tracking-widest uppercase mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ENTERPRISE LEGAL COMPLIANCE</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/50 text-xs md:text-sm font-mono tracking-widest uppercase">
            EFFECTIVE DATE: SEPTEMBER 2026 | VERSION 2.4 | ASTRIVIX CORP
          </p>
        </div>

        {/* Policy Content Sections */}
        <div className="space-y-12 text-white/80 text-sm md:text-base leading-relaxed font-light">
          
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <Eye className="w-5 h-5 text-cyan-400" />
              <span>1. Overview & Commitment</span>
            </h2>
            <p className="mb-4">
              Astrivix Corp ("Astrivix", "we", "our", or "us") is committed to protecting the privacy, security, and integrity of your personal and corporate data. This Privacy Policy details how we collect, process, store, and safeguard information when you interact with our web platforms (www.astrivix.in), client portals, APIs, and software engineering services.
            </p>
            <p>
              By accessing our website or engaging our studio services, you consent to the data practices described in this policy in accordance with international data protection frameworks, including GDPR (EU) and CCPA (California).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-white flex items-center gap-3">
              <Lock className="w-5 h-5 text-purple-400" />
              <span>2. Information We Collect</span>
            </h2>
            <p>We collect information through direct communication, automated telemetry, and formal engagement onboarding:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
              <li><strong className="text-white">Direct Information:</strong> Name, professional email address (`business@astrivix.in`), phone number, business organization, project blueprints, and design requirements submitted via inquiry forms or scheduling tools.</li>
              <li><strong className="text-white">Automated Technical Telemetry:</strong> Anonymized IP addresses, browser fingerprint metadata, device hardware specs, referring URLs, and screen resolutions to optimize page speed, rendering performance, and 120 FPS frame stability.</li>
              <li><strong className="text-white">Communication Records:</strong> Transcripts of emails, WhatsApp business messages (`+91 77363 87794`), and consultation notes kept strictly under Non-Disclosure Agreements (NDAs).</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-white flex items-center gap-3">
              <FileText className="w-5 h-5 text-amber-400" />
              <span>3. How We Use Your Data</span>
            </h2>
            <p>Astrivix Corp processes data strictly for legitimate engineering and business purposes:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="font-mono text-xs text-cyan-300 font-bold uppercase mb-2">Service Delivery</h4>
                <p className="text-xs text-white/70">Architecting, deploying, and maintaining your custom software applications, design tokens, and Git repositories.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="font-mono text-xs text-purple-300 font-bold uppercase mb-2">Automated Notifications</h4>
                <p className="text-xs text-white/70">Sending AI-generated confirmation responses, project milestone updates, and invoice receipts.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="font-mono text-xs text-emerald-300 font-bold uppercase mb-2">Performance Optimization</h4>
                <p className="text-xs text-white/70">Monitoring 0-CLS stability, WebGL canvas FPS metrics, and edge CDN cache hit ratios.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="font-mono text-xs text-amber-300 font-bold uppercase mb-2">Legal Security</h4>
                <p className="text-xs text-white/70">Preventing unauthorized access, enforcing NDA terms, and ensuring tax/compliance reporting.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-white">4. Cookies & Web Telemetry</h2>
            <p>
              We utilize minimal, non-intrusive cookies and session tokens to store user preferences (such as dark mode preferences and active subsite states). We do NOT use invasive cross-site tracking cookies or sell your personal data to third-party ad networks.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-white">5. Data Retention & Third-Party Vendors</h2>
            <p>
              We store client communications and project metadata in secure, encrypted cloud databases. We utilize enterprise-grade infrastructure providers (such as Vercel Edge Network, FormSubmit, GitHub Enterprise, and Google Cloud) operating under ISO-27001 and SOC2 Type II certifications.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-white">6. Your Rights & Data Requests</h2>
            <p>
              Under global privacy legislation, you maintain the right to inspect, export, correct, or permanently purge your personal and organization data from our databases. To submit a formal data deletion or disclosure request, email our compliance officer at <a href="mailto:business@astrivix.in" className="text-cyan-400 underline">business@astrivix.in</a>.
            </p>
          </section>

          {/* Contact Box */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-white/10 via-white/5 to-transparent border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Questions Regarding Privacy Compliance?</h3>
              <p className="text-xs text-white/60 font-mono">Our legal team is available for custom compliance disclosures and NDA executions.</p>
            </div>
            <a 
              href="mailto:business@astrivix.in" 
              className="px-6 py-3 rounded-full bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-cyan-300 transition-colors shrink-0"
            >
              EMAIL PRIVACY OFFICER
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
