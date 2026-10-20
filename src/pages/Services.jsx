// src/pages/Services.jsx — DEBUG version (simplest possible)
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { services } from '../data/doctor';
import SectionHeading from '../components/UI/SectionHeading';

export default function Services() {
  const { t, lang } = useLanguage();

  // Quick debug output — remove after verifying
  console.log('services length:', services.length);
  console.log('first service:', services[0]);

  return (
    <div className="container-page py-12 sm:py-16">
      <SectionHeading
        eyebrow={t.services.eyebrow}
        title={t.services.title}
        subtitle={t.services.subtitle}
      />

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {services.map((s, i) => {
          const Icon = Icons[s.icon] || Icons.Stethoscope;
          return (
            <Link
              key={s.id}
              to={`/services/${s.id}`}
              className="group block overflow-hidden rounded-2xl border border-[#9A9AA6]/60 transition-colors hover:border-[#0E0E10] dark:border-[#3E3E45] dark:hover:border-[#9A9AA6]"
            >
              {s.image && (
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#C9C9D2]/20 dark:bg-[#232327]">
                  <img
                    src={s.image}
                    alt={s.title[lang]}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 text-[#63636E] dark:text-[#9A9AA6]">
                  <Icon size={16} />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">
                    {t.services.title}
                  </span>
                </div>
                <h3 className="mt-3 text-xl font-semibold text-[#0E0E10] dark:text-[#F2F2F5]">
                  {s.title[lang]}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#3E3E45] dark:text-[#C9C9D2]">
                  {s.description[lang]}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}