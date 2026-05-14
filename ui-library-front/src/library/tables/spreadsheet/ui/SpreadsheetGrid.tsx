import type {
  CellPoint,
  CellRange,
  SpreadsheetData,
  SpreadsheetMerge,
  SpreadsheetViewMode,
} from '../model/spreadsheet.types';
import type { FormulaEvaluation } from '../model/formulaEngine';
import { getColumnLetter } from '../model/cellAddress';
import type { Locale } from '../../../../shared/types/locale';
import { t } from '../../../../shared/lib/i18n';

type SpreadsheetGridProps = {
  data: SpreadsheetData;
  editable: boolean;
  selection: CellRange | null;
  selectionStart: CellPoint | null;
  activeCell: CellPoint | null;
  isSelecting: boolean;
  viewMode: SpreadsheetViewMode;
  locale: Locale;
  evaluateCell: (row: number, col: number) => FormulaEvaluation;
  onSelectionStart: (point: CellPoint) => void;
  onSelectionEnd: (point: CellPoint) => void;
  onSelectingChange: (isSelecting: boolean) => void;
  onActiveCellChange: (point: CellPoint) => void;
  onCellChange: (rowIndex: number, colIndex: number, value: string) => void;
  onColumnLabelChange: (columnIndex: number, label: string) => void;
};

function isHiddenByMerge(merges: SpreadsheetMerge[], row: number, col: number) {
  return merges.some((merge) => {
    const within =
      row >= merge.row &&
      row < merge.row + merge.rowSpan &&
      col >= merge.col &&
      col < merge.col + merge.colSpan;

    return within && !(row === merge.row && col === merge.col);
  });
}

function getMergeAt(merges: SpreadsheetMerge[], row: number, col: number) {
  return merges.find((merge) => merge.row === row && merge.col === col);
}

function cellClassName(selected: boolean, isFormula: boolean, hasError: boolean) {
  return [
    selected ? 'selected' : '',
    isFormula ? 'spreadsheet-table__cell--formula' : '',
    hasError ? 'spreadsheet-table__cell--formula-error' : '',
  ].filter(Boolean).join(' ');
}

function fallbackColumnLabel(index: number, locale: Locale) {
  return t(
    {
      ru: `Столбец ${index + 1}`,
      en: `Column ${index + 1}`,
      de: `Spalte ${index + 1}`,
    },
    locale,
  );
}

export default function SpreadsheetGrid({
  data,
  editable,
  selection,
  selectionStart,
  activeCell,
  isSelecting,
  viewMode,
  locale,
  evaluateCell,
  onSelectionStart,
  onSelectionEnd,
  onSelectingChange,
  onActiveCellChange,
  onCellChange,
  onColumnLabelChange,
}: SpreadsheetGridProps) {
  const merges = data.merges ?? [];
  const showCoordinates = viewMode === 'spreadsheet';

  const renderColumnLabel = (label: string, index: number, mode: 'coordinate' | 'business') => {
    if (!editable) return <span>{label || fallbackColumnLabel(index, locale)}</span>;
    return (
      <input
        className={`spreadsheet-table__header-input spreadsheet-table__header-input--${mode}`}
        aria-label={`Column ${getColumnLetter(index)} label`}
        value={label}
        onChange={(event) => onColumnLabelChange(index, event.target.value)}
        onBlur={(event) => {
          if (!event.target.value.trim()) onColumnLabelChange(index, fallbackColumnLabel(index, locale));
        }}
      />
    );
  };

  return (
    <div className="spreadsheet-wrap">
      <table className="spreadsheet-table">
        {showCoordinates && (
          <thead>
            <tr>
              <th className="spreadsheet-table__corner" />
              {data.columns.map((column, index) => (
                <th key={column.key}>
                  <span className="spreadsheet-table__coordinate">{getColumnLetter(index)}</span>
                  {renderColumnLabel(column.label, index, 'coordinate')}
                </th>
              ))}
            </tr>
          </thead>
        )}

        <tbody>
          {!showCoordinates && (
            <tr className="spreadsheet-business-head">
              {data.columns.map((column, index) => (
                <th key={column.key}>{renderColumnLabel(column.label, index, 'business')}</th>
              ))}
            </tr>
          )}

          {data.rows.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {showCoordinates && <th>{rowIndex + 1}</th>}
              {row.map((cell, colIndex) => {
                if (isHiddenByMerge(merges, rowIndex, colIndex)) return null;

                const merge = getMergeAt(merges, rowIndex, colIndex);
                const selected = Boolean(
                  selection &&
                    rowIndex >= selection.startRow &&
                    rowIndex <= selection.endRow &&
                    colIndex >= selection.startCol &&
                    colIndex <= selection.endCol,
                );
                const active = Boolean(activeCell?.row === rowIndex && activeCell.col === colIndex);
                const evaluated = evaluateCell(rowIndex, colIndex);
                const formula = cell.trim().startsWith('=');
                const title = formula
                  ? `${cell} = ${evaluated.display}${evaluated.detail ? ` (${evaluated.detail})` : ''}`
                  : evaluated.display;

                return (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    rowSpan={merge?.rowSpan}
                    colSpan={merge?.colSpan}
                    className={cellClassName(selected, formula, Boolean(evaluated.error))}
                    title={title}
                    aria-label={formula ? `Formula cell ${getColumnLetter(colIndex)}${rowIndex + 1}: ${title}` : undefined}
                    onMouseDown={(event) => {
                      if (!editable || event.button !== 0) return;
                      const point = { row: rowIndex, col: colIndex };
                      onSelectingChange(true);
                      onActiveCellChange(point);
                      onSelectionStart(point);
                      onSelectionEnd(point);
                    }}
                    onMouseEnter={(event) => {
                      if (!editable || !isSelecting || event.buttons !== 1 || !selectionStart) return;
                      onSelectionEnd({ row: rowIndex, col: colIndex });
                    }}
                  >
                    {editable && active ? (
                      <input
                        autoFocus
                        value={cell}
                        onChange={(event) => onCellChange(rowIndex, colIndex, event.target.value)}
                        onFocus={() => {
                          const point = { row: rowIndex, col: colIndex };
                          onActiveCellChange(point);
                          onSelectionStart(point);
                          onSelectionEnd(point);
                        }}
                        placeholder={data.columns[colIndex]?.type === 'text' ? '' : '0'}
                      />
                    ) : (
                      <span>{formula ? evaluated.display : evaluated.display}</span>
                    )}
                    {formula && <span className="spreadsheet-table__fx-badge">fx</span>}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
