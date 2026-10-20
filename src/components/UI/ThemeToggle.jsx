import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const { lang } = useLanguage();
  const isDark = theme === 'dark';

  const label = isDark
    ? lang === 'fa'
      ? 'تغییر به حالت تاریک'
      : lang === 'ps'
      ? 'تیاره حالت ته بدل کړئ'
      : 'Switch to dark theme'
    : lang === 'fa'
    ? 'تغییر به حالت روشن'
    : lang === 'ps'
    ? 'روښانه حالت ته بدل کړئ'
    : 'Switch to light theme';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#9A9AA6] text-[#0E0E10] transition-colors hover:border-[#0E0E10] dark:border-[#63636E] dark:text-[#F2F2F5] dark:hover:border-[#C9C9D2] ${className}`}
    >
      {isDark ? <Sun size={16} strokeWidth={1.75} /> : <Moon size={16} strokeWidth={1.75} />}
    </button>
  );
}