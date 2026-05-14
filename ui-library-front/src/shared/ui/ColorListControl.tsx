import type { Locale } from '../types/locale';
import { t } from '../lib/i18n';
import ColorControl from './ColorControl';
import { presetColors } from './colorControl.model';

type ColorListControlProps = {
  values: string[];
  onChange: (next: string[]) => void;
  label?: string;
  disabled?: boolean;
  locale?: Locale;
  requiredCount?: number;
};

export default function ColorListControl({
  values,
  onChange,
  label,
  disabled = false,
  locale = 'ru',
  requiredCount = 0,
}: ColorListControlProps) {
  const addColor = () => {
    const nextColor = presetColors[values.length % presetColors.length];
    onChange([...values, nextColor]);
  };

  const updateColor = (index: number, color: string) => {
    onChange(values.map((item, itemIndex) => (itemIndex === index ? color : item)));
  };

  const removeColor = (index: number) => {
    onChange(values.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <div className="color-list-control">
      <div className="color-list-control__head">
        {label && <span>{label}</span>}
        <button type="button" className="ghost-button" onClick={addColor} disabled={disabled}>
          {t({ ru: 'Добавить', en: 'Add', de: 'Hinzufügen' }, locale)}
        </button>
      </div>
      <div className="color-list-control__items">
        {values.map((color, index) => (
          <div key={`${color}-${index}`} className="color-list-control__item">
            <ColorControl
              label={`${t({ ru: 'Сегмент', en: 'Segment', de: 'Segment' }, locale)} ${index + 1}`}
              value={color}
              onChange={(nextColor) => updateColor(index, nextColor)}
              disabled={disabled}
              locale={locale}
            />
            <button type="button" className="ghost-button" onClick={() => removeColor(index)} disabled={disabled || values.length <= 1}>
              {t({ ru: 'Удалить', en: 'Remove', de: 'Entfernen' }, locale)}
            </button>
          </div>
        ))}
      </div>
      {values.length < requiredCount && (
        <small className="color-control__error">
          {t(
            {
              ru: 'Цветов меньше, чем сегментов.',
              en: 'There are fewer colors than segments.',
              de: 'Es gibt weniger Farben als Segmente.',
            },
            locale,
          )}
        </small>
      )}
    </div>
  );
}
