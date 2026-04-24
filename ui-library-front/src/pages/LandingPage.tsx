// import { Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import AppHeader from '../components/layout/AppHeader';
// import { useLocale } from '../contexts/LocaleContext';
//
// const features = [
//     {
//         ru: {
//             title: 'TypeScript из коробки',
//             text: 'Строгая типизация, автодополнение в IDE и предсказуемое API для командной разработки.',
//         },
//         en: {
//             title: 'TypeScript out of the box',
//             text: 'Strict typing, IDE autocomplete, and a predictable API for team development.',
//         },
//     },
//     {
//         ru: {
//             title: 'Tree-shaking',
//             text: 'В сборку попадают только нужные компоненты, без лишнего веса и дубликатов.',
//         },
//         en: {
//             title: 'Tree-shaking',
//             text: 'Only the required components are included in the bundle, without extra weight.',
//         },
//     },
//     {
//         ru: {
//             title: '4+ типов графиков',
//             text: 'Линейные, столбчатые, точечные, прогнозирование, круговые и лепестковые диаграммы.',
//         },
//         en: {
//             title: '4+ chart types',
//             text: 'Line, bar, scatter, forecast, pie, and radar diagrams in one system.',
//         },
//     },
//     {
//         ru: {
//             title: 'Адаптивность',
//             text: 'Компоненты корректно выглядят от мобильных экранов до широких дашбордов и 4K.',
//         },
//         en: {
//             title: 'Responsive',
//             text: 'Components look correct from mobile screens to wide dashboards and 4K.',
//         },
//     },
//     {
//         ru: {
//             title: 'Тёмная и светлая тема',
//             text: 'Дизайн-система поддерживает переключение тем и дальнейший брендинг продукта.',
//         },
//         en: {
//             title: 'Dark and light themes',
//             text: 'The design system supports theme switching and future product branding.',
//         },
//     },
//     {
//         ru: {
//             title: 'Производительность',
//             text: 'Компоненты ориентированы на бизнес-интерфейсы с большими таблицами и живыми графиками.',
//         },
//         en: {
//             title: 'Performance',
//             text: 'Components are aimed at business interfaces with large tables and live charts.',
//         },
//     },
//     {
//         ru: {
//             title: 'Единая дизайн-система',
//             text: 'Одинаковый визуальный язык для документации, Figma-компонентов и React-реализации.',
//         },
//         en: {
//             title: 'Unified design system',
//             text: 'One visual language for documentation, Figma components, and React implementation.',
//         },
//     },
//     {
//         ru: {
//             title: 'Продвинутая таблица',
//             text: 'Сортировка, фильтрация, редактирование ячеек и экспорт — как следующий этап библиотеки.',
//         },
//         en: {
//             title: 'Advanced table',
//             text: 'Sorting, filtering, editable cells, and export as the next stage of the library.',
//         },
//     },
//     {
//         ru: {
//             title: 'Редактирование в playground',
//             text: 'На странице компонента можно менять цвета, значения, диапазоны и сразу видеть результат.',
//         },
//         en: {
//             title: 'Editable playground',
//             text: 'On the component page you can change colors, values, and ranges and see the result instantly.',
//         },
//     },
// ];
//
// export default function LandingPage() {
//     const { locale } = useLocale();
//     const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });
//
//     useEffect(() => {
//         const handleMove = (event: MouseEvent) => {
//             setPointer({
//                 x: event.clientX / window.innerWidth,
//                 y: event.clientY / window.innerHeight,
//             });
//         };
//
//         window.addEventListener('mousemove', handleMove);
//         return () => window.removeEventListener('mousemove', handleMove);
//     }, []);
//
//     return (
//         <div className="landing-shell">
//             <AppHeader />
//
//             <section
//                 className="hero-block"
//                 style={{
//                     ['--pointer-x' as string]: String(pointer.x),
//                     ['--pointer-y' as string]: String(pointer.y),
//                 }}
//             >
//                 <div className="hero-orb hero-orb--one" />
//                 <div className="hero-orb hero-orb--two" />
//                 <div className="hero-orb hero-orb--three" />
//                 <div className="hero-orb hero-orb--four" />
//                 <div className="hero-orb hero-orb--five" />
//
//                 <div className="hero-block__content">
//                     <h1>GridiFy</h1>
//                     <p className="hero-block__lead">
//                         {locale === 'ru'
//                             ? 'React-библиотека для дизайнеров и разработчиков. Таблицы и графики в единой системе.'
//                             : 'A React library for designers and developers. Tables and charts in one system.'}
//                     </p>
//
//                     <div className="hero-block__actions">
//                         <Link className="primary-button primary-button--brand" to="/library">
//                             {locale === 'ru' ? 'Перейти к компонентам' : 'Open components'}
//                         </Link>
//                         <a className="secondary-button" href="https://www.figma.com/" target="_blank" rel="noreferrer">
//                             {locale === 'ru' ? 'Перейти в Figma' : 'Open Figma'}
//                         </a>
//                     </div>
//                 </div>
//             </section>
//
//             <section className="features-block">
//                 <div className="section-heading">
//                     <h2>{locale === 'ru' ? 'Возможности' : 'Capabilities'}</h2>
//                     <p>
//                         {locale === 'ru'
//                             ? 'GridiFy закрывает инфраструктуру библиотеки компонентов, чтобы команда сосредоточилась на интерфейсах.'
//                             : 'GridiFy covers the component library infrastructure so the team can focus on interfaces.'}
//                     </p>
//                 </div>
//
//                 <div className="features-grid">
//                     {features.map((feature) => (
//                         <article key={feature.en.title} className="feature-card">
//                             <h3>{feature[locale].title}</h3>
//                             <p>{feature[locale].text}</p>
//                         </article>
//                     ))}
//                 </div>
//             </section>
//
//             <section className="cta-block">
//                 <h2>
//                     {locale === 'ru' ? 'МЕНЬШЕ КОДА - ' : 'LESS CODE - '}
//                     <span>{locale === 'ru' ? 'БОЛЬШЕ ВОЗМОЖНОСТЕЙ' : 'MORE CAPABILITIES'}</span>
//                     <br />
//                     {locale === 'ru' ? 'СОСРЕДОТОЧЬТЕСЬ НА ВАЖНОМ' : 'FOCUS ON WHAT MATTERS'}
//                 </h2>
//                 <div className="install-command">npm install gridify</div>
//             </section>
//
//             <footer className="landing-footer">
//                 <p>© 2026 Gridify. {locale === 'ru' ? 'Свободная лицензия MIT.' : 'MIT license.'}</p>
//                 <a href="mailto:support@gridi.dev">support@gridi.dev</a>
//             </footer>
//         </div>
//     );
// }
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppHeader from '../components/layout/AppHeader';
import { useLocale } from '../contexts/LocaleContext';

