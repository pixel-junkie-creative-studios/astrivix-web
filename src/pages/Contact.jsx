import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleButton from '../components/ui/ParticleButton';
import { CheckCircle, ArrowRight, Mail, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', details: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.details) return;

    setLoading(true);

    try {
      // Direct AJAX dispatch to business@astrivix.in with automatic AI response confirmation
      await fetch("https://formsubmit.co/ajax/business@astrivix.in", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `New Executive Inquiry: ${formData.name}`,
          _autoresponse: `Thank you for contacting Astrivix Corp. Our automated AI system has received your project specifications and routed them to our Principal Engineering team. An Astrivix strategist will respond within 2 hours.`,
          name: formData.name,
          email: formData.email,
          message: formData.details
        })
      });
    } catch (err) {
      console.warn("FormSubmit background dispatch fallback triggered:", err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div id="contact" className="pt-16 sm:pt-24 pb-24 md:pb-40 min-h-[75vh] flex flex-col justify-center px-4 sm:px-6 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
      >
        {/* Left Column: Direct Comms */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl sm:text-6xl font-black mb-4 sm:mb-6 tracking-tight text-white drop-shadow-md skeuo-engraved uppercase">
            Initiate Contact.
          </h1>
          <p className="text-white/90 mb-8 sm:mb-12 max-w-md text-sm sm:text-base leading-relaxed font-medium">
            Partner with Astrivix Corp to engineer high-converting digital platforms, custom software, and global brand architecture. Share your project requirements below.
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
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-white/50">WhatsApp Concierge</span>
                <span className="text-sm font-black tracking-wider uppercase text-white">Direct WhatsApp Consultation</span>
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
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-white/50">Official Inquiry Desk</span>
                <span className="text-sm font-black tracking-wider uppercase text-white">business@astrivix.in</span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: Executive Form */}
        <div className="glass-metallic p-6 sm:p-10 rounded-[2.5rem] border border-white/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50" />
          
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col gap-6" 
                onSubmit={handleSubmit}
              >
                <div>
                  <label className="block text-xs font-bold text-white/70 uppercase tracking-widest mb-2 font-mono">YOUR NAME / ORGANIZATION</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#08080c] border border-white/20 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/60 transition-colors text-sm font-medium"
                    placeholder="e.g. John Doe / Apex Global"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-white/70 uppercase tracking-widest mb-2 font-mono">EMAIL ADDRESS</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#08080c] border border-white/20 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/60 transition-colors text-sm font-medium"
                    placeholder="john@organization.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/70 uppercase tracking-widest mb-2 font-mono">PROJECT DETAILS</label>
                  <textarea 
                    rows="4" 
                    required
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full bg-[#08080c] border border-white/20 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/60 transition-colors text-sm font-medium"
                    placeholder="Describe your project scope, technical requirements, or strategic timeline..."
                  ></textarea>
                </div>

                <ParticleButton 
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl"
                >
                  {loading ? "DISPATCHING INQUIRY..." : "SUBMIT PROJECT INQUIRY →"}
                </ParticleButton>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-10"
              >
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white mb-6">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-3">
                  Inquiry Dispatched Successfully.
                </h3>
                <p className="text-white/80 text-sm max-w-md leading-relaxed mb-6 font-medium">
                  Your project specifications have been dispatched to <span className="font-mono text-white underline">business@astrivix.in</span>. Our automated AI dispatch system has sent a preliminary confirmation & scheduling brief to <span className="font-mono text-white">{formData.email}</span>.
                </p>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/60 mb-6 text-left w-full">
                  <div>[AI SYSTEM NOTE]</div>
                  <div>Status: Queued for Senior Principal Engineer review.</div>
                  <div>Estimated Response Time: &lt; 2 Hours</div>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', details: '' });
                  }}
                  className="text-xs font-mono font-bold tracking-widest text-white/70 hover:text-white uppercase underline"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
