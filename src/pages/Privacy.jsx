import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "1. Global Scope & Overview",
      content: `Astrivix Corp ("Astrivix", "Company", "we", "us", or "our") is committed to protecting your privacy and ensuring the security of your personal data. This Privacy Policy outlines our global data practices, explaining how we collect, use, store, process, disclose, and protect personal information when you visit www.astrivix.in ("Website"), engage with our digital software platforms, subscribe to our insights, or utilize our web development, mobile app engineering, branding, performance marketing, and consulting services ("Services").

This policy applies globally to all clients, website visitors, partners, and job applicants across all jurisdictions in which Astrivix operates, including but not limited to the United States, the European Union, the United Kingdom, the United Arab Emirates, India, and Australia.`
    },
    {
      title: "2. Information We Collect",
      content: `We collect personal information through direct interactions, automated tracking technologies, and authorized third-party integrations.

A. Information You Provide Directly:
• Contact Credentials: Name, enterprise email address, phone number, corporate physical address, and job title.
• Project Specifications: Project briefs, technical blueprints, design assets, financial parameters, and communication records submitted via web forms, direct email, or scheduling tools.
• Billing & Transaction Data: Invoicing details, tax identification numbers, corporate bank details, and payment processing metadata (note: credit card details are processed directly by certified PCI-DSS compliant gateways and are never stored on our servers).
• Career Applications: Résumés, portfolio samples, cover letters, and employment history submitted for open positions.

B. Automatically Collected Technical Data:
• Device & Telemetry Data: IP address, browser type and version, operating system, screen resolution, preferred language, and device hardware specifications.
• Usage & Interaction Patterns: Time spent on pages, clickstream data, scroll depth, exit pages, and referral URLs recorded via telemetry scripts.
• Performance Diagnostics: WebGL render capabilities, framerate performance metrics, error logs, and network load timing.`
    },
    {
      title: "3. Legal Basis & Processing Purposes",
      content: `We process personal data only when authorized under valid legal bases recognized by applicable data protection legislation (including GDPR Art. 6 and India DPDP Act 2023):

1. Performance of Contract: Executing software development contracts, delivering agency services, providing client portal access, and processing transactions.
2. Legitimate Interests: Enhancing platform security, preventing fraud, optimizing WebGL graphics performance, conducting internal research, and communicating enterprise project updates.
3. Legal Compliance: Fulfilling corporate statutory record-keeping, tax filings, anti-money laundering (AML) protocols, and lawful government requests.
4. Express Consent: Sending marketing newsletters, client case studies, direct promotional offers, or utilizing non-essential analytics cookies (consent can be revoked at any time).`
    },
    {
      title: "4. Cookies & Advanced Telemetry",
      content: `Astrivix utilizes cookies, local storage objects, and session telemetry to deliver an ultra-fast, fluid user experience:

• Essential Cookies: Necessary for security authentication, CSRF token validation, and session navigation state.
• Analytics Cookies: Anonymous telemetry measuring page latency, interaction heatmaps, and Core Web Vitals performance.
• Preference Cookies: Remembering dark mode settings and user language selections.

You can modify your browser settings to reject non-essential cookies. However, disabling essential cookies may impact specific interactive 3D elements on the Website.`
    },
    {
      title: "5. Data Sharing & Third-Party Vendors",
      content: `Astrivix does not sell, rent, or lease personal information to third parties. We share data only under strict confidentiality obligations with trusted service providers:

• Infrastructure Providers: Cloud hosting nodes (Vercel, AWS, Google Cloud Platform) supporting site delivery.
• Analytics & Diagnostic Tools: Privacy-focused analytics providers monitoring system uptime and performance.
• Communications & CRM: Secure cloud email relays and enterprise CRM tools for client onboarding.
• Legal & Regulatory Authorities: When mandated by law, court order, or subpoena to protect legal rights or corporate safety.`
    },
    {
      title: "6. International Data Transfers",
      content: `As a global digital agency, Astrivix operates across multiple continents. Your personal data may be transferred to and processed on secure servers located outside your jurisdiction. 

For transfers of European Economic Area (EEA) or UK personal data to jurisdictions not deemed adequate by regulatory authorities, Astrivix enforces Standard Contractual Clauses (SCCs) and rigorous technical encryption (AES-256 in transit and at rest) to safeguard your data rights.`
    },
    {
      title: "7. Data Retention & Security Standards",
      content: `A. Security Measures: We deploy enterprise-grade physical, technical, and administrative safeguards, including end-to-end TLS 1.3 encryption, strict role-based access control (RBAC), multi-factor authentication, routine vulnerability scans, and Web Application Firewalls (WAF).

B. Retention Periods: Personal data associated with active client agreements is retained for the duration of the engagement plus 7 years to fulfill legal, tax, and audit obligations. Web analytics data is anonymized and automatically purged after 24 months.`
    },
    {
      title: "8. Your Privacy Rights",
      content: `Depending on your location (e.g., GDPR, CCPA/CPRA, India DPDP Act), you possess the following rights regarding your personal information:

• Right to Access: Request a copy of the personal data we hold about you.
• Right to Rectification: Request correction of inaccurate or incomplete records.
• Right to Erasure ("Right to be Forgotten"): Request deletion of personal data where legal retention grounds no longer apply.
• Right to Data Portability: Receive your data in a structured, machine-readable format (JSON/CSV).
• Right to Object & Restrict: Limit or object to direct marketing or automated processing.

To exercise any of these rights, submit a formal written request to our Data Protection Officer at privacy@astrivix.in.`
    },
    {
      title: "9. Contact & Regulatory Representation",
      content: `If you have questions, complaints, or requests concerning this Privacy Policy or our data protection practices, please contact our legal team:

Astrivix Corp — Legal & Compliance Division
Email: privacy@astrivix.in
Website: https://www.astrivix.in`
    }
  ];

  return (
    <div className="min-h-screen bg-[#050509] text-white pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden font-sans">
      {/* Subtle Background Glow */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(120,120,150,0.1),transparent)]" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Back Button */}
        <motion.a
          href="/"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-white/60 hover:text-white uppercase mb-8 transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> BACK TO ASTRIVIX
        </motion.a>

        {/* Title Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-metallic p-8 md:p-12 rounded-[2.5rem] border border-white/20 shadow-2xl mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
            <div>
              <span className="text-xs font-mono tracking-[0.3em] text-white/50 uppercase block mb-2">Legal Compliance Framework</span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase text-white">Privacy Policy</h1>
            </div>
            <div className="text-left md:text-right text-xs font-mono text-white/40">
              <p>LAST REVISED: SEPTEMBER 2026</p>
              <p>STATUS: ACTIVE & ENFORCED</p>
            </div>
          </div>
          <p className="text-white/70 text-sm md:text-base leading-relaxed">
            This document sets forth the corporate privacy governance standard for Astrivix Corp across all global client engagements, web properties, and custom software systems.
          </p>
        </motion.div>

        {/* Structured Legal Sections */}
        <div className="flex flex-col gap-8">
          {sections.map((sec, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              className="glass-fast p-6 md:p-8 rounded-3xl border border-white/15 shadow-xl relative"
            >
              <h2 className="text-lg md:text-xl font-bold uppercase tracking-wider text-white mb-4 border-b border-white/10 pb-3">
                {sec.title}
              </h2>
              <div className="text-white/70 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-normal">
                {sec.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center border-t border-white/10 pt-8 text-xs font-mono text-white/40 uppercase tracking-widest">
          Astrivix Corp © 2026 • Enterprise Data Governance
        </div>

      </div>
    </div>
  );
}
