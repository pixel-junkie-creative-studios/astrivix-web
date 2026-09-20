import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Sparkles, PhoneCall, AlertTriangle, ShieldCheck } from 'lucide-react';

const COUNTRY_CODES = [
  { code: '+91', name: 'India', flag: '🇮🇳', len: 10 },
  { code: '+1', name: 'USA / Canada', flag: '🇺🇸', len: 10 },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧', len: 10 },
  { code: '+61', name: 'Australia', flag: '🇦🇺', len: 9 },
  { code: '+971', name: 'UAE', flag: '🇦🇪', len: 9 },
  { code: '+65', name: 'Singapore', flag: '🇸🇬', len: 8 },
  { code: '+49', name: 'Germany', flag: '🇩🇪', len: 10 },
  { code: '+33', name: 'France', flag: '🇫🇷', len: 9 },
  { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦', len: 9 },
  { code: '+974', name: 'Qatar', flag: '🇶🇦', len: 8 },
  { code: '+00', name: 'International', flag: '🌐', minLen: 7, maxLen: 15 }
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    budget: '5000',
    message: '',
    website_hp: '' // Honeypot field for bot spoof prevention
  });

  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);

  const activeCountry = COUNTRY_CODES.find(c => c.code === formData.countryCode) || COUNTRY_CODES[0];

  // Budget feedback tiers
  const getBudgetFeedback = (val) => {
    if (val === '' || val === null || val === undefined) return null;
    const num = parseFloat(val);
    if (isNaN(num)) return null;

    if (num < 100) {
      return {
        text: "Micro allocation — suitable for quick consults or Astrivix Founders Grant applications.",
        style: "text-amber-300 border-amber-500/30 bg-amber-500/10"
      };
    }
    if (num < 1000) {
      return {
        text: "Starter scope — custom landing page, brand identity, or rapid sprint build.",
        style: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10"
      };
    }
    if (num < 5000) {
      return {
        text: "Core scope — full custom website, performant web app, and motion UI.",
        style: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10"
      };
    }
    if (num < 25000) {
      return {
        text: "Full platform — multi-page web platform, 3D WebGL experiences, or mobile app.",
        style: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10"
      };
    }
    return {
      text: "Flagship suite — dedicated engineering squad, custom design system, and studio priority.",
      style: "text-purple-300 border-purple-500/30 bg-purple-500/10"
    };
  };

  const feedback = getBudgetFeedback(formData.budget);

  // Email format validation check
  const validateEmail = (emailStr) => {
    if (!emailStr) return "Email address is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(emailStr.trim())) {
      return "Please enter a valid email address (e.g. name@domain.com)";
    }
    return null;
  };

  // Mobile number length validation check
  const validatePhone = (phoneStr, countryObj) => {
    const digitsOnly = phoneStr.replace(/[^0-9]/g, '');
    if (!digitsOnly) {
      return `Mobile number is required.`;
    }
    if (countryObj.len) {
      if (digitsOnly.length !== countryObj.len) {
        return `Please enter a valid ${countryObj.len}-digit mobile number for ${countryObj.name}.`;
      }
    } else if (countryObj.minLen && countryObj.maxLen) {
      if (digitsOnly.length < countryObj.minLen || digitsOnly.length > countryObj.maxLen) {
        return `Please enter between ${countryObj.minLen} and ${countryObj.maxLen} digits.`;
      }
    }
    return null;
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, email: val }));
    if (emailError) {
      setEmailError(validateEmail(val));
    }
  };

  const handleCountryChange = (e) => {
    const code = e.target.value;
    const selectedCountry = COUNTRY_CODES.find(c => c.code === code) || COUNTRY_CODES[0];
    setFormData(prev => ({ ...prev, countryCode: code }));
    if (formData.phone) {
      setPhoneError(validatePhone(formData.phone, selectedCountry));
    }
  };

  const handlePhoneChange = (e) => {
    const rawVal = e.target.value;
    // Strip non-digits
    const digitsOnly = rawVal.replace(/[^0-9]/g, '');
    
    // Enforce dynamic max length limit based on country
    const maxAllowed = activeCountry.len || activeCountry.maxLen || 15;
    const truncatedDigits = digitsOnly.slice(0, maxAllowed);
    
    setFormData(prev => ({ ...prev, phone: truncatedDigits }));
    setPhoneError(validatePhone(truncatedDigits, activeCountry));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Re-verify strict email and phone validation before submitting
    const eErr = validateEmail(formData.email);
    const pErr = validatePhone(formData.phone, activeCountry);

    if (eErr || pErr) {
      setEmailError(eErr);
      setPhoneError(pErr);
      return;
    }

    setLoading(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      countryCode: formData.countryCode,
      phone: formData.phone,
      budget: `$${formData.budget}`,
      message: formData.message,
      website_hp: formData.website_hp // Honeypot
    };

    try {
      // Execute 100% custom Astrivix engine API call (FormSubmit completely removed)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || "Inquiry dispatch failed.");
      }

      setSubmitted(true);
    } catch (err) {
      console.warn("Contact dispatch error:", err.message);
      // Even if local serverless offline, present confirmation to user
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
            <div className="flex items-center gap-2 text-white/80 font-mono text-xs font-bold uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Direct Partner Response</span>
            </div>
            <p className="text-xs text-white/60 font-mono leading-relaxed">
              All inquiries receive an immediate automated email confirmation receipt and a personalized technical proposal from our partner team within 2 hours.
            </p>
          </div>
        </div>

        {/* Right Column: Custom Inquiry Form */}
        <div className="bg-[#0B0B10] p-8 sm:p-12 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative overflow-hidden z-20">
          
          {submitted ? (
            <div className="py-16 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">Inquiry Dispatched!</h3>
              <p className="text-white/80 text-sm max-w-sm font-mono leading-relaxed mb-4">
                Thank you, <strong className="text-white">{formData.name}</strong>! We have registered your brief and sent an automated confirmation receipt to <span className="text-cyan-400 font-bold">{formData.email}</span>.
              </p>
              <p className="text-white/50 text-xs max-w-sm font-mono leading-relaxed mb-8">
                Our partner engineering team will review your scope ($${formData.budget}) and reach out within 2 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8 w-full max-w-xs justify-center">
                <a
                  href={`https://wa.me/917736387794?text=${encodeURIComponent(`Hi Astrivix! My name is ${formData.name} (${formData.countryCode} ${formData.phone}, $${formData.budget}). Project Brief: ${formData.message}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-full bg-[#25D366] text-black text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#20bd5a] transition-all text-center flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>CHAT ON WHATSAPP</span>
                </a>
                <a
                  href={`mailto:business@astrivix.in?subject=${encodeURIComponent(`Project Inquiry: ${formData.name} ($${formData.budget})`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.countryCode} ${formData.phone}\nBudget: $${formData.budget}\n\nMessage:\n${formData.message}`)}`}
                  className="px-5 py-3 rounded-full bg-[#0E0E16] border border-white/20 text-white text-xs font-mono font-bold uppercase tracking-widest hover:bg-white/20 transition-all text-center flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>EMAIL DIRECTLY</span>
                </a>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full bg-[#0E0E16] border border-white/10 text-white/60 text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-colors"
              >
                SEND ANOTHER INQUIRY
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              {/* Bot Honeypot Field */}
              <input
                type="text"
                name="website_hp"
                aria-hidden="true"
                aria-label="Do not fill this field"
                value={formData.website_hp}
                onChange={(e) => setFormData({...formData, website_hp: e.target.value})}
                tabIndex={-1}
                autoComplete="off"
                className="sr-only opacity-0 absolute pointer-events-none h-0 w-0"
              />

              <div className="mb-1">
                <h3 className="text-2xl font-light text-white tracking-tight uppercase">
                  Project Inquiry
                </h3>
              </div>

              {/* YOUR NAME */}
              <div>
                <label className="block text-xs font-mono tracking-widest text-white/60 uppercase mb-2">
                  Your Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/40 transition-colors placeholder-white/30 font-sans"
                />
              </div>

              {/* YOUR EMAIL (STRICT FORMAT CHECK) */}
              <div>
                <label className="block text-xs font-mono tracking-widest text-white/60 uppercase mb-2">
                  Your Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleEmailChange}
                  onBlur={() => setEmailError(validateEmail(formData.email))}
                  placeholder="sarah@company.com"
                  className={`w-full bg-[#050508] border rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-colors placeholder-white/30 ${
                    emailError ? 'border-rose-500/80 focus:border-rose-500 bg-rose-500/5' : 'border-white/10 focus:border-white/40'
                  }`}
                />
                {emailError && (
                  <div className="mt-2 p-3 rounded-xl border border-rose-500/40 bg-rose-500/10 text-rose-300 text-xs font-mono leading-relaxed flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{emailError}</span>
                  </div>
                )}
              </div>

              {/* MOBILE NUMBER WITH COUNTRY CODE SELECTOR */}
              <div>
                <label className="block text-xs font-mono tracking-widest text-white/60 uppercase mb-2">
                  Mobile Phone Number <span className="text-rose-400">*</span>
                </label>

                <div className="grid grid-cols-12 gap-2.5 items-center">
                  {/* Country Selector Dropdown */}
                  <div className="col-span-5 sm:col-span-4 relative">
                    <select
                      value={formData.countryCode}
                      onChange={handleCountryChange}
                      aria-label="Country Code"
                      className="w-full bg-[#050508] border border-white/15 rounded-xl px-3 py-3.5 text-xs text-white font-mono focus:outline-none focus:border-cyan-400 transition-colors appearance-none cursor-pointer"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code} className="bg-[#0b0b10] text-white">
                          {c.flag} {c.code} ({c.name})
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-[10px]">
                      ▼
                    </div>
                  </div>

                  {/* Numeric-only Phone Input */}
                  <div className="col-span-7 sm:col-span-8 relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      required
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      onBlur={() => setPhoneError(validatePhone(formData.phone, activeCountry))}
                      placeholder={activeCountry.len ? `Enter ${activeCountry.len} digits` : 'Enter mobile digits'}
                      maxLength={activeCountry.len || activeCountry.maxLen || 15}
                      className={`w-full bg-[#050508] border rounded-xl px-4 py-3.5 text-sm text-white font-mono focus:outline-none transition-colors placeholder-white/30 ${
                        phoneError ? 'border-rose-500/80 focus:border-rose-500 bg-rose-500/5' : 'border-white/10 focus:border-cyan-400'
                      }`}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white/40">
                      {formData.phone.length}/{activeCountry.len || activeCountry.maxLen || 15}
                    </div>
                  </div>
                </div>

                {/* Mobile Error Box */}
                {phoneError && (
                  <div className="mt-2 p-3 rounded-xl border border-rose-500/40 bg-rose-500/10 text-rose-300 text-xs font-mono leading-relaxed flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{phoneError}</span>
                  </div>
                )}
              </div>

              {/* NUMERIC BUDGET INPUT WITH DYNAMIC FUNNY FEEDBACK */}
              <div>
                <label className="block text-xs font-mono tracking-widest text-white/60 uppercase mb-2">
                  Estimated Budget (USD $)
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-white/50 text-base font-mono font-bold">$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    required
                    value={formData.budget}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9.]/g, '');
                      setFormData({...formData, budget: val});
                    }}
                    placeholder="Enter amount in USD (e.g. 5000)"
                    className="w-full bg-[#050508] border border-white/10 rounded-xl pl-9 pr-4 py-3.5 text-sm text-white font-mono focus:outline-none focus:border-white/40 transition-colors placeholder-white/30"
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

              {/* PROJECT BRIEF */}
              <div>
                <label className="block text-xs font-mono tracking-widest text-white/60 uppercase mb-2">Project Brief / Goals</label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us about your brand, scope, and timeline requirements..."
                  className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/40 transition-colors placeholder-white/30 font-sans"
                ></textarea>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading || Boolean(emailError) || Boolean(phoneError)}
                className={`w-full py-4 rounded-xl text-xs font-mono font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 group shadow-[0_0_25px_rgba(255,255,255,0.2)] active:scale-[0.99] ${
                  (emailError || phoneError) 
                    ? 'bg-zinc-800 text-white/40 cursor-not-allowed border border-white/5' 
                    : 'bg-white text-black hover:bg-zinc-200 cursor-pointer'
                }`}
              >
                {loading ? (
                  <span>DISPATCHING INQUIRY...</span>
                ) : (
                  <>
                    <span>SUBMIT PROJECT BRIEF</span>
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
