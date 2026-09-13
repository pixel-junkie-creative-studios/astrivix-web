import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, DollarSign, Sparkles } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '5000',
    message: ''
  });

  const getBudgetFeedback = (val) => {
    if (val === '' || val === null || val === undefined) return null;
    const num = parseFloat(val);
    if (isNaN(num)) return null;

    if (num < 5) {
      return {
        text: "If your budget is under $5, we will pray for your soul 🙏 (Check out our free Astrivix Founders Grant below!)",
        style: "text-amber-300 border-amber-500/30 bg-amber-500/10"
      };
    }
    if (num < 10) {
      return {
        text: "We respect the hustle! For $5, we'll get it done—but you gotta pledge 10% equity of your business! 🤝",
        style: "text-rose-300 border-rose-500/30 bg-rose-500/10"
      };
    }
    if (num < 50) {
      return {
        text: "Hmm, $10 to $50 is low... but guess what? We'll get it done! Just pledge 10% of your business equity to Astrivix! 🚀",
        style: "text-purple-300 border-purple-500/30 bg-purple-500/10"
      };
    }
    if (num < 500) {
      return {
        text: "Scrappy founder energy! Ideal for micro-sprints, brand tokens, or applying for our 100% free Astrivix Founders Grant.",
        style: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10"
      };
    }
    if (num < 5000) {
      return {
        text: "Solid start! Ideal for express landing pages, custom logo suites & brand identity kits (24-72 hrs).",
        style: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10"
      };
    }
    if (num < 25000) {
      return {
        text: "Sweet spot! Perfect for full custom web platforms, interactive animations & mobile applications.",
        style: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10"
      };
    }
    return {
      text: "Legendary status unlocked 🚀 Full studio priority + dedicated sprint squad activated!",
      style: "text-purple-300 border-purple-500/30 bg-purple-500/10"
    };
  };

  const feedback = getBudgetFeedback(formData.budget);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      budget: `$${formData.budget}`,
      message: formData.message,
      _subject: `🚀 New Project Inquiry: ${formData.name} ($${formData.budget})`,
      _captcha: "false",
      _template: "table",
      _autoresponse: `Thank you for contacting Astrivix Corp (${formData.name}). We have received your project inquiry ($${formData.budget}) and our team will get back to you within 2 hours.`
    };

    try {
      // Direct FormSubmit AJAX Endpoint with Captcha Disabled
      const res1 = await fetch("https://formsubmit.co/ajax/business@astrivix.in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (res1.ok) {
        setSubmitted(true);
      } else {
        // Fallback: Post via FormData to FormSubmit standard endpoint
        const bodyForm = new FormData();
        Object.entries(payload).forEach(([k, v]) => bodyForm.append(k, v));
        
        await fetch("https://formsubmit.co/business@astrivix.in", {
          method: "POST",
          mode: "no-cors",
          body: bodyForm
        });
        setSubmitted(true);
      }
    } catch (err) {
      // Final Fallback: Open mailto client
      window.location.href = `mailto:business@astrivix.in?subject=${encodeURIComponent(payload._subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nBudget: $${formData.budget}\n\nMessage:\n${formData.message}`)}`;
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
              className="inline-flex items-center gap-4 bg-[#0E0E16] hover:border-white/50 rounded-xl px-6 py-4 transition-all duration-200 shadow-2xl group active:scale-95 border border-white/20 max-w-md"
            >
              <div className="w-10 h-10 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-white/50">Instant Messaging</span>
                <span className="text-sm font-black tracking-wider uppercase text-white">WHATSAPP NOW</span>
              </div>
            </a>

            <a 
              href="mailto:business@astrivix.in" 
              className="inline-flex items-center gap-4 bg-[#0E0E16] hover:border-white/50 rounded-xl px-6 py-4 transition-all duration-200 shadow-2xl group active:scale-95 border border-white/20 max-w-md"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-white/50">Official Email</span>
                <span className="text-sm font-black tracking-wider uppercase text-white">MAIL US</span>
              </div>
            </a>
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-[#0E0E16] border border-white/10 max-w-md">
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
        <div className="bg-[#0B0B10]/95 p-8 sm:p-12 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
          
          {submitted ? (
            <div className="py-16 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">Inquiry Received!</h3>
              <p className="text-white/70 text-sm max-w-sm font-mono leading-relaxed mb-6">
                Thank you for reaching out! We have dispatched your project details. You can also chat directly with us on WhatsApp or email.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8 w-full max-w-xs justify-center">
                <a
                  href={`https://wa.me/917736387794?text=${encodeURIComponent(`Hi Astrivix! My name is ${formData.name} ($${formData.budget}). Project Brief: ${formData.message}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-full bg-[#25D366] text-black text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#20bd5a] transition-all text-center flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>CHAT ON WHATSAPP</span>
                </a>
                <a
                  href={`mailto:business@astrivix.in?subject=${encodeURIComponent(`Project Inquiry: ${formData.name} ($${formData.budget})`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nBudget: $${formData.budget}\n\nMessage:\n${formData.message}`)}`}
                  className="px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono font-bold uppercase tracking-widest hover:bg-white/20 transition-all text-center flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>EMAIL DIRECTLY</span>
                </a>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-colors"
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

              {/* NUMERIC BUDGET INPUT WITH DYNAMIC FUNNY FEEDBACK */}
              <div>
                <label className="block text-xs font-mono tracking-widest text-white/60 uppercase mb-2">
                  Estimated Budget (USD $)
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-white/50 text-base font-mono font-bold">$</span>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    required
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    placeholder="Enter amount in USD (e.g. 5000)"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3.5 text-sm text-white font-mono focus:outline-none focus:border-white/40 transition-colors placeholder-white/30"
                  />
                </div>

                {/* DYNAMIC FUNNY FEEDBACK BOX */}
                {feedback && (
                  <div className={`mt-3 p-3.5 rounded-xl border text-xs font-mono leading-relaxed transition-all duration-300 flex items-start gap-2.5 ${feedback.style}`}>
                    <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{feedback.text}</span>
                  </div>
                )}
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
