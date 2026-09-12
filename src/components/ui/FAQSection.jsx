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
    categoryLabel: "CSR FOUNDER GRANT",
    icon: HeartHandshake,
    badge: "100% FREE GRANT",
    question: "What is the Astrivix CSR & Young Founder Grant?",
    shortAnswer: "Pro-bono branding, web development, and strategy support for young founders under 22.",
    detailedAnswer: "Through our CSR initiative, Astrivix awards 100% free pro-bono brand design, web engineering, and launch strategy to ambitious young founders and student entrepreneurs under 22 to help turn great ideas into real businesses.",
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
  const [activeCategory, setActiveCategory] = useState('timeline');
  const [selectedFaqId, setSelectedFaqId] = useState(faqs[0].id);

  // Filter FAQs based on active category
  const filteredFaqs = faqs.filter(faq => faq.category === activeCategory);

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
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 via-pink-400 via-amber-300 to-emerald-400 animate-rainbow-gradient font-black">
            Clear Answers.
          </span>
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
                const nextFaqs = faqs.filter(f => f.category === cat.id);
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
                    ? 'bg-[#0e0e18] border-cyan-400/60 shadow-[0_10px_35px_rgba(0,0,0,0.85)]'
                    : 'bg-[#080810]/90 border-white/10 hover:border-white/30 hover:bg-[#0e0e18]'
                }`}
              >
                {/* Active Left Glow Accent Bar */}
                {isSelected && (
                  <motion.div
                    layoutId="activeFaqIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-400 via-white to-purple-400 z-10 rounded-l-2xl"
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
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/10 text-white/70 border border-white/15 group-hover:border-white/30">
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

        {/* RIGHT COLUMN: ACTIVE DETAIL SPOTLIGHT PANEL + HELPDESK WIDGET (lg:col-span-7) */}
        <div className="lg:col-span-7 sticky top-28 flex flex-col gap-6">
          
          {/* Active Question Spotlight Box */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFaq.id}
              initial={{ opacity: 0, scale: 0.97, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#12121e] via-[#0a0a14] to-[#05050a] border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.95)] relative overflow-hidden group"
            >
              {/* Top Liquid Glass Highlight */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              
              {/* Category Icon Aura */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-inner">
                    {React.createElement(selectedFaq.icon, { className: "w-5 h-5 text-cyan-300" })}
                  </div>
                  <div>
                    <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold block">
                      {selectedFaq.categoryLabel}
                    </span>
                    <span className="text-[10px] font-mono text-white/50 uppercase">
                      VERIFIED AGENCY POLICY
                    </span>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  <span>{selectedFaq.badge}</span>
                </div>
              </div>

              {/* Title & Detailed Answer */}
              <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight leading-snug mb-4">
                {selectedFaq.question}
              </h2>

              <p className="text-white/80 text-xs md:text-sm leading-relaxed font-light mb-6">
                {selectedFaq.detailedAnswer}
              </p>

              {/* Key Takeaways & Highlights Grid */}
              <div className="mb-6">
                <h4 className="text-[10px] font-mono tracking-widest uppercase text-white/40 mb-3 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-white/60" />
                  <span>KEY HIGHLIGHTS & GUARANTEES</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {selectedFaq.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/90 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action CTA Row */}
              <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>GUARANTEED BY ASTRIVIX CORP</span>
                </div>

                <a
                  href={selectedFaq.ctaLink}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-full bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.4)] group/btn"
                >
                  <span>{selectedFaq.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* SECONDARY HELPDESK & QUICK CONTACT WIDGET (Fills right column smoothly so zero empty black space exists) */}
          <div className="p-6 rounded-3xl bg-[#0a0a14]/95 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
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
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-black text-xs font-mono font-bold tracking-widest uppercase transition-all text-center"
              >
                WHATSAPP
              </a>
              <Link
                to="/csr"
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500 hover:text-white text-xs font-mono font-bold tracking-widest uppercase transition-all text-center"
              >
                CSR GRANT
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
