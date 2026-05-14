import {
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react';
import { ThemeContext, type Theme } from './themeContext';

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('ui-library-theme');
        return saved === 'dark' ? 'dark' : 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('ui-library-theme', theme);
    }, [theme]);

    const value = useMemo(
        () => ({
            theme,
            setTheme,
            toggleTheme: () =>
                setTheme((prev) => (prev === 'light' ? 'dark' : 'light')),
        }),
        [theme],
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
