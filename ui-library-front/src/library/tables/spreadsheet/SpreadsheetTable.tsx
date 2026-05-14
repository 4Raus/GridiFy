import { useCallback, useEffect, useMemo, useState } from 'react';
import FormulaBar from './ui/FormulaBar';
import SpreadsheetFormulaPanel from './ui/SpreadsheetFormulaPanel';
import SpreadsheetGrid from './ui/SpreadsheetGrid';
import SpreadsheetToolbar from './ui/SpreadsheetToolbar';
import { createFormulaEvaluationCache, financeFunctions } from './model/formulaEngine';
import { buildSpreadsheetValidation } from './model/spreadsheetValidation';
import { sanitizeInputByType } from './model/spreadsheetFormatting';
import {
  addColumn as addSpreadsheetColumn,
  addRow as addSpreadsheetRow,
  deleteColumns,
  deleteRows,
  normalizeRange,
} from './model/selectionModel';
import type {
  CellPoint,
  CellRange,
  SpreadsheetData,
  SpreadsheetValidationMessage,
  SpreadsheetViewMode,
} from './model/spreadsheet.types';
import type { Locale } from '../../../shared/types/locale';
import { t } from '../../../shared/lib/i18n';

type Props = {
  data: SpreadsheetData;
  height?: number;
  editable?: boolean;
  locale?: Locale;
  viewMode?: SpreadsheetViewMode;
  onChange?: (next: SpreadsheetData) => void;
  onValidationChange?: (messages: SpreadsheetValidationMessage[]) => void;
  onColumnLabelChange?: (index: number, label: string) => void;
};

function activeCellToRange(activeCell: CellPoint | null): CellRange | null {
  if (!activeCell) return null;

  return {
    startRow: activeCell.row,
    endRow: activeCell.row,
    startCol: activeCell.col,
    endCol: activeCell.col,
  };
}