const features = [
    {
        ru: {
            title: 'TypeScript из коробки',
            text: 'Строгая типизация, автодополнение в IDE и предсказуемое API для командной разработки.',
        },
        en: {
            title: 'TypeScript out of the box',
            text: 'Strict typing, IDE autocomplete, and a predictable API for team development.',
        },
    },
    {
        ru: {
            title: 'Tree-shaking',
            text: 'В сборку попадают только нужные компоненты, без лишнего веса и дубликатов.',
        },
        en: {
            title: 'Tree-shaking',
            text: 'Only the required components are included in the bundle, without extra weight.',
        },
    },
    {
        ru: {
            title: '4+ типов графиков',
            text: 'Линейные, столбчатые, точечные, прогнозирование, круговые и лепестковые диаграммы.',
        },
        en: {
            title: '4+ chart types',
            text: 'Line, bar, scatter, forecast, pie, and radar diagrams in one system.',
        },
    },
    {
        ru: {
            title: 'Адаптивность',
            text: 'Компоненты корректно выглядят от мобильных экранов до широких дашбордов и 4K.',
        },
        en: {
            title: 'Responsive',
            text: 'Components look correct from mobile screens to wide dashboards and 4K.',
        },
    },
    {
        ru: {
            title: 'Тёмная и светлая тема',
            text: 'Дизайн-система поддерживает переключение тем и дальнейший брендинг продукта.',
        },
        en: {
            title: 'Dark and light themes',
            text: 'The design system supports theme switching and future product branding.',
        },
    },
    {
        ru: {
            title: 'Производительность',
            text: 'Компоненты ориентированы на бизнес-интерфейсы с большими таблицами и живыми графиками.',
        },
        en: {
            title: 'Performance',
            text: 'Components are aimed at business interfaces with large tables and live charts.',
        },
    },
    {
        ru: {
            title: 'Единая дизайн-система',
            text: 'Одинаковый визуальный язык для документации, Figma-компонентов и React-реализации.',
        },
        en: {
            title: 'Unified design system',
            text: 'One visual language for documentation, Figma components, and React implementation.',
        },
    },
    {
        ru: {
            title: 'Продвинутая таблица',
            text: 'Сортировка, фильтрация, редактирование ячеек и экспорт — как следующий этап библиотеки.',
        },
        en: {
            title: 'Advanced table',
            text: 'Sorting, filtering, editable cells, and export as the next stage of the library.',
        },
    },
    {
        ru: {
            title: 'Редактирование в playground',
            text: 'На странице компонента можно менять цвета, значения, диапазоны и сразу видеть результат.',
        },
        en: {
            title: 'Editable playground',
            text: 'On the component page you can change colors, values, and ranges and see the result instantly.',
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
                            <h1>GridiFy</h1>
                            <p className="hero-block__lead">
                                {locale === 'ru'
                                    ? 'React-библиотека для дизайнеров и разработчиков. Таблицы и графики в единой системе.'
                                    : 'A React library for designers and developers. Tables and charts in one system.'}
                            </p>

                            <div className="hero-block__actions">
                                <Link className="primary-button primary-button--brand" to="/library">
                                    {locale === 'ru' ? 'Перейти к компонентам' : 'Open components'}
                                </Link>
                                <a className="secondary-button" href="https://www.figma.com/" target="_blank" rel="noreferrer">
                                    {locale === 'ru' ? 'Перейти в Figma' : 'Open Figma'}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="landing-section features-block">
                <div className="landing-container">
                    <div className="section-heading">
                        <h2>{locale === 'ru' ? 'Возможности' : 'Capabilities'}</h2>
                        <p>
                            {locale === 'ru'
                                ? 'GridiFy закрывает инфраструктуру библиотеки компонентов, чтобы команда сосредоточилась на интерфейсах.'
                                : 'GridiFy covers the component library infrastructure so the team can focus on interfaces.'}
                        </p>
                    </div>

                    <div className="features-grid">
                        {features.map((feature) => (
                            <article key={feature.en.title} className="feature-card">
                                <h3>{feature[locale].title}</h3>
                                <p>{feature[locale].text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="landing-section">
                <div className="landing-container">
                    <div className="cta-block">
                        <h2>
                            {locale === 'ru' ? 'МЕНЬШЕ КОДА - ' : 'LESS CODE - '}
                            <span>{locale === 'ru' ? 'БОЛЬШЕ ВОЗМОЖНОСТЕЙ' : 'MORE CAPABILITIES'}</span>
                            <br />
                            {locale === 'ru' ? 'СОСРЕДОТОЧЬТЕСЬ НА ВАЖНОМ' : 'FOCUS ON WHAT MATTERS'}
                        </h2>
                        <div className="install-command">npm install gridify</div>
                    </div>
                </div>
            </section>

            <footer className="landing-footer">
                <div className="landing-container">
                    <p>© 2026 Gridify. {locale === 'ru' ? 'Свободная лицензия MIT.' : 'MIT license.'}</p>
                    <a href="mailto:support@gridi.dev">support@gridi.dev</a>
                </div>
            </footer>
        </div>
    );
}
