import { useId, useMemo, useState } from 'react';
import GridifyIcon from '../icons/GridifyIcon';
import type { GridifySelectOption, GridifySelectProps } from './select.types';
import './GridifySelect.css';

function asArray(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value;
  return value ? [value] : [];
}

function selectedLabels(options: GridifySelectOption[], value: string | string[] | undefined) {
  const values = asArray(value);
  return values.map((item) => options.find((option) => option.value === item)?.label ?? item);
}

export default function GridifySelect({
  label,
  placeholder = 'Select',
  value,
  options,
  mode = 'single',
  state = 'default',
  size = 'md',
  searchable = false,
  clearable = false,
  disabled = false,
  errorText,
  open,
  onChange,
}: GridifySelectProps) {
  const listboxId = useId();
  const [internalOpen, setInternalOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | string[]>(value ?? (mode === 'multiple' ? [] : ''));
  const [query, setQuery] = useState('');
  const isDisabled = disabled || state === 'disabled';
  const isOpen = open ?? (internalOpen || state === 'focus');
  const currentValue = value ?? internalValue;
  const labels = selectedLabels(options, currentValue);
  const hasValue = labels.length > 0;
  const effectiveSearchable = searchable || mode === 'search';
  const filteredOptions = useMemo(() => (
    effectiveSearchable && query
      ? options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()))
      : options
  ), [effectiveSearchable, options, query]);

  const applyValue = (next: string | string[]) => {
    setInternalValue(next);
    onChange?.(next);
  };

  const selectOption = (option: GridifySelectOption) => {
    if (option.disabled) return;
    if (mode === 'multiple') {
      const values = asArray(currentValue);
      applyValue(values.includes(option.value)
        ? values.filter((item) => item !== option.value)
        : [...values, option.value]);
      return;
    }
    applyValue(option.value);
    setInternalOpen(false);
  };

  const clear = () => {
    applyValue(mode === 'multiple' ? [] : '');
  };

  return (
    <div className={`gridify-select gridify-select--${size} gridify-select--${state} ${hasValue ? 'gridify-select--filled' : ''}`}>
      {label && <span className="gridify-select__label">{label}</span>}
      <button
        type="button"
        className="gridify-select__trigger"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        disabled={isDisabled}
        onClick={() => setInternalOpen((current) => !current)}
      >
        <span className={`gridify-select__value ${!hasValue ? 'is-placeholder' : ''}`}>
          {mode === 'multiple' && hasValue ? (
            labels.slice(0, 2).map((item) => <span key={item} className="gridify-select__chip">{item}</span>)
          ) : (
            labels[0] ?? placeholder
          )}
          {mode === 'multiple' && labels.length > 2 && <span className="gridify-select__chip">+{labels.length - 2}</span>}
        </span>
        {clearable && hasValue && (
          <span className="gridify-select__clear" role="button" tabIndex={0} onClick={(event) => { event.stopPropagation(); clear(); }}>
            <GridifyIcon name="close" size={16} tone={state === 'error' ? 'error' : 'neutral'} variant="soft" label="Clear" />
          </span>
        )}
        <GridifyIcon name="chevron-down" size={16} tone={state === 'error' ? 'error' : 'neutral'} variant="soft" />
      </button>
      {state === 'error' && <span className="gridify-select__message">{errorText || 'Error'}</span>}
      {isOpen && !isDisabled && (
        <div className="gridify-select__dropdown">
          {effectiveSearchable && (
            <label className="gridify-select__search">
              <GridifyIcon name="search" size={16} tone="neutral" variant="soft" />
              <input aria-label="Search options" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" />
            </label>
          )}
          <div id={listboxId} role="listbox" aria-multiselectable={mode === 'multiple'} className="gridify-select__options">
            {filteredOptions.map((option) => {
              const selected = asArray(currentValue).includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  disabled={option.disabled}
                  className={`gridify-select__option ${selected ? 'is-selected' : ''}`}
                  onClick={() => selectOption(option)}
                >
                  <span>{option.label}</span>
                  {selected && <GridifyIcon name="check" size={16} tone="info" variant="soft" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
