// src/components/About/ProfessionalProfile.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Briefcase,
  BadgeCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { doctor } from '../../data/doctor';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * Animated professional profile.
 *
 * Default state : portrait on the LEFT, introduction on the RIGHT.
 * After click   : portrait slides to the RIGHT, professional info panel
 *                 fades in on the LEFT. Clicking again reverses.
 */

// ─── Portrait source ──────────────────────────────────────────────────────
// LOCAL FILE — place the image at  public/images/doctor-portrait.jpg
// Replace that file with an authorized portrait of Dr. Khalid Khan Zadran
// when it becomes available.
const PORTRAIT_URL = '/images/Smiling Bearded Doctor in Scrubs.png';
// ──────────────────────────────────────────────────────────────────────────

function localised(item, lang) {
  return typeof item === 'string' ? item : item[lang];
}

const COPY = {
  eyebrow: { en: 'About', fa: 'درباره', ps: 'درباره' },
  heading: {
    en: 'Professional Profile',
    fa: 'پروفایل مسلکی',
    ps: 'مسلکي پروفایل',
  },
  explore: {
    en: 'Explore Profile',
    fa: 'مشاهده پروفایل',
    ps: 'پروفایل وګورئ',
  },
  close: { en: 'Close', fa: 'بستن', ps: 'بندول' },
  intro: {
    en: 'Dr. Khalid Khan Zadran is a consultant neurosurgeon at Rifah Medical Complex in Kabul, Afghanistan. He provides specialist consultation for brain, spine, and nerve-related neurosurgical conditions.',
    fa: 'داکتر خالد خان ځدران یک متخصص جراحی مغز و اعصاب در مجتمع طبی رفاه در کابل، افغانستان است. او مشاوره تخصصی برای مشکلات جراحی مغز، ستون فقرات و اعصاب ارائه می‌دهد.',
    ps: 'ډاکټر خالد خان ځدران په کابل، افغانستان کې د رفاه طبي مجتمع کې د مغز او نخاع د جراحۍ متخصص دی. هغه د مغز، نخاع او اعصابو اړوندو ستونزو لپاره تخصصي مشوره وړاندې کوي.',
  },
  hint: {
    en: 'Click the photo to see details',
    fa: 'برای مشاهده جزئیات روی عکس کلیک کنید',
    ps: 'د تفصیلاتو لپاره عکس کلیک کړئ',
  },
};

const infoSections = [
  {
    id: 'education',
    Icon: GraduationCap,
    titleKey: 'about.educationTitle',
    emptyText: {
      en: 'Medical qualifications, degrees, and specialist training are pending verification. Official credentials will be added once confirmed through reliable professional or institutional sources.',
      fa: 'مدارک طبی، درجات علمی و آموزش تخصصی در انتظار تأیید است. مدارک رسمی پس از تأیید از منابع معتبر مسلکی یا مؤسسی در اینجا اضافه می‌شوند.',
      ps: 'طبي اسناد، درجې او تخصصي روزنه د تایید په تمه ده. رسمي سندونه باید د معتبرو مسلکي یا مؤسسي سرچینو څخه له تایید وروسته دلته اضافه شي.',
    },
  },
  {
    id: 'experience',
    Icon: Briefcase,
    titleKey: 'about.experienceTitle',
    emptyText: null,
  },
  {
    id: 'memberships',
    Icon: BadgeCheck,
    titleKey: 'about.membershipsTitle',
    emptyText: {
      en: 'Professional memberships and institutional affiliations have not yet been independently verified.',
      fa: 'عضویت‌های مسلکی و وابستگی‌های مؤسسی هنوز به طور مستقل تأیید نشده‌اند.',
      ps: 'مسلکي غړیتوبونه او مؤسسي تړاوونه لا تر اوسه په خپلواک ډول نه دي تایید شوي.',
    },
  },
  {
    id: 'interests',
    Icon: Sparkles,
    titleKey: 'about.researchTitle',
    emptyText: {
      en: 'Potential interests in brain and spinal disorders and their surgical management. These are inferred from public information and should be confirmed with the doctor.',
      fa: 'علاقه‌مندی‌های بالقوه در اختلالات مغز و ستون فقرات و مدیریت جراحی آن‌ها. این موارد از اطلاعات عمومی استنباط شده‌اند و باید با داکتر تأیید شوند.',
      ps: 'په مغز او نخاع اختلالاتو او د هغوی جراحي مدیریت کې احتمالي علاقې. دا د عامه معلوماتو څخه اخیستل شوې او باید د ډاکټر سره تایید شي.',
    },
  },
];

