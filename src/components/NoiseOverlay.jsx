export default function NoiseOverlay() {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.15] mix-blend-overlay">
      <svg className="absolute inset-0 w-full h-full">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}
