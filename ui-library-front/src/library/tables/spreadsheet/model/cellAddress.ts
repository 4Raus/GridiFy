import type { CellPoint } from './spreadsheet.types';

export function getColumnLetter(index: number) {
  let result = '';
  let current = index + 1;

  while (current > 0) {
    const remainder = (current - 1) % 26;
    result = String.fromCharCode(65 + remainder) + result;
    current = Math.floor((current - 1) / 26);
  }

  return result;
}

export function cellRefToPoint(ref: string): CellPoint | null {
  const match = ref.trim().toUpperCase().match(/^([A-Z]+)(\d+)$/);
  if (!match) return null;

  const [, letters, rowText] = match;
  let col = 0;

  for (let i = 0; i < letters.length; i += 1) {
    col = col * 26 + (letters.charCodeAt(i) - 64);
  }

  return { row: Number(rowText) - 1, col: col - 1 };
}

export function rangePoints(rangeExpr: string) {
  const [startRef, endRef] = rangeExpr.split(':');
  const start = cellRefToPoint(startRef);
  const end = cellRefToPoint(endRef ?? startRef);

  if (!start || !end) return null;

  return {
    startRow: Math.min(start.row, end.row),
    endRow: Math.max(start.row, end.row),
    startCol: Math.min(start.col, end.col),
    endCol: Math.max(start.col, end.col),
  };
}
