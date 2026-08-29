import React from 'react';

export default function PortfolioSubsite() {
  return (
    <div className="w-full h-screen bg-black overflow-hidden relative z-[9999]">
      <iframe 
        src="https://astrivix-portfolio.vercel.app" 
        title="Astrivix Portfolio"
        className="w-full h-full border-0 bg-black"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}
