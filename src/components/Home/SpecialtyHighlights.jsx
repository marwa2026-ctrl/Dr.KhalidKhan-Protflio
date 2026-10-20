import { Brain, Activity, Stethoscope, HeartPulse } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import SectionHeading from "../UI/SectionHeading.jsx";

const highlights = [
  { icon: Brain, key: "highlights.brain" },
  { icon: Activity, key: "highlights.spine" },
  { icon: Stethoscope, key: "highlights.nerve" },
  { icon: HeartPulse, key: "highlights.eval" },
];

export default function SpecialtyHighlights() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <SectionHeading
        title={t("highlights.title")}
        subtitle={t("highlights.subtitle")}
        align="center"
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map(({ icon: Icon, key }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="rounded-xl border border-border bg-white p-6 shadow-sm"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mt-4 text-sm font-semibold text-navy-900">
              {t(key)}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}