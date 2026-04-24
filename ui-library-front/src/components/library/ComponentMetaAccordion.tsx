import { useLocale } from '../../contexts/LocaleContext';
import type { LibraryComponentItem } from '../../data/componentRegistry';

type Props = {
    item: LibraryComponentItem;
};

export default function ComponentMetaAccordion({ item }: Props) {
    const { locale } = useLocale();

    return (
        <div className="meta-accordion">
            <details>
                <summary>{locale === 'ru' ? 'Описание' : 'Description'}</summary>
                <p>{item.description[locale]}</p>
            </details>

            <details>
                <summary>{locale === 'ru' ? 'Данные' : 'Data'}</summary>
                <pre>{item.dataExample}</pre>
            </details>

            {item.formula && (
                <details>
                    <summary>{locale === 'ru' ? 'Формула / логика' : 'Formula / logic'}</summary>
                    <p>{item.formula[locale]}</p>
                </details>
            )}

            <details>
                <summary>{locale === 'ru' ? 'React-код' : 'React code'}</summary>
                <pre>{item.code.react}</pre>
            </details>
        </div>
    );
}
