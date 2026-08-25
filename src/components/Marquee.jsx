import React from 'react';
import './Marquee.css';

export default function Marquee({ images }) {
  return (
    <div className="marquee-container">
      <div className="marquee-gradient-left" />
      <div className="marquee-gradient-right" />
      
      <div className="marquee-track">
        {/* We duplicate the array to create a seamless infinite loop */}
        {[...images, ...images].map((src, i) => (
          <div key={i} className="marquee-item">
            <img 
              src={src} 
              alt="Client Logo" 
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
