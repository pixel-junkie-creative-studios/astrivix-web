import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  ShieldCheck, 
  Clock, 
  CreditCard, 
  Code2, 
  HeartHandshake, 
  Lock, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'timeline', label: 'DELIVERY & TIMELINE' },
  { id: 'engineering', label: 'CUSTOM CODE' },
  { id: 'ip', label: 'IP & LEGAL' },
  { id: 'pricing', label: 'PRICING & RETENTION' },
  { id: 'csr', label: 'ASTRIVIX FOUNDERS GRANT' },
];

const faqs = [
  {
    id: "delivery-speed",
    category: "timeline",
    categoryLabel: "DELIVERY & TIMELINE",
    icon: Clock,
    badge: "24 HOURS – 6 WEEKS",
    question: "How fast can Astrivix engineer and launch our project?",
    shortAnswer: "Express brand identity and web sprints launch in 24–72 hours; complex custom platforms take 2–6 weeks.",
    detailedAnswer: "Timelines are scoped based on architecture requirements and launch goals. Express brand packages, high-converting launch pages, and campaign interfaces are delivered within 24 to 72 hours. Custom web platforms, complex web applications, and cross-platform mobile apps range between 2 to 6 weeks, backed by continuous live staging deployments.",
    highlights: [
      "24–72 Hour Express Sprint Option",
      "Live Staging & Continuous Deployment",
      "Milestone-Driven Delivery Tracking",
      "Zero-Downtime Production Launch"
    ],
    ctaText: "START YOUR PROJECT",
    ctaLink: "#contact"
  },
  {
    id: "code-ownership",
    category: "ip",
    categoryLabel: "IP & LEGAL",
    icon: ShieldCheck,
    badge: "100% IP TRANSFER",
    question: "Who owns the codebase, design systems, and intellectual property?",
    shortAnswer: "You retain 100% full ownership of all source code, Figma design files, and IP upon project completion.",
    detailedAnswer: "Upon project completion and milestone finalization, Astrivix transfers 100% of all intellectual property, vector brand assets, Figma component libraries, and Git source repositories to your organization. No hidden platform locks, zero recurring vendor fees, and complete code autonomy.",
    highlights: [
      "100% Copyright & IP Transfer",
      "Full GitHub Repository Handover",
      "Zero Recurring License Fees",
      "Self-Hostable Modular Code Architecture"
    ],
    ctaText: "REVIEW TERMS OF SERVICE",
    ctaLink: "/terms"
  },
  {
    id: "custom-stack",
    category: "engineering",
    categoryLabel: "CUSTOM CODE",
    icon: Code2,
    badge: "ZERO TEMPLATE BLOAT",
    question: "Do you use pre-built website templates or construct custom software?",
    shortAnswer: "Everything is engineered custom using modern frameworks tailored to your technical requirements.",
    detailedAnswer: "We engineer bespoke web applications and interactive digital systems using modern technology stacks including React, Next.js, Vite, Tailwind CSS, Framer Motion, and Three.js / WebGL. We do not use third-party page builders or heavy CMS templates, guaranteeing 100/100 performance scores and uncompromised UX control.",
    highlights: [
      "Custom React & WebGL Frontend",
      "100/100 Lighthouse Performance Guarantee",
      "Responsive Fluid Typography & Grid Systems",
      "Bespoke Micro-Interactions & Motion Physics"
    ],
    ctaText: "EXPLORE SERVICES",
    ctaLink: "#services"
  },
  {
    id: "pricing-structure",
    category: "pricing",
    categoryLabel: "PRICING & RETENTION",
    icon: CreditCard,
    badge: "FIXED MILESTONES",
    question: "How are project quotes and payment milestones structured?",
    shortAnswer: "Itemized fixed-price proposals or dedicated monthly studio retainers with zero hidden fees.",
    detailedAnswer: "Following initial discovery, we issue an itemized statement of work detailing technical scope, milestone delivery dates, and clear payment stages (typically 50% deposit on kick-off, 50% on production sign-off). We also offer dedicated monthly retainer models for ongoing product engineering and feature additions.",
    highlights: [
      "Itemized Fixed-Price Proposals",
      "Zero Hidden Fees or Surprise Charges",
      "Structured Milestone Payment Schedule",
      "Dedicated Monthly Retainer Options"
    ],
    ctaText: "REQUEST A PROPOSAL",
    ctaLink: "#contact"
  },
  {
    id: "sla-support",
    category: "timeline",
    categoryLabel: "DELIVERY & TIMELINE",
    icon: Zap,
    badge: "SLA GUARANTEED",
    question: "What SLA support and technical maintenance do you provide post-launch?",
    shortAnswer: "Continuous server monitoring, security patches, performance optimization, and SLA response times.",
    detailedAnswer: "Our engineering involvement extends beyond initial launch. We offer post-deploy maintenance SLAs including server uptime tracking, security patch integration, continuous performance tuning, and direct developer support for feature updates.",
    highlights: [
      "Global Infrastructure & Health Monitoring",
      "Dedicated Technical Response Windows",
      "Continuous Performance Auditing",
      "Managed Vercel & AWS Deployments"
    ],
    ctaText: "CONTACT STUDIO",
    ctaLink: "https://wa.me/917736387794"
  },
  {
    id: "nda-confidentiality",
    category: "ip",
    categoryLabel: "IP & LEGAL",
    icon: Lock,
    badge: "ENTERPRISE NDA",
    question: "Can we execute a Non-Disclosure Agreement (NDA) prior to project discovery?",
    shortAnswer: "Yes. Mutual NDAs are executed prior to reviewing proprietary architecture or sensitive business data.",
    detailedAnswer: "Client confidentiality and security are non-negotiable. Prior to any discovery call, code audit, or repository review, we execute a mutual NDA to protect your proprietary IP, technical specifications, and strategic roadmaps.",
    highlights: [
      "Mutual Legal NDA Execution",
      "Encrypted Asset Handover Protocols",
      "Strict Data Isolation Standards",
      "SOC-2 Compliant Handling Practices"
    ],
    ctaText: "REQUEST NDA",
    ctaLink: "#contact"
  },
  {
    id: "csr-grant",
    category: "csr",
    categoryLabel: "ASTRIVIX FOUNDERS GRANT",
    icon: HeartHandshake,
    badge: "PRO-BONO INITIATIVE",
    question: "What is the Astrivix Founders Grant?",
    shortAnswer: "Pro-bono brand identity, web engineering, and GTM support for ambitious student founders and early-stage builders under 22.",
    detailedAnswer: "Through the Astrivix Founders Grant initiative, we select promising student entrepreneurs and early-stage founders under 22 to receive 100% free pro-bono brand design, web engineering, and product launch collateral to help launch real ventures.",
    highlights: [
      "100% Free Pro-Bono Engineering & Design",
      "Custom Brand Suite & Web Application",
      "Go-To-Market & Product Strategy Assistance",
      "Dedicated to Builders Under 22 & Students"
    ],
    ctaText: "APPLY FOR GRANT",
    ctaLink: "/csr"
  }
];

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState('timeline');
  const [openFaqId, setOpenFaqId] = useState(faqs[0].id);

  const filteredFaqs = faqs.filter(faq => faq.category === activeCategory);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.detailedAnswer
      }
    }))
  };

  return (
    <section id="faq" className="w-full max-w-[1280px] mx-auto px-6 py-20 md:py-32 relative z-20 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E0E16] border border-white/10 text-white/80 text-[11px] font-mono tracking-[0.2em] uppercase mb-4 shadow-sm">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>KNOWLEDGE BASE & SPECIFICATIONS</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white font-display">
          Engineering & Operation Details.
        </h2>
        <p className="text-white/70 text-sm md:text-base max-w-2xl mt-4 leading-relaxed font-light">
          Comprehensive answers covering technical architecture, code ownership, milestone billing, SLAs, and the Astrivix Founders Grant.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-12 max-w-4xl mx-auto px-2">
        {categories.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                const nextFaqs = faqs.filter(f => f.category === cat.id);
                if (nextFaqs.length > 0) {
                  setOpenFaqId(nextFaqs[0].id);
                }
              }}
              className={`px-4 py-2 rounded-lg text-[10px] sm:text-[11px] font-mono tracking-widest uppercase transition-all duration-200 border ${
                isActive
                  ? 'bg-white text-black font-bold border-white shadow-md'
                  : 'bg-[#0E0E16] text-white/60 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* ACCORDION DECK */}
      <div className="max-w-4xl mx-auto flex flex-col gap-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openFaqId === faq.id;

          return (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: idx * 0.03 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-[#0B0B10] border-white/20 shadow-xl'
                  : 'bg-[#0E0E16] border-white/10 hover:border-white/25'
              }`}
            >
              {/* Header Bar */}
              <div
                onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                className="p-6 md:p-8 flex items-center justify-between gap-6 cursor-pointer select-none"
              >
                <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                  <span className="text-xs font-mono font-bold text-white/30 tracking-widest shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-semibold">
                        {faq.categoryLabel}
                      </span>
                      <span className="hidden sm:inline-block text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/70 border border-white/15">
                        {faq.badge}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                </div>

                <div className={`w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isOpen ? 'rotate-180 bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'hover:bg-white/10 hover:border-white/30 text-white/70'
                }`}>
                  <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                </div>
              </div>

              {/* Expandable Accordion Body */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-6 md:px-8 pb-8 pt-2 border-t border-white/10">
                      <p className="text-sm md:text-base text-white/80 leading-relaxed font-light mb-6">
                        {faq.detailedAnswer}
                      </p>

                      {/* Highlights Grid */}
                      <div className="mb-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {faq.highlights.map((item, i) => (
                            <div key={i} className="flex items-center gap-2.5 p-3 rounded-lg bg-[#050508] border border-white/10 text-xs font-mono text-white/90">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Action */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2 text-xs text-white/40 font-mono">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          <span>GUARANTEED BY ASTRIVIX CORP</span>
                        </div>
                        <a
                          href={faq.ctaLink}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-zinc-200 transition-all duration-200"
                        >
                          <span>{faq.ctaText}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* HELPDESK & QUICK CONTACT WIDGET */}
      <div className="max-w-4xl mx-auto mt-10 p-6 md:p-8 rounded-2xl bg-[#0B0B10] border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Have a specific custom requirement or architecture request?</h4>
            <p className="text-xs text-white/60 font-mono mt-0.5">Reach out directly to our engineering lead via WhatsApp or email.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <a
            href="https://wa.me/917736387794"
            target="_blank"
            rel="noreferrer"
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-black text-xs font-mono font-bold tracking-widest uppercase transition-all text-center"
          >
            WHATSAPP
          </a>
          <Link
            to="/csr"
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500 hover:text-white text-xs font-mono font-bold tracking-widest uppercase transition-all text-center"
          >
            FOUNDERS GRANT
          </Link>
        </div>
      </div>

    </section>
  );
}
