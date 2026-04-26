import { useEffect, useMemo, useState } from 'react';

export type SpreadsheetColumnType = 'text' | 'number' | 'currency' | 'percent';

export type SpreadsheetColumn = {
  key: string;
  label: string;
  type: SpreadsheetColumnType;
};

export type SpreadsheetMerge = {
  row: number;
  col: number;
  rowSpan: number;
  colSpan: number;
};

export type SpreadsheetData = {
  columns: SpreadsheetColumn[];
  rows: string[][];
  merges?: SpreadsheetMerge[];
  title?: string;
};

export type SpreadsheetValidationMessage = {
  level: 'error' | 'warning';
  message: string;
};

export type SpreadsheetViewMode = 'app' | 'spreadsheet';

type Props = {
  data: SpreadsheetData;
  height?: number;
  editable?: boolean;
  locale?: 'ru' | 'en';
  viewMode?: SpreadsheetViewMode;
  onChange?: (next: SpreadsheetData) => void;
  onValidationChange?: (messages: SpreadsheetValidationMessage[]) => void;
};

type CellRange = {
  startRow: number;
  endRow: number;
  startCol: number;
  endCol: number;
};

const financeFunctions = ['SUM', 'AVG', 'MIN', 'MAX', 'NPV', 'PMT'];

function getColumnLetter(index: number) {
  let result = '';
  let current = index + 1;
  while (current > 0) {
    const remainder = (current - 1) % 26;
    result = String.fromCharCode(65 + remainder) + result;
    current = Math.floor((current - 1) / 26);
  }
  return result;
}

function normalizeRange(a: { row: number; col: number }, b: { row: number; col: number }): CellRange {
  return {
    startRow: Math.min(a.row, b.row),
    endRow: Math.max(a.row, b.row),
    startCol: Math.min(a.col, b.col),
    endCol: Math.max(a.col, b.col),
  };
}

function cellRefToPoint(ref: string) {
  const match = ref.trim().toUpperCase().match(/^([A-Z]+)(\d+)$/);
  if (!match) return null;
  const [, letters, rowText] = match;
  let col = 0;
  for (let i = 0; i < letters.length; i += 1) col = col * 26 + (letters.charCodeAt(i) - 64);
  return { row: Number(rowText) - 1, col: col - 1 };
}

