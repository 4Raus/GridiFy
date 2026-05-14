import { useCallback, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppHeader from '../../widgets/app-header/AppHeader';
import ComponentPreview from '../../widgets/component-preview/ComponentPreview';
import { getPreviewSurfaceClass } from '../../widgets/component-preview/previewSurface';
import ComponentDocs from '../../widgets/component-docs/ComponentDocs';
import ComponentPlayground from '../../widgets/component-playground/ComponentPlayground';
import CodePreview from '../../widgets/code-preview/CodePreview';
import ValidationAlert from '../../library/feedback/ValidationAlert';
import { useLocale } from '../../app/providers/localeContext';
import { getComponentBySlug } from '../../entities/component/model/getComponentBySlug';
import type { ComponentRegistryItem } from '../../entities/component/model/component.types';
import type {
  SpreadsheetData,
  SpreadsheetValidationMessage,
} from '../../library/tables/spreadsheet/model/spreadsheet.types';
import {
  buildComponentPreviewItem,
  buildPlaygroundValidation,
  createInitialPlaygroundState,
  getPreviewHeight,
} from '../../features/component-playground/model/playgroundState';
import type { PlaygroundState, PlaygroundValidation } from '../../features/component-playground/model/playground.types';
import { clone } from '../../shared/lib/clone';
import { t } from '../../shared/lib/i18n';
import { generateComponentCode } from '../../features/code-generator/model/generateComponentCode';
import type { Locale } from '../../shared/types/locale';
import TagBadge from '../../shared/ui/TagBadge';
import { getTagTone } from '../../shared/lib/tagTone';
import { getComponentGroupLabel, getVisibleComponentTags } from '../../shared/lib/componentGroup';
import { getComponentStatusLabel, getComponentStatusTone, getStatusOverlayVariant } from '../../shared/lib/componentStatus';
import ComponentStatusOverlay from '../../widgets/component-status-overlay/ComponentStatusOverlay';

export default function ComponentDetailsPage() {
  const { slug = '' } = useParams();
  const { locale } = useLocale();
  const baseItem = useMemo(() => getComponentBySlug(slug), [slug]);

  if (!baseItem) {
    return (
      <div className="page-shell">
        <p>{t({ ru: 'Компонент не найден.', en: 'Component not found.', de: 'Komponente nicht gefunden.' }, locale)}</p>
        <Link to="/library">{t({ ru: 'Назад', en: 'Back', de: 'Zurück' }, locale)}</Link>
      </div>
    );
  }

  return <ComponentDetailsContent key={`${baseItem.slug}-${locale}`} baseItem={baseItem} locale={locale} />;
}

type ComponentDetailsContentProps = {
  baseItem: ComponentRegistryItem;
  locale: Locale;
};

function ComponentDetailsContent({ baseItem, locale }: ComponentDetailsContentProps) {
  const [playgroundState, setPlaygroundState] = useState<PlaygroundState>(() => createInitialPlaygroundState(baseItem, locale));
  const [tableData, setTableData] = useState<SpreadsheetData | null>(() => (
    baseItem.previewData?.spreadsheet ? clone(baseItem.previewData.spreadsheet) : null
  ));
  const [tableValidation, setTableValidation] = useState<SpreadsheetValidationMessage[]>([]);
  const previewItem = useMemo(
    () => buildComponentPreviewItem(baseItem, playgroundState, tableData),
    [baseItem, playgroundState, tableData],
  );
  const spreadsheetValidation: PlaygroundValidation = useMemo(() => ({
    errors: tableValidation.filter((message) => message.level === 'error').map((message) => message.message),
    warnings: tableValidation.filter((message) => message.level === 'warning').map((message) => message.message),
  }), [tableValidation]);
  const validation = useMemo(
    () => buildPlaygroundValidation(baseItem, playgroundState, spreadsheetValidation, locale),
    [baseItem, locale, playgroundState, spreadsheetValidation],
  );
  const generated = useMemo(
    () => generateComponentCode(previewItem, playgroundState, locale),
    [locale, playgroundState, previewItem],
  );
  const previewHeight = useMemo(
    () => getPreviewHeight(baseItem, playgroundState),
    [baseItem, playgroundState],
  );
  const statusLabel = getComponentStatusLabel(baseItem.status, locale);
  const statusTone = getComponentStatusTone(baseItem.status);
  const groupLabel = getComponentGroupLabel(baseItem.previewType, locale);
  const visibleTags = getVisibleComponentTags(baseItem).slice(0, 4);
  const editable = playgroundState.editable === true;
  const tableViewMode = playgroundState.tableViewMode === 'app' ? 'app' : 'spreadsheet';
  const handleTableChange = useCallback((next: SpreadsheetData) => {
    setTableData(next);
  }, []);
  const handleTableValidationChange = useCallback((messages: SpreadsheetValidationMessage[]) => {
    setTableValidation(messages);
  }, []);

  return (
    <div className="component-shell">
      <AppHeader compact />
      <div className="component-page-top">
        <div>
          <div className="component-page-top__breadcrumbs">
            <Link to="/library">{t({ ru: 'Компоненты', en: 'Components', de: 'Komponenten' }, locale)}</Link>
            <span>/</span>
            <span>{baseItem.title[locale]}</span>
          </div>
          <h1>{baseItem.title[locale]}</h1>
          <p>{baseItem.description[locale]}</p>
          {baseItem.lifecycle?.stageNote && (
            <p className="component-page-top__stage-note">{baseItem.lifecycle.stageNote[locale]}</p>
          )}
          <div className="component-page-top__tags">
            <TagBadge label={statusLabel} tone={statusTone} size="md" />
            <TagBadge label={groupLabel} tone="group" size="md" />
            {visibleTags.map((tag) => (
              <TagBadge key={tag} label={tag} tone={getTagTone(tag, undefined, baseItem.previewType)} size="md" />
            ))}
          </div>
        </div>
        <Link className="secondary-button" to="/library">
          {t({ ru: 'Назад к каталогу', en: 'Back to catalog', de: 'Zurück zum Katalog' }, locale)}
        </Link>
      </div>

      <div className="component-layout-v2">
        <main className="component-main">
          <section className="component-canvas">
            <ValidationAlert
              title={t({ ru: 'Ошибки валидации', en: 'Validation errors', de: 'Validierungsfehler' }, locale)}
              messages={validation.errors}
              variant="error"
            />
            <ValidationAlert
              title={t({ ru: 'Предупреждения', en: 'Warnings', de: 'Warnungen' }, locale)}
              messages={validation.warnings}
              variant="warning"
            />
            <div className={getPreviewSurfaceClass(previewItem.previewType)}>
              <ComponentStatusOverlay
                status={baseItem.status}
                readyDate={baseItem.lifecycle?.readyDate}
                locale={locale}
                variant={getStatusOverlayVariant(baseItem.status)}
              >
                <ComponentPreview
                  item={previewItem}
                  height={previewHeight}
                  editable={editable}
                  locale={locale}
                  tableViewMode={tableViewMode}
                  playgroundState={playgroundState}
                  onTableChange={handleTableChange}
                  onValidationChange={handleTableValidationChange}
                />
              </ComponentStatusOverlay>
            </div>
          </section>

          <CodePreview generated={generated} locale={locale} />
        </main>

        <aside className="component-controls">
          <ComponentPlayground
            item={baseItem}
            locale={locale}
            state={playgroundState}
            setState={setPlaygroundState}
          />
        </aside>
      </div>

      <ComponentDocs item={baseItem} />
    </div>
  );
}
