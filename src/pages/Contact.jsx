import React from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="pt-24 pb-40 min-h-[75vh] flex flex-col justify-center">
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
        className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        {/* Left Column: Direct Comms */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Contact Us.
          </h1>
          <p className="text-white/60 mb-12 max-w-md text-sm leading-relaxed">
            Get in touch to discuss your next project. We are ready to help you build resilient digital infrastructure.
          </p>
          
          <div className="flex flex-col gap-8">

            <div>
              <p className="text-[10px] tracking-widest uppercase text-white/30 mb-4">WhatsApp</p>
              <a 
                href="https://wa.me/917736387794" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl px-6 py-4 transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.4),inset_1px_1px_0_rgba(255,255,255,0.1)] group"
              >
                <svg className="w-5 h-5 text-white/70 group-hover:text-[#25D366] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                <span className="text-xs font-bold tracking-[0.1em] uppercase">Message on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Message Form */}
        <div className="bg-white/5 backdrop-blur-3xl p-10 md:p-14 rounded-[2.5rem] border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2),inset_0_0_20px_rgba(255,255,255,0.02)] relative overflow-hidden flex flex-col justify-center group">
          
          {/* Liquid Glass Reflections */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"></div>
          <div className="absolute left-0 top-0 w-[1px] h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
          
          {/* Animated Light Sweep */}
          <div className="absolute -inset-[100%] top-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 transform -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out pointer-events-none"></div>

          <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase text-white/50 font-bold ml-2">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-black/20 backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_1px_0_rgba(255,255,255,0.05)] border border-white/5 rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 focus:bg-black/30 focus:border-white/10 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase text-white/50 font-bold ml-2">Company</label>
                <input 
                  type="text" 
                  className="w-full bg-black/20 backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_1px_0_rgba(255,255,255,0.05)] border border-white/5 rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 focus:bg-black/30 focus:border-white/10 transition-all"
                  placeholder="Acme Corp"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] tracking-widest uppercase text-white/50 font-bold ml-2">Email</label>
              <input 
                type="email" 
                className="w-full bg-black/20 backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_1px_0_rgba(255,255,255,0.05)] border border-white/5 rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 focus:bg-black/30 focus:border-white/10 transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] tracking-widest uppercase text-white/50 font-bold ml-2">Message</label>
              <textarea 
                rows="4"
                className="w-full bg-black/20 backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_1px_0_rgba(255,255,255,0.05)] border border-white/5 rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 focus:bg-black/30 focus:border-white/10 transition-all resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button className="w-full relative overflow-hidden bg-white/10 hover:bg-white/20 backdrop-blur-xl shadow-[0_8px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] border border-white/10 text-white font-bold tracking-widest uppercase text-sm py-5 rounded-xl transition-all active:scale-95 mt-4 group/btn">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
              <span className="relative z-10 shadow-black drop-shadow-md">Send Message</span>
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
