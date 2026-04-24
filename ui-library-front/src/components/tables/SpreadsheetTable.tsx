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

type Props = {
  data: SpreadsheetData;
  height?: number;
  editable?: boolean;
  locale?: 'ru' | 'en';
  onChange?: (next: SpreadsheetData) => void;
  onValidationChange?: (messages: SpreadsheetValidationMessage[]) => void;
};

type CellRange = {
  startRow: number;
  endRow: number;
  startCol: number;
  endCol: number;
};

const financeFunctions = ['SUM', 'AVG', 'MIN', 'MAX'];

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
  for (let i = 0; i < letters.length; i += 1) {
    col = col * 26 + (letters.charCodeAt(i) - 64);
  }
  return { row: Number(rowText) - 1, col: col - 1 };
}

function formatValue(value: number, type: SpreadsheetColumnType) {
  if (!Number.isFinite(value)) return '#ERR';
  if (type === 'currency') return `$${value.toFixed(2)}`;
  if (type === 'percent') return `${value.toFixed(2)}%`;
  return Number.isInteger(value) ? `${value}` : value.toFixed(2);
}

function sanitizeInputByType(value: string, type: SpreadsheetColumnType) {
  if (value.startsWith('=')) return value;
  if (type === 'text') return value;
  return value.replace(/[^0-9+\-.,]/g, '');
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
  const end = cellRefToPoint(endRef);
  if (!start || !end) return null;
  return normalizeRange(start, end);
}

export function buildSpreadsheetValidation(data: SpreadsheetData, locale: 'ru' | 'en'): SpreadsheetValidationMessage[] {
  const messages: SpreadsheetValidationMessage[] = [];

  if (data.columns.length === 0) {
    messages.push({ level: 'error', message: locale === 'ru' ? 'В таблице нет столбцов.' : 'The table has no columns.' });
  }

  if (data.rows.length === 0) {
    messages.push({ level: 'warning', message: locale === 'ru' ? 'В таблице нет строк.' : 'The table has no rows.' });
  }

  data.rows.forEach((row, rowIndex) => {
    if (row.length !== data.columns.length) {
      messages.push({
        level: 'error',
        message: locale === 'ru'
          ? `Строка ${rowIndex + 1} имеет некорректное число ячеек.`
          : `Row ${rowIndex + 1} has an invalid number of cells.`,
      });
    }
  });

  data.rows.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const column = data.columns[colIndex];
      if (!column) return;

      if (column.type !== 'text' && cell && !cell.startsWith('=')) {
        const value = parseNumericInput(cell, column.type);
        if (value === null) {
          messages.push({
            level: 'error',
            message: locale === 'ru'
              ? `Ячейка ${getColumnLetter(colIndex)}${rowIndex + 1}: допускаются только числа.`
              : `Cell ${getColumnLetter(colIndex)}${rowIndex + 1}: numeric value expected.`,
          });
        }

        if (column.type === 'percent' && value !== null && (value < 0 || value > 100)) {
          messages.push({
            level: 'error',
            message: locale === 'ru'
              ? `Ячейка ${getColumnLetter(colIndex)}${rowIndex + 1}: процент должен быть в диапазоне 0–100.`
              : `Cell ${getColumnLetter(colIndex)}${rowIndex + 1}: percent must be within 0–100.`,
          });
        }
      }

      if (cell.startsWith('=')) {
        const formulaMatch = cell.match(/^=\s*([A-Z]+)\((.+)\)$/i);
        if (!formulaMatch) {
          messages.push({
            level: 'error',
            message: locale === 'ru'
              ? `Ячейка ${getColumnLetter(colIndex)}${rowIndex + 1}: неверная формула.`
              : `Cell ${getColumnLetter(colIndex)}${rowIndex + 1}: invalid formula.`,
          });
          return;
        }

        const fnName = formulaMatch[1].toUpperCase();
        if (!financeFunctions.includes(fnName)) {
          messages.push({
            level: 'error',
            message: locale === 'ru'
              ? `Ячейка ${getColumnLetter(colIndex)}${rowIndex + 1}: функция ${fnName} не поддерживается.`
              : `Cell ${getColumnLetter(colIndex)}${rowIndex + 1}: function ${fnName} is not supported.`,
          });
        }

        const range = rangePoints(formulaMatch[2]);
        if (!range) {
          messages.push({
            level: 'error',
            message: locale === 'ru'
              ? `Ячейка ${getColumnLetter(colIndex)}${rowIndex + 1}: неверный диапазон.`
              : `Cell ${getColumnLetter(colIndex)}${rowIndex + 1}: invalid range.`,
          });
          return;
        }

        if (range.endRow >= data.rows.length || range.endCol >= data.columns.length) {
          messages.push({
            level: 'error',
            message: locale === 'ru'
              ? `Ячейка ${getColumnLetter(colIndex)}${rowIndex + 1}: диапазон выходит за границы таблицы.`
              : `Cell ${getColumnLetter(colIndex)}${rowIndex + 1}: range exceeds table bounds.`,
          });
        }
      }
    });
  });

  (data.merges ?? []).forEach((merge, index) => {
    if (merge.rowSpan < 1 || merge.colSpan < 1) {
      messages.push({
        level: 'error',
        message: locale === 'ru'
          ? `Объединение #${index + 1} имеет недопустимый размер.`
          : `Merge #${index + 1} has an invalid size.`,
      });
    }
    if (merge.row + merge.rowSpan > data.rows.length || merge.col + merge.colSpan > data.columns.length) {
      messages.push({
        level: 'error',
        message: locale === 'ru'
          ? `Объединение #${index + 1} выходит за границы таблицы.`
          : `Merge #${index + 1} exceeds table bounds.`,
      });
    }
  });

  return messages;
}

