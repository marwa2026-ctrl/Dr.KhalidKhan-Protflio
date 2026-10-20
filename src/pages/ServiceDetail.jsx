// src/pages/ServiceDetail.jsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import * as Icons from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { services } from '../data/doctor';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const reduced = usePrefersReducedMotion();

  const service = services.find((s) => s.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  if (!service) {
    return (
      <div className="container-page py-16 text-center">
        <h1 className="text-2xl font-semibold text-[#0E0E10] dark:text-[#F2F2F5]">
          Service not found
        </h1>
        <p className="mt-2 text-sm text-[#3E3E45] dark:text-[#C9C9D2]">
          The requested service does not exist.
        </p>
        <div className="mt-6">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0E0E10] px-5 py-2.5 text-sm font-medium text-[#F2F2F5] hover:bg-[#232327] dark:bg-[#F2F2F5] dark:text-[#0E0E10] dark:hover:bg-[#C9C9D2]"
          >
            ← {t.services.title}
          </Link>
        </div>
      </div>
    );
  }

  const Icon = Icons[service.icon] || Icons.Stethoscope;

  return (
    <article className="container-page py-12 sm:py-16">
      {/* Back link */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-[#63636E] transition-colors hover:text-[#0E0E10] dark:text-[#9A9AA6] dark:hover:text-[#F2F2F5]"
      >
        <Icons.ArrowLeft size={16} />
        {lang === 'fa' ? 'بازگشت' : lang === 'ps' ? 'بیرته' : 'Back'}
      </button>

      {/* Title block */}
      <motion.header
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 max-w-3xl"
      >
        <div className="flex items-center gap-2 text-[#63636E] dark:text-[#9A9AA6]">
          <Icon size={16} />
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">
            {t.services.title}
          </span>
        </div>
        <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight text-[#0E0E10] sm:text-5xl md:text-6xl dark:text-[#F2F2F5]">
          {service.title[lang]}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[#3E3E45] dark:text-[#C9C9D2]">
          {service.description[lang]}
        </p>
      </motion.header>

      {/* Hero image */}
      {service.image && (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-[#9A9AA6]/60 dark:border-[#3E3E45]"
        >
          <img
            src={service.image}
            alt={service.title[lang]}
            loading="eager"
            className="h-full w-full object-cover"
          />
        </motion.div>
      )}

      {/* Body */}
      <div className="mt-16 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {service.longDescription && (
            <div className="space-y-6 text-base leading-[1.8] text-[#3E3E45] dark:text-[#C9C9D2]">
              {service.longDescription[lang]
                .split('\n\n')
                .map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
            </div>
          )}

          {service.conditions?.length > 0 && (
            <section className="mt-14">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#63636E] dark:text-[#9A9AA6]">
                {lang === 'fa'
                  ? 'شرایط مرتبط'
                  : lang === 'ps'
                  ? 'اړوند حالتونه'
                  : 'Related conditions'}
              </h2>
              <ul className="mt-4 space-y-2.5 text-base text-[#3E3E45] dark:text-[#C9C9D2]">
                {service.conditions.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <Icons.Check
                      size={16}
                      className="mt-1 shrink-0 text-[#63636E] dark:text-[#9A9AA6]"
                    />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {service.procedures?.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#63636E] dark:text-[#9A9AA6]">
                {lang === 'fa'
                  ? 'روش‌ها'
                  : lang === 'ps'
                  ? 'پروسیجرونه'
                  : 'Procedures'}
              </h2>
              <ul className="mt-4 space-y-2.5 text-base text-[#3E3E45] dark:text-[#C9C9D2]">
                {service.procedures.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <Icons.Check
                      size={16}
                      className="mt-1 shrink-0 text-[#63636E] dark:text-[#9A9AA6]"
                    />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div className="border-t border-[#9A9AA6]/60 pt-4 dark:border-[#3E3E45]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#63636E] dark:text-[#9A9AA6]">
                {lang === 'fa' ? 'خدمت' : lang === 'ps' ? 'خدمت' : 'Service'}
              </p>
              <p className="mt-1 text-sm font-medium text-[#0E0E10] dark:text-[#F2F2F5]">
                {service.title[lang]}
              </p>
            </div>

            <div className="border-t border-[#9A9AA6]/60 pt-4 dark:border-[#3E3E45]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#63636E] dark:text-[#9A9AA6]">
                {lang === 'fa' ? 'مرکز' : lang === 'ps' ? 'مرکز' : 'Clinic'}
              </p>
              <p className="mt-1 text-sm font-medium text-[#0E0E10] dark:text-[#F2F2F5]">
                {t.brand.clinic}
              </p>
            </div>

            <Link
              to="/services"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#0E0E10] underline-offset-4 hover:underline dark:text-[#F2F2F5]"
            >
              <Icons.ArrowLeft size={14} />
              {t.services.title}
            </Link>
          </div>
        </aside>
      </div>

      {/* Prev / Next */}
      <div className="mt-20 border-t border-[#9A9AA6]/60 pt-8 dark:border-[#3E3E45]">
        <div className="grid gap-6 sm:grid-cols-2">
          {(() => {
            const idx = services.findIndex((s) => s.id === service.id);
            const prev = services[idx - 1];
            const next = services[idx + 1];
            return (
              <>
                {prev ? (
                  <Link
                    to={`/services/${prev.id}`}
                    className="group flex flex-col items-start gap-1"
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#63636E] dark:text-[#9A9AA6]">
                      ← {lang === 'fa' ? 'قبلی' : lang === 'ps' ? 'مخکینی' : 'Previous'}
                    </span>
                    <span className="text-base font-medium text-[#0E0E10] group-hover:underline dark:text-[#F2F2F5]">
                      {prev.title[lang]}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
                {next ? (
                  <Link
                    to={`/services/${next.id}`}
                    className="group flex flex-col items-start gap-1 sm:items-end sm:text-end"
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#63636E] dark:text-[#9A9AA6]">
                      {lang === 'fa' ? 'بعدی' : lang === 'ps' ? 'بل' : 'Next'} →
                    </span>
                    <span className="text-base font-medium text-[#0E0E10] group-hover:underline dark:text-[#F2F2F5]">
                      {next.title[lang]}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </>
            );
          })()}
        </div>
      </div>
    </article>
  );
}