import React, { useState } from 'react';

export default function FinancialConsultingSubsite() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full h-screen bg-[#050505] overflow-hidden relative z-[9999]">
      {/* Top Header Bar */}
      <div className="absolute top-0 inset-x-0 h-12 bg-black/80 backdrop-blur-xl border-b border-white/10 z-[10000] flex items-center px-6">
        <a 
          href="/" 
          className="text-xs font-mono font-bold tracking-widest text-white/70 hover:text-white uppercase flex items-center gap-2 transition-colors"
        >
          <span>← Back to Astrivix</span>
        </a>
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 bg-[#050505] z-[9999] flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin" />
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/70 animate-pulse">
            LAUNDERING UNTAXED PROFIT...
          </span>
        </div>
      )}

      {/* Embedded Sub-App Iframe */}
      <iframe 
        src="https://astrivix-consultancy.vercel.app" 
        title="Astrivix Financial Consulting"
        onLoad={() => setIsLoading(false)}
        className="w-full h-full pt-12 border-0 bg-black"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}
