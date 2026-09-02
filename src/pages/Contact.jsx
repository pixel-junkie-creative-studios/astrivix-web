import React from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="pt-16 sm:pt-24 pb-24 md:pb-40 min-h-[75vh] flex flex-col justify-center px-4 sm:px-6">
      <motion.div 
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
      >
        {/* Left Column: Direct Comms */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl sm:text-6xl font-black mb-4 sm:mb-6 tracking-tight text-white drop-shadow-md skeuo-engraved">
            Summon Us.
          </h1>
          <p className="text-white/90 mb-8 sm:mb-12 max-w-md text-sm sm:text-base leading-relaxed font-medium">
            Got a project, a wild dream, or a budget that won't make our engineers cry? Fill this out. We reply faster than your ex when they need a favor.
          </p>
          
          <div className="flex flex-col gap-8">

            <div>
              <p className="text-[10px] tracking-widest uppercase text-white/80 font-bold mb-4 font-mono">⚡ Emergency Developer Hotline</p>
              <a 
                href="https://wa.me/917736387794" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-3 glass-metallic hover:border-white/50 rounded-xl px-6 py-4 transition-all duration-200 shadow-2xl group active:scale-95 border border-white/20"
              >
                <svg className="w-5 h-5 text-white group-hover:text-[#25D366] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                <span className="text-xs font-bold tracking-[0.1em] uppercase text-white">DM US ON WHATSAPP BEFORE WE CRASH</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Message Form */}
        <div className="glass-metallic p-8 md:p-12 rounded-[2.5rem] border border-white/30 shadow-2xl relative overflow-hidden flex flex-col justify-center group gpu-layer">
          
          {/* Liquid Glass Reflections */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"></div>

          <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase text-white/80 font-bold ml-2 font-mono">Who Are You?</label>
                <input 
                  type="text" 
                  className="w-full bg-[#0d0d12] border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:border-white/50 focus:outline-none transition-all placeholder:text-white/30"
                  placeholder="Future Billionaire"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase text-white/80 font-bold ml-2 font-mono">Your Empire</label>
                <input 
                  type="text" 
                  className="w-full bg-[#0d0d12] border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:border-white/50 focus:outline-none transition-all placeholder:text-white/30"
                  placeholder="Company Destined For Greatness"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] tracking-widest uppercase text-white/80 font-bold ml-2 font-mono">Digital Inbox</label>
              <input 
                type="email" 
                className="w-full bg-[#0d0d12] border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:border-white/50 focus:outline-none transition-all placeholder:text-white/30"
                placeholder="ceo@your-empire.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] tracking-widest uppercase text-white/80 font-bold ml-2 font-mono">The Master Plan</label>
              <textarea 
                rows="4"
                className="w-full bg-[#0d0d12] border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:border-white/50 focus:outline-none transition-all resize-none placeholder:text-white/30"
                placeholder="Tell us what you want to build. If your budget is $5, we'll pray for your soul. If you're serious, let's ship."
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full py-4 skeuo-button text-black font-extrabold uppercase tracking-[0.2em] rounded-xl text-xs"
            >
              TRANSMIT TO DEVS (BEFORE WE RUN OUT OF COFFEE) →
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