export default function SpreadsheetTable({
  data,
  height = 360,
  editable = false,
  locale = 'ru',
  viewMode = 'spreadsheet',
  onChange,
  onValidationChange,
  onColumnLabelChange,
}: Props) {
  const [selectionStart, setSelectionStart] = useState<CellPoint | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<CellPoint | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [activeCell, setActiveCell] = useState<CellPoint | null>(null);
  const [formulaInput, setFormulaInput] = useState('');

  const merges = useMemo(() => data.merges ?? [], [data.merges]);
  const formulaCache = useMemo(() => createFormulaEvaluationCache(data), [data]);
  const validation = useMemo(() => buildSpreadsheetValidation(data, locale), [data, locale]);
  const selection = useMemo(
    () => (selectionStart && selectionEnd ? normalizeRange(selectionStart, selectionEnd) : null),
    [selectionEnd, selectionStart],
  );
  const activeRange = useMemo(() => activeCellToRange(activeCell), [activeCell]);
  const formulaPreview = useMemo(() => {
    if (!activeCell) return null;
    const draftData: SpreadsheetData = {
      ...data,
      rows: data.rows.map((row, rowIndex) => (
        rowIndex === activeCell.row
          ? row.map((cell, colIndex) => (colIndex === activeCell.col ? formulaInput : cell))
          : [...row]
      )),
    };
    return createFormulaEvaluationCache(draftData).evaluateCell(activeCell.row, activeCell.col);
  }, [activeCell, data, formulaInput]);

  useEffect(() => {
    onValidationChange?.(validation);
  }, [onValidationChange, validation]);

  const updateData = useCallback((next: SpreadsheetData) => onChange?.(next), [onChange]);

  const resetInteractionState = useCallback(() => {
    setSelectionStart(null);
    setSelectionEnd(null);
    setActiveCell(null);
    setFormulaInput('');
    setIsSelecting(false);
  }, []);

  const handleActiveCellChange = useCallback((point: CellPoint) => {
    setActiveCell(point);
    setFormulaInput(data.rows[point.row]?.[point.col] ?? '');
  }, [data.rows]);

  const setCell = useCallback((rowIndex: number, colIndex: number, value: string) => {
    const nextRows = data.rows.map((row) => [...row]);
    const type = data.columns[colIndex]?.type ?? 'text';
    nextRows[rowIndex][colIndex] = sanitizeInputByType(value, type);
    if (activeCell?.row === rowIndex && activeCell.col === colIndex) setFormulaInput(value);
    updateData({ ...data, rows: nextRows });
  }, [activeCell, data, updateData]);

  const setColumnLabel = useCallback((columnIndex: number, label: string) => {
    const fallback = t(
      {
        ru: `Столбец ${columnIndex + 1}`,
        en: `Column ${columnIndex + 1}`,
        de: `Spalte ${columnIndex + 1}`,
      },
      locale,
    );
    const nextColumns = data.columns.map((column, index) => (
      index === columnIndex ? { ...column, label: label.trim() ? label : fallback } : column
    ));
    onColumnLabelChange?.(columnIndex, label.trim() ? label : fallback);
    updateData({ ...data, columns: nextColumns });
  }, [data, locale, onColumnLabelChange, updateData]);

  const addRow = useCallback(() => {
    updateData(addSpreadsheetRow(data));
  }, [data, updateData]);

  const addColumn = useCallback(() => {
    updateData(addSpreadsheetColumn(data, locale));
  }, [data, locale, updateData]);

  const deleteRow = useCallback(() => {
    updateData(deleteRows(data, selection));
    resetInteractionState();
  }, [data, resetInteractionState, selection, updateData]);

  const deleteColumn = useCallback(() => {
    updateData(deleteColumns(data, selection));
    resetInteractionState();
  }, [data, resetInteractionState, selection, updateData]);

  const mergeSelection = useCallback(() => {
    if (!selection || (selection.startRow === selection.endRow && selection.startCol === selection.endCol)) {
      return;
    }

    const intersects = merges.some(
      (merge) =>
        selection.startRow <= merge.row + merge.rowSpan - 1 &&
        selection.endRow >= merge.row &&
        selection.startCol <= merge.col + merge.colSpan - 1 &&
        selection.endCol >= merge.col,
    );

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
  }, [data, merges, selection, updateData]);

  const unmergeSelection = useCallback(() => {
    if (!selection) return;
    updateData({
      ...data,
      merges: merges.filter(
        (merge) =>
          !(
            merge.row >= selection.startRow &&
            merge.row <= selection.endRow &&
            merge.col >= selection.startCol &&
            merge.col <= selection.endCol
        ),
      ),
    });
  }, [data, merges, selection, updateData]);

  const applyFormulaBar = useCallback(() => {
    if (!activeCell) return;
    setCell(activeCell.row, activeCell.col, formulaInput);
  }, [activeCell, formulaInput, setCell]);

  const applyFormulaPanel = useCallback((target: CellPoint, value: string) => {
    setCell(target.row, target.col, value);
    setActiveCell(target);
    setFormulaInput(value);
  }, [setCell]);

  const evaluateCell = useCallback((row: number, col: number) => formulaCache.evaluateCell(row, col), [formulaCache]);

  return (
    <div
      className={`spreadsheet-shell spreadsheet-shell--${viewMode}`}
      style={{ minHeight: height }}
      onMouseLeave={() => setIsSelecting(false)}
      onMouseUp={() => setIsSelecting(false)}
    >
      {editable && (
        <SpreadsheetToolbar
          locale={locale}
          selection={selection}
          onAddRow={addRow}
          onDeleteRow={deleteRow}
          onAddColumn={addColumn}
          onDeleteColumn={deleteColumn}
          onMerge={mergeSelection}
          onUnmerge={unmergeSelection}
          canDeleteRow={data.rows.length > 1}
          canDeleteColumn={data.columns.length > 1}
        />
      )}

      {editable && (
        <FormulaBar
          activeCell={activeRange}
          value={formulaInput}
          result={formulaPreview?.display ?? ''}
          resultTitle={formulaPreview?.detail}
          onChange={setFormulaInput}
          onApply={applyFormulaBar}
        />
      )}

      <SpreadsheetGrid
        data={data}
        editable={editable}
        selection={selection}
        selectionStart={selectionStart}
        activeCell={activeCell}
        isSelecting={isSelecting}
        viewMode={viewMode}
        locale={locale}
        evaluateCell={evaluateCell}
        onSelectionStart={setSelectionStart}
        onSelectionEnd={setSelectionEnd}
        onSelectingChange={setIsSelecting}
        onActiveCellChange={handleActiveCellChange}
        onCellChange={setCell}
        onColumnLabelChange={setColumnLabel}
      />

      {editable && (
        <SpreadsheetFormulaPanel
          data={data}
          locale={locale}
          activeCell={activeCell}
          onApply={applyFormulaPanel}
        />
      )}

      <div className="spreadsheet-footnote">
        <strong>{t({ ru: 'Формулы:', en: 'Formulas:', de: 'Formeln:' }, locale)}</strong>{' '}
        {financeFunctions
          .map((fn) => {
            if (fn === 'PMT') return '=PMT(0.1;12;100000)';
            if (fn === 'NPV') return '=NPV(0.1;B1:B3)';
            if (fn === 'ROUND') return '=ROUND(AVG(A1:A3);2)';
            if (fn === 'ABS') return '=ABS(A1-B1)';
            if (fn === 'IF') return '=IF(B1>100;OK;Check)';
            return `=${fn}(A1:A3)`;
          })
          .join(' · ')}
      </div>
    </div>
  );
}

export type {
  SpreadsheetData,
  SpreadsheetValidationMessage,
  SpreadsheetViewMode,
} from './model/spreadsheet.types';
