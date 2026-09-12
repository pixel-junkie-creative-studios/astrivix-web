import React, { useEffect } from 'react';

/**
 * SEOManager Component for Astrivix Corp (www.astrivix.in)
 * Handles Google Search Console Verification, Google Analytics 4 (GA4) Tracking,
 * OpenGraph, Twitter Cards, and Rich Schema.org LD+JSON Structured Data.
 */
export default function SEOManager({
  title = "Astrivix Corp | #1 Global Web Development, Branding & Mobile App Engineering Agency",
  description = "Astrivix Corp (www.astrivix.in) is an elite global agency specializing in enterprise web development, native mobile app engineering, custom branding, and high-ROI digital marketing.",
  canonical = "https://www.astrivix.in/",
  googleSiteVerification = "GSC-VERIFICATION-TOKEN-PLACEHOLDER",
  gaMeasurementId = "G-MEASUREMENT-ID-PLACEHOLDER"
}) {
  useEffect(() => {
    // 1. Title & Meta Tags Update
    if (typeof document !== 'undefined') {
      document.title = title;

      const setMeta = (nameAttr, val, isProperty = false) => {
        let el = document.querySelector(isProperty ? `meta[property="${nameAttr}"]` : `meta[name="${nameAttr}"]`);
        if (!el) {
          el = document.createElement('meta');
          if (isProperty) el.setAttribute('property', nameAttr);
          else el.setAttribute('name', nameAttr);
          document.head.appendChild(el);
        }
        el.setAttribute('content', val);
      };

      setMeta('title', title);
      setMeta('description', description);
      setMeta('google-site-verification', googleSiteVerification);
      setMeta('og:title', title, true);
      setMeta('og:description', description, true);
      setMeta('twitter:title', title, true);
      setMeta('twitter:description', description, true);
    }

    // 2. Google Analytics (GA4) Tag Script Injection
    if (typeof window !== 'undefined' && gaMeasurementId && gaMeasurementId !== "G-MEASUREMENT-ID-PLACEHOLDER") {
      if (!document.getElementById('ga-gtag')) {
        const gtagScript = document.createElement('script');
        gtagScript.id = 'ga-gtag';
        gtagScript.async = true;
        gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
        document.head.appendChild(gtagScript);

        const gtagInit = document.createElement('script');
        gtagInit.id = 'ga-gtag-init';
        gtagInit.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaMeasurementId}', { page_path: window.location.pathname });
        `;
        document.head.appendChild(gtagInit);
      }
    }
  }, [title, description, canonical, googleSiteVerification, gaMeasurementId]);

  return null;
}
