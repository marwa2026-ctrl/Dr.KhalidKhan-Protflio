// src/components/Layout/Navbar.jsx
import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Brain, Home, User, Stethoscope, CalendarDays, Mail } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';
import ThemeToggle from '../UI/ThemeToggle';
import LanguageSwitcher from '../UI/LanguageSwitcher';

const links = [
  { to: '/',            key: 'home',        Icon: Home },
  { to: '/about',       key: 'about',       Icon: User },
  { to: '/services',    key: 'services',    Icon: Stethoscope },
  { to: '/appointment', key: 'appointment', Icon: CalendarDays },
  { to: '/contact',     key: 'contact',     Icon: Mail },
];

/* Nav link with an icon that spins 360° when clicked */
function NavItem({ to, label, Icon, onClick, mobile = false }) {
  const [spin, setSpin] = useState(0);

  const handleClick = () => {
    setSpin((n) => n + 360);   // increment → triggers a fresh 360° turn each click
    onClick?.();
  };

  return (
    <NavLink
      to={to}
      onClick={handleClick}
      className={({ isActive }) =>
        mobile
          ? `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium ${
              isActive
                ? 'bg-[#C9C9D2]/40 text-[#0E0E10] dark:bg-[#232327] dark:text-[#F2F2F5]'
                : 'text-[#3E3E45] dark:text-[#C9C9D2]'
            }`
          : `group inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
              isActive
                ? 'text-[#0E0E10] dark:text-[#F2F2F5]'
                : 'text-[#63636E] hover:text-[#0E0E10] dark:text-[#9A9AA6] dark:hover:text-[#F2F2F5]'
            }`
      }
    >
      <motion.span
        animate={{ rotate: spin }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="inline-flex"
      >
        <Icon size={mobile ? 18 : 15} strokeWidth={1.75} />
      </motion.span>
      <span>{label}</span>
    </NavLink>
  );
}

export default function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const displayName = t.brand.name.replace(/^(Dr\.?\s+|داکتر\s+|ډاکټر\s+)/, '');

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-[#9A9AA6]/60 bg-[#F2F2F5]/90 backdrop-blur-md dark:border-[#3E3E45] dark:bg-[#0E0E10]/90'
          : 'bg-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-20">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2" aria-label={t.brand.name}>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#9A9AA6] text-[#0E0E10] dark:border-[#63636E] dark:text-[#F2F2F5]">
            <Brain size={18} strokeWidth={1.75} />
          </span>
          <span className="text-sm font-semibold text-[#0E0E10] sm:text-base dark:text-[#F2F2F5]">
            {displayName}
          </span>
        </Link>

        {/* Desktop nav — icon + label, icon spins 360° on click */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <NavItem key={l.to} to={l.to} label={t.nav[l.key]} Icon={l.Icon} />
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#9A9AA6] text-[#0E0E10] lg:hidden dark:border-[#63636E] dark:text-[#F2F2F5]"
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[#9A9AA6]/60 bg-[#F2F2F5] lg:hidden dark:border-[#3E3E45] dark:bg-[#0E0E10]"
          >
            <div className="container-page flex flex-col gap-1 py-4">
              {links.map((l) => (
                <NavItem
                  key={l.to}
                  to={l.to}
                  label={t.nav[l.key]}
                  Icon={l.Icon}
                  mobile
                  onClick={() => setOpen(false)}
                />
              ))}
              <div className="mt-3 flex items-center justify-between gap-3">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}