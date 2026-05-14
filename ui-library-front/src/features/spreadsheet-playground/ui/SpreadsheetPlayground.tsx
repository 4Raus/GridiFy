import type { Dispatch, SetStateAction } from 'react';
import { t } from '../../../shared/lib/i18n';
import type { Locale } from '../../../shared/types/locale';
import type { SpreadsheetViewMode } from '../../../library/tables/spreadsheet/model/spreadsheet.types';

type Props = {
  locale: Locale;
  tableViewMode: SpreadsheetViewMode;
  setTableViewMode: Dispatch<SetStateAction<SpreadsheetViewMode>>;
  editable: boolean;
  setEditable: (next: boolean) => void;
  height: number;
  setHeight: (next: number) => void;
};

export default function SpreadsheetPlayground({
  locale,
  tableViewMode,
  setTableViewMode,
  editable,
  setEditable,
  height,
  setHeight,
}: Props) {
  return (
    <div className="component-helper-box">
      <label className="form-field">
        <span>{t({ ru: 'Высота', en: 'Height', de: 'Höhe' }, locale)}</span>
        <input
          type="range"
          min="320"
          max="760"
          step="10"
          value={height}
          onChange={(event) => setHeight(Number(event.target.value))}
        />
      </label>
      <label className="checkbox-field">
        <input
          type="checkbox"
          checked={editable}
          onChange={(event) => setEditable(event.target.checked)}
        />
        <span>{t({ ru: 'Редактирование', en: 'Editable', de: 'Editierbar' }, locale)}</span>
      </label>
      <p>{t({ ru: 'Вид таблицы:', en: 'Table view:', de: 'Tabellenansicht:' }, locale)}</p>
      <div className="segmented-control">
        <button
          type="button"
          className={tableViewMode === 'spreadsheet' ? 'active' : ''}
          onClick={() => setTableViewMode('spreadsheet')}
        >
          {t({ ru: 'С координатами', en: 'With coordinates', de: 'Mit Koordinaten' }, locale)}
        </button>
        <button
          type="button"
          className={tableViewMode === 'app' ? 'active' : ''}
          onClick={() => setTableViewMode('app')}
        >
          {t({ ru: 'Для сайта', en: 'Website view', de: 'Website-Ansicht' }, locale)}
        </button>
      </div>
      <ul>
        <li>
          {t(
            {
              ru: 'формулы вводятся в ячейку или строку fx',
              en: 'formulas can be entered in a cell or the fx bar',
              de: 'Formeln können in eine Zelle oder die fx-Leiste eingegeben werden',
            },
            locale,
          )}
        </li>
        <li>
          {t(
            {
              ru: 'диапазон выделяется только при зажатой левой кнопке мыши',
              en: 'range selection works only while holding the left mouse button',
              de: 'Bereichsauswahl funktioniert bei gedrückter linker Maustaste',
            },
            locale,
          )}
        </li>
        <li>
          {t(
            {
              ru: 'доступны SUM / AVG / MIN / MAX / COUNT / ROUND / ABS / IF / NPV / PMT',
              en: 'SUM / AVG / MIN / MAX / COUNT / ROUND / ABS / IF / NPV / PMT are available',
              de: 'SUM / AVG / MIN / MAX / COUNT / ROUND / ABS / IF / NPV / PMT sind verfügbar',
            },
            locale,
          )}
        </li>
      </ul>
    </div>
  );
}
