import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Sparkles, Rocket, Code2, Palette, Megaphone, ArrowLeft, CheckCircle2, Send, ShieldCheck } from 'lucide-react';
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
    // Redirect or trigger formsubmit ajax
    const mailtoUrl = `mailto:business@astrivix.in?subject=CSR%20Young%20Founder%20Grant%20Application%20-%20${encodeURIComponent(formData.projectName)}&body=Name:%20${encodeURIComponent(formData.name)}%0AAge:%20${encodeURIComponent(formData.age)}%0AEmail:%20${encodeURIComponent(formData.email)}%0ASupport:%20${encodeURIComponent(formData.supportType)}%0A%0AProject%20Description:%0A${encodeURIComponent(formData.description)}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12 relative overflow-hidden font-sans selection:bg-white selection:text-black">
      
      {/* Background Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-rose-500/10 via-amber-500/5 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-mono tracking-widest uppercase mb-8 hover:bg-white hover:text-black transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO HOME</span>
        </Link>

        {/* Hero Banner */}
        <div className="text-center border-b border-white/10 pb-16 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono tracking-widest uppercase mb-6 shadow-inner">
            <HeartHandshake className="w-4 h-4" />
            <span>ASTRIVIX CSR & VENTURE GRANT</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-light text-white tracking-tight leading-tight">
            Empowering <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-amber-200 to-white">Young Founders.</span>
          </h1>

          <p className="text-white/70 text-base md:text-xl max-w-3xl mx-auto mt-6 leading-relaxed font-light">
            We believe genius has no age requirement. Our Corporate Social Responsibility initiative provides <strong className="text-white font-medium">100% free pro-bono branding, full-stack software development, and growth marketing grants</strong> to ambitious founders under 22 and student visionaries building their dream projects.
          </p>
        </div>

        {/* What We Offer — 3 Grant Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-rose-400/40 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6 group-hover:scale-110 transition-transform">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">1. Bespoke Branding Identity</h3>
            <p className="text-white/60 text-xs md:text-sm leading-relaxed font-light mb-6">
              Complete brand visual architecture: custom logo mark, typography hierarchy, color tokens, and vector design system assets ready for launch.
            </p>
            <ul className="space-y-2 text-xs font-mono text-white/80">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> Vector Logo & Favicon Suite</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> Brand Identity Guidelines</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> Figma Design Tokens</li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-cyan-400/40 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">2. Full-Stack Web Platform</h3>
            <p className="text-white/60 text-xs md:text-sm leading-relaxed font-light mb-6">
              High-performance custom web application engineered with React, Vite, WebGL, and Tailwind CSS. 100/100 PageSpeed scores guaranteed.
            </p>
            <ul className="space-y-2 text-xs font-mono text-white/80">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> 100/100 PageSpeed Web Platform</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Mobile & Tablet Optimization</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Vercel / Edge Deployment</li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-amber-400/40 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
              <Megaphone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">3. GTM & Marketing Support</h3>
            <p className="text-white/60 text-xs md:text-sm leading-relaxed font-light mb-6">
              Strategic go-to-market plan, social media launch graphics, SEO meta optimization, and automated inquiry email response setups.
            </p>
            <ul className="space-y-2 text-xs font-mono text-white/80">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Programmatic SEO Blueprint</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Product Launch Collateral</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Automated AI Lead Response</li>
            </ul>
          </div>

        </div>

        {/* Eligibility Criteria Box */}
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-rose-900/20 via-black to-amber-900/20 border border-white/15 mb-20 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-2xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-mono tracking-widest uppercase mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>GRANT ELIGIBILITY</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">Who Can Apply?</h2>
            <p className="text-white/70 text-sm max-w-xl leading-relaxed font-light">
              Are you under 22, a student founder, or a young visionary with a bold concept? If you lack capital but have relentless drive, Astrivix Corp will fund 100% of your digital design & development needs.
            </p>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <span className="text-xs font-mono text-rose-300 font-bold">✓ Age 22 or younger / Student status</span>
            <span className="text-xs font-mono text-cyan-300 font-bold">✓ Clear project vision & goal</span>
            <span className="text-xs font-mono text-amber-300 font-bold">✓ 100% Pro-Bono (Zero Cost)</span>
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-3xl mx-auto p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">Apply for the Founder Grant</h2>
            <p className="text-white/50 text-xs md:text-sm font-mono">Tell us about your dream project. Applications are reviewed on a rolling basis.</p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Application Transmitted!</h3>
              <p className="text-xs font-mono text-white/70">Our team will review your project blueprint and reply via email within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-2 uppercase">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Alex Vance"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-2 uppercase">Your Age</label>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-2 uppercase">Email Address</label>
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
                  <label className="block text-xs font-mono text-white/60 mb-2 uppercase">Project / Venture Name</label>
                  <input
                    type="text"
                    required
                    value={formData.projectName}
                    onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                    placeholder="e.g. Nova AI Labs"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-rose-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/60 mb-2 uppercase">Support Needed</label>
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
                <label className="block text-xs font-mono text-white/60 mb-2 uppercase">Project Pitch / Description</label>
                <textarea
                  rows="4"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your vision, target audience, and why you are passionate about building this project..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-rose-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-500 via-amber-400 to-rose-500 text-black text-xs font-mono font-bold tracking-widest uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(244,63,94,0.4)]"
              >
                <Send className="w-4 h-4" />
                <span>SUBMIT FOUNDER GRANT APPLICATION</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
