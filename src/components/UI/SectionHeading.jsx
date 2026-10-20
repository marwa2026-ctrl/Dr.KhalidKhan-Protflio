import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export default function SectionHeading({ eyebrow, title, subtitle, align = 'start' }) {
  const reduced = usePrefersReducedMotion();
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-start';

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-2xl ${alignClass}`}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#63636E] dark:text-[#9A9AA6]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[#0E0E10] sm:text-4xl md:text-5xl dark:text-[#F2F2F5]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-[#3E3E45] sm:text-lg dark:text-[#C9C9D2]">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}