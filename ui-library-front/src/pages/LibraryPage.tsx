import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../components/layout/AppHeader';
import PreviewCard from '../components/library/PreviewCard';
import { useLocale } from '../contexts/LocaleContext';
import {
    componentRegistry,
    sectionLabels,
    sectionOrder,
    type ComponentSection,
} from '../data/componentRegistry';

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
                        <span>v1.1.1</span>
                    </div>

                    <div className="library-nav__group">
                        <p>{locale === 'ru' ? 'О библиотеке' : 'About library'}</p>
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
                        <h1>{locale === 'ru' ? 'Компоненты' : 'Components'}</h1>
                        <p>
                            {locale === 'ru'
                                ? 'Каталог UI-компонентов и графиков. Сейчас реализованы ключевые графики, остальные блоки можно наращивать дальше по той же архитектуре.'
                                : 'A catalog of UI components and charts. Key charts are implemented now, and the rest can be expanded on the same architecture.'}
                        </p>

                        <input
                            className="search-input search-input--large"
                            type="text"
                            value={search}
                            placeholder={locale === 'ru' ? 'Поиск по компонентам' : 'Search components'}
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