function evaluateCell(
  data: SpreadsheetData,
  row: number,
  col: number,
  visited = new Set<string>(),
): string {
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

  const formulaMatch = raw.match(/^=\s*([A-Z]+)\((.+)\)$/i);
  if (!formulaMatch) return '#ERR';

  const fnName = formulaMatch[1].toUpperCase();
  const range = rangePoints(formulaMatch[2]);
  if (!range) return '#ERR';

  const values: number[] = [];
  for (let r = range.startRow; r <= range.endRow; r += 1) {
    for (let c = range.startCol; c <= range.endCol; c += 1) {
      const refValue = evaluateCell(data, r, c, new Set(visited));
      const numeric = Number(refValue.replace(/[^0-9+\-.]/g, ''));
      if (!Number.isNaN(numeric)) values.push(numeric);
    }
  }

  if (values.length === 0) return '#ERR';
  if (fnName === 'SUM') return formatValue(values.reduce((acc, value) => acc + value, 0), type);
  if (fnName === 'AVG') return formatValue(values.reduce((acc, value) => acc + value, 0) / values.length, type);
  if (fnName === 'MIN') return formatValue(Math.min(...values), type);
  if (fnName === 'MAX') return formatValue(Math.max(...values), type);
  return '#ERR';
}

function isHiddenByMerge(merges: SpreadsheetMerge[], row: number, col: number) {
  return merges.some((merge) => {
    const within = row >= merge.row && row < merge.row + merge.rowSpan && col >= merge.col && col < merge.col + merge.colSpan;
    const isOrigin = row === merge.row && col === merge.col;
    return within && !isOrigin;
  });
}

function getMergeAt(merges: SpreadsheetMerge[], row: number, col: number) {
  return merges.find((merge) => merge.row === row && merge.col === col);
}

function getSelectionLabel(range: CellRange | null) {
  if (!range) return '';
  return `${getColumnLetter(range.startCol)}${range.startRow + 1}:${getColumnLetter(range.endCol)}${range.endRow + 1}`;
}

