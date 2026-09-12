import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "What core services does Astrivix Corp provide?",
    answer: "Astrivix is an end-to-end digital agency & engineering studio. We offer high-performance web development (React/Vite/WebGL), native mobile app engineering (Native iOS/Android), custom logo & brand identity systems, conversion rate optimization (CRO), digital marketing & SEO, motion graphics, and strategic financial consulting."
  },
  {
    question: "How fast can Astrivix deliver a custom digital project?",
    answer: "Standard brand identity kits & Landing Pages are delivered in 1-2 weeks. Full custom web platforms and complex native mobile applications typically range between 3 to 6 weeks, built with rigorous sprint milestones and real-time client previews."
  },
  {
    question: "What technology stack do you use to guarantee maximum web speed?",
    answer: "We build with modern frameworks like React, Next.js, Vite, Tailwind CSS, Framer Motion, and Three.js / WebGL with dynamic asset payload compression, sub-second DPR capping, edge CDN caching, and automated Core Web Vitals optimization to guarantee 100/100 PageSpeed scores."
  },
  {
    question: "How do you approach SEO and Google Search Console compliance?",
    answer: "Every site we architect includes automated XML sitemaps, robots.txt optimization, Open Graph & Twitter Cards micro-data, semantic HTML5 structure, schema.org JSON-LD microdata, breadcrumbs, 0-CLS layout stability, and strict mobile responsiveness."
  },
  {
    question: "How does project pricing and billing work at Astrivix?",
    answer: "We offer both milestone-based project quotes and monthly dedicated retainers. After a preliminary consultation, we provide an itemized proposal with clear deliverables, zero hidden fees, and flexible payment phases."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Google Rich Snippets Schema JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="w-full max-w-7xl mx-auto px-6 py-20 md:py-32 relative z-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-mono tracking-widest uppercase mb-4">
          <HelpCircle className="w-4 h-4 text-white/80" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
          Everything You Need to Know
        </h2>
        <p className="text-white/60 text-sm md:text-base max-w-2xl mt-4 leading-relaxed">
          Clear answers regarding our digital engineering workflow, delivery timelines, pricing structure, and performance standards.
        </p>
      </div>

      {/* Accordion List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-white/30"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left text-white focus:outline-none group"
                aria-expanded={isOpen}
              >
                <span className="text-base md:text-lg font-medium pr-4 group-hover:text-white/80 transition-colors">
                  {faq.question}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white/80 group-hover:bg-white group-hover:text-black transition-colors">
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 text-white/70 text-sm md:text-base leading-relaxed border-t border-white/5 mt-2">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
