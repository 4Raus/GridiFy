import type { CellPoint, CellRange, SpreadsheetData, SpreadsheetMerge } from './spreadsheet.types';
import { getColumnLetter } from './cellAddress';
import type { Locale } from '../../../../shared/types/locale';
import { t } from '../../../../shared/lib/i18n';

export function normalizeRange(a: CellPoint, b: CellPoint): CellRange {
  return {
    startRow: Math.min(a.row, b.row),
    endRow: Math.max(a.row, b.row),
    startCol: Math.min(a.col, b.col),
    endCol: Math.max(a.col, b.col),
  };
}

export function getSelectionLabel(range: CellRange | null) {
  if (!range) return '';

  const start = `${getColumnLetter(range.startCol)}${range.startRow + 1}`;
  const end = `${getColumnLetter(range.endCol)}${range.endRow + 1}`;

  return start === end ? start : `${start}:${end}`;
}

function rangeOrLastRow(data: SpreadsheetData, selection: CellRange | null) {
  if (selection) return { start: selection.startRow, end: selection.endRow };
  const last = Math.max(data.rows.length - 1, 0);
  return { start: last, end: last };
}

function rangeOrLastColumn(data: SpreadsheetData, selection: CellRange | null) {
  if (selection) return { start: selection.startCol, end: selection.endCol };
  const last = Math.max(data.columns.length - 1, 0);
  return { start: last, end: last };
}

export function cleanupMergesAfterRowDelete(
  merges: SpreadsheetMerge[] = [],
  startRow: number,
  endRow: number,
) {
  const deletedCount = endRow - startRow + 1;
  return merges
    .filter((merge) => merge.row + merge.rowSpan - 1 < startRow || merge.row > endRow)
    .map((merge) => (merge.row > endRow ? { ...merge, row: merge.row - deletedCount } : merge));
}

export function cleanupMergesAfterColumnDelete(
  merges: SpreadsheetMerge[] = [],
  startCol: number,
  endCol: number,
) {
  const deletedCount = endCol - startCol + 1;
  return merges
    .filter((merge) => merge.col + merge.colSpan - 1 < startCol || merge.col > endCol)
    .map((merge) => (merge.col > endCol ? { ...merge, col: merge.col - deletedCount } : merge));
}

export function addRow(data: SpreadsheetData): SpreadsheetData {
  return {
    ...data,
    rows: [...data.rows, data.columns.map(() => '')],
  };
}

export function addColumn(data: SpreadsheetData, locale: Locale): SpreadsheetData {
  const nextIndex = data.columns.length;
  return {
    ...data,
    columns: [
      ...data.columns,
      {
        key: `column-${nextIndex + 1}`,
        label: t(
          {
            ru: `Столбец ${nextIndex + 1}`,
            en: `Column ${nextIndex + 1}`,
            de: `Spalte ${nextIndex + 1}`,
          },
          locale,
        ),
        type: 'number',
      },
    ],
    rows: data.rows.map((row) => [...row, '']),
  };
}

export function deleteRows(data: SpreadsheetData, selection: CellRange | null): SpreadsheetData {
  if (data.rows.length <= 1) return data;
  const range = rangeOrLastRow(data, selection);
  const start = Math.max(0, Math.min(range.start, data.rows.length - 1));
  let end = Math.max(0, Math.min(range.end, data.rows.length - 1));

  if (end - start + 1 >= data.rows.length) end = data.rows.length - 2;
  if (end < start) return data;

  return {
    ...data,
    rows: data.rows.filter((_, index) => index < start || index > end),
    merges: cleanupMergesAfterRowDelete(data.merges, start, end),
  };
}

export function deleteColumns(data: SpreadsheetData, selection: CellRange | null): SpreadsheetData {
  if (data.columns.length <= 1) return data;
  const range = rangeOrLastColumn(data, selection);
  const start = Math.max(0, Math.min(range.start, data.columns.length - 1));
  let end = Math.max(0, Math.min(range.end, data.columns.length - 1));

  if (end - start + 1 >= data.columns.length) end = data.columns.length - 2;
  if (end < start) return data;

  return {
    ...data,
    columns: data.columns.filter((_, index) => index < start || index > end),
    rows: data.rows.map((row) => row.filter((_, index) => index < start || index > end)),
    merges: cleanupMergesAfterColumnDelete(data.merges, start, end),
  };
}

export function clampSelection(range: CellRange | null, data: SpreadsheetData): CellRange | null {
  if (!range || data.rows.length === 0 || data.columns.length === 0) return null;
  return {
    startRow: Math.min(range.startRow, data.rows.length - 1),
    endRow: Math.min(range.endRow, data.rows.length - 1),
    startCol: Math.min(range.startCol, data.columns.length - 1),
    endCol: Math.min(range.endCol, data.columns.length - 1),
  };
}
