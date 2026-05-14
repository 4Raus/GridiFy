import { locales, useLocale } from '../../app/providers/localeContext';

export default function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="locale-switcher" aria-label="Language">
      {locales.map((item) => (
        <button
          key={item}
          type="button"
          className={item === locale ? 'active' : ''}
          onClick={() => setLocale(item)}
          aria-pressed={item === locale}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
