import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  Building2,
  ArrowUpRight,
  Clock,
  Navigation,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const doctor = {
  name: "Dr. Khalid Khan Zadran",
  phone: "+93 78 765 4751",
  email: "YOUR_VERIFIED_EMAIL@example.com",
  clinic: "Rifah Medical Complex",
  address: "Kabul, Afghanistan",
};

// ─── CONTACT COPY — 3 LANGUAGES ───────────────────────────────────────────
const CONTACT_COPY = {
  eyebrow: {
    en: "Contact",
    fa: "تماس",
    ps: "اړیکه",
  },
  title: {
    en: "Let's get in touch.",
    fa: "با ما در تماس باشید.",
    ps: "زموږ سره اړیکه ونیسئ.",
  },
  subtitle: {
    en: "Contact Dr. Khalid Khan Zadran for clinic information and appointment inquiries.",
    fa: "برای دریافت اطلاعات کلینیک و پرسش درباره نوبت با داکتر خالد خان ځدران تماس بگیرید.",
    ps: "د کلینیک معلوماتو او د نوبت پوښتنو لپاره د ډاکټر خالد خان ځدران سره اړیکه ونیسئ.",
  },
  phoneLabel: {
    en: "PHONE",
    fa: "تلفن",
    ps: "تلیفون",
  },
  clinicLabel: {
    en: "CLINIC",
    fa: "کلینیک",
    ps: "کلینیک",
  },
  locationLabel: {
    en: "LOCATION",
    fa: "موقعیت",
    ps: "موقعیت",
  },
  phoneSummary: {
    en: "Get in touch",
    fa: "با ما در تماس باشید",
    ps: "زموږ سره اړیکه ونیسئ",
  },
  phoneIntro: {
    en: "Contact the clinic to ask about consultations and appointment availability.",
    fa: "برای پرسش درباره مشاوره‌ها و موجودیت نوبت با کلینیک تماس بگیرید.",
    ps: "د مشورو او د نوبت د شتون په اړه د پوښتنې لپاره له کلینیک سره اړیکه ونیسئ.",
  },
  phoneFooter: {
    en: "Please contact the clinic to confirm appointment availability.",
    fa: "لطفاً برای تأیید موجودیت نوبت با کلینیک تماس بگیرید.",
    ps: "مهرباني وکړئ د نوبت د شتون د تایید لپاره له کلینیک سره اړیکه ونیسئ.",
  },
  clinicBody: {
    en: "Medical consultations and appointment inquiries.",
    fa: "مشاوره‌های طبی و پرسش‌های نوبت.",
    ps: "طبي مشورې او د نوبت پوښتنې.",
  },
  clinicHours: {
    en: "Please contact the clinic to confirm availability.",
    fa: "لطفاً برای تأیید موجودیت با کلینیک تماس بگیرید.",
    ps: "مهرباني وکړئ د شتون د تایید لپاره له کلینیک سره اړیکه ونیسئ.",
  },
  contactClinic: {
    en: "Contact clinic",
    fa: "تماس با کلینیک",
    ps: "له کلینیک سره اړیکه",
  },
  openMaps: {
    en: "Open in Google Maps",
    fa: "باز کردن در Google Maps",
    ps: "په Google Maps کې پرانیستل",
  },
  nextStep: {
    en: "NEXT STEP",
    fa: "مرحله بعدی",
    ps: "بل ګام",
  },
  readyTitle: {
    en: "Ready to schedule a consultation?",
    fa: "آماده برای رزرو مشاوره هستید؟",
    ps: "د مشورې د مهالویش لپاره چمتو یاست؟",
  },
  readyBody: {
    en: "If you have questions about your brain or spine health, contact the clinic to ask about consultation availability and the next steps.",
    fa: "اگر درباره سلامت مغز یا ستون فقرات خود سوالی دارید، برای پرسش درباره موجودیت مشاوره و مراحل بعدی با کلینیک تماس بگیرید.",
    ps: "که ستاسو د مغز یا نخاع د روغتیا په اړه پوښتنې لرئ، د مشورې د شتون او راتلونکو ګامونو په اړه د پوښتنې لپاره له کلینیک سره اړیکه ونیسئ.",
  },
  requestAppointment: {
    en: "Request an Appointment",
    fa: "درخواست نوبت",
    ps: "د نوبت غوښتنه",
  },
};
// ──────────────────────────────────────────────────────────────────────────

