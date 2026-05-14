import type { CellPoint, SpreadsheetColumnType, SpreadsheetData } from './spreadsheet.types';
import { cellRefToPoint, rangePoints } from './cellAddress';
import { formatValue, parseNumericInput } from './spreadsheetFormatting';

export const financeFunctions = ['SUM', 'AVG', 'MIN', 'MAX', 'COUNT', 'ROUND', 'ABS', 'IF', 'NPV', 'PMT', 'MEDIAN'] as const;

export type FormulaErrorCode = '#ERR' | '#CYCLE';

export type FormulaEvaluation = {
  raw: string;
  isFormula: boolean;
  value: number | string | null;
  display: string;
  error?: FormulaErrorCode;
  detail?: string;
};

class FormulaProblem extends Error {
  code: FormulaErrorCode;

  constructor(code: FormulaErrorCode, detail: string) {
    super(detail);
    this.code = code;
  }
}

const cellRefPattern = /^[A-Z]+\d+$/i;
const rangePattern = /^[A-Z]+\d+:[A-Z]+\d+$/i;

function isFormula(value: string) {
  return value.trim().startsWith('=');
}

function isNumberToken(value: string) {
  return /^[-+]?\d+(?:[.,]\d+)?$/.test(value.trim());
}

function parseNumberToken(value: string) {
  return Number(value.trim().replace(',', '.'));
}

function stripQuotes(value: string) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

