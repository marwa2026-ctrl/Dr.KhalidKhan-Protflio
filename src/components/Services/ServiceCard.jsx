import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

export default function ServiceCard({ icon: Icon, title, description, ctaLabel }) {
  const { isRTL } = useLanguage();

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35 }}
      className="flex h-full flex-col rounded-xl border border-border bg-white p-6 shadow-sm transition hover:border-brand-500 hover:shadow-md"
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-navy-900">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-ink-600">{description}</p>
      <Link
        to="/appointment"
        className="focus-ring mt-4 inline-flex items-center gap-1 rounded text-sm font-semibold text-brand-600 hover:text-navy-900"
      >
        {ctaLabel}
        <ArrowRight
          className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </Link>
    </motion.article>
  );
}