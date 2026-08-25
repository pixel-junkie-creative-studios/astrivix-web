import React from 'react';
import { motion } from 'framer-motion';
import DownloadVault from '../components/ui/DownloadVault';
import MagneticCursor from '../components/MagneticCursor';

const portfolioItems = [
  { id: 1, title: 'Nova Protocol', category: 'Blockchain / Web3', image: '/assets/portfolio1.jpg', span: 'col-span-1 md:col-span-2 row-span-2' },
  { id: 2, title: 'Aura Fintech', category: 'UI/UX & Branding', image: '/assets/portfolio2.jpg', span: 'col-span-1 row-span-1' },
  { id: 3, title: 'Apex CRM', category: 'Enterprise Web', image: '/assets/portfolio3.jpg', span: 'col-span-1 row-span-1' },
  { id: 4, title: 'Lumina OS', category: 'Motion & Strategy', image: '/assets/portfolio4.jpg', span: 'col-span-1 md:col-span-2 row-span-1' },
];

export default function PortfolioShowcase() {
  return (
    <div className="min-h-screen bg-[#050505] text-white w-full max-w-[100vw] overflow-x-hidden selection:bg-white selection:text-black font-sans">
      <MagneticCursor />
      
      {/* Aesthetic Background */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(40,40,40,0.4),rgba(0,0,0,1))] mix-blend-screen" />
      
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 py-32">
        
        {/* Header */}
        <div className="mb-24 flex flex-col items-center text-center">
          <h1 className="text-xs tracking-[0.4em] font-bold text-white/40 uppercase flex items-center gap-4 mb-6">
            <span className="w-12 h-px bg-white/20"></span>
            Case Studies
            <span className="w-12 h-px bg-white/20"></span>
          </h1>
          <h2 className="text-5xl md:text-[5rem] font-black tracking-tighter uppercase leading-[0.9] text-white drop-shadow-2xl">
            The Dossier
          </h2>
        </div>

        {/* Masonry Grid (Skeuomorphic) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] mb-32">
          {portfolioItems.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              className={`relative group bg-[#111] rounded-[2.5rem] border-t border-l border-white/20 border-b border-r border-black/80 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.8)] hover:shadow-[inset_0_2px_15px_rgba(255,255,255,0.1),0_25px_50px_rgba(0,0,0,0.9)] overflow-hidden ${item.span} cursor-none transition-all duration-500`}
            >
              {/* Image Placeholder with Gradient Overlay */}
              <div className="absolute inset-0 bg-zinc-800">
                <div className="w-full h-full bg-gradient-to-tr from-[#111] to-[#333] opacity-50 group-hover:scale-105 transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              </div>

              {/* Skeuomorphic Glass Glare */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-[2.5rem] pointer-events-none mix-blend-screen"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end">
                <div className="mb-4">
                  <span className="inline-block bg-white/10 backdrop-blur-md border border-white/10 shadow-inner px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/80">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter drop-shadow-lg">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Download Vault */}
        <DownloadVault />

        <div className="w-full text-center mt-24">
           <a href="/" className="text-xs font-mono tracking-widest text-white/50 hover:text-white uppercase transition-colors">
              &larr; Return to Main Site
           </a>
        </div>

      </div>
    </div>
  );
}
