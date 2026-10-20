// src/components/UI/LanguageSwitcher.jsx
import { useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage, LANGUAGES } from '../../context/LanguageContext';

export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close dropdown on outside click / Escape (desktop only)
  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const label = t.nav.language;
  const currentIndex = LANGUAGES.findIndex((l) => l.code === lang);

  // Cycle to the next language (used on mobile/tablet)
  const cycleLanguage = () => {
    const next = LANGUAGES[(currentIndex + 1) % LANGUAGES.length];
    setLang(next.code);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => {
          // On small screens: cycle directly. On desktop: open dropdown.
          if (window.matchMedia('(min-width: 1024px)').matches) {
            setOpen((o) => !o);
          } else {
            cycleLanguage();
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        title={label}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#9A9AA6] text-[#0E0E10] transition-colors hover:border-[#0E0E10] dark:border-[#63636E] dark:text-[#F2F2F5] dark:hover:border-[#C9C9D2]"
      >
        <Globe size={16} strokeWidth={1.75} />
      </button>

      {/* Dropdown — only shown on desktop */}
      {open && (
        <ul
          role="listbox"
          className="absolute end-0 z-50 mt-2 hidden w-40 overflow-hidden rounded-xl border border-[#9A9AA6] bg-[#F2F2F5] shadow-lg lg:block dark:border-[#63636E] dark:bg-[#232327]"
        >
          {LANGUAGES.map((l) => (
            <li key={l.code} role="option" aria-selected={lang === l.code}>
              <button
                type="button"
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between px-3 py-2 text-start text-sm text-[#0E0E10] hover:bg-[#C9C9D2]/40 dark:text-[#F2F2F5] dark:hover:bg-[#3E3E45]"
              >
                <span>{l.label}</span>
                {lang === l.code && <Check size={14} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}