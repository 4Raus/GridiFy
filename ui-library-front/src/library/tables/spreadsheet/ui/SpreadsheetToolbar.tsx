import type { CellRange } from '../model/spreadsheet.types';
import { getSelectionLabel } from '../model/selectionModel';
import type { Locale } from '../../../../shared/types/locale';
import { t } from '../../../../shared/lib/i18n';

type SpreadsheetToolbarProps = {
  locale: Locale;
  selection: CellRange | null;
  onAddRow: () => void;
  onDeleteRow: () => void;
  onAddColumn: () => void;
  onDeleteColumn: () => void;
  onMerge: () => void;
  onUnmerge: () => void;
  canDeleteRow: boolean;
  canDeleteColumn: boolean;
};

export default function SpreadsheetToolbar({
  locale,
  selection,
  onAddRow,
  onDeleteRow,
  onAddColumn,
  onDeleteColumn,
  onMerge,
  onUnmerge,
  canDeleteRow,
  canDeleteColumn,
}: SpreadsheetToolbarProps) {
  return (
    <div className="spreadsheet-toolbar">
      <button className="ghost-button" type="button" onClick={onAddRow}>
        + {t({ ru: 'строка', en: 'row', de: 'Zeile' }, locale)}
      </button>
      <button className="ghost-button" type="button" onClick={onDeleteRow} disabled={!canDeleteRow}>
        − {t({ ru: 'строки', en: 'rows', de: 'Zeilen' }, locale)}
      </button>
      <button className="ghost-button" type="button" onClick={onAddColumn}>
        + {t({ ru: 'столбец', en: 'column', de: 'Spalte' }, locale)}
      </button>
      <button className="ghost-button" type="button" onClick={onDeleteColumn} disabled={!canDeleteColumn}>
        − {t({ ru: 'столбцы', en: 'columns', de: 'Spalten' }, locale)}
      </button>
      <button className="ghost-button" type="button" onClick={onMerge}>
        {t({ ru: 'Объединить', en: 'Merge', de: 'Verbinden' }, locale)}
      </button>
      <button className="ghost-button" type="button" onClick={onUnmerge}>
        {t({ ru: 'Разъединить', en: 'Unmerge', de: 'Trennen' }, locale)}
      </button>
      <span className="spreadsheet-toolbar__selection">
        {selection ? getSelectionLabel(selection) : t({ ru: 'Нет выделения', en: 'No selection', de: 'Keine Auswahl' }, locale)}
      </span>
    </div>
  );
}
