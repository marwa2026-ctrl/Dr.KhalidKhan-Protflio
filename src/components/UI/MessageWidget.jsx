// src/components/UI/MessageWidget.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { doctor } from '../../data/doctor';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// ─── CONFIG ───────────────────────────────────────────────────────────────
// Set to a real WhatsApp number to enable WhatsApp links.
// Format: country code + number, no symbols. Example: 93787654751
const WHATSAPP_NUMBER = '93787654751';

// Shown only if you want a "Message on WhatsApp" primary button.
// Set to false to hide it (email/phone only).
const SHOW_WHATSAPP_BUTTON = true;

// Contact email
const CONTACT_EMAIL = 'info@rifahmedical.af';

// Hours (only shown if set)
const CLINIC_HOURS = 'Sat – Thu · 08:00 – 17:00';
// ──────────────────────────────────────────────────────────────────────────

const COPY = {
  greeting: {
    en: 'Hello 👋',
    fa: 'سلام 👋',
    ps: 'سلام 👋',
  },
  message: {
    en: 'Have a question about an appointment or consultation? Send a message to Rifah Medical Complex.',
    fa: 'سوالی درباره نوبت یا مشاوره دارید؟ به مجتمع طبی رفاه پیام بفرستید.',
    ps: 'د نوبت یا مشورې په اړه پوښتنه لرئ؟ د رفاه طبي مجتمع ته پیغام واستوئ.',
  },
  whatsapp: {
    en: 'Message on WhatsApp',
    fa: 'پیام در واتس‌اپ',
    ps: 'په واتساپ کې پیغام',
  },
  call: { en: 'Call the clinic', fa: 'تماس با کلینیک', ps: 'له کلینیک سره اړیکه' },
  email: { en: 'Send an email', fa: 'ارسال ایمیل', ps: 'ایمیل واستوئ' },
  hours: { en: 'Clinic hours', fa: 'ساعات کاری کلینیک', ps: 'د کلینیک کاري ساعتونه' },
  openLabel: {
    en: 'Open message panel',
    fa: 'باز کردن پنل پیام',
    ps: 'د پیغام پنل پرانیستل',
  },
  closeLabel: { en: 'Close', fa: 'بستن', ps: 'بندول' },
};

export default function MessageWidget() {
  const { lang } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click / Escape
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

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hello, I would like to ask about an appointment at Rifah Medical Complex.'
  )}`;

  return (
    <div
      ref={ref}
      className="fixed bottom-6 end-6 z-50 flex flex-col items-end gap-3"
    >
      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={
              reduced ? false : { opacity: 0, y: 12, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-[320px] overflow-hidden rounded-2xl border border-[#9A9AA6]/60 bg-[#F2F2F5] shadow-2xl dark:border-[#3E3E45] dark:bg-[#232327]"
            role="dialog"
            aria-label="Contact options"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-[#9A9AA6]/60 bg-[#0E0E10] px-4 py-3 dark:border-[#3E3E45]">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#F2F2F5]">
                  {COPY.greeting[lang] ?? COPY.greeting.en}
                </p>
                <p className="mt-0.5 truncate text-xs text-[#C9C9D2]">
                  {doctor.clinic[lang]}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={COPY.closeLabel[lang] ?? COPY.closeLabel.en}
                className="shrink-0 rounded-full p-1 text-[#C9C9D2] transition-colors hover:bg-[#232327] hover:text-[#F2F2F5]"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="space-y-3 p-4">
              <p className="text-sm leading-relaxed text-[#3E3E45] dark:text-[#C9C9D2]">
                {COPY.message[lang] ?? COPY.message.en}
              </p>

              {SHOW_WHATSAPP_BUTTON && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1ebe5b]"
                >
                  <MessageCircle size={16} />
                  {COPY.whatsapp[lang] ?? COPY.whatsapp.en}
                </a>
              )}

              <a
                href={doctor.phoneHref}
                className="flex items-center gap-2 rounded-lg border border-[#9A9AA6]/60 px-3 py-2.5 text-sm text-[#0E0E10] transition-colors hover:border-[#0E0E10] dark:border-[#3E3E45] dark:text-[#F2F2F5] dark:hover:border-[#C9C9D2]"
              >
                <Phone size={14} className="shrink-0 text-[#63636E] dark:text-[#9A9AA6]" />
                <span dir="ltr">{doctor.phone}</span>
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-2 rounded-lg border border-[#9A9AA6]/60 px-3 py-2.5 text-sm text-[#0E0E10] transition-colors hover:border-[#0E0E10] dark:border-[#3E3E45] dark:text-[#F2F2F5] dark:hover:border-[#C9C9D2]"
              >
                <Mail size={14} className="shrink-0 text-[#63636E] dark:text-[#9A9AA6]" />
                <span className="truncate">{COPY.email[lang] ?? COPY.email.en}</span>
              </a>

              {CLINIC_HOURS && (
                <p className="flex items-center gap-2 text-xs text-[#63636E] dark:text-[#9A9AA6]">
                  <Clock size={12} className="shrink-0" />
                  {CLINIC_HOURS}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={
          open
            ? COPY.closeLabel[lang] ?? COPY.closeLabel.en
            : COPY.openLabel[lang] ?? COPY.openLabel.en
        }
        aria-expanded={open}
        whileHover={reduced ? undefined : { scale: 1.05 }}
        whileTap={reduced ? undefined : { scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#0E0E10]/20 transition-colors hover:bg-[#1ebe5b] dark:shadow-black/40"
      >
        {open ? (
          <X size={22} strokeWidth={2.5} />
        ) : (
          <MessageCircle size={22} strokeWidth={2.5} />
        )}

        {/* Small "1" badge — indicates a waiting message */}
        {!open && (
          <span className="absolute -top-0.5 -end-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0E0E10] px-1 text-[10px] font-bold text-[#F2F2F5] ring-2 ring-[#F2F2F5] dark:ring-[#0E0E10]">
            1
          </span>
        )}
      </motion.button>
    </div>
  );
}