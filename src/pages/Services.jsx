import React from 'react';

const services = [
  { id: '01', title: 'INTEGRATED BRANDING', category: 'Strategy & Identity', color: '#ff4d4d', desc: 'Crafting unique brand identities that resonate and leave a lasting impression.' },
  { id: '02', title: 'ENTERPRISE WEB DEV', category: 'Engineering & Scale', color: '#4d79ff', desc: 'Building robust, scalable, and high-performance web applications.' },
  { id: '03', title: 'MOBILE APP ENGINEERING', category: 'Native & PWA', color: '#4dff88', desc: 'Designing seamless mobile experiences for iOS and Android platforms.' },
  { id: '04', title: 'DIGITAL MARKETING', category: 'Growth, SEO, AEO & More', color: '#ff4dff', desc: 'Driving growth through data-driven marketing and SEO dominance.' },
  { id: '05', title: 'CONVERSION OPTIMIZATION', category: 'UX/UI & Analytics', color: '#ffff4d', desc: 'Turning visitors into loyal customers through expert UI/UX methodologies.' },
  { id: '06', title: 'GRAPHIC & UI DESIGN', category: 'Visual Identity', color: '#ff884d', desc: 'Creating visually stunning interfaces that elevate your digital presence.' },
  { id: '07', title: 'MOTION & VIDEO', category: 'Creative Production', color: '#4dffff', desc: 'Bringing ideas to life with cinematic video production and motion graphics.' },
  { id: '08', title: 'BUSINESS CONSULTING', category: 'Strategy & Growth', color: '#b34dff', desc: 'Providing strategic insights to scale operations and maximize revenue.' },
  { id: '09', title: 'FINANCE CONSULTING', category: 'Management & Scaling', color: '#4dffb3', desc: 'Expert financial management to ensure sustainable and profitable scaling.' }
];

export default function Services() {
  return (
    <div id="services" className="relative z-10 w-full bg-transparent pt-32 min-h-screen">
      
      {/* Header section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full mb-8 relative z-20 pointer-events-none">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-12 gap-8">
          <div>
            <h2 className="text-xs tracking-[0.4em] font-bold text-ax-text/40 uppercase flex items-center gap-4 mb-4">
              <span className="w-12 h-px bg-ax-text/20"></span>
              Our Capabilities
            </h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-white">
              What we do.
            </h3>
          </div>
          <p className="text-white/50 text-sm max-w-xs font-medium uppercase tracking-widest leading-relaxed">
            We engineer digital perfection across every vertical.
          </p>
        </div>
      </div>

      <div className="relative w-full z-10 max-w-6xl mx-auto px-4 md:px-8 pb-32">
        <div className="flex flex-col gap-0">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="sticky w-full"
              style={{ top: `calc(10vh + ${index * 1.5}rem)` }}
            >
              <div 
                className="relative flex flex-col justify-between w-full h-[60vh] md:h-[50vh] p-8 md:p-14 rounded-[2rem] border border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] overflow-hidden bg-[#0a0a0a] transition-all duration-500 mb-24"
              >
                {/* Card Background gradient */}
                <div 
                  className="absolute inset-0 opacity-15"
                  style={{ background: `radial-gradient(circle at top right, ${service.color}, transparent 60%)` }}
                />
                
                <div className="relative z-10 flex justify-between items-start w-full">
                  <span className="text-4xl md:text-5xl font-mono tracking-widest font-black text-white/20">
                    {service.id}
                  </span>
                  <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white/50 bg-white/5 px-5 py-2.5 rounded-full border border-white/10 backdrop-blur-md">
                    {service.category}
                  </span>
                </div>

                <div className="relative z-10 mt-auto flex flex-col gap-4 md:gap-6">
                  <h4 className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter uppercase text-white leading-[0.9]">
                    {service.title}
                  </h4>
                  <p className="text-base md:text-lg text-white/60 max-w-2xl leading-relaxed font-medium">
                    {service.desc}
                  </p>
                </div>
                
                {/* Aesthetic glowing line */}
                <div 
                  className="absolute bottom-0 left-0 h-1.5 w-full opacity-70"
                  style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
