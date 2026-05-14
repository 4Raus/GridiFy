import type { Locale } from '../types/locale';

export type Translation = Record<Locale, string>;

export function t(value: Translation, locale: Locale): string {
  return value[locale] ?? value.en;
}
