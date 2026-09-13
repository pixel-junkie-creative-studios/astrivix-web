import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  CreditCard, 
  Code2, 
  HeartHandshake, 
  FileCheck, 
  ArrowRight, 
  CheckCircle2, 
  Zap,
  ChevronRight,
  Lock,
  Layers,
  MessageSquare,
  Mail,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'all', label: 'ALL QUESTIONS' },
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
    badge: "24 HOURS - 6 WEEKS",
    question: "How fast can Astrivix launch our project?",
    shortAnswer: "Express brand & web sprints launch in 24–72 hours; full custom platforms take 2–6 weeks.",
    detailedAnswer: "Project timelines depend on your scope and launch goals. Express brand packages, high-converting landing pages, and campaign sites are deployed in 24 to 72 hours. Custom web platforms, complex web applications, and mobile apps typically range between 2 to 6 weeks with live preview updates throughout.",
    highlights: [
      "24–72 Hour Express Sprint Option",
      "Live Preview Staging Links",
      "Clear Milestone Delivery Tracking",
      "Smooth Production Deployment"
    ],
    ctaText: "START YOUR PROJECT",
    ctaLink: "#contact"
  },
  {
    id: "code-ownership",
    category: "ip",
    categoryLabel: "IP & LEGAL",
    icon: ShieldCheck,
    badge: "100% OWNERSHIP TRANSFER",
    question: "Who owns the code, design files, and intellectual property?",
    shortAnswer: "You retain 100% ownership of all source code, design files, and IP upon project completion.",
    detailedAnswer: "Upon completion, Astrivix transfers 100% of all intellectual property, design assets, Figma files, and code repositories to your team. No hidden platform fees, no recurring license locks, and zero restrictions.",
    highlights: [
      "100% Copyright & IP Transfer",
      "Full GitHub Repository Handover",
      "Zero Monthly License Fees",
      "Clean Modular Code Documentation"
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
    question: "Do you use pre-built templates or build custom solutions?",
    shortAnswer: "Everything is built custom using modern technologies tailored to your exact brand requirements.",
    detailedAnswer: "We build tailored web applications and digital experiences using modern frameworks like React, Next.js, Vite, Tailwind CSS, Framer Motion, and WebGL. We avoid clunky templates or slow website builders to ensure maximum performance, responsiveness, and scalability.",
    highlights: [
      "Custom React & WebGL Frontend",
      "Lightning-Fast Page Load Times",
      "Responsive on All Screen Sizes",
      "Bespoke Micro-Interactions"
    ],
    ctaText: "VIEW OUR SERVICES",
    ctaLink: "#services"
  },
  {
    id: "pricing-structure",
    category: "pricing",
    categoryLabel: "PRICING & RETENTION",
    icon: CreditCard,
    badge: "TRANSPARENT MILESTONES",
    question: "How does pricing and payment milestones work?",
    shortAnswer: "Fixed-price milestone quotes or dedicated monthly retainers with zero surprise costs.",
    detailedAnswer: "After our initial consultation, we provide an itemized quote detailing deliverables, timelines, and clear payment milestones (such as 50% deposit, 25% staging review, 25% final launch). We also offer monthly retainers for ongoing product updates and feature additions.",
    highlights: [
      "Itemized Fixed-Price Proposals",
      "Zero Surprise Costs or Extra Charges",
      "Clear Milestone Payment Schedule",
      "Monthly Studio Retainer Options"
    ],
    ctaText: "GET A QUOTE",
    ctaLink: "#contact"
  },
  {
    id: "sla-support",
    category: "timeline",
    categoryLabel: "DELIVERY & TIMELINE",
    icon: Zap,
    badge: "POST-LAUNCH SUPPORT",
    question: "What support and maintenance do you provide after launch?",
    shortAnswer: "Ongoing technical maintenance, security updates, server monitoring, and SLA support.",
    detailedAnswer: "Our partnership doesn't end at launch. We offer post-launch maintenance packages that include uptime monitoring, security updates, performance tuning, and direct support whenever you need updates or new features.",
    highlights: [
      "Global Server Health & Uptime Monitoring",
      "Fast Technical Support & Response Times",
      "Continuous Performance Auditing",
      "Managed Cloud & Vercel Deployments"
    ],
    ctaText: "CONTACT OUR TEAM",
    ctaLink: "https://wa.me/917736387794"
  },
  {
    id: "nda-confidentiality",
    category: "ip",
    categoryLabel: "IP & LEGAL",
    icon: Lock,
    badge: "ENTERPRISE NDA",
    question: "Can we sign a Non-Disclosure Agreement (NDA) before starting?",
    shortAnswer: "Yes, we sign mutual NDAs before reviewing proprietary blueprints or project details.",
    detailedAnswer: "Client privacy and security are top priorities. Before any discovery call or code audit, we sign a mutual NDA to protect your confidential business logic, product roadmaps, trade secrets, and user data.",
    highlights: [
      "Mutual Legal NDA Execution",
      "Encrypted Asset Storage",
      "Strict Confidentiality Protocols",
      "Data Protection & Security Standard"
    ],
    ctaText: "REQUEST NDA",
    ctaLink: "#contact"
  },
  {
    id: "csr-grant",
    category: "csr",
    categoryLabel: "ASTRIVIX FOUNDERS GRANT",
    icon: HeartHandshake,
    badge: "100% FREE GRANT",
    question: "What is the Astrivix Founders Grant?",
    shortAnswer: "Pro-bono branding, web development, and strategy support for young founders under 22.",
    detailedAnswer: "Through the Astrivix Founders Grant, we award 100% free pro-bono brand design, web engineering, and launch strategy to ambitious young founders and student entrepreneurs under 22 to help turn great ideas into real businesses.",
    highlights: [
      "100% Free Pro-Bono Engineering & Design",
      "Custom Brand Identity & Web Platform",
      "Go-To-Market Strategy Assistance",
      "Open to Founders & Students Under 22"
    ],
    ctaText: "APPLY FOR GRANT",
    ctaLink: "/csr"
  }
];

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaqId, setOpenFaqId] = useState(faqs[0].id);

  // Filter FAQs based on active category
  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  // Google Rich Snippets Schema JSON-LD
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
    <section id="faq" className="w-full max-w-[1200px] mx-auto px-6 py-20 md:py-32 relative z-20 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* Background Ambient Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-white/5 via-cyan-500/5 to-purple-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-mono tracking-[0.2em] uppercase mb-4 shadow-inner">
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          <span>KNOWLEDGE BASE & FAQ</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white font-display">
          Clear Answers.
        </h2>
        <p className="text-white/60 text-sm md:text-base max-w-2xl mt-4 leading-relaxed font-light">
          Everything you need to know about our engineering workflow, code ownership, project pricing, SLAs, and our Astrivix Founders Grant.
        </p>
      </div>

      {/* Category Filter Bar */}
      <div className="flex items-center justify-center flex-wrap gap-2.5 mb-12 max-w-4xl mx-auto px-2">
        {categories.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                const nextFaqs = cat.id === 'all' ? faqs : faqs.filter(f => f.category === cat.id);
                if (nextFaqs.length > 0) {
                  setOpenFaqId(nextFaqs[0].id);
                }
              }}
              className={`px-5 py-2.5 rounded-full text-[11px] font-mono tracking-widest uppercase transition-all duration-300 border ${
                isActive
                  ? 'bg-white text-black font-bold border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105'
                  : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* FULL-WIDTH AWWWARDS-GRADE GLASS ACCORDION DECK */}
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openFaqId === faq.id;

          return (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className={`rounded-2xl md:rounded-3xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-[#0c0c16] border-white/30 shadow-[0_15px_45px_rgba(0,0,0,0.9)]'
                  : 'bg-[#080810]/95 border-white/10 hover:border-white/25 hover:bg-[#0c0c16]/80'
              }`}
            >
              {/* Header Bar (Clickable) */}
              <div
                onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                className="p-6 md:p-8 flex items-center justify-between gap-6 cursor-pointer select-none"
              >
                <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                  <span className="text-xs font-mono font-bold text-white/40 tracking-widest shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-semibold">
                        {faq.categoryLabel}
                      </span>
                      <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/70 border border-white/15">
                        {faq.badge}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-xl font-bold text-white tracking-tight leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                </div>

                <div className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white shrink-0 transition-all duration-300 ${
                  isOpen ? 'bg-white text-black rotate-45 border-white' : 'bg-white/5 hover:bg-white/15'
                }`}>
                  <span className="text-xl font-bold leading-none">+</span>
                </div>
              </div>

              {/* Expandable Accordion Body */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-6 md:px-8 pb-8 pt-2 border-t border-white/10">
                      <p className="text-sm md:text-base text-white/80 leading-relaxed font-light mb-6">
                        {faq.detailedAnswer}
                      </p>

                      {/* Highlights Grid */}
                      <div className="mb-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {faq.highlights.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/90">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Action */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          <span>GUARANTEED BY ASTRIVIX CORP</span>
                        </div>
                        <a
                          href={faq.ctaLink}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-cyan-300 transition-all duration-300"
                        >
                          <span>{faq.ctaText}</span>
                          <ArrowRight className="w-4 h-4" />
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
      <div className="max-w-4xl mx-auto mt-10 p-6 md:p-8 rounded-3xl bg-[#0a0a14]/95 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Have a specific custom requirement?</h4>
            <p className="text-xs text-white/60 font-mono mt-0.5">Chat directly with our founders on WhatsApp or email.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <a
            href="https://wa.me/917736387794"
            target="_blank"
            rel="noreferrer"
            className="flex-1 sm:flex-none px-5 py-3 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-black text-xs font-mono font-bold tracking-widest uppercase transition-all text-center"
          >
            WHATSAPP
          </a>
          <Link
            to="/csr"
            className="flex-1 sm:flex-none px-5 py-3 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500 hover:text-white text-xs font-mono font-bold tracking-widest uppercase transition-all text-center"
          >
            FOUNDERS GRANT
          </Link>
        </div>
      </div>

    </section>
  );
}
