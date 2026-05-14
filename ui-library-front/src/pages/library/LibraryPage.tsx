import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../../widgets/app-header/AppHeader';
import PreviewCard from '../../widgets/catalog-grid/PreviewCard';
import { useLocale } from '../../app/providers/localeContext';
import {
    componentRegistry,
} from '../../entities/component/model/componentRegistry';
import type { ComponentSection } from '../../entities/component/model/component.types';
import { sectionLabels, sectionOrder } from '../../entities/component/model/componentSections';
import { t } from '../../shared/lib/i18n';
import { appMeta } from '../../shared/config/appMeta';

export default function LibraryPage() {
    const { locale } = useLocale();
    const [search, setSearch] = useState('');

    const filteredItems = useMemo(() => {
        const term = search.trim().toLowerCase();

        return componentRegistry.filter((item) => {
            if (!term) return true;

            return (
                item.title[locale].toLowerCase().includes(term) ||
                item.shortDescription[locale].toLowerCase().includes(term) ||
                item.tags.some((tag) => tag.toLowerCase().includes(term)) ||
                item.slug.toLowerCase().includes(term)
            );
        });
    }, [locale, search]);

    const grouped = useMemo(() => {
        const map = new Map<ComponentSection, typeof filteredItems>();

        sectionOrder.forEach((section) => {
            map.set(
                section,
                filteredItems.filter((item) => item.section === section),
            );
        });

        return map;
    }, [filteredItems]);

    return (
        <div className="library-shell">
            <AppHeader compact />

            <div className="library-layout-v2">
                <aside className="library-nav">
                    <div className="library-nav__logo">
                        <Link to="/">GridiFy</Link>
                        <span>{appMeta.version}</span>
                    </div>

                    <div className="library-nav__group">
                        <p>{t({ ru: 'О библиотеке', en: 'About library', de: 'Über die Bibliothek' }, locale)}</p>
                    </div>

                    {sectionOrder.map((section) => {
                        const count = grouped.get(section)?.length ?? 0;

                        return (
                            <div key={section} className="library-nav__group">
                                <a href={`#${section}`}>{sectionLabels[section][locale]}</a>
                                <span>{count}</span>
                            </div>
                        );
                    })}
                </aside>

                <main className="library-content">
                    <section className="library-content__header">
                        <h1>{t({ ru: 'Компоненты', en: 'Components', de: 'Komponenten' }, locale)}</h1>
                        <p>
                            {t(
                                {
                                    ru: 'Каталог UI-компонентов, таблиц и графиков с live preview, playground и кодом для копирования.',
                                    en: 'A catalog of UI components, tables, and charts with live preview, playground, and copyable code.',
                                    de: 'Ein Katalog von UI-Komponenten, Tabellen und Diagrammen mit Live Preview, Playground und kopierbarem Code.',
                                },
                                locale,
                            )}
                        </p>

                        <input
                            className="search-input search-input--large"
                            type="text"
                            value={search}
                            placeholder={t({ ru: 'Поиск по компонентам', en: 'Search components', de: 'Komponenten suchen' }, locale)}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </section>

                    {sectionOrder.map((section) => {
                        const items = grouped.get(section) ?? [];
                        if (items.length === 0) return null;

                        return (
                            <section key={section} id={section} className="library-section">
                                <h2>{sectionLabels[section][locale]}</h2>
                                <div className="catalog-grid">
                                    {items.map((item) => (
                                        <PreviewCard key={item.slug} item={item} />
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </main>
            </div>
        </div>
    );
}
