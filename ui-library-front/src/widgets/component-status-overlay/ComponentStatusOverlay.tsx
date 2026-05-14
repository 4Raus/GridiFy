import type { ReactNode } from 'react';
import type { ComponentStatus } from '../../shared/types/status';
import type { Locale } from '../../shared/types/locale';
import { cn } from '../../shared/lib/cn';
import { getComponentStatusLabel, getStatusOverlayVariant, shouldShowStatusOverlay } from '../../shared/lib/componentStatus';
import { t } from '../../shared/lib/i18n';
import './ComponentStatusOverlay.css';

type ComponentStatusOverlayProps = {
  status: ComponentStatus;
  readyDate?: string;
  children: ReactNode;
  locale: Locale;
  variant?: 'ribbon' | 'tape';
};

export default function ComponentStatusOverlay({
  status,
  readyDate,
  children,
  locale,
  variant,
}: ComponentStatusOverlayProps) {
  if (!shouldShowStatusOverlay(status)) return <>{children}</>;

  const statusLabel = getComponentStatusLabel(status, locale);
  const overlayVariant = variant ?? getStatusOverlayVariant(status);
  const readyLabel = readyDate
    ? t({ ru: `Готовность: ${readyDate}`, en: `Ready: ${readyDate}`, de: `Bereit: ${readyDate}` }, locale)
    : '';
  const accessibleLabel = readyLabel
    ? `${t({ ru: 'Статус компонента', en: 'Component status', de: 'Komponentenstatus' }, locale)}: ${statusLabel}. ${readyLabel}`
    : `${t({ ru: 'Статус компонента', en: 'Component status', de: 'Komponentenstatus' }, locale)}: ${statusLabel}`;

  return (
    <div
      className={cn(
        'component-status-overlay',
        `component-status-overlay--${overlayVariant}`,
        `component-status-overlay--${status}`,
      )}
      role="group"
      aria-label={accessibleLabel}
    >
      {children}
      <span className="component-status-overlay__veil" aria-hidden="true" />
      {overlayVariant === 'tape' ? (
        <>
          <span className="component-status-overlay__tape component-status-overlay__tape--top" aria-hidden="true">
            <span>{statusLabel}</span>
          </span>
          <span className="component-status-overlay__tape component-status-overlay__tape--bottom" aria-hidden="true">
            <span>{readyLabel || statusLabel}</span>
          </span>
        </>
      ) : (
        <span className="component-status-overlay__ribbon" aria-hidden="true">
          {readyLabel ? `${statusLabel} · ${readyLabel}` : statusLabel}
        </span>
      )}
      <span className="sr-only">{accessibleLabel}</span>
    </div>
  );
}
