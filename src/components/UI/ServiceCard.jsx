import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function ServiceCard({ service, index = 0 }) {
  const { lang, t } = useLanguage();
  const Icon = Icons[service.icon] || Icons.Stethoscope;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col justify-between rounded-2xl border border-[#9A9AA6]/60 bg-[#F2F2F5] p-6 transition-colors hover:border-[#0E0E10] dark:border-[#3E3E45] dark:bg-[#232327] dark:hover:border-[#9A9AA6] sm:p-8"
    >
      <div>
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#C9C9D2]/50 text-[#0E0E10] dark:bg-[#3E3E45] dark:text-[#F2F2F5]">
          <Icon size={22} strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-semibold text-[#0E0E10] dark:text-[#F2F2F5]">
          {service.title[lang]}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#3E3E45] dark:text-[#C9C9D2]">
          {service.description[lang]}
        </p>
      </div>
      <Link
        to="/appointment"
        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[#0E0E10] underline-offset-4 hover:underline dark:text-[#F2F2F5]"
      >
        {t.services.requestCta}
        <Icons.ArrowUpRight size={14} />
      </Link>
    </motion.article>
  );
}