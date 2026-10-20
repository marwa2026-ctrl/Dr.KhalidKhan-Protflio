

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faWhatsapp,
  faInstagram,
  faFacebook,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

import { doctor } from '../../data/doctor';

const PLATFORMS = [
  { key: 'whatsapp', Icon: faWhatsapp, label: 'WhatsApp' },
  { key: 'instagram', Icon: faInstagram, label: 'Instagram' },
  { key: 'facebook', Icon: faFacebook, label: 'Facebook' },
  { key: 'youtube', Icon: faYoutube, label: 'YouTube' },
];

export default function SocialLinks({ className = '' }) {
  const social = doctor.social || {};

  // Only render icons that have a non-empty URL.
  const active = PLATFORMS.filter(
    (p) =>
      typeof social[p.key] === 'string' &&
      social[p.key].trim().length > 0
  );

  // If nothing is configured, render nothing.
  if (active.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {active.map(({ key, Icon, label }) => (
        <a
          key={key}
          href={social[key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#9A9AA6]/60 text-[#63636E] transition-colors hover:border-[#0E0E10] hover:text-[#0E0E10] dark:border-[#3E3E45] dark:text-[#9A9AA6] dark:hover:border-[#C9C9D2] dark:hover:text-[#F2F2F5]"
        >
          <FontAwesomeIcon icon={Icon} className="text-[15px]" />
        </a>
      ))}
    </div>
  );
}