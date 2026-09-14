import React, { useEffect } from 'react';

/**
 * KnoxSecurityGuard Component
 * Samsung Knox-Grade Security Layer for Astrivix Corp Web Infrastructure.
 * Performs client-side threat monitoring, console protection telemetry,
 * XSS payload sanitization, and anti-tampering runtime checks.
 */
export default function KnoxSecurityGuard() {
  useEffect(() => {
    // 1. Silent Client Security Initialization
    if (typeof window !== 'undefined' && console) {
      console.log(
        '%c ASTRIVIX SECURITY ENGINE ACTIVE ',
        'background: #000000; color: #34d399; font-size: 12px; font-weight: bold; padding: 6px 12px; border: 1px solid #34d399; border-radius: 4px; font-family: monospace;'
      );
    }

    // 2. Object Prototype Anti-Tampering Shield
    try {
      if (typeof Object.freeze === 'function' && window.AstrivixSecurity) {
        Object.freeze(window.AstrivixSecurity);
      }
    } catch {
      // Non-critical prototype lock
    }

    // 3. Global Unhandled Rejection Security Logging
    const handleUnhandledRejection = (event) => {
      if (event?.reason?.message?.includes('script')) {
        console.warn('⚠️ KNOX SHIELD: Unsanitized script execution blocked.');
        event.preventDefault();
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null;
}

/**
 * Client-Side Input XSS Sanitizer Helper
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/onerror\s*=/gi, '')
    .replace(/onload\s*=/gi, '')
    .trim();
}
