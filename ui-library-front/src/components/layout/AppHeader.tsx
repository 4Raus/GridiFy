import { Link, NavLink } from 'react-router-dom';
import { useLocale } from '../../contexts/LocaleContext';
import { useTheme } from '../../contexts/ThemeContext';

const FIGMA_URL = 'https://www.figma.com/';
const GITHUB_URL = 'https://github.com/';

function MoonIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M20 14.5A8.5 8.5 0 0 1 9.5 4a9 9 0 1 0 10.5 10.5Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function SunIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6M18.7 18.7l-1.6-1.6M6.9 6.9 5.3 5.3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

function GithubIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="currentColor"
                d="M12 2a10 10 0 0 0-3.162 19.488c.5.092.684-.217.684-.482 0-.238-.009-.868-.014-1.703-2.782.605-3.37-1.341-3.37-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.53 1.03 1.53 1.03.892 1.528 2.341 1.086 2.91.83.09-.647.35-1.086.636-1.336-2.22-.252-4.555-1.11-4.555-4.943 0-1.092.39-1.985 1.029-2.684-.103-.252-.446-1.267.097-2.642 0 0 .84-.269 2.75 1.025A9.556 9.556 0 0 1 12 6.844a9.56 9.56 0 0 1 2.505.337c1.91-1.294 2.748-1.025 2.748-1.025.545 1.375.202 2.39.1 2.642.64.699 1.028 1.592 1.028 2.684 0 3.842-2.339 4.688-4.566 4.936.359.31.679.92.679 1.855 0 1.338-.012 2.418-.012 2.748 0 .268.18.579.688.481A10.002 10.002 0 0 0 12 2Z"
            />
        </svg>
    );
}

type Props = {
    compact?: boolean;
};

export default function AppHeader({ compact = false }: Props) {
    const { locale, toggleLocale } = useLocale();
    const { theme, toggleTheme } = useTheme();

    return (
        <header className={compact ? 'app-header app-header--compact' : 'app-header'}>
            <div className="app-header__brand-group">
                <Link to="/" className="brand-link">
                    <span className="brand-link__title">GridiFy</span>
                    <span className="brand-link__badge">v1.1.1</span>
                </Link>
            </div>

            <nav className="app-header__nav">
                <a href={FIGMA_URL} target="_blank" rel="noreferrer">
                    {locale === 'ru' ? 'Ресурсы' : 'Resources'}
                </a>
                <NavLink to="/library">
                    {locale === 'ru' ? 'Компоненты' : 'Components'}
                </NavLink>
            </nav>

            <div className="app-header__actions">
                <button className="icon-button" type="button" onClick={toggleLocale}>
                    {locale.toUpperCase()}
                </button>
                <button className="icon-button" type="button" onClick={toggleTheme} aria-label="Toggle theme">
                    {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                </button>
                <a className="icon-button" href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub">
                    <GithubIcon />
                </a>
            </div>
        </header>
    );
}
