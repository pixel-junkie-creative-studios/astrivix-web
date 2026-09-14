import React, { useRef } from 'react';
import { motion, useSpring, useTransform, useScroll } from 'framer-motion';
import { useLenis } from 'lenis/react';

export default function LenisSectionWrapper({
  id,
  className = '',
  children,
  delay = 0,
  enableVelocitySkew = true,
  enableParallax = true,
  parallaxDistance = 25,
  viewportAmount = 0.1,
  once = true
}) {
  const containerRef = useRef(null);

  // Smooth spring for scroll velocity response
  const velocitySpring = useSpring(0, {
    stiffness: 140,
    damping: 22,
    mass: 0.35
  });

  // Skew effect clamped between -1.1 deg and +1.1 deg
  const skewY = useTransform(velocitySpring, [-25, 25], [-1.1, 1.1]);

  // Subtle scale compress when scrolling fast
  const scale = useTransform(velocitySpring, [-25, 0, 25], [0.995, 1, 0.995]);

  // Parallax Y offset driven by section scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxDistance, -parallaxDistance]
  );

  // Hook into Lenis scroll velocity
  useLenis(({ velocity }) => {
    if (enableVelocitySkew) {
      const clampedVelocity = Math.max(-25, Math.min(25, velocity || 0));
      velocitySpring.set(clampedVelocity);
    }
  });

  return (
    <motion.section
      ref={containerRef}
      id={id}
      style={{
        skewY: enableVelocitySkew ? skewY : 0,
        scale: enableVelocitySkew ? scale : 1,
        y: enableParallax ? parallaxY : 0,
        willChange: 'transform, opacity',
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: once, amount: viewportAmount }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: delay,
      }}
      className={`w-full relative ${className}`}
    >
      {children}
    </motion.section>
  );
}
