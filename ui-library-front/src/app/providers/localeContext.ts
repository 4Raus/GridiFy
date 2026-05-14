import { createContext, useContext } from 'react';
import type { Locale } from '../../shared/types/locale';

export const locales: Locale[] = ['ru', 'en', 'de'];

export type LocaleContextType = {
  locale: Locale;
  toggleLocale: () => void;
  setLocale: (locale: Locale) => void;
};

export const LocaleContext = createContext<LocaleContextType | null>(null);

export function isLocale(value: string | null): value is Locale {
  return value === 'ru' || value === 'en' || value === 'de';
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error('useLocale must be used inside LocaleProvider');
  }

  return context;
}
