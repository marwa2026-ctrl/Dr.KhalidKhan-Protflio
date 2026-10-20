import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const base =
  'inline-flex items-center justify-center gap-2 font-medium text-sm tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 rounded-full';

const variants = {
  primary:
    'bg-[#0E0E10] text-[#F2F2F5] hover:bg-[#232327] dark:bg-[#F2F2F5] dark:text-[#0E0E10] dark:hover:bg-[#C9C9D2]',
  secondary:
    'border border-[#9A9AA6] text-[#0E0E10] hover:border-[#0E0E10] dark:border-[#63636E] dark:text-[#F2F2F5] dark:hover:border-[#C9C9D2]',
  ghost:
    'text-[#0E0E10] hover:bg-[#C9C9D2]/40 dark:text-[#F2F2F5] dark:hover:bg-[#3E3E45]',
};

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3',
  lg: 'px-7 py-3.5 text-base',
};

export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  children,
  withArrow = false,
  className = '',
  ...rest
}) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {withArrow && <ArrowRight className="ltr-arrow" size={16} strokeWidth={1.75} />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <motion.button whileTap={{ scale: 0.98 }} className={cls} {...rest}>
      {content}
    </motion.button>
  );
}