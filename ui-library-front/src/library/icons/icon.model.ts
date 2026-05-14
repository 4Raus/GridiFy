import type { GridifyIconName } from './icon.types';

const iconNames: GridifyIconName[] = [
  'neutral',
  'info',
  'warning',
  'error',
  'success',
  'plus',
  'copy',
  'check',
  'close',
  'chevron-down',
  'search',
];

export { iconNames as gridifyIconNames };

export function normalizeIconName(name: string): GridifyIconName {
  return iconNames.includes(name as GridifyIconName) ? name as GridifyIconName : 'neutral';
}
