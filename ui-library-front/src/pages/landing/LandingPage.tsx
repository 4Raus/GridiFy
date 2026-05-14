import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppHeader from '../../widgets/app-header/AppHeader';
import { useLocale } from '../../app/providers/localeContext';
import { t, type Translation } from '../../shared/lib/i18n';
import { externalLinks } from '../../shared/config/externalLinks';
import { appMeta } from '../../shared/config/appMeta';
import CopyableBlock from '../../shared/ui/CopyableBlock';

type Feature = {
  title: Translation;
  text: Translation;
};

const features: Feature[] = [
  {
    title: {
      ru: 'TypeScript из коробки',
      en: 'TypeScript out of the box',
      de: 'TypeScript von Haus aus',
    },
    text: {
      ru: 'Строгая типизация, автодополнение в IDE и предсказуемое API для командной разработки.',
      en: 'Strict typing, IDE autocomplete, and a predictable API for team development.',
      de: 'Strenge Typisierung, IDE-Autocomplete und eine vorhersehbare API für Teams.',
    },
  },
  {
    title: { ru: 'Tree-shaking', en: 'Tree-shaking', de: 'Tree-shaking' },
    text: {
      ru: 'В сборку попадают только нужные компоненты, без лишнего веса и дублей.',
      en: 'Only the required components are included in the bundle, without extra weight.',
      de: 'Nur benötigte Komponenten landen im Bundle, ohne unnötiges Gewicht.',
    },
  },
  {
    title: { ru: 'Графики и таблицы', en: 'Charts and tables', de: 'Diagramme und Tabellen' },
    text: {
      ru: 'Линейные, столбчатые, точечные, прогнозные, круговые и лепестковые графики вместе с spreadsheet-сеткой.',
      en: 'Line, bar, scatter, forecast, pie, and radar charts alongside a spreadsheet grid.',
      de: 'Linien-, Balken-, Streu-, Prognose-, Kreis- und Radardiagramme zusammen mit einer Spreadsheet-Tabelle.',
    },
  },
  {
    title: { ru: 'Адаптивность', en: 'Responsive', de: 'Responsiv' },
    text: {
      ru: 'Компоненты корректно выглядят от мобильных экранов до широких дашбордов.',
      en: 'Components look correct from mobile screens to wide dashboards.',
      de: 'Komponenten funktionieren von mobilen Screens bis zu breiten Dashboards.',
    },
  },
  {
    title: { ru: 'Тёмная и светлая тема', en: 'Dark and light themes', de: 'Helles und dunkles Theme' },
    text: {
      ru: 'Дизайн-система поддерживает переключение тем и дальнейший брендинг продукта.',
      en: 'The design system supports theme switching and future product branding.',
      de: 'Das Designsystem unterstützt Theme-Wechsel und späteres Produkt-Branding.',
    },
  },
  {
    title: { ru: 'Редактируемый playground', en: 'Editable playground', de: 'Editierbarer Playground' },
    text: {
      ru: 'На странице компонента можно менять props, цвета, значения и сразу получать синхронный код.',
      en: 'On the component page you can change props, colors, values, and get synchronized code instantly.',
      de: 'Auf der Komponentenseite können Props, Farben und Werte geändert werden; der Code bleibt synchron.',
    },
  },
];

export default function LandingPage() {
  const { locale } = useLocale();
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      setPointer({
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="landing-shell">
      <section
        className="hero-block"
        style={{
          ['--pointer-x' as string]: String(pointer.x),
          ['--pointer-y' as string]: String(pointer.y),
        }}
      >
        <div className="landing-header-wrap">
          <div className="landing-container">
            <AppHeader />
          </div>
        </div>

        <div className="hero-orb hero-orb--one" />
        <div className="hero-orb hero-orb--two" />
        <div className="hero-orb hero-orb--three" />
        <div className="hero-orb hero-orb--four" />
        <div className="hero-orb hero-orb--five" />
        <div className="hero-orb hero-orb--six" />
        <div className="hero-orb hero-orb--seven" />

        <div className="hero-block__content-wrap">
          <div className="landing-container">
            <div className="hero-block__content">
              <h1>{appMeta.name}</h1>
              <p className="hero-block__lead">
                {t(
                  {
                    ru: 'React-библиотека для дизайнеров и разработчиков. Таблицы, графики и бизнес-компоненты в единой системе.',
                    en: 'A React library for designers and developers. Tables, charts, and business components in one system.',
                    de: 'Eine React-Bibliothek für Design und Entwicklung. Tabellen, Diagramme und Business-Komponenten in einem System.',
                  },
                  locale,
                )}
              </p>

              <div className="hero-block__actions">
                <Link className="primary-button primary-button--brand" to="/library">
                  {t({ ru: 'Перейти к компонентам', en: 'Open components', de: 'Komponenten öffnen' }, locale)}
                </Link>
                <a className="secondary-button" href={externalLinks.figma} target="_blank" rel="noreferrer">
                  {t({ ru: 'Перейти в Figma', en: 'Open Figma', de: 'Figma öffnen' }, locale)}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section features-block">
        <div className="landing-container">
          <div className="section-heading">
            <h2>{t({ ru: 'Возможности', en: 'Capabilities', de: 'Fähigkeiten' }, locale)}</h2>
            <p>
              {t(
                {
                  ru: 'GridiFy закрывает инфраструктуру UI-библиотеки, чтобы команда сосредоточилась на интерфейсах.',
                  en: 'GridiFy covers the component library infrastructure so the team can focus on interfaces.',
                  de: 'GridiFy deckt die Infrastruktur der Komponentenbibliothek ab, damit sich das Team auf Interfaces konzentrieren kann.',
                },
                locale,
              )}
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature) => (
              <article key={feature.title.en} className="feature-card">
                <h3>{feature.title[locale]}</h3>
                <p>{feature.text[locale]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section">
        <div className="landing-container">
          <div className="cta-block">
            <h2>
              {t({ ru: 'МЕНЬШЕ КОДА - ', en: 'LESS CODE - ', de: 'WENIGER CODE - ' }, locale)}
              <span>{t({ ru: 'БОЛЬШЕ ВОЗМОЖНОСТЕЙ', en: 'MORE CAPABILITIES', de: 'MEHR MÖGLICHKEITEN' }, locale)}</span>
              <br />
              {t({ ru: 'СОСРЕДОТОЧЬТЕСЬ НА ВАЖНОМ', en: 'FOCUS ON WHAT MATTERS', de: 'FOKUS AUF DAS WESENTLICHE' }, locale)}
            </h2>
            <div className="landing-install">
              <CopyableBlock
                value="npm install gridify"
                locale={locale}
                variant="inline"
                className="install-command"
                ariaLabel={t({ ru: 'Скопировать команду установки', en: 'Copy install command', de: 'Installationsbefehl kopieren' }, locale)}
              >
                <code>npm install gridify</code>
              </CopyableBlock>
              <p className="install-command__hint">
                {t({ ru: 'Нажмите, чтобы скопировать команду', en: 'Click to copy command', de: 'Zum Kopieren anklicken' }, locale)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-container">
          <p>{appMeta.copyright} {t({ ru: 'Свободная лицензия MIT.', en: 'MIT license.', de: 'MIT-Lizenz.' }, locale)}</p>
          <a href={`mailto:${appMeta.supportEmail}`}>{appMeta.supportEmail}</a>
        </div>
      </footer>
    </div>
  );
}
