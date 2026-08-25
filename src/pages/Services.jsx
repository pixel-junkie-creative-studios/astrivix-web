import React from 'react';
import ScrollStack, { ScrollStackItem } from '../components/ui/ScrollStack';

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

      <div className="relative w-full z-10">
        <ScrollStack
          useWindowScroll={true}
          itemDistance={100}
          itemStackDistance={30}
          stackPosition="20%"
          baseScale={0.9}
        >
          {services.map((service, index) => (
            <ScrollStackItem key={service.id} itemClassName="!h-[60vh] md:!h-[50vh] !p-0 !bg-transparent border-0 shadow-none w-full max-w-[90vw] md:max-w-6xl mx-auto">
              <div 
                className="relative flex flex-col justify-between w-full h-full p-6 md:p-12 rounded-[2rem] border border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] overflow-hidden bg-[#050505]"
              >
                {/* Card Background gradient */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{ background: `radial-gradient(circle at top right, ${service.color}, transparent 70%)` }}
                />
                
                <div className="relative z-10 flex justify-between items-start w-full">
                  <span className="text-2xl md:text-4xl font-mono tracking-widest font-black text-white/30">
                    {service.id}
                  </span>
                  <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-white/50 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                    {service.category}
                  </span>
                </div>

                <div className="relative z-10 mt-auto flex flex-col gap-4 md:gap-6">
                  <h4 className="text-3xl sm:text-4xl md:text-6xl lg:text-[5rem] font-black tracking-tighter uppercase text-white leading-[1] md:leading-[0.9]">
                    {service.title}
                  </h4>
                  <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed font-medium">
                    {service.desc}
                  </p>
                </div>
                
                {/* Aesthetic glowing line */}
                <div 
                  className="absolute bottom-0 left-0 h-1 w-full"
                  style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
                />
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </div>
  );
}