export default function SpreadsheetTable({ data, height = 360, editable = false, locale = 'ru', onChange, onValidationChange }: Props) {
  const [selectionStart, setSelectionStart] = useState<{ row: number; col: number } | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<{ row: number; col: number } | null>(null);

  const merges = data.merges ?? [];
  const validation = useMemo(() => buildSpreadsheetValidation(data, locale), [data, locale]);
  const selection = selectionStart && selectionEnd ? normalizeRange(selectionStart, selectionEnd) : null;

  useEffect(() => {
    onValidationChange?.(validation);
  }, [onValidationChange, validation]);

  const updateData = (next: SpreadsheetData) => onChange?.(next);

  const setCell = (rowIndex: number, colIndex: number, value: string) => {
    const nextRows = data.rows.map((row) => [...row]);
    const type = data.columns[colIndex]?.type ?? 'text';
    nextRows[rowIndex][colIndex] = sanitizeInputByType(value, type);
    updateData({ ...data, rows: nextRows });
  };

  const addRow = () => {
    updateData({ ...data, rows: [...data.rows, data.columns.map(() => '')] });
  };

  const deleteRow = () => {
    if (!selection) return;
    const nextRows = data.rows.filter((_, index) => index < selection.startRow || index > selection.endRow);
    updateData({
      ...data,
      rows: nextRows,
      merges: merges.filter((merge) => merge.row < selection.startRow || merge.row > selection.endRow),
    });
  };

  const addColumn = () => {
    const nextColumns = [
      ...data.columns,
      { key: `column-${data.columns.length + 1}`, label: locale === 'ru' ? `Столбец ${data.columns.length + 1}` : `Column ${data.columns.length + 1}`, type: 'number' as SpreadsheetColumnType },
    ];
    const nextRows = data.rows.map((row) => [...row, '']);
    updateData({ ...data, columns: nextColumns, rows: nextRows });
  };

  const deleteColumn = () => {
    if (!selection) return;
    const nextColumns = data.columns.filter((_, index) => index < selection.startCol || index > selection.endCol);
    const nextRows = data.rows.map((row) => row.filter((_, index) => index < selection.startCol || index > selection.endCol));
    updateData({
      ...data,
      columns: nextColumns,
      rows: nextRows,
      merges: merges.filter((merge) => merge.col < selection.startCol || merge.col > selection.endCol),
    });
  };

  const mergeSelection = () => {
    if (!selection) return;
    if (selection.startRow === selection.endRow && selection.startCol === selection.endCol) return;
    const intersects = merges.some((merge) => {
      const rowOverlap = selection.startRow <= merge.row + merge.rowSpan - 1 && selection.endRow >= merge.row;
      const colOverlap = selection.startCol <= merge.col + merge.colSpan - 1 && selection.endCol >= merge.col;
      return rowOverlap && colOverlap;
    });
    if (intersects) return;

    updateData({
      ...data,
      merges: [
        ...merges,
        {
          row: selection.startRow,
          col: selection.startCol,
          rowSpan: selection.endRow - selection.startRow + 1,
          colSpan: selection.endCol - selection.startCol + 1,
        },
      ],
    });
  };

  const unmergeSelection = () => {
    if (!selection) return;
    updateData({
      ...data,
      merges: merges.filter((merge) => !(merge.row === selection.startRow && merge.col === selection.startCol)),
    });
  };

  return (
    <div className="spreadsheet-shell" style={{ minHeight: height }}>
      {editable && (
        <div className="spreadsheet-toolbar">
          <button className="ghost-button" type="button" onClick={addRow}>{locale === 'ru' ? 'Добавить строку' : 'Add row'}</button>
          <button className="ghost-button" type="button" onClick={deleteRow}>{locale === 'ru' ? 'Удалить строки' : 'Delete rows'}</button>
          <button className="ghost-button" type="button" onClick={addColumn}>{locale === 'ru' ? 'Добавить столбец' : 'Add column'}</button>
          <button className="ghost-button" type="button" onClick={deleteColumn}>{locale === 'ru' ? 'Удалить столбцы' : 'Delete columns'}</button>
          <button className="ghost-button" type="button" onClick={mergeSelection}>{locale === 'ru' ? 'Объединить' : 'Merge'}</button>
          <button className="ghost-button" type="button" onClick={unmergeSelection}>{locale === 'ru' ? 'Разъединить' : 'Unmerge'}</button>
          <span className="spreadsheet-toolbar__selection">{selection ? getSelectionLabel(selection) : (locale === 'ru' ? 'Нет выделения' : 'No selection')}</span>
        </div>
      )}

      <div className="spreadsheet-wrap">
        <table className="spreadsheet-table">
          <thead>
            <tr>
              <th className="spreadsheet-table__corner" />
              {data.columns.map((column, index) => (
                <th key={column.key}>{getColumnLetter(index)}<span>{column.label}</span></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                <th>{rowIndex + 1}</th>
                {row.map((cell, colIndex) => {
                  if (isHiddenByMerge(merges, rowIndex, colIndex)) return null;
                  const merge = getMergeAt(merges, rowIndex, colIndex);
                  const selected = selection && rowIndex >= selection.startRow && rowIndex <= selection.endRow && colIndex >= selection.startCol && colIndex <= selection.endCol;
                  return (
                    <td
                      key={`${rowIndex}-${colIndex}`}
                      rowSpan={merge?.rowSpan}
                      colSpan={merge?.colSpan}
                      className={selected ? 'selected' : ''}
                      onMouseDown={() => {
                        if (!editable) return;
                        setSelectionStart({ row: rowIndex, col: colIndex });
                        setSelectionEnd({ row: rowIndex, col: colIndex });
                      }}
                      onMouseEnter={() => {
                        if (!editable || !selectionStart) return;
                        setSelectionEnd({ row: rowIndex, col: colIndex });
                      }}
                    >
                      {editable ? (
                        <input
                          value={cell}
                          onChange={(event) => setCell(rowIndex, colIndex, event.target.value)}
                          onFocus={() => {
                            setSelectionStart({ row: rowIndex, col: colIndex });
                            setSelectionEnd({ row: rowIndex, col: colIndex });
                          }}
                          placeholder={data.columns[colIndex]?.type === 'text' ? '' : '0'}
                        />
                      ) : (
                        <span>{evaluateCell(data, rowIndex, colIndex)}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="spreadsheet-footnote">
        <strong>{locale === 'ru' ? 'Формулы:' : 'Formulas:'}</strong>{' '}
        {financeFunctions.map((fn) => `=${fn}(A1:A3)`).join(' · ')}
      </div>
    </div>
  );
}
