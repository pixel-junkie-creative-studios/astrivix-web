import React from 'react';
import { motion } from 'framer-motion';

export default function DownloadVault() {
  const [isDownloading, setIsDownloading] = React.useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 2000);
  };

  return (
    <div className="w-full flex justify-center items-center py-24">
      {/* Vault Container */}
      <div className="bg-[#050505] p-2 rounded-[3rem] border border-[#222] shadow-[inset_0_5px_20px_rgba(255,255,255,0.05),0_30px_60px_rgba(0,0,0,0.8)]">
        <div className="bg-gradient-to-br from-[#151515] to-[#0a0a0a] rounded-[2.5rem] p-8 md:p-12 border-t border-l border-white/10 border-b border-r border-black flex flex-col items-center gap-8 shadow-inner relative overflow-hidden">
          
          {/* Subtle metal glare */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent rounded-t-[2.5rem] pointer-events-none"></div>

          <div className="text-center z-10">
            <h3 className="text-xl md:text-3xl font-black text-white drop-shadow-md mb-2 uppercase tracking-tight">The Executive Dossier</h3>
            <p className="text-white/50 text-xs md:text-sm tracking-widest uppercase font-semibold">Download Complete Portfolio (PDF)</p>
          </div>

          {/* Skeuomorphic Button */}
          <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95, y: 4, boxShadow: "inset 0 10px 20px rgba(0,0,0,0.9), 0 2px 2px rgba(255,255,255,0.1)" }}
            className="relative group bg-gradient-to-b from-[#333] to-[#111] border border-black rounded-full px-12 py-5 shadow-[0_15px_30px_rgba(0,0,0,0.8),inset_0_2px_2px_rgba(255,255,255,0.3)] transition-all flex items-center gap-4 cursor-none overflow-hidden"
          >
            {/* LED Indicator */}
            <div className={`w-3 h-3 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] flex items-center justify-center transition-colors duration-300 ${isDownloading ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)]' : 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]'}`}>
              <div className="w-1 h-1 bg-white/80 rounded-full animate-pulse"></div>
            </div>

            <span className="text-white font-bold tracking-[0.2em] text-sm uppercase drop-shadow-md">
              {isDownloading ? "Decrypting..." : "Initiate Download"}
            </span>

            {/* Button Glare */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 rounded-t-full pointer-events-none"></div>
          </motion.button>
          
        </div>
      </div>
    </div>
  );
}
