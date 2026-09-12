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
  Layers
} from 'lucide-react';

const categories = [
  { id: 'all', label: 'ALL FAQS' },
  { id: 'timeline', label: 'DELIVERY & TIMELINE' },
  { id: 'engineering', label: 'CUSTOM CODE' },
  { id: 'ip', label: 'IP & LEGAL' },
  { id: 'pricing', label: 'PRICING & RETENTION' },
  { id: 'csr', label: 'CSR FOUNDER GRANT' },
];

const faqs = [
  {
    id: "delivery-speed",
    category: "timeline",
    categoryLabel: "DELIVERY & TIMELINE",
    icon: Clock,
    badge: "24 HOURS - 6 WEEKS",
    question: "How fast can Astrivix deliver a custom digital platform or brand identity?",
    shortAnswer: "Express sprints deploy in 24 to 72 hours; complex enterprise platforms range between 2 to 6 weeks.",
    detailedAnswer: "Project execution velocity is tailored to your scope and milestone urgency. Rapid brand identity kits, high-converting landing pages, and marketing sites are deployed in 24 to 72 hours under our express sprint protocol. Enterprise web platforms, complex React applications, and native iOS/Android mobile apps typically range between 2 to 6 weeks with real-time preview links.",
    highlights: [
      "24-72 Hour Express Sprint Protocol",
      "Real-Time Preview Staging Links",
      "Milestone-Driven Delivery Tracking",
      "Zero-Downtime Live Cutover"
    ],
    ctaText: "INITIATE EXPRESS SPRINT",
    ctaLink: "#contact"
  },
  {
    id: "code-ownership",
    category: "ip",
    categoryLabel: "IP & LEGAL",
    icon: ShieldCheck,
    badge: "100% OWNERSHIP TRANSFER",
    question: "Who owns the source code, design systems, and intellectual property?",
    shortAnswer: "You retain 100% full intellectual property, copyright, and source code ownership upon project completion.",
    detailedAnswer: "Upon final project delivery and milestone completion, Astrivix transfers 100% of all intellectual property, copyright, Figma design tokens, and Git source code repositories directly to your organization. We retain zero licensing lock-ins, zero hidden platform fees, and zero code restrictions.",
    highlights: [
      "Complete Copyright & Patent Transfer",
      "Full GitHub/GitLab Repo Handover",
      "Zero License Lock-ins or Monthly Fees",
      "Clean Modular Codebase Documentation"
    ],
    ctaText: "REVIEW LEGAL TERMS",
    ctaLink: "/terms"
  },
  {
    id: "custom-stack",
    category: "engineering",
    categoryLabel: "CUSTOM CODE",
    icon: Code2,
    badge: "ZERO TEMPLATE BLOAT",
    question: "Do you use pre-built templates or engineer 100% custom architectures?",
    shortAnswer: "We write 100% bespoke React, Vite, WebGL, and Tailwind code engineered specifically for your brand.",
    detailedAnswer: "Every line of code and UI component is handcrafted from scratch. We strictly avoid bloated WordPress themes, slow website builders, or generic templates. We build modern single-page applications and web apps powered by React, Next.js, Vite, Tailwind CSS, Framer Motion, and Three.js / WebGL, achieving 100/100 PageSpeed scores and 120 FPS render loops.",
    highlights: [
      "100/100 Google PageSpeed Guarantee",
      "120 FPS Hardware Accelerated Animation",
      "Sub-Second Initial Payload Hydration",
      "Custom Micro-Interactions & Physics"
    ],
    ctaText: "EXPLORE SERVICES",
    ctaLink: "#services"
  },
  {
    id: "pricing-structure",
    category: "pricing",
    categoryLabel: "PRICING & RETENTION",
    icon: CreditCard,
    badge: "TRANSPARENT MILESTONES",
    question: "How does project pricing, billing structure, and milestone schedules work?",
    shortAnswer: "Transparent fixed-price milestone quotes or dedicated monthly studio retainers with zero hidden fees.",
    detailedAnswer: "Following an initial strategy consultation, we deliver an itemized fixed-price proposal detailing deliverables, timelines, and payment phases (e.g. 50% kick-off, 25% staging preview, 25% final cutover). For ongoing product scaling and dedicated feature iterations, we offer monthly studio retainers.",
    highlights: [
      "Fixed-Price Itemized Scope Proposals",
      "Zero Hidden Fees or Surprise Charges",
      "Flexible Milestone Payment Phases",
      "Dedicated Studio Retainer Options"
    ],
    ctaText: "GET ESTIMATE NOW",
    ctaLink: "#contact"
  },
  {
    id: "sla-support",
    category: "timeline",
    categoryLabel: "DELIVERY & TIMELINE",
    icon: Zap,
    badge: "24/7 MONITORING SLA",
    question: "What post-launch maintenance, hosting, and technical support do you provide?",
    shortAnswer: "24/7 uptime monitoring, security patching, CDN optimization, and dedicated SLA support tiers.",
    detailedAnswer: "Our engineering commitment extends well beyond launch day. We provide comprehensive post-launch SLA support packages including 24/7 global server health monitoring, security audits, dependency updates, CDN edge caching maintenance, and rapid 1-hour emergency response times.",
    highlights: [
      "24/7 Global Uptime & Server Monitoring",
      "1-Hour SLA Emergency Technical Response",
      "Continuous Core Web Vitals Auditing",
      "Managed Vercel / AWS / Edge Deployment"
    ],
    ctaText: "TALK TO OUR ENGINEERS",
    ctaLink: "https://wa.me/917736387794"
  },
  {
    id: "nda-confidentiality",
    category: "ip",
    categoryLabel: "IP & LEGAL",
    icon: Lock,
    badge: "ENTERPRISE NDA SIGNED",
    question: "Can we execute a Non-Disclosure Agreement (NDA) before sharing project details?",
    shortAnswer: "Yes, we execute mutual enterprise NDAs before reviewing proprietary blueprints or IP.",
    detailedAnswer: "Client confidentiality is paramount. Before any initial discovery call, project audit, or code review, we sign mutual enterprise-grade NDAs. Your proprietary business logic, product roadmaps, trade secrets, and user data remain strictly confidential under legal enforceability.",
    highlights: [
      "Mutual Enterprise Legal NDA Execution",
      "Encrypted Asset Storage & Transfer",
      "Strict Internal Confidentiality Protocol",
      "GDPR & CCPA Compliant Security"
    ],
    ctaText: "REQUEST NDA SPRINT",
    ctaLink: "#contact"
  },
  {
    id: "csr-grant",
    category: "csr",
    categoryLabel: "CSR FOUNDER GRANT",
    icon: HeartHandshake,
    badge: "100% PRO-BONO GRANT",
    question: "What is the Astrivix Corporate Social Responsibility & Young Founder Grant?",
    shortAnswer: "Pro-bono branding, web development, and marketing grants to support ambitious founders under 22.",
    detailedAnswer: "Through our CSR initiative, Astrivix empowers the next generation of visionaries, student entrepreneurs, and young founders under 22. We award 100% free pro-bono custom brand identity design, full-stack web engineering, and go-to-market marketing strategies to turn ambitious ideas into market-ready ventures.",
    highlights: [
      "100% Free Pro-Bono Engineering & Design",
      "Custom Brand Identity & Web Platform",
      "Dedicated GTM & Marketing Strategy",
      "Open to Founders & Students Under 22"
    ],
    ctaText: "APPLY FOR FOUNDER GRANT",
    ctaLink: "/csr"
  }
];

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedFaqId, setSelectedFaqId] = useState(faqs[0].id);

  // Filter FAQs based on active category
  const filteredFaqs = faqs.filter(faq => 
    activeCategory === 'all' ? true : faq.category === activeCategory
  );

  // Get currently selected FAQ object
  const selectedFaq = faqs.find(f => f.id === selectedFaqId) || filteredFaqs[0] || faqs[0];

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
    <section id="faq" className="w-full max-w-[1400px] mx-auto px-6 py-20 md:py-32 relative z-20 overflow-hidden">
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
          <span>GLOBAL KNOWLEDGE BASE & FAQ</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
          Everything You <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-white/60">Need to Know.</span>
        </h2>
        <p className="text-white/60 text-sm md:text-base max-w-2xl mt-4 leading-relaxed font-light">
          Everything you need to know about our engineering workflow, code ownership, project pricing, SLAs, and our CSR Young Founder Grant.
        </p>
      </div>

      {/* Category Filter Bar */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-12 max-w-4xl mx-auto px-2">
        {categories.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                // Select first FAQ in category if current selection isn't in filtered
                const nextFaqs = faqs.filter(f => cat.id === 'all' ? true : f.category === cat.id);
                if (nextFaqs.length > 0 && !nextFaqs.some(f => f.id === selectedFaqId)) {
                  setSelectedFaqId(nextFaqs[0].id);
                }
              }}
              className={`px-4 py-2 rounded-full text-[11px] font-mono tracking-widest uppercase transition-all duration-300 border ${
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

      {/* DESKTOP SPLIT-SCREEN & MOBILE RESPONSIVE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: FAQ QUESTION SELECTOR LIST (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {filteredFaqs.map((faq, idx) => {
            const isSelected = selectedFaqId === faq.id;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => setSelectedFaqId(faq.id)}
                className={`group cursor-pointer relative p-5 md:p-6 rounded-2xl border transition-all duration-300 ${
                  isSelected
                    ? 'bg-white/10 border-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-2xl ring-1 ring-white/30'
                    : 'bg-white/5 border-white/10 hover:border-white/25 hover:bg-white/[0.07] backdrop-blur-xl'
                }`}
              >
                {/* Active Left Glow Accent Bar */}
                {isSelected && (
                  <motion.div
                    layoutId="activeFaqIndicator"
                    className="absolute left-0 top-3 bottom-3 w-1.5 bg-gradient-to-b from-cyan-400 via-white to-purple-400 rounded-r-full shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                  />
                )}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors ${
                      isSelected ? 'bg-white text-black shadow-md' : 'bg-white/10 text-white/70 group-hover:bg-white/20 group-hover:text-white'
                    }`}>
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <span className="text-xs font-mono tracking-widest text-cyan-400/90 uppercase font-semibold">
                      {faq.categoryLabel}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 text-white/50 border border-white/10 group-hover:border-white/20">
                    {faq.badge}
                  </span>
                </div>

                <h3 className={`text-base md:text-lg font-medium mt-3 leading-snug transition-colors ${
                  isSelected ? 'text-white font-semibold' : 'text-white/80 group-hover:text-white'
                }`}>
                  {faq.question}
                </h3>

                <p className="text-xs text-white/50 line-clamp-2 mt-2 font-light leading-relaxed">
                  {faq.shortAnswer}
                </p>

                {/* Mobile Expand Trigger (Visible only on mobile) */}
                <div className="lg:hidden flex items-center gap-1 mt-4 text-xs font-mono text-cyan-400">
                  <span>{isSelected ? 'VIEWING DETAILS BELOW' : 'TAP TO VIEW DETAILS'}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: ACTIVE DETAIL SPOTLIGHT PANEL (lg:col-span-7) */}
        <div className="lg:col-span-7 sticky top-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFaq.id}
              initial={{ opacity: 0, scale: 0.97, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/10 via-white/[0.05] to-black/80 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative overflow-hidden group"
            >
              {/* Top Liquid Glass Highlight */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              
              {/* Category Icon Aura */}
              <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-inner">
                    {React.createElement(selectedFaq.icon, { className: "w-6 h-6 text-cyan-300" })}
                  </div>
                  <div>
                    <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold block">
                      {selectedFaq.categoryLabel}
                    </span>
                    <span className="text-xs font-mono text-white/50 uppercase">
                      VERIFIED AGENCY POLICY
                    </span>
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  <span>{selectedFaq.badge}</span>
                </div>
              </div>

              {/* Title & Detailed Answer */}
              <h2 className="text-xl md:text-3xl font-semibold text-white tracking-tight leading-snug mb-6">
                {selectedFaq.question}
              </h2>

              <p className="text-white/80 text-sm md:text-base leading-relaxed font-light mb-8">
                {selectedFaq.detailedAnswer}
              </p>

              {/* Key Takeaways & Highlights Grid */}
              <div className="mb-10">
                <h4 className="text-xs font-mono tracking-widest uppercase text-white/40 mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-white/60" />
                  <span>KEY HIGHLIGHTS & GUARANTEES</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedFaq.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/90 font-mono">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action CTA Row */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>GUARANTEED BY ASTRIVIX CORP</span>
                </div>

                <a
                  href={selectedFaq.ctaLink}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.4)] group/btn"
                >
                  <span>{selectedFaq.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
