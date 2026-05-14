import type { ChartPoint } from './chartPlaygroundTypes';

const numberPattern = /^[-+]?\d+(?:[.,]\d+)?$/;

function splitCsv(input: string) {
  return input
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function parseTextList(input: string) {
  return splitCsv(input);
}

export function parseFlexibleNumberList(input: string) {
  return splitCsv(input)
    .map((item) => {
      if (item.toLowerCase() === 'null') return null;
      if (!numberPattern.test(item)) return null;
      return Number(item.replace(',', '.'));
    });
}

export function parsePointList(input: string): ChartPoint[] {
  return splitCsv(input)
    .map((pair) => {
      const [x, y] = pair.split(':').map((value) => Number(value.trim().replace(',', '.')));
      return { x, y };
    })
    .filter((point) => !Number.isNaN(point.x) && !Number.isNaN(point.y));
}

export function isParsedNumber(value: number | null): value is number {
  return typeof value === 'number';
}

export function findInvalidNumberTokens(input: string, allowNull = false) {
  return splitCsv(input).filter((item) => {
    if (allowNull && item.toLowerCase() === 'null') return false;
    return !numberPattern.test(item);
  });
}

export function findInvalidPointTokens(input: string) {
  return splitCsv(input).filter((pair) => {
    const [x, y, rest] = pair.split(':').map((value) => value.trim());
    if (rest !== undefined || x === undefined || y === undefined) return true;
    return !numberPattern.test(x) || !numberPattern.test(y);
  });
}