function formatValue(value: number, type: SpreadsheetColumnType) {
  if (!Number.isFinite(value)) return '#ERR';
  if (type === 'currency') return `$${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  if (type === 'percent') return `${value.toFixed(2)}%`;
  return Number.isInteger(value) ? `${value}` : value.toFixed(2);
}

function sanitizeInputByType(value: string, type: SpreadsheetColumnType) {
  if (value.startsWith('=')) return value;
  if (type === 'text') return value;
  return value.replace(/[^0-9+\-.,%$\s]/g, '');
}

function parseNumericInput(raw: string, type: SpreadsheetColumnType) {
  const normalized = raw.replace(/\s+/g, '').replace(',', '.').replace('%', '').replace('$', '');
  if (!normalized) return null;
  const value = Number(normalized);
  if (Number.isNaN(value)) return null;
  return type === 'percent' ? value : value;
}

function rangePoints(rangeExpr: string) {
  const [startRef, endRef] = rangeExpr.split(':');
  const start = cellRefToPoint(startRef);
  const end = cellRefToPoint(endRef ?? startRef);
  if (!start || !end) return null;
  return normalizeRange(start, end);
}

function splitFormulaArgs(input: string) {
  return input.split(';').flatMap((part) => part.split(',')).map((part) => part.trim()).filter(Boolean);
}

export function buildSpreadsheetValidation(data: SpreadsheetData, locale: 'ru' | 'en'): SpreadsheetValidationMessage[] {
  const messages: SpreadsheetValidationMessage[] = [];
  const msg = {
    noCols: locale === 'ru' ? 'В таблице нет столбцов.' : 'The table has no columns.',
    noRows: locale === 'ru' ? 'В таблице нет строк.' : 'The table has no rows.',
  };

  if (data.columns.length === 0) messages.push({ level: 'error', message: msg.noCols });
  if (data.rows.length === 0) messages.push({ level: 'warning', message: msg.noRows });

  data.rows.forEach((row, rowIndex) => {
    if (row.length !== data.columns.length) {
      messages.push({ level: 'error', message: locale === 'ru' ? `Строка ${rowIndex + 1}: некорректное число ячеек.` : `Row ${rowIndex + 1}: invalid cell count.` });
    }

    row.forEach((cell, colIndex) => {
      const column = data.columns[colIndex];
      if (!column) return;
      const cellName = `${getColumnLetter(colIndex)}${rowIndex + 1}`;

      if (column.type !== 'text' && cell && !cell.startsWith('=')) {
        const value = parseNumericInput(cell, column.type);
        if (value === null) messages.push({ level: 'error', message: locale === 'ru' ? `Ячейка ${cellName}: допускаются только числа.` : `Cell ${cellName}: numeric value expected.` });
        if (column.type === 'percent' && value !== null && (value < 0 || value > 100)) {
          messages.push({ level: 'error', message: locale === 'ru' ? `Ячейка ${cellName}: процент должен быть в диапазоне 0–100.` : `Cell ${cellName}: percent must be within 0–100.` });
        }
      }

      if (cell.startsWith('=')) {
        const formulaMatch = cell.match(/^=\s*([A-Z]+)\((.*)\)$/i);
        if (!formulaMatch) {
          messages.push({ level: 'error', message: locale === 'ru' ? `Ячейка ${cellName}: неверная формула.` : `Cell ${cellName}: invalid formula.` });
          return;
        }
        const fnName = formulaMatch[1].toUpperCase();
        if (!financeFunctions.includes(fnName)) {
          messages.push({ level: 'error', message: locale === 'ru' ? `Ячейка ${cellName}: функция ${fnName} не поддерживается.` : `Cell ${cellName}: function ${fnName} is not supported.` });
        }
        const args = splitFormulaArgs(formulaMatch[2]);
        const ranges = args.filter((arg) => /^[A-Z]+\d+(?::[A-Z]+\d+)?$/i.test(arg));
        if (['SUM', 'AVG', 'MIN', 'MAX', 'NPV'].includes(fnName) && ranges.length === 0) {
          messages.push({ level: 'error', message: locale === 'ru' ? `Ячейка ${cellName}: формуле нужен диапазон, например A1:A3.` : `Cell ${cellName}: formula needs a range, e.g. A1:A3.` });
          return;
        }
        ranges.forEach((rangeArg) => {
          const range = rangePoints(rangeArg);
          if (!range) return;
          if (range.endRow >= data.rows.length || range.endCol >= data.columns.length || range.startRow < 0 || range.startCol < 0) {
            messages.push({ level: 'error', message: locale === 'ru' ? `Ячейка ${cellName}: диапазон ${rangeArg} выходит за границы таблицы.` : `Cell ${cellName}: range ${rangeArg} exceeds table bounds.` });
          }
        });
      }
    });
  });

  (data.merges ?? []).forEach((merge, index) => {
    if (merge.rowSpan < 1 || merge.colSpan < 1) messages.push({ level: 'error', message: locale === 'ru' ? `Объединение #${index + 1}: недопустимый размер.` : `Merge #${index + 1}: invalid size.` });
    if (merge.row + merge.rowSpan > data.rows.length || merge.col + merge.colSpan > data.columns.length) messages.push({ level: 'error', message: locale === 'ru' ? `Объединение #${index + 1}: выходит за границы таблицы.` : `Merge #${index + 1}: exceeds table bounds.` });
  });

  return messages;
}

