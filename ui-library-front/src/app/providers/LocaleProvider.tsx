import {
    useMemo,
    useState,
    type ReactNode,
} from 'react';
import type { Locale } from '../../shared/types/locale';
import { isLocale, LocaleContext, locales } from './localeContext';

export function LocaleProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<Locale>(() => {
        const saved = localStorage.getItem('ui-library-locale');
        return isLocale(saved) ? saved : 'ru';
    });

    const value = useMemo(
        () => ({
            locale,
            setLocale: (nextLocale: Locale) => {
                localStorage.setItem('ui-library-locale', nextLocale);
                setLocale(nextLocale);
            },
            toggleLocale: () => {
                const currentIndex = locales.indexOf(locale);
                const next = locales[(currentIndex + 1) % locales.length] ?? 'ru';
                localStorage.setItem('ui-library-locale', next);
                setLocale(next);
            },
        }),
        [locale],
    );

    return (
        <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
    );
}
