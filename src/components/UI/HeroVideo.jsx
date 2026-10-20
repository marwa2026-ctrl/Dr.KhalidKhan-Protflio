// src/components/UI/HeroVideo.jsx
import { useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/* Auto-detect YouTube / Vimeo URLs and return an embed URL */
function toEmbedUrl(url) {
  if (!url) return null;
  const yt =
    url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{6,})/) ||
    url.match(/youtube\.com\/shorts\/([A-Za-z0-9_-]{6,})/);
  if (yt) {
    const id = yt[1];
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&playsinline=1&rel=0`;
  }
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) {
    return `https://player.vimeo.com/video/${vm[1]}?autoplay=1&muted=1&loop=1&background=1&autopause=0`;
  }
  return null;
}

export default function HeroVideo({
  src,
  poster,
  alt = 'Hero video',
  className = '',
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);

  const embedUrl = useMemo(() => toEmbedUrl(src), [src]);
  const isEmbed = Boolean(embedUrl);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 110, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 110, damping: 18, mass: 0.6 });

  const rotateY = useTransform(sx, [-1, 1], [-8, 8]);
  const rotateX = useTransform(sy, [-1, 1], [6, -6]);
  const x = useTransform(sx, [-1, 1], [-8, 8]);
  const y = useTransform(sy, [-1, 1], [-6, 6]);

  const handleMove = (e) => {
    if (reduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative flex items-center justify-center overflow-hidden rounded-3xl ${className}`}
      style={{ perspective: 900 }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(154,154,166,0.35), transparent 65%)',
        }}
      />

      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ rotateX, rotateY, x, y, transformStyle: 'preserve-3d' }}
        className="relative aspect-square w-full overflow-hidden rounded-3xl"
      >
        {reduced ? (
          poster ? (
            <img
              src={poster}
              alt={alt}
              className="h-full w-full object-cover"
              loading="eager"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#C9C9D2]/30 text-xs uppercase tracking-[0.2em] text-[#63636E] dark:bg-[#232327] dark:text-[#9A9AA6]">
              Video
            </div>
          )
        ) : isEmbed ? (
          <iframe
            src={embedUrl}
            title={alt}
            className="h-full w-full"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={alt}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent dark:from-black/50"
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-2 flex items-center justify-between px-3 text-[10px] uppercase tracking-[0.22em] text-[#F2F2F5]/80 mix-blend-difference">
        <span>Neural</span>
        <span>Move cursor</span>
      </div>
    </div>
  );
}