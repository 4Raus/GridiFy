import type { SpreadsheetColumnType } from './spreadsheet.types';

export function formatValue(value: number, type: SpreadsheetColumnType) {
  if (!Number.isFinite(value)) return '#ERR';
  if (type === 'currency') {
    return `$${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  }
  if (type === 'percent') return `${value.toFixed(2)}%`;
  return Number.isInteger(value) ? `${value}` : value.toFixed(2);
}

export function sanitizeInputByType(value: string, type: SpreadsheetColumnType) {
  if (value.startsWith('=')) return value;
  if (type === 'text') return value;
  return value.replace(/[^0-9+\-.,%$\s]/g, '');
}

export function parseNumericInput(raw: string, type: SpreadsheetColumnType) {
  const normalized = raw
    .replace(/\s+/g, '')
    .replace(',', '.')
    .replace('%', '')
    .replace('$', '');

  if (!normalized) return null;

  const value = Number(normalized);
  if (Number.isNaN(value)) return null;

  return type === 'percent' ? value : value;
}
