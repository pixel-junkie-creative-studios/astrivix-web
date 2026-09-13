import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Palette, 
  Code2, 
  Megaphone, 
  CheckCircle2, 
  ArrowLeft, 
  ShieldCheck, 
  Send,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CSR() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    projectName: '',
    supportType: 'Full Web Platform',
    description: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      age: formData.age,
      email: formData.email,
      projectName: formData.projectName,
      supportType: formData.supportType,
      description: formData.description,
      _subject: `🏆 Astrivix Founders Grant Application: ${formData.projectName} (${formData.name})`,
      _template: "table",
      _captcha: "false"
    };

    try {
      await Promise.allSettled([
        fetch("/api/csr", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }),
        fetch("https://formsubmit.co/ajax/business@astrivix.in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(payload)
        })
      ]);

      setSubmitted(true);
    } catch (err) {
      console.warn("CSR dispatch error:", err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

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

        {/* Hero Header */}
        <div className="text-center border-b border-white/10 pb-12 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E0E16] border border-white/15 text-rose-400 text-xs font-mono tracking-widest uppercase mb-4 shadow-sm">
            <HeartHandshake className="w-4 h-4" />
            <span>ASTRIVIX FOUNDERS GRANT // PRO-BONO INITIATIVE</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight font-display">
            Empowering Next-Generation Builders.
          </h1>

          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mt-4 leading-relaxed font-light">
            The Astrivix Founders Grant awards <strong className="text-white font-semibold">100% free pro-bono</strong> brand design, web engineering, and product launch systems to ambitious student entrepreneurs and early-stage builders under 22.
          </p>
        </div>

        {/* What We Offer — 3 Grant Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <div className="p-6 rounded-2xl bg-[#0E0E16] border border-white/10 hover:border-rose-400/40 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-105 transition-transform">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">1. Brand Systems</h3>
            <p className="text-white/60 text-xs leading-relaxed font-light mb-4">
              Complete brand identity suites, typography guidelines, vector mark sets, and Figma component libraries.
            </p>
            <ul className="space-y-1.5 text-[11px] font-mono text-white/80">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> Vector Logo Marks</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> Figma Design Systems</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-[#0E0E16] border border-white/10 hover:border-cyan-400/40 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">2. Web Engineering</h3>
            <p className="text-white/60 text-xs leading-relaxed font-light mb-4">
              High-performance web applications built with React, Vite, and Tailwind CSS. 100/100 Lighthouse performance guaranteed.
            </p>
            <ul className="space-y-1.5 text-[11px] font-mono text-white/80">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Custom React Architecture</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Mobile Responsiveness</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-[#0E0E16] border border-white/10 hover:border-amber-400/40 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition-transform">
              <Megaphone className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">3. Product Launch</h3>
            <p className="text-white/60 text-xs leading-relaxed font-light mb-4">
              Launch collateral, social meta assets, and GTM optimization to onboard your first cohort of users.
            </p>
            <ul className="space-y-1.5 text-[11px] font-mono text-white/80">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Product Launch Assets</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Technical SEO Tags</li>
            </ul>
          </div>

        </div>

        {/* Eligibility Criteria Box */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#0B0B10] border border-white/15 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-white text-[10px] font-mono tracking-widest uppercase mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>GRANT ELIGIBILITY</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Grant Qualifications</h2>
            <p className="text-white/70 text-xs md:text-sm max-w-xl leading-relaxed font-light">
              Open to founders under 22, active student entrepreneurs, or first-time builders creating impactful software or hardware projects.
            </p>
          </div>
          <div className="flex flex-col gap-1.5 shrink-0 text-xs font-mono">
            <span className="text-rose-300 font-bold">✓ Age under 22 or student status</span>
            <span className="text-cyan-300 font-bold">✓ Active software/hardware project</span>
            <span className="text-amber-300 font-bold">✓ 100% Pro-Bono Support</span>
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-2xl mx-auto p-6 md:p-10 rounded-3xl bg-[#0B0B10] border border-white/10 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">Apply for the Astrivix Founders Grant</h2>
            <p className="text-white/50 text-xs font-mono">Submit your venture blueprint below</p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">Application Dispatched</h3>
              <p className="text-xs font-mono text-white/70">Our partner team will evaluate your application and respond via email within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-mono tracking-widest text-white/60 uppercase mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Vance"
                  className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/40 transition-colors placeholder-white/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono tracking-widest text-white/60 uppercase mb-2">Age / Student Status</label>
                  <input
                    type="text"
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="e.g. 20 / University Senior"
                    className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/40 transition-colors placeholder-white/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono tracking-widest text-white/60 uppercase mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@venture.com"
                    className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/40 transition-colors placeholder-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono tracking-widest text-white/60 uppercase mb-2">Project / Venture Name</label>
                <input
                  type="text"
                  required
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  placeholder="e.g. Nexus AI"
                  className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/40 transition-colors placeholder-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-mono tracking-widest text-white/60 uppercase mb-2">Requested Support</label>
                <select
                  value={formData.supportType}
                  onChange={(e) => setFormData({ ...formData, supportType: e.target.value })}
                  className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/40 transition-colors"
                >
                  <option value="Full Web Platform">Full Web Platform Engineering</option>
                  <option value="Brand Identity Suite">Brand Identity & Figma Assets</option>
                  <option value="Product Launch & GTM">Product Launch & GTM Strategy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono tracking-widest text-white/60 uppercase mb-2">Venture Overview & Launch Goals</label>
                <textarea
                  rows="4"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what you are building, target audience, and current progress..."
                  className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/40 transition-colors placeholder-white/30"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 mt-2 shadow-lg"
              >
                <span>SUBMIT GRANT APPLICATION</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