export default function Contact() {
  const { lang } = useLanguage();
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const contactCards = [
    {
      id: "phone",
      icon: Phone,
      label: CONTACT_COPY.phoneLabel[lang] ?? CONTACT_COPY.phoneLabel.en,
      summary:
        CONTACT_COPY.phoneSummary[lang] ?? CONTACT_COPY.phoneSummary.en,
    },
    {
      id: "clinic",
      icon: Building2,
      label: CONTACT_COPY.clinicLabel[lang] ?? CONTACT_COPY.clinicLabel.en,
      summary: doctor.clinic,
    },
    {
      id: "location",
      icon: MapPin,
      label:
        CONTACT_COPY.locationLabel[lang] ?? CONTACT_COPY.locationLabel.en,
      summary: doctor.address,
    },
  ];

  const cardDetails = (id) => {
    switch (id) {
      case "phone":
        return (
          <div className="space-y-4">
            <p className="text-sm leading-7 text-[#63636E] dark:text-[#9A9AA6]">
              {CONTACT_COPY.phoneIntro[lang] ?? CONTACT_COPY.phoneIntro.en}
            </p>

            <a
              href={`tel:${doctor.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 text-sm text-[#0E0E10] transition-colors hover:underline dark:text-[#F2F2F5]"
            >
              <Phone size={17} className="shrink-0" />
              <span>{doctor.phone}</span>
              <ArrowUpRight size={15} />
            </a>

            <a
              href={`mailto:${doctor.email}`}
              className="flex items-center gap-3 break-all text-sm text-[#0E0E10] transition-colors hover:underline dark:text-[#F2F2F5]"
            >
              <Mail size={17} className="shrink-0" />
              <span>{doctor.email}</span>
              <ArrowUpRight size={15} />
            </a>

            <div className="flex items-start gap-3 text-sm text-[#63636E] dark:text-[#9A9AA6]">
              <Building2 size={17} className="mt-0.5 shrink-0" />
              <span>
                {doctor.clinic}, {doctor.address}
              </span>
            </div>

            <p className="text-sm leading-6 text-[#63636E] dark:text-[#9A9AA6]">
              {CONTACT_COPY.phoneFooter[lang] ?? CONTACT_COPY.phoneFooter.en}
            </p>
          </div>
        );

      case "clinic":
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Building2
                size={18}
                className="mt-1 shrink-0 text-[#63636E] dark:text-[#9A9AA6]"
              />
              <div>
                <p className="font-medium text-[#0E0E10] dark:text-[#F2F2F5]">
                  {doctor.clinic}
                </p>
                <p className="mt-1 text-sm leading-6 text-[#63636E] dark:text-[#9A9AA6]">
                  {CONTACT_COPY.clinicBody[lang] ?? CONTACT_COPY.clinicBody.en}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-[#63636E] dark:text-[#9A9AA6]">
              <Clock size={17} className="shrink-0" />
              <span>
                {CONTACT_COPY.clinicHours[lang] ?? CONTACT_COPY.clinicHours.en}
              </span>
            </div>

            <a
              href={`tel:${doctor.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#9A9AA6]/50 px-5 py-3 text-sm font-medium text-[#0E0E10] transition-colors hover:bg-[#C9C9D2]/30 dark:border-[#3E3E45] dark:text-[#F2F2F5] dark:hover:bg-[#3E3E45]"
            >
              <Phone size={16} />
              {CONTACT_COPY.contactClinic[lang] ?? CONTACT_COPY.contactClinic.en}
              <ArrowUpRight size={15} />
            </a>
          </div>
        );

      case "location":
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin
                size={18}
                className="mt-1 shrink-0 text-[#63636E] dark:text-[#9A9AA6]"
              />
              <div>
                <p className="font-medium text-[#0E0E10] dark:text-[#F2F2F5]">
                  {doctor.address}
                </p>
                <p className="mt-1 text-sm leading-6 text-[#63636E] dark:text-[#9A9AA6]">
                  {doctor.clinic}
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#3E3E45] bg-[#0E0E10]">
              <iframe
                title="Rifah Medical Complex location map"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  `${doctor.clinic}, ${doctor.address}`
                )}&z=14&output=embed`}
                width="100%"
                height="250"
                style={{
                  border: 0,
                  filter: "grayscale(1) invert(0.9) contrast(0.9)",
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${doctor.clinic}, ${doctor.address}`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#9A9AA6]/50 px-5 py-3 text-sm font-medium text-[#0E0E10] transition-colors hover:bg-[#C9C9D2]/30 dark:border-[#3E3E45] dark:text-[#F2F2F5] dark:hover:bg-[#3E3E45]"
            >
              <Navigation size={16} />
              {CONTACT_COPY.openMaps[lang] ?? CONTACT_COPY.openMaps.en}
              <ArrowUpRight size={16} />
            </a>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-[#F2F2F5] px-5 py-24 text-[#0E0E10] transition-colors duration-300 dark:bg-[#0E0E10] dark:text-[#F2F2F5] sm:px-8 lg:px-[7vw]">
      <section className="mx-auto max-w-7xl">
        {/* Contact heading */}
        <div className="mb-14 max-w-2xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#63636E] dark:text-[#9A9AA6]">
            {CONTACT_COPY.eyebrow[lang] ?? CONTACT_COPY.eyebrow.en}
          </p>

          <h1 className="text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {CONTACT_COPY.title[lang] ?? CONTACT_COPY.title.en}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-[#63636E] dark:text-[#9A9AA6]">
            {CONTACT_COPY.subtitle[lang] ?? CONTACT_COPY.subtitle.en}
          </p>
        </div>

        {/* Three equal-width contact cards */}
        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-3">
          {contactCards.map(({ id, icon: Icon, label, summary }) => {
            const isOpen = openId === id;

            return (
              <motion.div
                key={id}
                className={`flex w-full flex-col self-start overflow-hidden rounded-2xl border transition-colors duration-200 ${
                  isOpen
                    ? "border-[#0E0E10] bg-white shadow-md dark:border-[#C9C9D2] dark:bg-[#232327]"
                    : "border-[#9A9AA6]/50 bg-transparent hover:border-[#63636E] dark:border-[#3E3E45] dark:hover:border-[#9A9AA6]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(id)}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${id}`}
                  className="w-full p-6 text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#63636E] dark:focus-visible:ring-[#C9C9D2]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors duration-200 ${
                        isOpen
                          ? "border-[#0E0E10] bg-[#0E0E10] text-[#F2F2F5] dark:border-[#C9C9D2] dark:bg-[#C9C9D2] dark:text-[#0E0E10]"
                          : "border-[#9A9AA6]/60 bg-transparent text-[#63636E] dark:border-[#3E3E45] dark:text-[#9A9AA6]"
                      }`}
                    >
                      <Icon size={20} strokeWidth={1.7} />
                    </span>

                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-2 text-[#63636E] dark:text-[#9A9AA6]"
                    >
                      <ChevronDown size={18} />
                    </motion.span>
                  </div>

                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#63636E] dark:text-[#9A9AA6]">
                    {label}
                  </p>

                  <p className="mt-2 break-words text-base font-medium text-[#0E0E10] dark:text-[#F2F2F5]">
                    {summary}
                  </p>

                  <div
                    className={`mt-5 h-0.5 rounded-full transition-all duration-300 ${
                      isOpen
                        ? "w-full bg-[#0E0E10] dark:bg-[#C9C9D2]"
                        : "w-8 bg-[#9A9AA6]/60 dark:bg-[#3E3E45]"
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`panel-${id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-[#9A9AA6]/50 bg-[#F2F2F5]/70 p-6 dark:border-[#3E3E45] dark:bg-[#0E0E10]/30">
                        {cardDetails(id)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Appointment call-to-action */}
        <div className="mt-20 border-t border-[#9A9AA6]/40 pt-12 dark:border-[#3E3E45]">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#63636E] dark:text-[#9A9AA6]">
                {CONTACT_COPY.nextStep[lang] ?? CONTACT_COPY.nextStep.en}
              </p>

              <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
                {CONTACT_COPY.readyTitle[lang] ?? CONTACT_COPY.readyTitle.en}
              </h2>

              <p className="mt-4 max-w-xl text-base leading-8 text-[#63636E] dark:text-[#9A9AA6]">
                {CONTACT_COPY.readyBody[lang] ?? CONTACT_COPY.readyBody.en}
              </p>
            </div>

            <a
              href="/appointment"
              className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#0E0E10] px-6 py-4 text-sm font-medium text-[#F2F2F5] transition-colors hover:bg-[#3E3E45] dark:bg-[#F2F2F5] dark:text-[#0E0E10] dark:hover:bg-[#C9C9D2]"
            >
              {CONTACT_COPY.requestAppointment[lang] ??
                CONTACT_COPY.requestAppointment.en}
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}