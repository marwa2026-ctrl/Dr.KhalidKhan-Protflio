// src/pages/Appointment.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, MapPin, X, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/UI/SectionHeading';
import Button from '../components/UI/Button';
import RotatingEarth from '../components/UI/RotatingEarth';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { doctor } from '../data/doctor';

const empty = {
  name: '',
  phone: '',
  date: '',
  contactMethod: 'phone',
  message: '',
};

// ─── LOCAL ASSETS ─────────────────────────────────────────────────────────
const EARTH_IMAGE_URL =
  'https://i.pinimg.com/736x/69/50/52/695052902c4f63130851a6f1a70b1d7d.jpg';
const HOSPITAL_IMAGE_URL =
  'https://i.pinimg.com/1200x/9a/95/7f/9a957fe1ff2b226c6c6aebd901bd8db9.jpg';

const CLINIC_ADDRESS = 'Rifah Medical Complex, Kabul, Afghanistan';
// ──────────────────────────────────────────────────────────────────────────

export default function Appointment() {
  const { t } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);
  const [earthHovered, setEarthHovered] = useState(false);
  const panelRef = useRef(null);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setPinOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const validate = (v) => {
    const e = {};
    if (!v.name.trim()) e.name = t.appointment.nameErrName;
    const digits = v.phone.replace(/\D/g, '');
    if (!v.phone.trim()) e.phone = t.appointment.required;
    else if (digits.length < 7) e.phone = t.appointment.invalidPhone;
    if (!v.date) e.date = t.appointment.required;
    else if (v.date < today) e.date = t.appointment.pastDate;
    return e;
  };

  const onChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const e = validate(values);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const first = document.querySelector('[aria-invalid="true"]');
      first?.focus();
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  const reset = () => {
    setValues(empty);
    setErrors({});
    setSubmitted(false);
  };

  const fieldClass =
    'w-full rounded-xl border border-[#9A9AA6] bg-transparent px-4 py-3 text-sm text-[#0E0E10] placeholder:text-[#63636E] focus:border-[#0E0E10] focus:outline-none dark:border-[#63636E] dark:text-[#F2F2F5] dark:placeholder:text-[#9A9AA6] dark:focus:border-[#C9C9D2]';
  const labelClass =
    'mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-[#63636E] dark:text-[#9A9AA6]';
  const errorClass = 'mt-1.5 text-xs text-red-600 dark:text-red-400';

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="text-center">
        <SectionHeading
          eyebrow={t.appointment.title}
          title={t.appointment.title}
          subtitle={t.appointment.intro}
          align="center"
        />
      </div>

      <div className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* LEFT — form */}
        <motion.div
          initial={reduced ? false : { opacity: 0, x: -60 }}
          animate={reduced ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                onSubmit={onSubmit}
                noValidate
                className="space-y-4"
              >
                <div>
                  <label htmlFor="name" className={labelClass}>
                    {t.appointment.name}
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={values.name}
                    onChange={onChange('name')}
                    placeholder={t.appointment.namePlaceholder}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={fieldClass}
                  />
                  {errors.name && (
                    <p id="name-error" className={errorClass}>{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className={labelClass}>
                    {t.appointment.phone}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={values.phone}
                    onChange={onChange('phone')}
                    placeholder={t.appointment.phonePlaceholder}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    dir="ltr"
                    className={fieldClass}
                  />
                  {errors.phone && (
                    <p id="phone-error" className={errorClass}>{errors.phone}</p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="date" className={labelClass}>
                      {t.appointment.date}
                    </label>
                    <input
                      id="date"
                      type="date"
                      min={today}
                      value={values.date}
                      onChange={onChange('date')}
                      aria-invalid={!!errors.date}
                      aria-describedby={errors.date ? 'date-error' : undefined}
                      className={fieldClass}
                    />
                    {errors.date && (
                      <p id="date-error" className={errorClass}>{errors.date}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contactMethod" className={labelClass}>
                      {t.appointment.contactMethod}
                    </label>
                    <select
                      id="contactMethod"
                      value={values.contactMethod}
                      onChange={onChange('contactMethod')}
                      className={fieldClass}
                    >
                      <option value="phone">{t.appointment.contactPhone}</option>
                      <option value="message">{t.appointment.message}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    {t.appointment.message}
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={values.message}
                    onChange={onChange('message')}
                    placeholder={t.appointment.messagePlaceholder}
                    className={`${fieldClass} resize-y`}
                  />
                </div>

                <div className="flex flex-wrap gap-3 pt-1">
                  <Button type="submit" size="lg" withArrow disabled={submitting}>
                    {submitting
                      ? t.appointment.submitting
                      : t.appointment.submit}
                  </Button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
                role="status"
                aria-live="polite"
              >
                <div className="flex items-center gap-2 text-[#0E0E10] dark:text-[#F2F2F5]">
                  <CheckCircle2 size={22} />
                  <h3 className="text-lg font-semibold">{t.appointment.successTitle}</h3>
                </div>
                <p className="text-sm leading-relaxed text-[#3E3E45] dark:text-[#C9C9D2]">
                  {t.appointment.successBody}
                </p>
                <p className="text-xs text-[#63636E] dark:text-[#9A9AA6]">
                  {t.appointment.successNote}
                </p>
                <div className="pt-2">
                  <Button onClick={reset} variant="secondary" size="md">
                    {t.appointment.reset}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* RIGHT — earth with hover tooltip + click panel */}
        <motion.div
          initial={reduced ? false : { opacity: 0, x: 60 }}
          animate={reduced ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative w-full"
        >
          <div
            className="relative w-full"
            onMouseEnter={() => setEarthHovered(true)}
            onMouseLeave={() => setEarthHovered(false)}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full opacity-60 blur-3xl"
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, rgba(154,154,166,0.35), transparent 65%)',
              }}
            />

            <RotatingEarth
              src={EARTH_IMAGE_URL}
              alt="Rotating Earth"
              duration={90}
              className="w-full"
            />

            {/* Pin button — click opens the full panel */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setPinOpen((o) => !o)}
                aria-expanded={pinOpen}
                aria-label="Show clinic details"
                className="relative z-10 flex items-center justify-center rounded-full p-2 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2F2F5]"
              >
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 10, scale: 0.8 }}
                  animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <MapPin
                    size={32}
                    strokeWidth={2}
                    className="text-[#F2F2F5] drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
                    aria-hidden="true"
                  />
                  {!reduced && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute left-1/2 top-1/2 -z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F2F2F5]/50"
                      animate={{ scale: [1, 3], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}
                </motion.div>
              </button>
            </div>

            {/* Hover tooltip — short address, appears when earth is hovered */}
            <AnimatePresence>
              {earthHovered && !pinOpen && (
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="pointer-events-none absolute left-1/2 top-[calc(50%+44px)] z-20 -translate-x-1/2 whitespace-nowrap rounded-lg border border-[#F2F2F5]/20 bg-[#0E0E10]/85 px-3 py-1.5 text-center text-xs font-medium text-[#F2F2F5] shadow-lg backdrop-blur-sm"
                >
                  {CLINIC_ADDRESS}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Click panel — full hospital info */}
            <AnimatePresence>
              {pinOpen && (
                <>
                  <motion.button
                    type="button"
                    aria-label="Close details"
                    onClick={() => setPinOpen(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 z-20 rounded-full bg-[#0E0E10]/65 backdrop-blur-sm"
                  />

                  <motion.div
                    ref={panelRef}
                    initial={reduced ? false : { opacity: 0, y: 20, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.94 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-1/2 top-1/2 z-30 w-[88%] max-w-[360px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-[#9A9AA6]/60 bg-white shadow-2xl dark:border-[#3E3E45] dark:bg-[#232327]"
                    role="dialog"
                    aria-label="Clinic details"
                  >
                    <button
                      type="button"
                      onClick={() => setPinOpen(false)}
                      aria-label="Close details"
                      className="absolute end-2 top-2 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#0E0E10]/60 text-[#F2F2F5] transition-colors hover:bg-[#0E0E10]/80"
                    >
                      <X size={14} />
                    </button>

                    <div className="aspect-[16/9] w-full overflow-hidden">
                      <img
                        src={HOSPITAL_IMAGE_URL}
                        alt="Rifah Medical Complex"
                        loading="lazy"
                        draggable={false}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#63636E] dark:text-[#9A9AA6]">
                        {t.contact.clinic}
                      </p>
                      <h3 className="mt-1 text-base font-semibold leading-snug text-[#0E0E10] dark:text-[#F2F2F5]">
                        {t.brand.clinic}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#3E3E45] dark:text-[#C9C9D2]">
                        {CLINIC_ADDRESS}
                      </p>

                      <a
                        href={doctor.phoneHref}
                        className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#0E0E10] hover:underline dark:text-[#F2F2F5]"
                      >
                        <Phone size={14} />
                        <span dir="ltr">{doctor.phone}</span>
                      </a>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto mt-12 flex max-w-2xl items-start gap-2 rounded-xl border border-[#9A9AA6]/60 p-4 text-xs text-[#63636E] dark:border-[#3E3E45] dark:text-[#9A9AA6]">
        <AlertCircle size={14} className="mt-0.5 shrink-0" />
        <span>{t.appointment.privacyNote}</span>
      </div>
    </div>
  );
}