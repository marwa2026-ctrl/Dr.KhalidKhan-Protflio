// src/components/UI/SuggestionBoard.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquarePlus, Send, Trash2, Info } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const STORAGE_KEY = 'suggestions';
const MAX_LENGTH = 220;

const COPY = {
  eyebrow: { en: 'Suggestions', fa: 'پیشنهادات', ps: 'وړاندیزونه' },
  title: {
    en: 'Leave a message',
    fa: 'یک پیام بگذارید',
    ps: 'یو پیغام پریږدئ',
  },
  subtitle: {
    en: 'Share a suggestion, thank-you note, or feedback. Messages are visible only on this device.',
    fa: 'یک پیشنهاد، پیام تشکر یا بازخورد به اشتراک بگذارید. پیام‌ها فقط در این دستگاه قابل مشاهده هستند.',
    ps: 'یو وړاندیز، د مننې پیغام یا نظر شریک کړئ. پیغامونه یوازې په دې وسیله لیدل کیږي.',
  },
  placeholder: {
    en: 'e.g., Thanks for your help! (do not include personal or medical details)',
    fa: 'مثلاً: از کمک شما سپاسگزارم! (جزئیات شخصی یا طبی را شامل نکنید)',
    ps: 'لکه: ستاسو د مرستې مننه! (شخصي یا طبي توضیحات مه شاملوئ)',
  },
  submit: { en: 'Post message', fa: 'ارسال پیام', ps: 'پیغام واستوئ' },
  thanks: {
    en: 'Thank you — your message has been posted.',
    fa: 'سپاس — پیام شما ارسال شد.',
    ps: 'مننه — ستاسو پیغام واستول شو.',
  },
  empty: {
    en: 'No messages yet. Be the first to leave one.',
    fa: 'هنوز پیامی وجود ندارد. اولین باشید.',
    ps: 'لا تر اوسه پیغامونه نشته. لومړی شئ.',
  },
  clearAll: {
    en: 'Clear all messages',
    fa: 'پاک کردن همه پیام‌ها',
    ps: 'ټول پیغامونه پاک کړئ',
  },
  privacyNote: {
    en: 'Messages are stored on your device only — not shared with other visitors. Do not include medical or personal information.',
    fa: 'پیام‌ها فقط در دستگاه شما ذخیره می‌شوند — با دیگر بازدیدکنندگان به اشتراک گذاشته نمی‌شوند. اطلاعات طبی یا شخصی را شامل نکنید.',
    ps: 'پیغامونه یوازې ستاسو په وسیله کې ذخیره کیږي — د نورو لیدونکو سره نه شریکیږي. طبي یا شخصي معلومات مه شاملوئ.',
  },
};

function loadMessages() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveMessages(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* silently fail if quota exceeded */
  }
}

export default function SuggestionBoard() {
  const { lang } = useLanguage();
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [showThanks, setShowThanks] = useState(false);

  // Load once on mount
  useEffect(() => {
    setMessages(loadMessages());
  }, []);

  const submit = (e) => {
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
    saveMessages(next);
    setText('');
    setShowThanks(true);
    setTimeout(() => setShowThanks(false), 2500);
  };

  const clearAll = () => {
    setMessages([]);
    saveMessages([]);
  };

  const remaining = MAX_LENGTH - text.length;

  const formatDate = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString(lang === 'fa' ? 'fa-AF' : lang === 'ps' ? 'ps-AF' : 'en-GB', {
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
    <div className="rounded-2xl border border-[#9A9AA6]/60 p-6 dark:border-[#3E3E45]">
      {/* Heading */}
      <div className="flex items-center gap-2 text-[#63636E] dark:text-[#9A9AA6]">
        <MessageSquarePlus size={16} />
        <p className="text-xs font-semibold uppercase tracking-[0.18em]">
          {COPY.eyebrow[lang] ?? COPY.eyebrow.en}
        </p>
      </div>
      <h3 className="mt-2 text-xl font-semibold text-[#0E0E10] dark:text-[#F2F2F5]">
        {COPY.title[lang] ?? COPY.title.en}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-[#3E3E45] dark:text-[#C9C9D2]">
        {COPY.subtitle[lang] ?? COPY.subtitle.en}
      </p>

      {/* Input form */}
      <form onSubmit={submit} className="mt-4">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, MAX_LENGTH))}
            placeholder={COPY.placeholder[lang] ?? COPY.placeholder.en}
            rows={3}
            className="w-full resize-none rounded-xl border border-[#9A9AA6] bg-transparent px-3 py-2.5 pe-14 text-sm text-[#0E0E10] placeholder:text-[#9A9AA6] focus:border-[#0E0E10] focus:outline-none dark:border-[#63636E] dark:text-[#F2F2F5] dark:placeholder:text-[#63636E] dark:focus:border-[#C9C9D2]"
          />
          <span className="pointer-events-none absolute bottom-2 end-3 text-[10px] font-medium text-[#9A9AA6] dark:text-[#63636E]">
            {remaining}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <AnimatePresence>
            {showThanks && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs font-medium text-green-600 dark:text-green-400"
              >
                {COPY.thanks[lang] ?? COPY.thanks.en}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={!text.trim()}
            className="ms-auto inline-flex items-center gap-1.5 rounded-full bg-[#0E0E10] px-4 py-2 text-sm font-medium text-[#F2F2F5] transition-colors hover:bg-[#232327] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-[#F2F2F5] dark:text-[#0E0E10] dark:hover:bg-[#C9C9D2]"
          >
            <Send size={13} />
            {COPY.submit[lang] ?? COPY.submit.en}
          </button>
        </div>
      </form>

      {/* Message list */}
      <div className="mt-5 border-t border-[#9A9AA6]/60 pt-4 dark:border-[#3E3E45]">
        {messages.length === 0 ? (
          <p className="text-sm text-[#63636E] dark:text-[#9A9AA6]">
            {COPY.empty[lang] ?? COPY.empty.en}
          </p>
        ) : (
          <ul className="space-y-3">
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.li
                  key={m.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-xl bg-[#C9C9D2]/30 px-3 py-2.5 dark:bg-[#232327]"
                >
                  <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-[#0E0E10] dark:text-[#F2F2F5]">
                    {m.text}
                  </p>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[#63636E] dark:text-[#9A9AA6]">
                    {formatDate(m.createdAt)}
                  </p>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}

        {messages.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#63636E] hover:text-red-600 dark:text-[#9A9AA6] dark:hover:text-red-400"
          >
            <Trash2 size={12} />
            {COPY.clearAll[lang] ?? COPY.clearAll.en}
          </button>
        )}
      </div>

      {/* Privacy note */}
      <div className="mt-4 flex items-start gap-2 rounded-xl border border-dashed border-[#9A9AA6]/70 p-3 text-xs leading-relaxed text-[#63636E] dark:border-[#3E3E45] dark:text-[#9A9AA6]">
        <Info size={13} className="mt-0.5 shrink-0" />
        <span>{COPY.privacyNote[lang] ?? COPY.privacyNote.en}</span>
      </div>
    </div>
  );
}