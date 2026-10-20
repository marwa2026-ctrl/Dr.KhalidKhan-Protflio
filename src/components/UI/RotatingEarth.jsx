// src/components/UI/RotatingEarth.jsx
import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export default function RotatingEarth({
  src,
  alt = 'Earth',
  className = '',
  duration = 40,
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className={`relative aspect-square w-full overflow-hidden rounded-full bg-[#0E0E10] ${className}`}
      style={{
        boxShadow:
          'inset 0 0 60px rgba(0,0,0,0.65), 0 30px 80px rgba(0,0,0,0.35)',
      }}
      role="img"
      aria-label={alt}
    >
      <motion.img
        src={src}
        alt=""
        draggable={false}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full select-none object-cover"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Spherical shading overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(242,242,245,0.18), transparent 45%), radial-gradient(circle at 75% 80%, rgba(0,0,0,0.65), transparent 60%)',
        }}
      />

      {/* Bright rim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-[#F2F2F5]/25"
      />
    </div>
  );
}