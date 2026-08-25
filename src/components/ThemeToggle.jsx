import React, { useEffect, useState } from 'react';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true); // Default to dark for Astrivix

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      // Default or saved 'dark'
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <label className="theme theme__toggle-wrap cursor-pointer" title="Toggle Light/Dark Mode">
      <input 
        type="checkbox" 
        className="theme__toggle" 
        checked={!isDark} 
        onChange={toggleTheme} 
      />
      <span className="theme__icon">
        <span className="theme__icon-part"></span>
        <span className="theme__icon-part"></span>
        <span className="theme__icon-part"></span>
        <span className="theme__icon-part"></span>
        <span className="theme__icon-part"></span>
        <span className="theme__icon-part"></span>
        <span className="theme__icon-part"></span>
        <span className="theme__icon-part"></span>
        <span className="theme__icon-part"></span>
      </span>
    </label>
  );
}
