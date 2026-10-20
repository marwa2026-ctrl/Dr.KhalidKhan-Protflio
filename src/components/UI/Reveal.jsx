// src/components/UI/Reveal.jsx
import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * Reveal — fades and slides its children in when it scrolls into view.
 *
 * Props:
 *   from    "up" | "down" | "left" | "right" | "none"   (default "up")
 *   delay   seconds (default 0)
 *   duration seconds (default 0.6)
 *   once    if true (default), only animates the first time
 *   className  applied to the motion.div
 */
export default function Reveal({
  children,
  from = 'up',
  delay = 0,
  duration = 0.6,
  once = true,
  className = '',
}) {
  const reduced = usePrefersReducedMotion();

  const offsets = {
    up: { y: 24 },
    down: { y: -24 },
    left: { x: -32 },
    right: { x: 32 },
    none: {},
  };
  const offset = offsets[from] || {};

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}