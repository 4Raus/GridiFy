import type { ComponentRegistryItem, PreviewType } from '../../entities/component/model/component.types';
import type { Locale } from '../types/locale';

const groupLabels: Record<string, Record<Locale, string>> = {
  buttons: { ru: 'Кнопки', en: 'Buttons', de: 'Buttons' },
  input: { ru: 'Input', en: 'Input', de: 'Input' },
  select: { ru: 'Select', en: 'Select', de: 'Select' },
  tooltip: { ru: 'Tooltip', en: 'Tooltip', de: 'Tooltip' },
  chart: { ru: 'Chart', en: 'Chart', de: 'Chart' },
  table: { ru: 'Table', en: 'Table', de: 'Table' },
  industry: { ru: 'Industry', en: 'Industry', de: 'Industry' },
  feedback: { ru: 'Feedback', en: 'Feedback', de: 'Feedback' },
  icons: { ru: 'Icons', en: 'Icons', de: 'Icons' },
  layout: { ru: 'Layout', en: 'Layout', de: 'Layout' },
};

const previewTypeToGroup: Record<PreviewType, keyof typeof groupLabels> = {
  buttons: 'buttons',
  'gridify-action-button': 'buttons',
  'input-field': 'input',
  'select-field': 'select',
  tooltip: 'tooltip',
  candlestick: 'chart',
  spreadsheet: 'table',
  'oilgas-form': 'industry',
  'feedback-states': 'feedback',
  'icon-set': 'icons',
  'scroll-panel': 'layout',
  bar: 'chart',
  line: 'chart',
  scatter: 'chart',
  forecast: 'chart',
  pie: 'chart',
  radar: 'chart',
};

const technicalTags = new Set([
  'button',
  'buttons',
  'chart',
  'charts',
  'table',
  'spreadsheet',
  'form',
  'input',
  'select',
  'tooltip',
  'feedback',
  'icons',
  'status',
  'gridify',
  'actions',
  'action',
]);

export function getComponentGroupLabel(previewType: PreviewType, locale: Locale): string {
  const group = previewTypeToGroup[previewType];
  return groupLabels[group]?.[locale] ?? groupLabels.layout[locale];
}

export function getVisibleComponentTags(item: ComponentRegistryItem): string[] {
  const group = previewTypeToGroup[item.previewType];
  const groupLabelValues = Object.values(groupLabels[group] ?? {}).map((label) => label.toLowerCase());
  const seen = new Set<string>();

  return item.tags.filter((tag) => {
    const normalized = tag.trim().toLowerCase();
    if (!normalized || normalized.length > 22 || seen.has(normalized)) return false;
    if (technicalTags.has(normalized) || groupLabelValues.includes(normalized)) return false;
    if (normalized === item.previewType || normalized === item.status) return false;
    if (normalized.startsWith('gridify-') && seen.has('gridify')) return false;

    if (normalized.startsWith('gridify-')) seen.add('gridify');
    seen.add(normalized);
    return true;
  }).slice(0, 2);
}
