// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import {
  Send,
  MessageSquarePlus,
  Trash2,
  Brain,
  Scale,
  Activity,
  Sparkles,
  Droplet,
  Lightbulb,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { doctor, services } from '../data/doctor';
import Button from '../components/UI/Button';
import SectionHeading from '../components/UI/SectionHeading';
import Reveal from '../components/UI/Reveal';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

// ─── IMAGES ───────────────────────────────────────────────────────────────
const HERO_IMAGE_URL = 'https://i.pinimg.com/736x/00/b6/70/00b670f4a3901b3ab4b6de3165df3cab.jpg';
const CTA_IMAGE_URL =
  'https://i.pinimg.com/1200x/3c/d1/0b/3cd10b261edab32b4b21f18be6ac2bac.jpggit';
// ──────────────────────────────────────────────────────────────────────────

// ─── HERO FACTS ───────────────────────────────────────────────────────────
const HERO_FACTS = [
  {
    id: 'neurons',
    Icon: Brain,
    label: { en: 'Neurons', fa: 'نورون‌ها', ps: 'نیورونونه' },
    position: 'start-20 top-20',
    delay: 0.1,
    text: {
      en: 'The adult brain contains roughly 86 billion neurons, connected by trillions of synapses.',
      fa: 'مغز بزرگسال حاوی حدود ۸۶ میلیارد نورون است که با تریلیون‌ها سیناپس به هم متصل شده‌اند.',
      ps: 'د لویانو مغز شاوخوا ۸۶ ملیارده نیورونونه لري چې په تریلیونونو سیناپسونو سره تړل شوي دي.',
    },
  },
  {
    id: 'weight',
    Icon: Scale,
    label: { en: 'Weight', fa: 'وزن', ps: 'وزن' },
    position: '-start-6 top-1/2',
    delay: 0.25,
    text: {
      en: 'The human brain weighs about 1.4 kg — roughly 2% of total body weight — yet consumes about 20% of the body\u2019s energy.',
      fa: 'مغز انسان حدود ۱.۴ کیلوگرام وزن دارد — تقریباً ۲٪ از وزن کل بدن — اما حدود ۲۰٪ از انرژی بدن را مصرف می‌کند.',
      ps: 'د انسان مغز شاوخوا ۱.۴ کیلوګرامه وزن لري — د ټول بدن وزن شاوخوا ۲٪ — خو د بدن شاوخوا ۲۰٪ انرژي کاروي.',
    },
  },
  {
    id: 'activity',
    Icon: Activity,
    label: { en: 'Activity', fa: 'فعالیت', ps: 'فعالیت' },
    position: 'end-20 top-1/3',
    delay: 0.4,
    text: {
      en: 'Different regions of the brain communicate continuously through electrical and chemical signals, even during sleep.',
      fa: 'نواحی مختلف مغز به طور مداوم از طریق سیگنال‌های الکتریکی و شیمیایی ارتباط برقرار می‌کنند، حتی در هنگام خواب.',
      ps: 'د مغز مختلفې سیمې په دوامداره توګه د بریښنایي او کیمیاوي سیګنالونو له لارې اړیکه لري، حتی د خوب په وخت کې.',
    },
  },
  {
    id: 'neuroplasticity',
    Icon: Sparkles,
    label: { en: 'Neuroplasticity', fa: 'انعطاف‌پذیری عصبی', ps: 'عصبي انعطاف' },
    position: '-end-10 bottom-1/3',
    delay: 0.55,
    text: {
      en: 'The brain can reorganize its neural connections throughout life — a property called neuroplasticity that supports learning and recovery.',
      fa: 'مغز می‌تواند در طول زندگی اتصالات عصبی خود را بازسازی کند — خاصیتی به نام انعطاف‌پذیری عصبی که یادگیری و بهبودی را پشتیبانی می‌کند.',
      ps: 'مغز کولای شي په ټول ژوند کې خپل عصبي اړیکې بیا تنظیم کړي — د عصبي انعطاف په نوم یوه ځانګړنه چې زده کړه او بیا رغونه ملاتړ کوي.',
    },
  },
  {
    id: 'bloodflow',
    Icon: Droplet,
    label: { en: 'Blood Flow', fa: 'جریان خون', ps: 'د وینې جریان' },
    position: '-start-10 bottom-4',
    delay: 0.7,
    text: {
      en: 'The brain receives about 15% of the heart\u2019s output — roughly 750 ml of blood per minute — despite being only 2% of body weight.',
      fa: 'مغز حدود ۱۵٪ از برون‌ده قلب را دریافت می‌کند — تقریباً ۷۵۰ میلی‌لیتر خون در دقیقه — با وجود اینکه فقط ۲٪ از وزن بدن است.',
      ps: 'مغز د زړه د تولیداتو شاوخوا ۱۵٪ ترلاسه کوي — په دقیقه کې شاوخوا ۷۵۰ ملی لیتره وینه — سره له دې چې یوازې د بدن وزن ۲٪ دی.',
    },
  },
  {
    id: 'memory',
    Icon: Lightbulb,
    label: { en: 'Memory', fa: 'حافظه', ps: 'حافظه' },
    position: 'end-20 bottom-4',
    delay: 0.85,
    text: {
      en: 'The hippocampus — a small structure deep in the brain — plays a central role in forming new memories and spatial navigation.',
      fa: 'هیپوکامپ — ساختاری کوچک در عمق مغز — نقش محوری در تشکیل حافظه‌های جدید و ناوبری فضایی دارد.',
      ps: 'هایپوکامپ — په مغز کې ژور کوچنی جوړښت — په نویو حافظو جوړولو او فضایي نیویګیشن کې مرکزي رول لوبوي.',
    },
  },
];
// ──────────────────────────────────────────────────────────────────────────

