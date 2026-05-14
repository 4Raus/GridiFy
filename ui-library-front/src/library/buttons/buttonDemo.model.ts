import { t } from '../../shared/lib/i18n';
import type { Locale } from '../../shared/types/locale';
import type { GridifyButtonSize, GridifyButtonVariant } from './button.types';

export const buttonVariants: GridifyButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success'];
export const buttonSizes: GridifyButtonSize[] = ['sm', 'md', 'lg'];

export function defaultButtonLabel(locale: Locale) {
  return t({ ru: 'Создать заявку', en: 'Create request', de: 'Anfrage erstellen' }, locale);
}

export function normalizeButtonVariant(value: unknown): GridifyButtonVariant {
  return buttonVariants.includes(value as GridifyButtonVariant) ? value as GridifyButtonVariant : 'primary';
}

export function normalizeButtonSize(value: unknown): GridifyButtonSize {
  return buttonSizes.includes(value as GridifyButtonSize) ? value as GridifyButtonSize : 'md';
}

export function normalizeButtonLabel(value: unknown, locale: Locale) {
  return typeof value === 'string' && value.trim() ? value.trim() : defaultButtonLabel(locale);
}
