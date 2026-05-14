import type { GridifyIconName, GridifyIconProps } from './icon.types';
import { normalizeIconName } from './icon.model';
import './GridifyIconSet.css';

function iconPath(name: GridifyIconName) {
  switch (name) {
    case 'info':
      return <><circle cx="12" cy="12" r="8" /><path d="M12 10v6" /><path d="M12 7.5h.01" /></>;
    case 'warning':
      return <><path d="M12 4l8 15H4L12 4z" /><path d="M12 9v4" /><path d="M12 16h.01" /></>;
    case 'error':
      return <><circle cx="12" cy="12" r="8" /><path d="M9 9l6 6" /><path d="M15 9l-6 6" /></>;
    case 'success':
    case 'check':
      return <path d="M5 12.5l4.2 4L19 7" />;
    case 'plus':
      return <><path d="M12 5v14" /><path d="M5 12h14" /></>;
    case 'copy':
      return <><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>;
    case 'close':
      return <><path d="M6 6l12 12" /><path d="M18 6L6 18" /></>;
    case 'chevron-down':
      return <path d="M6 9l6 6 6-6" />;
    case 'search':
      return <><circle cx="11" cy="11" r="6" /><path d="M16 16l4 4" /></>;
    case 'neutral':
    default:
      return <><circle cx="12" cy="12" r="8" /><path d="M8 12h8" /></>;
  }
}

export default function GridifyIcon({
  name,
  size = 20,
  tone = 'neutral',
  variant = 'soft',
  label,
}: GridifyIconProps) {
  const normalizedName = normalizeIconName(name);

  return (
    <span
      className={`gridify-icon gridify-icon--${tone} gridify-icon--${variant}`}
      style={{ width: size, height: size }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      title={label}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {iconPath(normalizedName)}
      </svg>
    </span>
  );
}
