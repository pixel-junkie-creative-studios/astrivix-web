import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('astrivix_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('astrivix_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('astrivix_cookie_consent', 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-50 p-6 bg-black/80 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl text-white"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/80 shrink-0">
                <Cookie className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm tracking-wide">Privacy & Cookie Preferences</h3>
            </div>
            <button
              onClick={handleDecline}
              aria-label="Close Cookie Banner"
              className="text-white/40 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-white/60 text-xs mt-3 leading-relaxed">
            We use essential cookies and analytical tags to optimize site performance, zero-lag WebGL rendering, and secure user browsing. Read our{' '}
            <Link to="/privacy" className="text-white underline hover:text-white/80">
              Privacy Policy
            </Link>.
          </p>

          <div className="flex items-center gap-3 mt-5">
            <button
              onClick={handleAccept}
              className="flex-1 py-2.5 px-4 bg-white text-black hover:bg-zinc-200 font-bold text-xs rounded-full shadow-lg transition-all tracking-wider uppercase"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white/80 font-medium text-xs rounded-full border border-white/10 transition-colors tracking-wider uppercase"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