export function splitFormulaArgs(input: string) {
  const args: string[] = [];
  let depth = 0;
  let quote: '"' | "'" | null = null;
  let current = '';

  for (const char of input) {
    if ((char === '"' || char === "'") && !quote) {
      quote = char;
      current += char;
      continue;
    }
    if (quote === char) {
      quote = null;
      current += char;
      continue;
    }
    if (!quote && char === '(') depth += 1;
    if (!quote && char === ')') depth -= 1;

    if (!quote && depth === 0 && (char === ';' || char === ',')) {
      if (current.trim()) args.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  if (current.trim()) args.push(current.trim());
  return args;
}

function expressionHasOuterParens(expression: string) {
  if (!expression.startsWith('(') || !expression.endsWith(')')) return false;
  let depth = 0;
  let quote: '"' | "'" | null = null;

  for (let index = 0; index < expression.length; index += 1) {
    const char = expression[index];
    if ((char === '"' || char === "'") && !quote) {
      quote = char;
      continue;
    }
    if (quote === char) {
      quote = null;
      continue;
    }
    if (quote) continue;
    if (char === '(') depth += 1;
    if (char === ')') depth -= 1;
    if (depth === 0 && index < expression.length - 1) return false;
  }

  return depth === 0;
}

function findTopLevelOperator(expression: string, operators: string[]) {
  let depth = 0;
  let quote: '"' | "'" | null = null;

  for (let index = expression.length - 1; index >= 0; index -= 1) {
    const char = expression[index];
    if ((char === '"' || char === "'") && !quote) {
      quote = char;
      continue;
    }
    if (quote === char) {
      quote = null;
      continue;
    }
    if (quote) continue;
    if (char === ')') depth += 1;
    if (char === '(') depth -= 1;
    if (depth !== 0 || !operators.includes(char)) continue;

    const previous = expression[index - 1];
    if ((char === '+' || char === '-') && (index === 0 || ['+', '-', '*', '/', '(', '>', '<', '='].includes(previous))) {
      continue;
    }
    return index;
  }

  return -1;
}

function getFunctionCall(expression: string) {
  const match = expression.match(/^([A-Z][A-Z0-9]*)\s*\((.*)\)$/i);
  if (!match) return null;
  const [, name, body] = match;
  if (!expressionHasOuterParens(expression.slice(name.length).trim())) return null;
  return { name: name.toUpperCase(), body };
}

function emptyEvaluation(raw: string): FormulaEvaluation {
  return { raw, isFormula: false, value: '', display: '' };
}

function errorEvaluation(raw: string, code: FormulaErrorCode, detail: string): FormulaEvaluation {
  return { raw, isFormula: true, value: null, display: code, error: code, detail };
}

function valueToDisplay(value: number | string | null, type: SpreadsheetColumnType) {
  if (value === null) return '';
  if (typeof value === 'number') return formatValue(value, type);
  return value;
}

function toNumber(value: number | string | null) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (value === null) return null;
  const normalized = value.replace(/\s+/g, '').replace('$', '').replace('%', '').replace(',', '.');
  if (!normalized) return null;
  const numeric = Number(normalized);
  return Number.isFinite(numeric) ? numeric : null;
}

function assertCellInBounds(data: SpreadsheetData, point: CellPoint, ref: string) {
  if (
    point.row < 0 ||
    point.col < 0 ||
    point.row >= data.rows.length ||
    point.col >= data.columns.length
  ) {
    throw new FormulaProblem('#ERR', `Reference ${ref} is outside table bounds.`);
  }
}

function compareValues(left: number | string | null, operator: string, right: number | string | null) {
  const leftNumber = toNumber(left);
  const rightNumber = toNumber(right);
  const useNumbers = leftNumber !== null && rightNumber !== null;
  const a = useNumbers ? leftNumber : String(left ?? '');
  const b = useNumbers ? rightNumber : String(right ?? '');

  if (operator === '>') return a > b;
  if (operator === '>=') return a >= b;
  if (operator === '<') return a < b;
  if (operator === '<=') return a <= b;
  return a === b;
}

export function createFormulaEvaluationCache(data: SpreadsheetData) {
  const cache = new Map<string, FormulaEvaluation>();

  const evaluateCellDetailed = (
    row: number,
    col: number,
    visited = new Set<string>(),
  ): FormulaEvaluation => {
    const raw = data.rows[row]?.[col] ?? '';
    const type = data.columns[col]?.type ?? 'text';
    const key = `${row}:${col}`;

    if (!raw) return emptyEvaluation(raw);
    if (!isFormula(raw)) {
      const numeric = parseNumericInput(raw, type);
      if (type === 'text' || numeric === null) {
        return { raw, isFormula: false, value: raw, display: raw };
      }
      return { raw, isFormula: false, value: numeric, display: formatValue(numeric, type) };
    }

    if (visited.has(key)) return errorEvaluation(raw, '#CYCLE', 'Cyclic reference detected.');
    if (cache.has(key)) return cache.get(key) as FormulaEvaluation;

    const nextVisited = new Set(visited);
    nextVisited.add(key);
    const evaluated = evaluateFormula(raw, type, nextVisited);
    cache.set(key, evaluated);
    return evaluated;
  };

  const collectRangeValues = (rangeText: string, visited: Set<string>) => {
    const range = rangePoints(rangeText);
    if (!range) throw new FormulaProblem('#ERR', `Invalid range ${rangeText}.`);
    const values: number[] = [];

    for (let row = range.startRow; row <= range.endRow; row += 1) {
      for (let col = range.startCol; col <= range.endCol; col += 1) {
        assertCellInBounds(data, { row, col }, rangeText);
        const evaluated = evaluateCellDetailed(row, col, new Set(visited));
        if (evaluated.error) throw new FormulaProblem(evaluated.error, evaluated.detail ?? evaluated.error);
        const numeric = toNumber(evaluated.value);
        if (numeric !== null) values.push(numeric);
      }
    }

    return values;
  };

  const evaluateScalar = (expression: string, visited: Set<string>): number | string | null => {
    const trimmed = expression.trim();
    if (!trimmed) throw new FormulaProblem('#ERR', 'Empty expression.');
    if (expressionHasOuterParens(trimmed)) return evaluateScalar(trimmed.slice(1, -1), visited);

    const addIndex = findTopLevelOperator(trimmed, ['+', '-']);
    if (addIndex > -1) {
      const left = toNumber(evaluateScalar(trimmed.slice(0, addIndex), visited));
      const right = toNumber(evaluateScalar(trimmed.slice(addIndex + 1), visited));
      if (left === null || right === null) throw new FormulaProblem('#ERR', 'Arithmetic operands must be numeric.');
      return trimmed[addIndex] === '+' ? left + right : left - right;
    }

    const multiplyIndex = findTopLevelOperator(trimmed, ['*', '/']);
    if (multiplyIndex > -1) {
      const left = toNumber(evaluateScalar(trimmed.slice(0, multiplyIndex), visited));
      const right = toNumber(evaluateScalar(trimmed.slice(multiplyIndex + 1), visited));
      if (left === null || right === null) throw new FormulaProblem('#ERR', 'Arithmetic operands must be numeric.');
      if (trimmed[multiplyIndex] === '/' && right === 0) throw new FormulaProblem('#ERR', 'Division by zero.');
      return trimmed[multiplyIndex] === '*' ? left * right : left / right;
    }

    const fnCall = getFunctionCall(trimmed);
    if (fnCall) return evaluateFunction(fnCall.name, splitFormulaArgs(fnCall.body), visited);
    if (isNumberToken(trimmed)) return parseNumberToken(trimmed);
    if (cellRefPattern.test(trimmed)) {
      const point = cellRefToPoint(trimmed);
      if (!point) throw new FormulaProblem('#ERR', `Invalid reference ${trimmed}.`);
      assertCellInBounds(data, point, trimmed);
      const evaluated = evaluateCellDetailed(point.row, point.col, new Set(visited));
      if (evaluated.error) throw new FormulaProblem(evaluated.error, evaluated.detail ?? evaluated.error);
      return evaluated.value;
    }
    if (rangePattern.test(trimmed)) throw new FormulaProblem('#ERR', `Range ${trimmed} can only be used as a function argument.`);

    return stripQuotes(trimmed);
  };

  const valuesFromArg = (arg: string, visited: Set<string>) => {
    if (rangePattern.test(arg.trim())) return collectRangeValues(arg.trim(), visited);
    const value = evaluateScalar(arg, visited);
    const numeric = toNumber(value);
    return numeric === null ? [] : [numeric];
  };

  const evaluateCondition = (condition: string, visited: Set<string>) => {
    const match = condition.match(/^(.+?)(>=|<=|>|<|=)(.+)$/);
    if (!match) throw new FormulaProblem('#ERR', 'IF condition must use >, >=, <, <=, or =.');
    const [, leftRaw, operator, rightRaw] = match;
    return compareValues(evaluateScalar(leftRaw, visited), operator, evaluateScalar(rightRaw, visited));
  };

  const evaluateFunction = (name: string, args: string[], visited: Set<string>): number | string | null => {
    const values = () => args.flatMap((arg) => valuesFromArg(arg, visited));

    if (name === 'SUM') return values().reduce((acc, value) => acc + value, 0);
    if (name === 'COUNT') return values().length;
    if (name === 'AVG') {
      const items = values();
      if (items.length === 0) throw new FormulaProblem('#ERR', 'AVG expects at least one numeric value.');
      return items.reduce((acc, value) => acc + value, 0) / items.length;
    }
    if (name === 'MIN') {
      const items = values();
      if (items.length === 0) throw new FormulaProblem('#ERR', 'MIN expects at least one numeric value.');
      return Math.min(...items);
    }
    if (name === 'MAX') {
      const items = values();
      if (items.length === 0) throw new FormulaProblem('#ERR', 'MAX expects at least one numeric value.');
      return Math.max(...items);
    }
    if (name === 'MEDIAN') {
      const items = values().sort((a, b) => a - b);
      if (items.length === 0) throw new FormulaProblem('#ERR', 'MEDIAN expects at least one numeric value.');
      const middle = Math.floor(items.length / 2);
      return items.length % 2 === 0 ? (items[middle - 1] + items[middle]) / 2 : items[middle];
    }
    if (name === 'ROUND') {
      if (args.length !== 2) throw new FormulaProblem('#ERR', 'ROUND expects value and digits.');
      const value = toNumber(evaluateScalar(args[0], visited));
      const digits = toNumber(evaluateScalar(args[1], visited));
      if (value === null || digits === null) throw new FormulaProblem('#ERR', 'ROUND arguments must be numeric.');
      const factor = Math.pow(10, Math.trunc(digits));
      return Math.round(value * factor) / factor;
    }
    if (name === 'ABS') {
      if (args.length !== 1) throw new FormulaProblem('#ERR', 'ABS expects one argument.');
      const value = toNumber(evaluateScalar(args[0], visited));
      if (value === null) throw new FormulaProblem('#ERR', 'ABS argument must be numeric.');
      return Math.abs(value);
    }
    if (name === 'IF') {
      if (args.length !== 3) throw new FormulaProblem('#ERR', 'IF expects condition, true value, and false value.');
      return evaluateCondition(args[0], visited) ? evaluateScalar(args[1], visited) : evaluateScalar(args[2], visited);
    }
    if (name === 'NPV') {
      if (args.length < 2) throw new FormulaProblem('#ERR', 'NPV expects rate and values.');
      const rate = toNumber(evaluateScalar(args[0], visited));
      const cashflows = args.slice(1).flatMap((arg) => valuesFromArg(arg, visited));
      if (rate === null || cashflows.length === 0) throw new FormulaProblem('#ERR', 'NPV expects numeric rate and cashflows.');
      return cashflows.reduce((acc, value, index) => acc + value / Math.pow(1 + rate, index + 1), 0);
    }
    if (name === 'PMT') {
      if (args.length !== 3) throw new FormulaProblem('#ERR', 'PMT expects rate, periods, and principal.');
      const rate = toNumber(evaluateScalar(args[0], visited));
      const periods = toNumber(evaluateScalar(args[1], visited));
      const principal = toNumber(evaluateScalar(args[2], visited));
      if (rate === null || periods === null || principal === null || periods <= 0) {
        throw new FormulaProblem('#ERR', 'PMT expects numeric rate, positive periods, and principal.');
      }
      return rate === 0 ? principal / periods : (principal * rate) / (1 - Math.pow(1 + rate, -periods));
    }

    throw new FormulaProblem('#ERR', `Unknown function ${name}.`);
  };

  const evaluateFormula = (
    raw: string,
    type: SpreadsheetColumnType,
    visited: Set<string>,
  ): FormulaEvaluation => {
    try {
      const result = evaluateScalar(raw.trim().slice(1), visited);
      return {
        raw,
        isFormula: true,
        value: result,
        display: valueToDisplay(result, type),
      };
    } catch (error) {
      if (error instanceof FormulaProblem) {
        return errorEvaluation(raw, error.code, error.message);
      }
      return errorEvaluation(raw, '#ERR', 'Invalid formula.');
    }
  };

  return {
    evaluateCell: evaluateCellDetailed,
    evaluateFormula(raw: string, target?: CellPoint): FormulaEvaluation {
      const type = target ? data.columns[target.col]?.type ?? 'text' : 'number';
      const visited = target ? new Set<string>([`${target.row}:${target.col}`]) : new Set<string>();
      return isFormula(raw)
        ? evaluateFormula(raw, type, visited)
        : { raw, isFormula: false, value: raw, display: raw };
    },
  };
}

export function collectRangeValues(
  data: SpreadsheetData,
  rangeText: string,
  visited: Set<string>,
) {
  const range = rangePoints(rangeText);
  if (!range) return [];
  const cache = createFormulaEvaluationCache(data);
  const values: number[] = [];

  for (let row = range.startRow; row <= range.endRow; row += 1) {
    for (let col = range.startCol; col <= range.endCol; col += 1) {
      const evaluated = cache.evaluateCell(row, col, new Set(visited));
      const numeric = toNumber(evaluated.value);
      if (numeric !== null) values.push(numeric);
    }
  }

  return values;
}

export function evaluateCell(
  data: SpreadsheetData,
  row: number,
  col: number,
  visited = new Set<string>(),
): string {
  return createFormulaEvaluationCache(data).evaluateCell(row, col, visited).display;
}