// ─── SUGGESTION STORAGE ───────────────────────────────────────────────────
const SUGGESTIONS_KEY = 'rifah-suggestions';
const MAX_LENGTH = 220;

function loadSuggestions() {
  try {
    const raw = localStorage.getItem(SUGGESTIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveSuggestions(list) {
  try {
    localStorage.setItem(SUGGESTIONS_KEY, JSON.stringify(list));
  } catch {
    /* ignore quota errors */
  }
}

// ─── SUGGESTION COPY ──────────────────────────────────────────────────────
const SUGGESTION_COPY = {
  eyebrow: { en: 'Suggestion', fa: 'پیشنهاد', ps: 'وړاندیز' },
  title: {
    en: 'Leave a message',
    fa: 'یک پیام بگذارید',
    ps: 'یو پیغام پریږدئ',
  },
  placeholder: {
    en: 'Share your feedback ',
    fa: 'بازخورد خود را به اشتراک بگذارید…',
    ps: 'خپل نظر شریک کړئ…',
  },
  submit: { en: 'Send', fa: 'ارسال', ps: 'لیږل' },
  thanks: {
    en: 'Your message has been posted below.',
    fa: 'پیام شما در زیر درج شد.',
    ps: 'ستاسو پیغام لاندې ښودل شو.',
  },
  yourMessage: { en: 'Your message', fa: 'پیام شما', ps: 'ستاسو پیغام' },
  remove: { en: 'Remove', fa: 'حذف', ps: 'لرې کول' },
  clearAll: {
    en: 'Remove all messages',
    fa: 'حذف همه پیام‌ها',
    ps: 'ټول پیغامونه لرې کړئ',
  },
  empty: {
    en: 'No messages yet. Be the first to leave one.',
    fa: 'هنوز پیامی وجود ندارد. اولین باشید.',
    ps: 'لا تر اوسه پیغامونه نشته. لومړی شئ.',
  },
};
// ──────────────────────────────────────────────────────────────────────────

export default function Home() {
  const { t, lang } = useLanguage();
  const reduced = usePrefersReducedMotion();

  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [flash, setFlash] = useState(false);
  const [activeFact, setActiveFact] = useState(null);

  useEffect(() => {
    setMessages(loadSuggestions());
  }, []);

  const submitSuggestion = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    const newMsg = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      text: trimmed.slice(0, MAX_LENGTH),
      createdAt: new Date().toISOString(),
    };
    const next = [newMsg, ...messages];
    setMessages(next);
    saveSuggestions(next);
    setText('');
    setFlash(true);
    setTimeout(() => setFlash(false), 2500);
  };

  const removeMessage = (id) => {
    const next = messages.filter((m) => m.id !== id);
    setMessages(next);
    saveSuggestions(next);
  };

  const clearAllMessages = () => {
    setMessages([]);
    saveSuggestions([]);
  };

  const activeFactData = HERO_FACTS.find((f) => f.id === activeFact) || null;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const formatDate = (iso) => {
    try {
      const d = new Date(iso);
      const locale =
        lang === 'fa' ? 'fa-AF' : lang === 'ps' ? 'ps-AF' : 'en-GB';
      return d.toLocaleString(locale, {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="container-page grid gap-10 pb-16 pt-10 sm:pt-16 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-20">
          <motion.div
            initial={reduced ? false : 'hidden'}
            animate="show"
            variants={container}
            className="lg:col-span-7 lg:pe-8"
          >
            <motion.p
              variants={item}
              className="text-xs font-semibold uppercase tracking-[0.22em] text-[#63636E] dark:text-[#9A9AA6]"
            >
              {t.brand.clinic} · {t.highlights.title}
            </motion.p>

            <motion.h1
              variants={item}
              className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-[#0E0E10] sm:text-5xl md:text-6xl lg:text-[4.2rem] dark:text-[#F2F2F5] whitespace-pre-line"
            >
              {t.hero.headline}
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-base leading-relaxed text-[#3E3E45] sm:text-lg dark:text-[#C9C9D2]"
            >
              {t.hero.intro}
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
              <Button to="/appointment" size="lg" withArrow>
                {t.hero.primaryCta}
              </Button>
              <Button to="/services" size="lg" variant="secondary">
                {t.hero.secondaryCta}
              </Button>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm text-[#3E3E45] dark:text-[#C9C9D2]"
            >
              <span className="font-medium text-[#0E0E10] dark:text-[#F2F2F5]">
                {t.brand.clinic}
              </span>
              <span>{doctor.location[lang]}</span>
              <a
                href={doctor.phoneHref}
                className="hover:text-[#0E0E10] dark:hover:text-[#F2F2F5]"
              >
                <span dir="ltr">{doctor.phone}</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right — hero image + fact card (each in its own row) */}
          <div className="flex flex-col lg:col-span-5">
            {/* Image + hover buttons — isolated from the fact card */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative"
            >
              <motion.div
                animate={reduced ? undefined : { y: [0, -10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="group relative"
              >
                {/* Image card — clipping boundary */}
                <div className="relative overflow-hidden rounded-3xl shadow-[0_25px_60px_-15px_rgba(14,14,16,0.55),0_10px_25px_-8px_rgba(14,14,16,0.35)] dark:shadow-[0_0_35px_rgba(242,242,245,0.18),0_0_70px_rgba(242,242,245,0.08)]">
                  <img
                    src={HERO_IMAGE_URL}
                    alt="Anatomical illustration of the human brain"
                    loading="eager"
                    draggable={false}
                    className="block h-auto w-full select-none object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />

                  {/* Dark gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E0E10]/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* 6 fact buttons */}
                {HERO_FACTS.map(({ id, Icon, label, position, delay }) => (
                  <motion.button
                    key={id}
                    type="button"
                    onClick={() => setActiveFact(id)}
                    initial={reduced ? false : { opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.35,
                      delay,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={reduced ? undefined : { scale: 1.05 }}
                    whileTap={reduced ? undefined : { scale: 0.97 }}
                    className={`pointer-events-none absolute z-10 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#F2F2F5] px-3 py-1.5 text-[11px] font-semibold text-[#0E0E10] opacity-0 shadow-lg shadow-[#0E0E10]/20 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100 hover:bg-[#C9C9D2] dark:bg-[#232327] dark:text-[#F2F2F5] dark:hover:bg-[#3E3E45] ${position}`}
                  >
                    <Icon size={12} strokeWidth={2.25} className="shrink-0" />
                    {label[lang] ?? label.en}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>

            {/* Fact card — OUTSIDE the image+buttons wrapper, so it never overlaps */}
           <AnimatePresence mode="wait">
  {activeFactData && (
    <motion.div
      key={activeFactData.id}
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="mt-4 rounded-2xl border border-[#9A9AA6]/60 bg-[#C9C9D2]/20 p-4 dark:border-[#3E3E45] dark:bg-[#232327]"
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.05,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#63636E] dark:text-[#9A9AA6]">
          {activeFactData.label[lang] ?? activeFactData.label.en}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-[#3E3E45] dark:text-[#C9C9D2]">
          {activeFactData.text[lang] ?? activeFactData.text.en}
        </p>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
          </div>
        </div>
      </section>

      {/* ================= AREAS OF CONSULTATION ================= */}
      <section className="border-t border-[#9A9AA6]/60 py-16 sm:py-20 dark:border-[#3E3E45]">
        <div className="container-page">
          <Reveal from="up">
            <SectionHeading
              eyebrow={t.highlights.title}
              title={t.highlights.title}
              subtitle={t.highlights.subtitle}
            />
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => {
              const Icon = Icons[s.icon] || Icons.Stethoscope;
              return (
                <Reveal key={s.id} from="up" delay={i * 0.08}>
                  <Link
                    to={`/services/${s.id}`}
                    className="group flex h-full flex-col justify-between rounded-2xl border border-[#9A9AA6]/60 p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#0E0E10] hover:shadow-xl hover:shadow-[#0E0E10]/10 dark:border-[#3E3E45] dark:hover:border-[#C9C9D2] dark:hover:shadow-black/40"
                  >
                    <div>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#9A9AA6]/60 text-[#63636E] transition-colors duration-300 group-hover:border-[#0E0E10] group-hover:bg-[#0E0E10] group-hover:text-[#F2F2F5] dark:border-[#3E3E45] dark:text-[#9A9AA6] dark:group-hover:border-[#C9C9D2] dark:group-hover:bg-[#F2F2F5] dark:group-hover:text-[#0E0E10]">
                        <Icon size={18} />
                      </span>
                      <h3 className="mt-4 text-base font-semibold leading-snug text-[#0E0E10] dark:text-[#F2F2F5]">
                        {s.title[lang]}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#3E3E45] dark:text-[#C9C9D2]">
                        {s.description[lang]}
                      </p>
                    </div>

                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#0E0E10] dark:text-[#F2F2F5]">
                      {lang === 'fa'
                        ? 'بیشتر بدانید'
                        : lang === 'ps'
                        ? 'نور معلومات'
                        : 'Learn more'}
                      <Icons.ArrowUpRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Reveal from="up" delay={0.3} className="mt-10">
            <Button to="/services" variant="secondary" withArrow>
              {t.hero.secondaryCta}
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ================= DOCTOR INTRO + SUGGESTION ================= */}
      <section className="border-t border-[#9A9AA6]/60 py-16 sm:py-20 dark:border-[#3E3E45]">
        <div className="container-page grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal from="left" className="lg:col-span-5">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative"
            >
              <motion.div
                animate={reduced ? undefined : { y: [0, -10, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-[#C9C9D2]/40 shadow-[0_25px_60px_-15px_rgba(14,14,16,0.55),0_10px_25px_-8px_rgba(14,14,16,0.35)] dark:bg-[#232327] dark:shadow-[0_0_35px_rgba(242,242,245,0.18),0_0_70px_rgba(242,242,245,0.08)]">
                  {doctor.portrait ? (
                    <img
                      src={doctor.portrait}
                      alt={doctor.name[lang]}
                      loading="lazy"
                      draggable={false}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                      <p className="text-sm text-[#63636E] dark:text-[#9A9AA6]">
                        {t.hero.placeholderNote}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </Reveal>

          <Reveal from="right" delay={0.1} className="lg:col-span-7">
            <SectionHeading
              eyebrow={t.preview.title}
              title={doctor.name[lang]}
              subtitle={doctor.title[lang]}
            />

            <p className="mt-6 text-lg leading-relaxed text-[#3E3E45] dark:text-[#C9C9D2]">
              {doctor.biography[lang]}
            </p>

            <p className="mt-4 text-base leading-relaxed text-[#63636E] dark:text-[#9A9AA6]">
              {lang === 'fa'
                ? 'در پروفایل مسلکی، اطلاعات بیشتر درباره آموزش، تجربه و حوزه‌های علاقه داکتر موجود است.'
                : lang === 'ps'
                ? 'په مسلکي پروفایل کې، د ډاکټر د زده کړو، تجربې او علاقو په اړه نور معلومات شته.'
                : 'Explore the full professional profile to learn more about his background, training, and clinical interests.'}
            </p>

            <div className="mt-8">
              <Button to="/about" variant="secondary" withArrow>
                {t.preview.cta}
              </Button>
            </div>

            <div className="mt-10 rounded-2xl border border-[#9A9AA6]/60 p-5 dark:border-[#3E3E45]">
              <div className="flex items-center gap-2 text-[#63636E] dark:text-[#9A9AA6]">
                <MessageSquarePlus size={15} />
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em]">
                  {SUGGESTION_COPY.eyebrow[lang] ?? SUGGESTION_COPY.eyebrow.en}
                </p>
              </div>
              <h4 className="mt-2 text-base font-semibold text-[#0E0E10] dark:text-[#F2F2F5]">
                {SUGGESTION_COPY.title[lang] ?? SUGGESTION_COPY.title.en}
              </h4>

              <form onSubmit={submitSuggestion} className="mt-3">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value.slice(0, MAX_LENGTH))}
                    placeholder={
                      SUGGESTION_COPY.placeholder[lang] ??
                      SUGGESTION_COPY.placeholder.en
                    }
                    className="flex-1 rounded-xl border border-[#9A9AA6] bg-transparent px-3 py-2.5 text-sm text-[#0E0E10] placeholder:text-[#9A9AA6] focus:border-[#0E0E10] focus:outline-none dark:border-[#63636E] dark:text-[#F2F2F5] dark:placeholder:text-[#63636E] dark:focus:border-[#C9C9D2]"
                  />
                  <button
                    type="submit"
                    disabled={!text.trim()}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0E0E10] px-4 py-2 text-sm font-medium text-[#F2F2F5] transition-colors hover:bg-[#232327] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-[#F2F2F5] dark:text-[#0E0E10] dark:hover:bg-[#C9C9D2]"
                  >
                    <Send size={13} />
                    {SUGGESTION_COPY.submit[lang] ?? SUGGESTION_COPY.submit.en}
                  </button>
                </div>

                <AnimatePresence>
                  {flash && (
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-3 text-xs font-medium text-green-600 dark:text-green-400"
                    >
                      {SUGGESTION_COPY.thanks[lang] ?? SUGGESTION_COPY.thanks.en}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>

              <div className="mt-4 border-t border-[#9A9AA6]/60 pt-4 dark:border-[#3E3E45]">
                {messages.length === 0 ? (
                  <p className="text-sm text-[#63636E] dark:text-[#9A9AA6]">
                    {SUGGESTION_COPY.empty[lang] ?? SUGGESTION_COPY.empty.en}
                  </p>
                ) : (
                  <ul className="max-h-64 space-y-2 overflow-y-auto pe-1">
                    <AnimatePresence initial={false}>
                      {messages.map((m) => (
                        <motion.li
                          key={m.id}
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          transition={{ duration: 0.25 }}
                          className="group flex items-start gap-2 rounded-xl bg-[#C9C9D2]/30 px-3 py-2.5 dark:bg-[#232327]"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#63636E] dark:text-[#9A9AA6]">
                              {SUGGESTION_COPY.yourMessage[lang] ??
                                SUGGESTION_COPY.yourMessage.en}
                            </p>
                            <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-relaxed text-[#0E0E10] dark:text-[#F2F2F5]">
                              {m.text}
                            </p>
                            <p className="mt-1 text-[10px] text-[#63636E] dark:text-[#9A9AA6]">
                              {formatDate(m.createdAt)}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeMessage(m.id)}
                            aria-label={
                              SUGGESTION_COPY.remove[lang] ??
                              SUGGESTION_COPY.remove.en
                            }
                            title={
                              SUGGESTION_COPY.remove[lang] ??
                              SUGGESTION_COPY.remove.en
                            }
                            className="shrink-0 rounded-full p-1.5 text-[#9A9AA6] transition-colors hover:bg-red-500/10 hover:text-red-600 dark:text-[#63636E] dark:hover:text-red-400"
                          >
                            <Trash2 size={13} />
                          </button>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                )}

                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={clearAllMessages}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#63636E] hover:text-red-600 dark:text-[#9A9AA6] dark:hover:text-red-400"
                  >
                    <Trash2 size={12} />
                    {SUGGESTION_COPY.clearAll[lang] ??
                      SUGGESTION_COPY.clearAll.en}
                  </button>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="border-t border-[#9A9AA6]/60 py-16 sm:py-20 dark:border-[#3E3E45]">
        <div className="container-page">
          <Reveal from="up">
            <div className="overflow-hidden rounded-3xl border border-[#9A9AA6]/60 bg-[#C9C9D2]/30 dark:border-[#3E3E45] dark:bg-[#232327]">
              <div className="grid items-stretch gap-0 lg:grid-cols-2">
                <Reveal
                  from="left"
                  className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:min-h-full"
                >
                  <img
                    src={CTA_IMAGE_URL}
                    alt="Consultation at Rifah Medical Complex"
                    loading="lazy"
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </Reveal>

                <Reveal
                  from="right"
                  delay={0.1}
                  className="flex flex-col justify-center p-8 sm:p-12"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#63636E] dark:text-[#9A9AA6]">
                    {t.cta.title}
                  </p>
                  <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-[#0E0E10] sm:text-4xl dark:text-[#F2F2F5]">
                    {t.cta.title}
                  </h2>
                  <p className="mt-3 max-w-xl text-base text-[#3E3E45] dark:text-[#C9C9D2]">
                    {t.cta.body}
                  </p>
                  <div className="mt-6">
                    <Button to="/appointment" size="lg" withArrow>
                      {t.cta.button}
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}