export default function ProfessionalProfile() {
  const { t, lang } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const [expanded, setExpanded] = useState(false);

  const toggle = () => setExpanded((v) => !v);

  const ease = [0.22, 1, 0.36, 1];

  const Portrait = (
    <motion.button
      layoutId="doctor-portrait"
      layout
      type="button"
      onClick={toggle}
      aria-expanded={expanded}
      aria-label={
        expanded
          ? `${COPY.close[lang] ?? COPY.close.en}`
          : `${COPY.explore[lang] ?? COPY.explore.en}`
      }
      className="group relative block aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-3xl border border-[#9A9AA6]/60 bg-[#C9C9D2]/40 text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E0E10] dark:border-[#3E3E45] dark:bg-[#232327] dark:focus-visible:ring-[#F2F2F5]"
      transition={{ layout: { duration: reduced ? 0 : 0.7, ease } }}
      whileHover={reduced ? undefined : { scale: 1.01 }}
    >
      <motion.img
        src={PORTRAIT_URL}
        alt={`${doctor.name[lang]} — portrait (placeholder image)`}
        loading="eager"
        draggable={false}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        style={{ transformOrigin: 'center' }}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0E0E10]/85 via-[#0E0E10]/40 to-transparent p-5 pt-16">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C9C9D2]">
          {COPY.eyebrow[lang] ?? COPY.eyebrow.en}
        </p>
        <p className="mt-1 text-lg font-semibold text-[#F2F2F5]">
          {COPY.heading[lang] ?? COPY.heading.en}
        </p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#F2F2F5]/90">
          {expanded
            ? `${COPY.close[lang] ?? COPY.close.en}`
            : `${COPY.explore[lang] ?? COPY.explore.en}`}
          {expanded ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
        </p>
      </div>
    </motion.button>
  );

  return (
    <section className="container-page py-12 sm:py-16">
      <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        {/* LEFT column */}
        <div className="lg:col-span-5 lg:order-1">
          <AnimatePresence mode="wait" initial={false}>
            {!expanded ? (
              <motion.div
                key="portrait-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.4 }}
              >
                {Portrait}
              </motion.div>
            ) : (
              <motion.div
                key="info-left"
                initial={{ opacity: 0, x: reduced ? 0 : -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduced ? 0 : -24 }}
                transition={{
                  duration: reduced ? 0 : 0.55,
                  delay: reduced ? 0 : 0.15,
                  ease,
                }}
                className="space-y-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#63636E] dark:text-[#9A9AA6]">
                      {COPY.eyebrow[lang] ?? COPY.eyebrow.en}
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold text-[#0E0E10] dark:text-[#F2F2F5]">
                      {COPY.heading[lang] ?? COPY.heading.en}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={toggle}
                    aria-label={COPY.close[lang] ?? COPY.close.en}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#9A9AA6]/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#63636E] transition-colors hover:border-[#0E0E10] hover:text-[#0E0E10] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E0E10] dark:border-[#3E3E45] dark:text-[#9A9AA6] dark:hover:border-[#C9C9D2] dark:hover:text-[#F2F2F5] dark:focus-visible:ring-[#F2F2F5]"
                  >
                    <X size={11} />
                    {COPY.close[lang] ?? COPY.close.en}
                  </button>
                </div>

                <div className="space-y-5">
                  {infoSections.map(({ id, Icon, titleKey, emptyText }) => {
                    const items = id === 'experience' ? doctor.training : [];
                    return (
                      <div
                        key={id}
                        className="border-t border-[#9A9AA6]/60 pt-4 dark:border-[#3E3E45]"
                      >
                        <div className="flex items-center gap-2 text-[#63636E] dark:text-[#9A9AA6]">
                          <Icon size={14} />
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em]">
                            {t[titleKey]}
                          </p>
                        </div>

                        {items && items.length > 0 ? (
                          <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-[#3E3E45] dark:text-[#C9C9D2]">
                            {items.map((item, i) => (
                              <li key={i}>{localised(item, lang)}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-2 text-sm leading-relaxed text-[#3E3E45] dark:text-[#C9C9D2]">
                            {emptyText ? localised(emptyText, lang) : ''}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT column */}
        <div className="lg:col-span-7 lg:order-2">
          <AnimatePresence mode="wait" initial={false}>
            {!expanded ? (
              <motion.div
                key="intro-right"
                initial={{ opacity: 0, x: reduced ? 0 : 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduced ? 0 : 24 }}
                transition={{ duration: reduced ? 0 : 0.5, ease }}
                className="space-y-6"
              >
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#63636E] dark:text-[#9A9AA6]">
                    {COPY.eyebrow[lang] ?? COPY.eyebrow.en}
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold leading-tight text-[#0E0E10] sm:text-4xl dark:text-[#F2F2F5]">
                    {doctor.name[lang]}
                  </h2>
                  <p className="mt-2 text-sm font-medium text-[#63636E] dark:text-[#9A9AA6]">
                    {doctor.title[lang]}
                  </p>
                </div>

                <p className="text-base leading-relaxed text-[#3E3E45] sm:text-lg dark:text-[#C9C9D2]">
                  {COPY.intro[lang] ?? COPY.intro.en}
                </p>

                <p className="text-xs text-[#63636E] dark:text-[#9A9AA6]">
                  {COPY.hint[lang] ?? COPY.hint.en}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="portrait-right"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.4 }}
              >
                {Portrait}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}