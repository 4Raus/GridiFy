import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from 'react';

export type Locale = 'ru' | 'en';

type LocaleContextType = {
    locale: Locale;
    toggleLocale: () => void;
    setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<Locale>(() => {
        const saved = localStorage.getItem('ui-library-locale');
        return saved === 'en' ? 'en' : 'ru';
    });

    const value = useMemo(
        () => ({
            locale,
            setLocale: (nextLocale: Locale) => {
                localStorage.setItem('ui-library-locale', nextLocale);
                setLocale(nextLocale);
            },
            toggleLocale: () => {
                const next = locale === 'ru' ? 'en' : 'ru';
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

export function useLocale() {
    const context = useContext(LocaleContext);

    if (!context) {
        throw new Error('useLocale must be used inside LocaleProvider');
    }

    return context;
}