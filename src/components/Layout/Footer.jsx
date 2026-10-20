// src/components/Layout/Footer.jsx
import { Link } from 'react-router-dom';
import { Phone, MapPin, Brain } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { doctor } from '../../data/doctor';
import SocialLinks from '../UI/SocialLinks';

const links = [
  { to: '/', key: 'home' },
  { to: '/about', key: 'about' },
  { to: '/services', key: 'services' },
  { to: '/appointment', key: 'appointment' },
  { to: '/contact', key: 'contact' },
];

export default function Footer() {
  const { t, lang } = useLanguage();
  const year = new Date().getFullYear();

  // Strip "Dr. / داکتر / ډاکټر" to match the navbar brand mark
  const displayName = t.brand.name.replace(/^(Dr\.?\s+|داکتر\s+|ډاکټر\s+)/, '');

  return (
    <footer className="mt-20 border-t border-[#9A9AA6]/60 bg-[#F2F2F5] dark:border-[#3E3E45] dark:bg-[#0E0E10]">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        {/* ─── Brand: brain icon + name (matches navbar) ─── */}
        <div>
          <Link
            to="/"
            aria-label={t.brand.name}
            className="inline-flex items-center gap-2"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#9A9AA6] text-[#0E0E10] dark:border-[#63636E] dark:text-[#F2F2F5]">
              <Brain size={18} strokeWidth={1.75} />
            </span>
            <span className="text-base font-semibold text-[#0E0E10] dark:text-[#F2F2F5]">
              {displayName}
            </span>
          </Link>
          <p className="mt-3 text-sm text-[#63636E] dark:text-[#9A9AA6]">
            {doctor.title[lang]}
          </p>
          <p className="mt-4 max-w-xs text-sm text-[#3E3E45] dark:text-[#C9C9D2]">
            {t.footer.tagline}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#63636E] dark:text-[#9A9AA6]">
            {t.footer.navigate}
          </p>
          <ul className="mt-4 space-y-2">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-[#3E3E45] hover:text-[#0E0E10] dark:text-[#C9C9D2] dark:hover:text-[#F2F2F5]"
                >
                  {t.nav[l.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#63636E] dark:text-[#9A9AA6]">
            {t.footer.contact}
          </p>
          <ul className="mt-4 space-y-3 text-sm text-[#3E3E45] dark:text-[#C9C9D2]">
            <li className="flex items-center gap-2">
              <MapPin size={14} className="shrink-0" />
              <span>
                {doctor.clinic[lang]}, {doctor.location[lang]}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="shrink-0" />
              <a href={doctor.phoneHref} className="hover:text-[#0E0E10] dark:hover:text-[#F2F2F5]">
                <span dir="ltr">{doctor.phone}</span>
              </a>
            </li>
          </ul>

          {/* Social links — hidden automatically if all URLs are empty */}
          <SocialLinks className="mt-4" />
        </div>
      </div>

      {/* ─── Bottom bar: copyright + author credit ─── */}
      <div className="border-t border-[#9A9AA6]/60 dark:border-[#3E3E45]">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-[#63636E] sm:flex-row sm:items-center sm:justify-between dark:text-[#9A9AA6]">
          <p>
            © {year} {doctor.name[lang]}. {t.footer.rights}
          </p>
          <p>
            Made by : {' '}
            <span className="font-medium text-[#0E0E10] dark:text-[#F2F2F5]">
              Marwa Hamraz
            </span>{' '}
            <br />
            From : WEB 1 Class
          </p>
        </div>
      </div>
    </footer>
  );
}