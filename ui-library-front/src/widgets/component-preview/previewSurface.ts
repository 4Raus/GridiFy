import type { ComponentRegistryItem } from '../../entities/component/model/component.types';
import { cn } from '../../shared/lib/cn';

export function getPreviewSurfaceClass(previewType: ComponentRegistryItem['previewType']) {
  return cn(
    'component-preview-surface',
    previewType === 'spreadsheet' && 'component-preview-surface--table',
    ['bar', 'line', 'scatter', 'forecast', 'pie', 'radar', 'candlestick'].includes(previewType) && 'component-preview-surface--chart',
    ['buttons', 'gridify-action-button', 'feedback-states', 'tooltip', 'input-field', 'select-field', 'icon-set', 'oilgas-form', 'scroll-panel'].includes(previewType) && 'component-preview-surface--centered',
  );
}
