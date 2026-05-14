import { useLocale } from '../../app/providers/localeContext';
import type { ComponentRegistryItem, LocalizedText } from '../../entities/component/model/component.types';
import { t } from '../../shared/lib/i18n';
import CopyableBlock from '../../shared/ui/CopyableBlock';
import TagBadge from '../../shared/ui/TagBadge';
import { getTagTone } from '../../shared/lib/tagTone';
import { getComponentGroupLabel, getVisibleComponentTags } from '../../shared/lib/componentGroup';
import { getComponentStatusLabel, getComponentStatusTone } from '../../shared/lib/componentStatus';

type Props = {
  item: ComponentRegistryItem;
};

function TextList({ title, items }: { title: string; items?: LocalizedText[] }) {
  const { locale } = useLocale();

  if (!items || items.length === 0) return null;

  return (
    <section className="component-doc-section">
      <h4>{title}</h4>
      <ul>
        {items.map((entry) => (
          <li key={entry.en}>{entry[locale]}</li>
        ))}
      </ul>
    </section>
  );
}

export default function ComponentDocs({ item }: Props) {
  const { locale } = useLocale();
  const statusLabel = getComponentStatusLabel(item.status, locale);
  const statusTone = getComponentStatusTone(item.status);
  const groupLabel = getComponentGroupLabel(item.previewType, locale);
  const visibleTags = getVisibleComponentTags(item).slice(0, 4);
  const showLifecycle = item.status !== 'ready' || Boolean(item.lifecycle);

  return (
    <section className="component-doc-box">
      <h3>{t({ ru: 'Документация', en: 'Documentation', de: 'Dokumentation' }, locale)}</h3>
      <p>{item.docs.overview[locale]}</p>

      <div className="component-doc-meta">
        <p><strong>npm:</strong> {item.packageName ?? 'gridify'}</p>
        <p><strong>Figma:</strong> {item.figmaName ?? '-'}</p>
        <p><strong>Status:</strong> <TagBadge label={statusLabel} tone={statusTone} /></p>
        <p><strong>Group:</strong> <TagBadge label={groupLabel} tone="group" /></p>
        {visibleTags.length > 0 && (
          <p className="component-doc-tags">
            <strong>Tags:</strong>
            {visibleTags.map((tag) => <TagBadge key={tag} label={tag} tone={getTagTone(tag, undefined, item.previewType)} />)}
          </p>
        )}
      </div>

      {showLifecycle && (
        <section className="component-doc-section component-doc-lifecycle">
          <h4>{t({ ru: 'Lifecycle / статус', en: 'Lifecycle / status', de: 'Lifecycle / Status' }, locale)}</h4>
          <div className="component-doc-lifecycle__body">
            <TagBadge label={statusLabel} tone={statusTone} size="md" />
            <p>
              {t(
                {
                  ru: 'Статус компонента показывает его готовность к использованию в production. Компоненты в разработке можно изучать как демо, но их API может измениться.',
                  en: 'The component status describes its production readiness. Components in development can be reviewed as demos, but their API may change.',
                  de: 'Der Komponentenstatus beschreibt die Produktionsreife. Komponenten in Entwicklung können als Demo geprüft werden, ihre API kann sich jedoch ändern.',
                },
                locale,
              )}
            </p>
            {item.lifecycle?.stageNote && <p>{item.lifecycle.stageNote[locale]}</p>}
            {item.lifecycle?.readyDate && (
              <p>
                <strong>{t({ ru: 'Готовность:', en: 'Ready:', de: 'Bereit:' }, locale)}</strong> {item.lifecycle.readyDate}
              </p>
            )}
          </div>
        </section>
      )}

      <TextList title={t({ ru: 'Когда использовать', en: 'When to use', de: 'Wann verwenden' }, locale)} items={item.docs.whenToUse} />
      <TextList title={t({ ru: 'Возможности', en: 'Features', de: 'Funktionen' }, locale)} items={item.docs.features} />
      <TextList title={t({ ru: 'Ограничения', en: 'Limitations', de: 'Einschränkungen' }, locale)} items={item.docs.limitations} />

      <section className="component-doc-section">
        <h4>Import</h4>
        <CopyableBlock value={item.usage.importCode} locale={locale} ariaLabel="Copy import code">
          <pre>{item.usage.importCode}</pre>
        </CopyableBlock>
      </section>

      <section className="component-doc-section">
        <h4>Example</h4>
        <CopyableBlock value={item.usage.exampleCode} locale={locale} ariaLabel="Copy usage example">
          <pre>{item.usage.exampleCode}</pre>
        </CopyableBlock>
      </section>

      {item.docs.props && item.docs.props.length > 0 && (
        <section className="component-doc-section">
          <h4>Props</h4>
          <div className="props-table-wrap">
            <table className="props-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>{t({ ru: 'Обяз.', en: 'Required', de: 'Pflicht' }, locale)}</th>
                  <th>Default</th>
                  <th>{t({ ru: 'Описание', en: 'Description', de: 'Beschreibung' }, locale)}</th>
                </tr>
              </thead>
              <tbody>
                {item.docs.props.map((prop) => (
                  <tr key={prop.name}>
                    <td>{prop.name}</td>
                    <td><code>{prop.type}</code></td>
                    <td>{prop.required ? t({ ru: 'да', en: 'yes', de: 'ja' }, locale) : t({ ru: 'нет', en: 'no', de: 'nein' }, locale)}</td>
                    <td>{prop.defaultValue ?? '-'}</td>
                    <td>{prop.description[locale]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {item.docs.events && item.docs.events.length > 0 && (
        <section className="component-doc-section">
          <h4>Events</h4>
          <div className="props-table-wrap">
            <table className="props-table">
              <thead>
                <tr>
                  <th>{t({ ru: 'Событие', en: 'Event', de: 'Event' }, locale)}</th>
                  <th>Payload</th>
                  <th>{t({ ru: 'Описание', en: 'Description', de: 'Beschreibung' }, locale)}</th>
                </tr>
              </thead>
              <tbody>
                {item.docs.events.map((event) => (
                  <tr key={event.name}>
                    <td>{event.name}</td>
                    <td><code>{event.payload}</code></td>
                    <td>{event.description[locale]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {item.docs.errors && item.docs.errors.length > 0 && (
        <section className="component-doc-section">
          <h4>{t({ ru: 'Ошибки и состояния валидации', en: 'Errors and validation states', de: 'Fehler und Validierungszustände' }, locale)}</h4>
          <div className="props-table-wrap">
            <table className="props-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>{t({ ru: 'Причина', en: 'Reason', de: 'Grund' }, locale)}</th>
                  <th>{t({ ru: 'Исправление', en: 'Fix', de: 'Korrektur' }, locale)}</th>
                </tr>
              </thead>
              <tbody>
                {item.docs.errors.map((error) => (
                  <tr key={error.code}>
                    <td><code>{error.code}</code></td>
                    <td>{error.reason[locale]}</td>
                    <td>{error.fix[locale]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="component-doc-section">
        <h4>{t({ ru: 'Пример данных', en: 'Data example', de: 'Datenbeispiel' }, locale)}</h4>
        <CopyableBlock value={item.docs.dataExample} locale={locale} ariaLabel="Copy data example">
          <pre>{item.docs.dataExample}</pre>
        </CopyableBlock>
      </section>

      {item.docs.logic && (
        <section className="component-doc-section">
          <h4>{t({ ru: 'Логика и формулы', en: 'Logic and formulas', de: 'Logik und Formeln' }, locale)}</h4>
          <p>{item.docs.logic[locale]}</p>
        </section>
      )}
    </section>
  );
}
