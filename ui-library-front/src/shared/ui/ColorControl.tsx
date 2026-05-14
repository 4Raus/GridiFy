import { useEffect, useState } from 'react';
import type { Locale } from '../types/locale';
import { t } from '../lib/i18n';
import { presetColors } from './colorControl.model';
import './ColorControl.css';

type ColorControlProps = {
  value: string;
  onChange: (next: string) => void;
  label?: string;
  disabled?: boolean;
  locale?: Locale;
  presets?: string[];
};

const hexPattern = /^#[0-9a-fA-F]{6}$/;

function normalizeHex(value: string) {
  return value.startsWith('#') ? value : `#${value}`;
}

export default function ColorControl({
  value,
  onChange,
  label,
  disabled = false,
  locale = 'ru',
  presets = presetColors,
}: ColorControlProps) {
  const [inputValue, setInputValue] = useState(value);
  const isValid = hexPattern.test(inputValue);
  const safeValue = hexPattern.test(value) ? value : '#000000';

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const updateFromText = (nextValue: string) => {
    const normalized = normalizeHex(nextValue.trim());
    setInputValue(normalized);
    if (hexPattern.test(normalized)) onChange(normalized.toLowerCase());
  };

  return (
    <div className="color-control">
      {label && <span className="color-control__label">{label}</span>}
      <div className="color-control__presets" aria-label={label}>
        {presets.map((color) => (
          <button
            key={color}
            type="button"
            className={color.toLowerCase() === value.toLowerCase() ? 'active' : ''}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
            disabled={disabled}
            aria-label={color}
          />
        ))}
      </div>
      <div className="color-control__inputs">
        <input
          type="color"
          value={safeValue}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          aria-label={label}
        />
        <input
          type="text"
          value={inputValue}
          onChange={(event) => updateFromText(event.target.value)}
          disabled={disabled}
          aria-invalid={!isValid}
          aria-label={label ? `${label} hex` : 'Color hex'}
        />
      </div>
      {!isValid && (
        <small className="color-control__error">
          {t({ ru: 'Введите hex в формате #84cc16.', en: 'Enter hex as #84cc16.', de: 'Hex im Format #84cc16 eingeben.' }, locale)}
        </small>
      )}
    </div>
  );
}
