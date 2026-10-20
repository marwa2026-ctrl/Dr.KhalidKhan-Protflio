import { motion } from "motion/react";
import { CalendarDays, ArrowRight, ShieldCheck } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import Button from "../UI/Button.jsx";

export default function Hero() {
  const { t, isRTL } = useLanguage();

  // Respect reduced-motion at the component level too.
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const fade = prefersReduced
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section className="bg-surface-muted">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
        {/* Text column */}
        <div className={isRTL ? "order-2 md:order-1" : ""}>
          <motion.p
            {...fade}
            transition={{ duration: 0.5 }}
            className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-600"
          >
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            {t("brand.clinic")}
          </motion.p>

          <motion.h1
            {...fade}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl md:text-5xl"
          >
            {t("hero.headline")}
          </motion.h1>

          <motion.p
            {...fade}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-4 max-w-xl text-base text-ink-600 sm:text-lg"
          >
            {t("hero.intro")}
          </motion.p>

          <motion.div
            {...fade}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <Button to="/appointment" size="lg">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {t("hero.primaryCta")}
            </Button>
            <Button to="/services" variant="secondary" size="lg">
              {t("hero.secondaryCta")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Button>
          </motion.div>
        </div>

        {/* Visual column — labeled placeholder */}
        <motion.div
          {...fade}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-brand-50 to-white shadow-sm">
            <div className="flex h-full items-center justify-center p-8 text-center">
              <p className="text-sm font-medium text-ink-400">
                {t("hero.portraitPlaceholder")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}