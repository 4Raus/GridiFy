import { useLocale } from '../../contexts/LocaleContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function HeaderControls() {
    const { theme, toggleTheme } = useTheme();
    const { locale, toggleLocale } = useLocale();

    return (
        <div className="header-controls">
            <button className="secondary-button" onClick={toggleLocale}>
                {locale === 'ru' ? 'RU' : 'EN'}
            </button>

            <button className="secondary-button" onClick={toggleTheme}>
                {theme === 'light' ? 'Dark theme' : 'Light theme'}
            </button>
        </div>
    );
}