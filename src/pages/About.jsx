// src/pages/About.jsx
import ProfessionalProfile from '../components/About/ProfessionalProfile';
import { useLanguage } from '../context/LanguageContext';
import { doctor } from '../data/doctor';
import SectionHeading from '../components/UI/SectionHeading';
import Button from '../components/UI/Button';

export default function About() {
  const { t, lang } = useLanguage();

  return (
    <>
      {/* Animated hero: portrait ↔ info panel */}
      <ProfessionalProfile />

      {/* Existing "clinic + verification + CTA" strip */}
      <div className="container-page pb-16">
        <div className="rounded-2xl border border-[#9A9AA6]/60 p-5 dark:border-[#3E3E45]">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#63636E] dark:text-[#9A9AA6]">
                {t.contact.clinicLabel}
              </p>
              <p className="mt-1 text-sm font-medium text-[#0E0E10] dark:text-[#F2F2F5]">
                {doctor.clinic[lang]}
              </p>
              <p className="text-sm text-[#3E3E45] dark:text-[#C9C9D2]">
                {doctor.location[lang]}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#63636E] dark:text-[#9A9AA6]">
                {t.contact.phoneLabel}
              </p>
              <a
                href={doctor.phoneHref}
                className="mt-1 inline-block text-sm font-medium text-[#0E0E10] hover:underline dark:text-[#F2F2F5]"
              >
                <span dir="ltr">{doctor.phone}</span>
              </a>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#63636E] dark:text-[#9A9AA6]">
                {t.footer.pending}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#3E3E45] dark:text-[#C9C9D2]">
                {t.about.verificationNote}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Button to="/appointment" size="lg" withArrow>
            {t.hero.primaryCta}
          </Button>
        </div>
      </div>
    </>
  );
}