import type { ComponentStatus } from '../types/status';
import type { Locale } from '../types/locale';
import type { TagBadgeTone } from '../ui/TagBadge';

export const componentStatusLabels: Record<ComponentStatus, Record<Locale, string>> = {
  ready: {
    ru: 'Готово',
    en: 'Ready',
    de: 'Fertig',
  },
  beta: {
    ru: 'Бета',
    en: 'Beta',
    de: 'Beta',
  },
  'in-development': {
    ru: 'В разработке',
    en: 'In development',
    de: 'In Entwicklung',
  },
  review: {
    ru: 'На проверке',
    en: 'In review',
    de: 'In Prüfung',
  },
  planned: {
    ru: 'Запланировано',
    en: 'Planned',
    de: 'Geplant',
  },
  deprecated: {
    ru: 'Устаревает',
    en: 'Deprecated',
    de: 'Veraltet',
  },
};

export function getComponentStatusLabel(status: ComponentStatus, locale: Locale): string {
  return componentStatusLabels[status]?.[locale] ?? componentStatusLabels.ready[locale];
}

export function getComponentStatusTone(status: ComponentStatus): TagBadgeTone {
  switch (status) {
    case 'ready':
      return 'status-ready';
    case 'beta':
      return 'status-beta';
    case 'in-development':
      return 'status-development';
    case 'review':
      return 'status-review';
    case 'planned':
      return 'status-planned';
    case 'deprecated':
      return 'status-deprecated';
    default:
      return 'neutral';
  }
}

export function shouldShowStatusOverlay(status: ComponentStatus): boolean {
  return status === 'in-development' || status === 'planned' || status === 'review';
}

export function getStatusOverlayVariant(status: ComponentStatus): 'ribbon' | 'tape' {
  if (status === 'review') return 'ribbon';
  return 'tape';
}
