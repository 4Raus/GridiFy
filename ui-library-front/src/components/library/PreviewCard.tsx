import { Link } from 'react-router-dom';
import { useLocale } from '../../contexts/LocaleContext';
import type { LibraryComponentItem } from '../../data/componentRegistry';
import ChartPreview from './ChartPreview';

type Props = {
    item: LibraryComponentItem;
};

export default function PreviewCard({ item }: Props) {
    const { locale } = useLocale();

    return (
        <article className="catalog-card">
            <div className="catalog-card__preview">
                <ChartPreview item={item} height={180} />
            </div>

            <div className="catalog-card__body">
                <div className="catalog-card__meta">
                    <span className="catalog-card__tag">{item.previewType}</span>
                    <span className={item.status === 'draft' ? 'catalog-card__status draft' : 'catalog-card__status'}>
                        {item.status === 'draft'
                            ? locale === 'ru'
                                ? 'Черновик'
                                : 'Draft'
                            : locale === 'ru'
                              ? 'Готово'
                              : 'Ready'}
                    </span>
                </div>

                <h3>{item.title[locale]}</h3>
                <p>{item.shortDescription[locale]}</p>
            </div>

            <div className="catalog-card__footer">
                <Link className="ghost-button" to={`/library/${item.slug}`}>
                    {locale === 'ru' ? 'Открыть' : 'Open'}
                </Link>
            </div>
        </article>
    );
}
