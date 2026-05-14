import { Link } from 'react-router-dom';
import { useLocale } from '../../app/providers/localeContext';
import type { ComponentRegistryItem } from '../../entities/component/model/component.types';
import ComponentPreview from '../component-preview/ComponentPreview';
import { t } from '../../shared/lib/i18n';
import TagBadge from '../../shared/ui/TagBadge';
import { getTagTone } from '../../shared/lib/tagTone';
import { getVisibleComponentTags, getComponentGroupLabel } from '../../shared/lib/componentGroup';
import { getComponentStatusLabel, getComponentStatusTone, getStatusOverlayVariant } from '../../shared/lib/componentStatus';
import ComponentStatusOverlay from '../component-status-overlay/ComponentStatusOverlay';

type Props = {
  item: ComponentRegistryItem;
};

export default function PreviewCard({ item }: Props) {
  const { locale } = useLocale();
  const statusLabel = getComponentStatusLabel(item.status, locale);
  const statusTone = getComponentStatusTone(item.status);
  const groupLabel = getComponentGroupLabel(item.previewType, locale);
  const visibleTags = getVisibleComponentTags(item);

  return (
    <article className="catalog-card">
      <div className="catalog-card__preview">
        <ComponentStatusOverlay
          status={item.status}
          readyDate={item.lifecycle?.readyDate}
          locale={locale}
          variant={getStatusOverlayVariant(item.status)}
        >
          <ComponentPreview item={item} height={item.previewType === 'candlestick' ? 180 : 180} locale={locale} />
        </ComponentStatusOverlay>
      </div>

      <div className="catalog-card__body">
        <div className="catalog-card__meta">
          <TagBadge label={statusLabel} tone={statusTone} />
          <TagBadge label={groupLabel} tone="group" />
        </div>
        {visibleTags.length > 0 && (
          <div className="catalog-card__tags">
            {visibleTags.map((tag) => (
              <TagBadge key={tag} label={tag} tone={getTagTone(tag, undefined, item.previewType)} />
            ))}
          </div>
        )}

        <h3>{item.title[locale]}</h3>
        <p>{item.shortDescription[locale]}</p>
      </div>

      <div className="catalog-card__footer">
        <Link className="ghost-button" to={`/library/${item.slug}`}>
          {t({ ru: 'Открыть', en: 'Open', de: 'Öffnen' }, locale)}
        </Link>
      </div>
    </article>
  );
}
