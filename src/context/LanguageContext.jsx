// src/context/LanguageContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext(null);

/* ---------- 1. Flatten → nest ---------- */
function nest(obj) {
  const out = {};
  for (const key of Object.keys(obj)) {
    const parts = key.split('.');
    let ref = out;
    for (let i = 0; i < parts.length - 1; i++) {
      ref[parts[i]] = ref[parts[i]] || {};
      ref = ref[parts[i]];
    }
    ref[parts[parts.length - 1]] = obj[key];
  }
  return out;
}

const nested = Object.fromEntries(
  Object.entries(translations).map(([code, flat]) => [code, nest(flat)])
);

/* ---------- 2. Alias map (pages use these keys → file has those) ---------- */
const aliases = {
  'nav.bookNow': 'nav.cta',
  'hero.title': 'hero.headline',
  'hero.subtitle': 'hero.intro',
  'hero.placeholderNote': 'hero.portraitPlaceholder',
  'hero.eyebrow': 'brand.clinic',
  'home.specialtiesEyebrow': 'highlights.title',
  'home.specialtiesTitle': 'highlights.title',
  'home.specialtiesSubtitle': 'highlights.subtitle',
  'home.introEyebrow': 'preview.title',
  'home.introTitle': 'preview.title',
  'home.introBody': 'preview.body',
  'home.introCta': 'preview.cta',
  'home.ctaEyebrow': 'cta.title',
  'home.ctaTitle': 'cta.title',
  'home.ctaBody': 'cta.body',
  'home.ctaButton': 'cta.button',
  'about.eyebrow': 'about.title',
  'about.bioTitle': 'about.bioTitle',
  'about.qualificationsTitle': 'about.educationTitle',
  'about.qualificationsEmpty': 'about.educationPlaceholder',
  'about.experienceTitle': 'about.experienceTitle',
  'about.experienceEmpty': 'about.experiencePlaceholder',
  'about.membershipsTitle': 'about.membershipsTitle',
  'about.membershipsEmpty': 'about.membershipsPlaceholder',
  'about.researchTitle': 'about.interestsTitle',
  'about.researchEmpty': 'about.interestsPlaceholder',
  'about.verificationNote': 'about.verificationNote',
  'services.eyebrow': 'services.title',
  'services.requestCta': 'services.cta',
  'appointment.eyebrow': 'appointment.title',
  'appointment.subtitle': 'appointment.intro',
  'appointment.phoneOption': 'appointment.contactPhone',
  'appointment.privacyNote': 'appointment.notice',
  'appointment.nameError': 'appointment.err.name',
  'appointment.invalidPhone': 'appointment.err.phone',
  'appointment.pastDate': 'appointment.err.date',
  'appointment.required': 'appointment.err.contact',
  'contact.eyebrow': 'contact.title',
  'contact.phoneLabel': 'contact.phone',
  'contact.clinicLabel': 'contact.clinic',
  'contact.locationLabel': 'contact.location',
  'contact.bookLabel': 'contact.appointmentCta',
  'contact.bookText': 'contact.subtitle',
  'contact.bookCta': 'contact.appointmentCta',
  'contact.noteText': 'contact.mapNotice',
  'footer.tagline': 'footer.disclaimer',
  'footer.navigate': 'footer.quickLinks',
  'footer.contact': 'footer.phone',
  'common.menu': 'nav.openMenu',
  'common.closeMenu': 'nav.closeMenu',
  'common.language': 'nav.language',
};

function getByPath(tree, path) {
  return path.split('.').reduce((o, k) => (o ? o[k] : undefined), tree);
}
function setByPath(tree, path, value) {
  const parts = path.split('.');
  let ref = tree;
  for (let i = 0; i < parts.length - 1; i++) {
    ref[parts[i]] = ref[parts[i]] || {};
    ref = ref[parts[i]];
  }
  ref[parts[parts.length - 1]] = value;
}

for (const code of Object.keys(nested)) {
  for (const [from, to] of Object.entries(aliases)) {
    if (getByPath(nested[code], from) === undefined) {
      const val = getByPath(nested[code], to);
      if (val !== undefined) setByPath(nested[code], from, val);
    }
  }
}

/* ---------- 3. Languages + direction ---------- */
export const LANGUAGES = [
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'fa', label: 'دری',     dir: 'rtl' },
  { code: 'ps', label: 'پښتو',    dir: 'rtl' },
];

export function getDirection(code) {
  return code === 'en' ? 'ltr' : 'rtl';
}

function getInitialLang() {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem('lang');
  if (stored && nested[stored]) return stored;
  return 'en';
}

/* ---------- 4. Provider ---------- */
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', getDirection(lang));
    localStorage.setItem('lang', lang);

    document.title =
      lang === 'en'
        ? 'Dr. Khalid Khan Zadran — Consultant Neurosurgeon'
        : lang === 'fa'
        ? 'داکتر خالد خان ځدران — متخصص جراحی اعصاب'
        : 'ډاکټر خالد خان ځدران — د اعصابو د جراحي متخصص';
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t: nested[lang], dir: getDirection(lang) }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}