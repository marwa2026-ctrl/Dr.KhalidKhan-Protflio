import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import Button from "../UI/Button.jsx";

export default function DoctorPreview() {
  const { t } = useLanguage();

  return (
    <section className="border-y border-border bg-surface-muted">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">
            {t("preview.title")}
          </h2>
          <p className="mt-3 text-ink-600">{t("preview.body")}</p>
          <div className="mt-6">
            <Button to="/about" variant="secondary">
              {t("preview.cta")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-border bg-white p-8 shadow-sm"
        >
          <p className="text-sm text-ink-400">{t("about.verificationNote")}</p>
        </motion.div>
      </div>
    </section>
  );
}