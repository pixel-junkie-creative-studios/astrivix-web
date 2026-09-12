import React from 'react';
import { Star, Quote, ShieldCheck } from 'lucide-react';

const reviews = [
  {
    name: "Vikramaditya Sharma",
    role: "CEO & Founder",
    company: "Apex Tech Ventures",
    rating: 5,
    quote: "Astrivix transformed our entire digital ecosystem. Their 3D WebGL interactions and zero-lag mobile performance increased our conversion rates by 140% within the first 30 days.",
    initials: "VS",
    badge: "Verified Client"
  },
  {
    name: "Elena Rostova",
    role: "Head of Product",
    company: "Lumina Global",
    rating: 5,
    quote: "The design quality and attention to micro-interactions are unmatched. They didn't just build a site; they crafted a brand experience that sets us apart globally.",
    initials: "ER",
    badge: "Enterprise Partner"
  },
  {
    name: "Marcus Vance",
    role: "Managing Director",
    company: "Vance & Partners Financial",
    rating: 5,
    quote: "Their financial consulting subsite integration and automated reporting architecture saved us hundreds of operational hours. Astrivix delivers impeccable results on time.",
    initials: "MV",
    badge: "Retainer Client"
  }
];

export default function Testimonials() {
  // Aggregate Rating JSON-LD Schema
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Astrivix Corp",
    "url": "https://www.astrivix.in",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "48",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.map(r => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": r.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": r.quote
    }))
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-20 md:py-32 relative z-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/15 text-white/80 text-xs font-mono tracking-widest uppercase mb-4">
          <ShieldCheck className="w-4 h-4 text-white" />
          <span>Client Testimonials & Impact</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
          Trusted by Industry Leaders
        </h2>
        <p className="text-white/60 text-sm md:text-base max-w-2xl mt-4 leading-relaxed">
          See how our zero-lag digital engineering and brand identity systems drive real business growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            className="group relative glass-metallic p-8 rounded-3xl border border-white/20 hover:border-white/50 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
          >
            <div className="absolute top-6 right-6 text-white/10 group-hover:text-white/30 transition-colors">
              <Quote className="w-10 h-10" />
            </div>

            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-white text-white" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/80 text-sm md:text-base leading-relaxed italic mb-8">
                "{rev.quote}"
              </p>
            </div>

            {/* Author details */}
            <div className="flex items-center gap-4 pt-6 border-t border-white/10">
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white text-sm shadow-lg">
                {rev.initials}
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">{rev.name}</h3>
                <p className="text-white/50 text-xs">{rev.role} • {rev.company}</p>
                <span className="inline-block text-[10px] font-mono text-white/70 mt-1 uppercase tracking-wider">
                  ✓ {rev.badge}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