function collectRangeValues(data: SpreadsheetData, rangeText: string, visited: Set<string>) {
  const range = rangePoints(rangeText);
  if (!range) return [];
  const values: number[] = [];
  for (let r = range.startRow; r <= range.endRow; r += 1) {
    for (let c = range.startCol; c <= range.endCol; c += 1) {
      const refValue = evaluateCell(data, r, c, new Set(visited));
      const numeric = Number(refValue.replace(/[^0-9+\-.]/g, ''));
      if (!Number.isNaN(numeric)) values.push(numeric);
    }
  }
  return values;
}

function evaluateCell(data: SpreadsheetData, row: number, col: number, visited = new Set<string>()): string {
  const raw = data.rows[row]?.[col] ?? '';
  const type = data.columns[col]?.type ?? 'text';
  const key = `${row}:${col}`;

  if (!raw.startsWith('=')) {
    const numeric = parseNumericInput(raw, type);
    if (type === 'text' || numeric === null) return raw;
    return formatValue(numeric, type);
  }
  if (visited.has(key)) return '#CYCLE';
  visited.add(key);

  const formulaMatch = raw.match(/^=\s*([A-Z]+)\((.*)\)$/i);
  if (!formulaMatch) return '#ERR';
  const fnName = formulaMatch[1].toUpperCase();
  const args = splitFormulaArgs(formulaMatch[2]);
  const firstRange = args.find((arg) => /^[A-Z]+\d+(?::[A-Z]+\d+)?$/i.test(arg));
  const values = firstRange ? collectRangeValues(data, firstRange, visited) : [];
  if (['SUM', 'AVG', 'MIN', 'MAX', 'NPV'].includes(fnName) && values.length === 0) return '#ERR';

  if (fnName === 'SUM') return formatValue(values.reduce((acc, value) => acc + value, 0), type);
  if (fnName === 'AVG') return formatValue(values.reduce((acc, value) => acc + value, 0) / values.length, type);
  if (fnName === 'MIN') return formatValue(Math.min(...values), type);
  if (fnName === 'MAX') return formatValue(Math.max(...values), type);
  if (fnName === 'NPV') {
    const rate = Number(args[0]?.replace(',', '.'));
    if (!Number.isFinite(rate) || !firstRange) return '#ERR';
    const npv = values.reduce((acc, value, index) => acc + value / Math.pow(1 + rate, index + 1), 0);
    return formatValue(npv, type);
  }
  if (fnName === 'PMT') {
    const [rateRaw, periodsRaw, principalRaw] = args;
    const rate = Number(rateRaw?.replace(',', '.'));
    const periods = Number(periodsRaw?.replace(',', '.'));
    const principal = Number(principalRaw?.replace(',', '.'));
    if (!Number.isFinite(rate) || !Number.isFinite(periods) || !Number.isFinite(principal) || periods <= 0) return '#ERR';
    const pmt = rate === 0 ? principal / periods : (principal * rate) / (1 - Math.pow(1 + rate, -periods));
    return formatValue(pmt, type);
  }
  return '#ERR';
}

function isHiddenByMerge(merges: SpreadsheetMerge[], row: number, col: number) {
  return merges.some((merge) => {
    const within = row >= merge.row && row < merge.row + merge.rowSpan && col >= merge.col && col < merge.col + merge.colSpan;
    return within && !(row === merge.row && col === merge.col);
  });
}

function getMergeAt(merges: SpreadsheetMerge[], row: number, col: number) {
  return merges.find((merge) => merge.row === row && merge.col === col);
}

function getSelectionLabel(range: CellRange | null) {
  if (!range) return '';
  return range.startRow === range.endRow && range.startCol === range.endCol
    ? `${getColumnLetter(range.startCol)}${range.startRow + 1}`
    : `${getColumnLetter(range.startCol)}${range.startRow + 1}:${getColumnLetter(range.endCol)}${range.endRow + 1}`;
}

