import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ customCrumbs }) {
  const location = useLocation();

  const getDefaultCrumbs = () => {
    const path = location.pathname;
    if (path === '/') return [{ name: 'Home', path: '/' }];
    
    const parts = path.split('/').filter(Boolean);
    const crumbs = [{ name: 'Home', path: '/' }];

    parts.forEach((part, index) => {
      const url = `/${parts.slice(0, index + 1).join('/')}`;
      const formattedName = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
      crumbs.push({ name: formattedName, path: url });
    });

    return crumbs;
  };

  const crumbs = customCrumbs || getDefaultCrumbs();

  // JSON-LD Structured Data for Google Search Engine Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `https://www.astrivix.in${crumb.path}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="w-full max-w-7xl mx-auto px-6 py-4">
        <ol className="inline-flex items-center space-x-2 bg-white/5 dark:bg-black/40 backdrop-blur-md border border-white/10 dark:border-white/15 px-4 py-2 rounded-full text-xs font-mono tracking-wider text-white/70">
          {crumbs.map((crumb, idx) => {
            const isLast = idx === crumbs.length - 1;
            return (
              <li key={crumb.path} className="inline-flex items-center">
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-white/40" />}
                {idx === 0 ? (
                  <Link to="/" className="inline-flex items-center hover:text-pink-400 transition-colors gap-1.5">
                    <Home className="w-3.5 h-3.5 text-pink-400" />
                    <span className="hidden sm:inline font-sans font-medium text-white/90">Home</span>
                  </Link>
                ) : isLast ? (
                  <span className="text-pink-400 font-semibold uppercase tracking-widest" aria-current="page">
                    {crumb.name}
                  </span>
                ) : (
                  <Link to={crumb.path} className="hover:text-pink-400 transition-colors uppercase">
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
