import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '$5k - $10k',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Direct FormSubmit AJAX Endpoint with Automated AI Email Response
      const response = await fetch("https://formsubmit.co/ajax/business@astrivix.in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          budget: formData.budget,
          message: formData.message,
          _subject: `New Project Inquiry from ${formData.name} (${formData.budget})`,
          _autoresponse: `Thank you for contacting Astrivix Corp. We have received your inquiry regarding "${formData.message.slice(0, 50)}...". Our engineering team is reviewing your requirements and will reply within 2 hours.`
        })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        // Fallback mailto
        window.location.href = `mailto:business@astrivix.in?subject=Project Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
        setSubmitted(true);
      }
    } catch (err) {
      window.location.href = `mailto:business@astrivix.in?subject=Project Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 md:px-16 py-20 md:py-32 relative z-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        {/* Left Column: Direct Comms */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl sm:text-6xl font-black mb-4 sm:mb-6 tracking-tight text-white drop-shadow-md skeuo-engraved uppercase">
            Start Your Project.
          </h1>
          <p className="text-white/90 mb-8 sm:mb-12 max-w-md text-sm sm:text-base leading-relaxed font-medium">
            Partner with Astrivix Corp to build high-converting web platforms, custom software, and global brand systems. Share your project details below.
          </p>
          
          <div className="flex flex-col gap-4">
            <a 
              href="https://wa.me/917736387794" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-4 glass-metallic hover:border-white/50 rounded-xl px-6 py-4 transition-all duration-200 shadow-2xl group active:scale-95 border border-white/20 max-w-md"
            >
              <div className="w-10 h-10 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-white/50">WhatsApp Direct</span>
                <span className="text-sm font-black tracking-wider uppercase text-white">Chat Directly On WhatsApp</span>
              </div>
            </a>

            <a 
              href="mailto:business@astrivix.in" 
              className="inline-flex items-center gap-4 glass-metallic hover:border-white/50 rounded-xl px-6 py-4 transition-all duration-200 shadow-2xl group active:scale-95 border border-white/20 max-w-md"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-white/50">Official Email</span>
                <span className="text-sm font-black tracking-wider uppercase text-white">business@astrivix.in</span>
              </div>
            </a>
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 max-w-md backdrop-blur-md">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>STUDIO RESPONSE TIME</span>
            </div>
            <p className="text-xs text-white/70 font-mono leading-relaxed">
              All inquiries sent to business@astrivix.in receive an immediate automated confirmation and a personalized response from our team within 2 hours.
            </p>
          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="bg-white/5 backdrop-blur-2xl p-8 sm:p-12 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
          
          {submitted ? (
            <div className="py-16 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">Inquiry Received!</h3>
              <p className="text-white/70 text-sm max-w-sm font-mono leading-relaxed mb-8">
                Thank you for reaching out. We have received your project details and sent a confirmation email to <strong className="text-white">{formData.email}</strong>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 rounded-full bg-white text-black text-xs font-mono font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
              >
                SEND ANOTHER INQUIRY
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <h3 className="text-2xl font-light text-white tracking-tight uppercase mb-2">
                Project Inquiry
              </h3>

              <div>
                <label className="block text-xs font-mono tracking-widest text-white/60 uppercase mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/40 transition-colors placeholder-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-mono tracking-widest text-white/60 uppercase mb-2">Your Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="sarah@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/40 transition-colors placeholder-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-mono tracking-widest text-white/60 uppercase mb-2">Estimated Budget Range</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/40 transition-colors"
                >
                  <option value="Under $5k">Under $5,000 (Express Sprint)</option>
                  <option value="$5k - $10k">$5,000 - $10,000 (Standard Web Platform)</option>
                  <option value="$10k - $25k">$10,000 - $25,000 (Custom Enterprise App)</option>
                  <option value="$25k+">$25,000+ (Full Product Suite & Retainer)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono tracking-widest text-white/60 uppercase mb-2">Project Brief / Goals</label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us about your brand, scope, and timeline requirements..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/40 transition-colors placeholder-white/30"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group shadow-[0_0_25px_rgba(255,255,255,0.3)] active:scale-[0.99]"
              >
                {loading ? (
                  <span>SUBMITTING INQUIRY...</span>
                ) : (
                  <>
                    <span>SUBMIT PROJECT INQUIRY</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}

        </div>

      </div>
    </section>
  );
}
