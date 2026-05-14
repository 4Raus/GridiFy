import type { ComponentRegistryItem } from '../../../entities/component/model/component.types';
import type { PlaygroundState } from '../../component-playground/model/playground.types';
import type { GeneratedComponentCode } from './codeGenerator.types';
import { generateButtonCode } from './generators/generateButtonCode';
import { generateChartCode } from './generators/generateChartCode';
import { generateCandlestickCode } from './generators/generateCandlestickCode';
import { generateFeedbackStatesCode } from './generators/generateFeedbackStatesCode';
import { generateGridifyActionButtonCode } from './generators/generateGridifyActionButtonCode';
import { generateIconSetCode } from './generators/generateIconSetCode';
import { generateInputCode } from './generators/generateInputCode';
import { generateOilGasFormCode } from './generators/generateOilGasFormCode';
import { generateScrollPanelCode } from './generators/generateScrollPanelCode';
import { generateSelectCode } from './generators/generateSelectCode';
import { generateSpreadsheetCode } from './generators/generateSpreadsheetCode';
import { generateTooltipCode } from './generators/generateTooltipCode';
import type { Locale } from '../../../shared/types/locale';

export function createGeneratedCode(reactCode: string, propsJson: string): GeneratedComponentCode {
  return {
    tabs: [
      { id: 'react-tsx', label: 'React TSX', code: reactCode.trim() },
      { id: 'props-json', label: 'Props JSON', code: propsJson.trim() },
    ],
  };
}

export function stringifyProps(value: unknown) {
  return JSON.stringify(
    value,
    (_key, item) => {
      if (typeof item === 'number' && Number.isNaN(item)) return null;
      return item as unknown;
    },
    2,
  );
}

export function formatTsValue(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(formatTsValue).join(', ')}]`;
  if (typeof value === 'string') return JSON.stringify(value);
  if (typeof value === 'number' && Number.isNaN(value)) return 'Number.NaN';
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (value === null) return 'null';
  if (typeof value === 'object' && value) {
    return `{ ${Object.entries(value).map(([key, item]) => `${key}: ${formatTsValue(item)}`).join(', ')} }`;
  }
  return 'undefined';
}

export function generateComponentCode(
  item: ComponentRegistryItem,
  state: PlaygroundState,
  locale: Locale,
): GeneratedComponentCode {
  switch (item.previewType) {
    case 'buttons':
      return generateButtonCode(state, locale);
    case 'gridify-action-button':
      return generateGridifyActionButtonCode(state);
    case 'feedback-states':
      return generateFeedbackStatesCode(item, state);
    case 'tooltip':
      return generateTooltipCode(item, state);
    case 'input-field':
      return generateInputCode(item, state);
    case 'select-field':
      return generateSelectCode(item);
    case 'icon-set':
      return generateIconSetCode(item, state);
    case 'candlestick':
      return generateCandlestickCode(item, state);
    case 'spreadsheet':
      return generateSpreadsheetCode(item, state);
    case 'oilgas-form':
      return generateOilGasFormCode(state);
    case 'scroll-panel':
      return generateScrollPanelCode(state);
    case 'bar':
    case 'line':
    case 'scatter':
    case 'forecast':
    case 'pie':
    case 'radar':
      return generateChartCode(item, state);
    default:
      return createGeneratedCode('// Component code is not available yet.', '{}');
  }
}