export default function SpreadsheetTable({ data, height = 360, editable = false, locale = 'ru', viewMode = 'spreadsheet', onChange, onValidationChange }: Props) {
  const [selectionStart, setSelectionStart] = useState<{ row: number; col: number } | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<{ row: number; col: number } | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [activeCell, setActiveCell] = useState<{ row: number; col: number } | null>(null);
  const [formulaInput, setFormulaInput] = useState('');

  const merges = data.merges ?? [];
  const validation = useMemo(() => buildSpreadsheetValidation(data, locale), [data, locale]);
  const selection = selectionStart && selectionEnd ? normalizeRange(selectionStart, selectionEnd) : null;
  const showCoordinates = viewMode === 'spreadsheet';

  useEffect(() => { onValidationChange?.(validation); }, [onValidationChange, validation]);
  useEffect(() => {
    if (!activeCell) return;
    setFormulaInput(data.rows[activeCell.row]?.[activeCell.col] ?? '');
  }, [activeCell, data.rows]);

  const updateData = (next: SpreadsheetData) => onChange?.(next);
  const setCell = (rowIndex: number, colIndex: number, value: string) => {
    const nextRows = data.rows.map((row) => [...row]);
    const type = data.columns[colIndex]?.type ?? 'text';
    nextRows[rowIndex][colIndex] = sanitizeInputByType(value, type);
    updateData({ ...data, rows: nextRows });
  };

  const addRow = () => updateData({ ...data, rows: [...data.rows, data.columns.map(() => '')] });
  const addColumn = () => updateData({ ...data, columns: [...data.columns, { key: `column-${data.columns.length + 1}`, label: locale === 'ru' ? `Столбец ${data.columns.length + 1}` : `Column ${data.columns.length + 1}`, type: 'number' }], rows: data.rows.map((row) => [...row, '']) });
  const deleteRow = () => {
    if (!selection) return;
    updateData({ ...data, rows: data.rows.filter((_, index) => index < selection.startRow || index > selection.endRow), merges: merges.filter((merge) => merge.row < selection.startRow || merge.row > selection.endRow) });
  };
  const deleteColumn = () => {
    if (!selection) return;
    updateData({ ...data, columns: data.columns.filter((_, index) => index < selection.startCol || index > selection.endCol), rows: data.rows.map((row) => row.filter((_, index) => index < selection.startCol || index > selection.endCol)), merges: merges.filter((merge) => merge.col < selection.startCol || merge.col > selection.endCol) });
  };
  const mergeSelection = () => {
    if (!selection || (selection.startRow === selection.endRow && selection.startCol === selection.endCol)) return;
    const intersects = merges.some((merge) => selection.startRow <= merge.row + merge.rowSpan - 1 && selection.endRow >= merge.row && selection.startCol <= merge.col + merge.colSpan - 1 && selection.endCol >= merge.col);
    if (intersects) return;
    updateData({ ...data, merges: [...merges, { row: selection.startRow, col: selection.startCol, rowSpan: selection.endRow - selection.startRow + 1, colSpan: selection.endCol - selection.startCol + 1 }] });
  };
  const unmergeSelection = () => {
    if (!selection) return;
    updateData({ ...data, merges: merges.filter((merge) => !(merge.row >= selection.startRow && merge.row <= selection.endRow && merge.col >= selection.startCol && merge.col <= selection.endCol)) });
  };
  const applyFormulaBar = () => {
    if (!activeCell) return;
    setCell(activeCell.row, activeCell.col, formulaInput);
  };

  return (
    <div className={`spreadsheet-shell spreadsheet-shell--${viewMode}`} style={{ minHeight: height }} onMouseLeave={() => setIsSelecting(false)} onMouseUp={() => setIsSelecting(false)}>
      {editable && (
        <div className="spreadsheet-toolbar">
          <button className="ghost-button" type="button" onClick={addRow}>+ {locale === 'ru' ? 'строка' : 'row'}</button>
          <button className="ghost-button" type="button" onClick={deleteRow}>− {locale === 'ru' ? 'строки' : 'rows'}</button>
          <button className="ghost-button" type="button" onClick={addColumn}>+ {locale === 'ru' ? 'столбец' : 'column'}</button>
          <button className="ghost-button" type="button" onClick={deleteColumn}>− {locale === 'ru' ? 'столбцы' : 'columns'}</button>
          <button className="ghost-button" type="button" onClick={mergeSelection}>{locale === 'ru' ? 'Объединить' : 'Merge'}</button>
          <button className="ghost-button" type="button" onClick={unmergeSelection}>{locale === 'ru' ? 'Разъединить' : 'Unmerge'}</button>
          <span className="spreadsheet-toolbar__selection">{selection ? getSelectionLabel(selection) : (locale === 'ru' ? 'Нет выделения' : 'No selection')}</span>
        </div>
      )}

      {editable && (
        <div className="formula-bar">
          <span>{activeCell ? getSelectionLabel({ startRow: activeCell.row, endRow: activeCell.row, startCol: activeCell.col, endCol: activeCell.col }) : 'fx'}</span>
          <input value={formulaInput} onChange={(event) => setFormulaInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') applyFormulaBar(); }} placeholder="=SUM(B1:B3)" />
          <button className="ghost-button" type="button" onClick={applyFormulaBar}>OK</button>
        </div>
      )}

      <div className="spreadsheet-wrap">
        <table className="spreadsheet-table">
          {showCoordinates && <thead><tr><th className="spreadsheet-table__corner" />{data.columns.map((column, index) => <th key={column.key}>{getColumnLetter(index)}<span>{column.label}</span></th>)}</tr></thead>}
          <tbody>
            {!showCoordinates && <tr className="spreadsheet-business-head">{data.columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr>}
            {data.rows.map((row, rowIndex) => <tr key={`row-${rowIndex}`}>{showCoordinates && <th>{rowIndex + 1}</th>}{row.map((cell, colIndex) => {
              if (isHiddenByMerge(merges, rowIndex, colIndex)) return null;
              const merge = getMergeAt(merges, rowIndex, colIndex);
              const selected = Boolean(selection && rowIndex >= selection.startRow && rowIndex <= selection.endRow && colIndex >= selection.startCol && colIndex <= selection.endCol);
              return <td key={`${rowIndex}-${colIndex}`} rowSpan={merge?.rowSpan} colSpan={merge?.colSpan} className={selected ? 'selected' : ''} onMouseDown={(event) => { if (!editable || event.button !== 0) return; setIsSelecting(true); setActiveCell({ row: rowIndex, col: colIndex }); setSelectionStart({ row: rowIndex, col: colIndex }); setSelectionEnd({ row: rowIndex, col: colIndex }); }} onMouseEnter={(event) => { if (!editable || !isSelecting || event.buttons !== 1 || !selectionStart) return; setSelectionEnd({ row: rowIndex, col: colIndex }); }}>
                {editable ? <input value={cell} onChange={(event) => setCell(rowIndex, colIndex, event.target.value)} onFocus={() => { setActiveCell({ row: rowIndex, col: colIndex }); setSelectionStart({ row: rowIndex, col: colIndex }); setSelectionEnd({ row: rowIndex, col: colIndex }); }} placeholder={data.columns[colIndex]?.type === 'text' ? '' : '0'} /> : <span>{evaluateCell(data, rowIndex, colIndex)}</span>}
              </td>;
            })}</tr>)}
          </tbody>
        </table>
      </div>

      <div className="spreadsheet-footnote"><strong>{locale === 'ru' ? 'Формулы:' : 'Formulas:'}</strong> {financeFunctions.map((fn) => fn === 'PMT' ? '=PMT(0.1;12;100000)' : fn === 'NPV' ? '=NPV(0.1;B1:B3)' : `=${fn}(A1:A3)`).join(' · ')}</div>
    </div>
  );
}
