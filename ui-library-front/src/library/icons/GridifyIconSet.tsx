import GridifyIcon from './GridifyIcon';
import { normalizeIconName } from './icon.model';
import type { GridifyIconSetProps } from './icon.types';
import './GridifyIconSet.css';

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
} as const;

export default function GridifyIconSet({
  icons,
  variant = 'soft',
  size = 'md',
  showLabels = true,
  selectedIcon,
}: GridifyIconSetProps) {
  return (
    <div className="gridify-icon-set" role="list">
      {icons.map((icon) => {
        const name = normalizeIconName(icon.name);
        const active = selectedIcon === name;
        return (
          <div key={`${icon.name}-${icon.type}`} className={`gridify-icon-set__item ${active ? 'is-active' : ''}`} role="listitem">
            <GridifyIcon name={name} tone={icon.type} variant={variant} size={sizeMap[size]} label={icon.name} />
            {showLabels && <span>{icon.name}</span>}
          </div>
        );
      })}
    </div>
  );
}
