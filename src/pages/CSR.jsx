import React, { useState } from 'react';
import { HeartHandshake, Code2, Palette, Megaphone, ArrowLeft, CheckCircle2, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CSR() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    projectName: '',
    description: '',
    supportType: 'All (Branding + Dev + Marketing)'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoUrl = `mailto:business@astrivix.in?subject=CSR%20Young%20Founder%20Grant%20Application%20-%20${encodeURIComponent(formData.projectName)}&body=Name:%20${encodeURIComponent(formData.name)}%0AAge:%20${encodeURIComponent(formData.age)}%0AEmail:%20${encodeURIComponent(formData.email)}%0ASupport:%20${encodeURIComponent(formData.supportType)}%0A%0AProject%20Description:%0A${encodeURIComponent(formData.description)}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12 relative overflow-hidden font-sans selection:bg-white selection:text-black">
      
      {/* Background Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-rose-500/10 via-amber-500/5 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-mono tracking-widest uppercase mb-8 hover:bg-white hover:text-black transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN HOME</span>
        </Link>

        {/* Hero Header */}
        <div className="text-center border-b border-white/10 pb-12 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono tracking-widest uppercase mb-4 shadow-inner">
            <HeartHandshake className="w-4 h-4" />
            <span>ASTRA FOUNDER GRANT // PRO-BONO INITIATIVE</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight font-display">
            Building Dreams For Next-Gen Visionaries.
          </h1>

          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mt-4 leading-relaxed font-light">
            We love scrappy, ambitious young founders. If you are under 22 or a student building a game-changing product, we will design your brand, write your code, and launch your platform <strong className="text-white font-semibold">100% free</strong> (or for a 10% equity pledge if you insist!).
          </p>
        </div>

        {/* What We Offer — 3 Grant Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <div className="p-6 rounded-2xl bg-[#0E0E16] border border-white/10 hover:border-rose-400/40 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition-transform">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">1. Brand Identity</h3>
            <p className="text-white/60 text-xs leading-relaxed font-light mb-4">
              Custom logo suite, typography rules, color tokens, and vector design assets ready for launch.
            </p>
            <ul className="space-y-1.5 text-[11px] font-mono text-white/80">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> Vector Logo Marks</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> Figma Design Assets</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-[#0E0E16] border border-white/10 hover:border-cyan-400/40 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">2. Web Development</h3>
            <p className="text-white/60 text-xs leading-relaxed font-light mb-4">
              Fast, custom web platform engineered with React, Vite, and Tailwind CSS. 100/100 PageSpeed scores guaranteed.
            </p>
            <ul className="space-y-1.5 text-[11px] font-mono text-white/80">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> 100/100 Speed Web App</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Mobile Responsiveness</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-[#0E0E16] border border-white/10 hover:border-amber-400/40 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <Megaphone className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">3. Launch & GTM</h3>
            <p className="text-white/60 text-xs leading-relaxed font-light mb-4">
              Product launch collateral, social media assets, and SEO meta tags to get your first 1,000 users.
            </p>
            <ul className="space-y-1.5 text-[11px] font-mono text-white/80">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Launch Strategy</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> SEO Optimization</li>
            </ul>
          </div>

        </div>

        {/* Eligibility Criteria Box */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#0B0B10]/95 border border-white/15 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-mono tracking-widest uppercase mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>GRANT CRITERIA</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Who Can Apply?</h2>
            <p className="text-white/70 text-xs md:text-sm max-w-xl leading-relaxed font-light">
              Under 22, student, or first-time founder building a real project. If you have the passion, we will supply the design and code.
            </p>
          </div>
          <div className="flex flex-col gap-1.5 shrink-0 text-xs font-mono">
            <span className="text-rose-300 font-bold">✓ Age under 22 or student</span>
            <span className="text-cyan-300 font-bold">✓ Active building project</span>
            <span className="text-amber-300 font-bold">✓ 100% Free / Pro-Bono</span>
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-2xl mx-auto p-6 md:p-10 rounded-3xl bg-[#0B0B10]/95 border border-white/10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">Apply for the Founder Grant</h2>
            <p className="text-white/50 text-xs font-mono">Tell us about what you're building!</p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">Application Submitted!</h3>
              <p className="text-xs font-mono text-white/70">We'll review your project and get back to you via email within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Alex"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">Your Age</label>
                  <input
                    type="number"
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    placeholder="e.g. 19"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-rose-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="alex@startup.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">Project Name</label>
                  <input
                    type="text"
                    required
                    value={formData.projectName}
                    onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                    placeholder="e.g. Nova AI"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-rose-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">Support Needed</label>
                <select
                  value={formData.supportType}
                  onChange={(e) => setFormData({...formData, supportType: e.target.value})}
                  className="w-full bg-[#050505] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-rose-400"
                >
                  <option value="All (Branding + Dev + Marketing)">All Three (Branding + Web Engineering + Marketing)</option>
                  <option value="Brand Identity Only">Brand Identity & Logo Design</option>
                  <option value="Web Development Only">Full-Stack Web Development</option>
                  <option value="Marketing & GTM Only">Go-To-Market Marketing & Launch</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">What are you building?</label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Tell us about your project and vision..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-rose-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 via-amber-400 to-rose-500 text-black text-xs font-mono font-bold tracking-widest uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(244,63,94,0.4)]"
              >
                <Send className="w-4 h-4" />
                <span>SUBMIT APPLICATION</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
