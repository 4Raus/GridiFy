import type { CellRange } from '../model/spreadsheet.types';
import { getSelectionLabel } from '../model/selectionModel';

type FormulaBarProps = {
  activeCell: CellRange | null;
  value: string;
  result: string;
  resultTitle?: string;
  onChange: (value: string) => void;
  onApply: () => void;
};

export default function FormulaBar({
  activeCell,
  value,
  result,
  resultTitle,
  onChange,
  onApply,
}: FormulaBarProps) {
  return (
    <div className="formula-bar">
      <span>{activeCell ? getSelectionLabel(activeCell) : 'fx'}</span>
      <input
        aria-label="Formula input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') onApply();
        }}
        placeholder="=SUM(B1:B3)"
      />
      <output className="formula-bar__result" title={resultTitle}>
        Result: {result || '-'}
      </output>
      <button className="ghost-button" type="button" onClick={onApply}>
        OK
      </button>
    </div>
  );
}
