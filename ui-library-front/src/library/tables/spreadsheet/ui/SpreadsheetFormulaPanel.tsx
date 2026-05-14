import { useMemo, useState } from 'react';
import type { CellPoint, SpreadsheetData } from '../model/spreadsheet.types';
import { getColumnLetter } from '../model/cellAddress';
import { createFormulaEvaluationCache } from '../model/formulaEngine';
import type { Locale } from '../../../../shared/types/locale';
import { t } from '../../../../shared/lib/i18n';

type Props = {
  data: SpreadsheetData;
  locale: Locale;
  activeCell: CellPoint | null;
  onApply: (target: CellPoint, value: string) => void;
};

const examples = [
  '=SUM(A1:A3)',
  '=AVG(A1:A3)',
  '=MIN(A1:A3)',
  '=MAX(A1:A3)',
  '=COUNT(A1:A3)',
  '=ROUND(AVG(A1:A3);2)',
  '=NPV(0.1;B1:B3)',
  '=PMT(0.1;12;100000)',
];

function address(point: CellPoint) {
  return `${getColumnLetter(point.col)}${point.row + 1}`;
}

function parseAddress(value: string): CellPoint {
  const match = value.match(/^(\d+):(\d+)$/);
  return {
    row: Number(match?.[1] ?? 0),
    col: Number(match?.[2] ?? 0),
  };
}

function dataWithDraft(data: SpreadsheetData, target: CellPoint, value: string): SpreadsheetData {
  return {
    ...data,
    rows: data.rows.map((row, rowIndex) => (
      rowIndex === target.row
        ? row.map((cell, colIndex) => (colIndex === target.col ? value : cell))
        : [...row]
    )),
  };
}

export default function SpreadsheetFormulaPanel({ data, locale, activeCell, onApply }: Props) {
  const [formula, setFormula] = useState(examples[0]);
  const [manualTargetValue, setManualTargetValue] = useState<string | null>(null);

  const cells = useMemo(() => data.rows.flatMap((row, rowIndex) => (
    row.map((_, colIndex) => ({ row: rowIndex, col: colIndex }))
  )), [data.rows]);

  const activeTargetValue = activeCell ? `${activeCell.row}:${activeCell.col}` : '0:0';
  const targetValue = manualTargetValue ?? activeTargetValue;
  const target = useMemo(() => parseAddress(targetValue), [targetValue]);
  const preview = useMemo(() => {
    const draftData = dataWithDraft(data, target, formula);
    return createFormulaEvaluationCache(draftData).evaluateCell(target.row, target.col);
  }, [data, formula, target]);

  return (
    <section className="spreadsheet-formula-panel">
      <div className="spreadsheet-formula-panel__controls">
        <label>
          <span>{t({ ru: 'Quick formula', en: 'Quick formula', de: 'Quick Formula' }, locale)}</span>
          <input
            aria-label="Quick formula"
            value={formula}
            onChange={(event) => setFormula(event.target.value)}
          />
        </label>
        <label>
          <span>{t({ ru: 'Target cell', en: 'Target cell', de: 'Zielzelle' }, locale)}</span>
          <select
            aria-label="Target cell"
            value={targetValue}
            onChange={(event) => setManualTargetValue(event.target.value)}
          >
            {cells.map((cell) => (
              <option key={`${cell.row}:${cell.col}`} value={`${cell.row}:${cell.col}`}>
                {address(cell)}
              </option>
            ))}
          </select>
        </label>
        <output className="spreadsheet-formula-panel__result" title={preview.detail}>
          {preview.error ? preview.error : preview.display || '-'}
        </output>
        <button type="button" className="secondary-button" onClick={() => onApply(target, formula)}>
          {t({ ru: 'Apply to active cell', en: 'Apply to active cell', de: 'Auf aktive Zelle anwenden' }, locale)}
        </button>
      </div>
      <div className="spreadsheet-formula-panel__examples">
        {examples.map((example) => (
          <button key={example} type="button" className="ghost-button" onClick={() => setFormula(example)}>
            {example}
          </button>
        ))}
      </div>
    </section>
  );
}
