---
name: Astrivix Impeccable Design System
description: Neo Kinpaku obsidian system for Astrivix Corp. Warm lacquer black, kinpaku gold leaf accents, verdigris patina state indicators, and crisp geometric typography.

colors:
  # Brand Anchors
  kinpaku-gold: "oklch(84% 0.19 80.46)"
  verdigris-patina: "oklch(70% 0.12 188)"
  dark-ink: "oklch(14% 0.018 95)"
  gold-accent: "#E5A93C"
  patina-accent: "#38C7B4"
  obsidian-dark: "#0A0A0F"

  # Surfaces
  lacquer-black: "oklch(7% 0.006 95)"
  lacquer-deep: "oklch(4% 0.004 95)"
  raised-lacquer: "oklch(11% 0.006 95)"
  graphite: "oklch(15% 0.008 95)"

  # Text
  champagne: "oklch(91% 0 0)"
  text-warm: "oklch(88% 0 0)"
  text-muted: "oklch(72% 0 0)"

typography:
  scale:
    "10": "0.625rem"
    "11": "0.6875rem"
    "12": "0.75rem"
    "13": "0.8125rem"
    "14": "0.875rem"
    "16": "1rem"
    "18": "1.125rem"
    "20": "1.25rem"
    "24": "1.5rem"
    "28": "1.75rem"
    "32": "2rem"
    "40": "2.5rem"
    "48": "3rem"
    "56": "3.5rem"
    "64": "4rem"
    "72": "4.5rem"
    "80": "5rem"
    "88": "5.5rem"
    "96": "6rem"
    "128": "8rem"
    "192": "12rem"
  display:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "clamp(3.4rem, 6.5vw, 5.6rem)"
    fontWeight: 100
  headline:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "clamp(2.6rem, 4vw, 3.4rem)"
    fontWeight: 300
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
  mono:
    fontFamily: "JetBrains Mono, SFMono-Regular, monospace"
    fontSize: "0.75rem"
    letterSpacing: "0.18em"
---

# Astrivix Impeccable Design System

## 1. Core Principles
- **No Purple-to-Blue Gradients**: Dark urushi lacquer surfaces (`#07070A`, `#0B0B0E`).
- **No Floating Badges**: Clean mono index markers (`// 01. SERVICES`).
- **No Cards Nested in Cards**: Single-level bento tiles with 1px hairlines (`border-white/10`).
- **No Emoji Headings**: Clean typography with optional SVG icons.
- **No Low-Contrast Muted Copy**: High-contrast champagne white headlines (`text-white`) and warm neutral body text (`text-slate-200`).
- **Strict Single H1 Tag Per Page**: Verified across all routes.
