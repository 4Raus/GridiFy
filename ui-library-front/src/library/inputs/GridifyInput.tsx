import { useId, useState } from 'react';
import type { GridifyInputProps } from './input.types';
import './GridifyInput.css';

export default function GridifyInput({
  label,
  value,
  placeholder,
  state = 'default',
  size = 'md',
  required = false,
  helperText,
  errorText,
  disabled = false,
  readOnly = false,
  type = 'text',
  onChange,
}: GridifyInputProps) {
  const inputId = useId();
  const [internalValue, setInternalValue] = useState(value ?? '');
  const isDisabled = disabled || state === 'disabled';
  const isError = state === 'error';
  const displayValue = value ?? internalValue;

  const handleChange = (next: string) => {
    setInternalValue(next);
    onChange?.(next);
  };

  return (
    <label className={`gridify-input gridify-input--${size} gridify-input--${state}`} htmlFor={inputId}>
      {label && (
        <span className="gridify-input__label">
          {label}{required && <span aria-hidden="true"> *</span>}
        </span>
      )}
      <input
        id={inputId}
        type={type}
        value={displayValue}
        placeholder={placeholder}
        disabled={isDisabled}
        readOnly={readOnly}
        required={required}
        aria-invalid={isError}
        aria-describedby={helperText || errorText ? `${inputId}-hint` : undefined}
        onChange={(event) => handleChange(event.target.value)}
      />
      {(helperText || isError) && (
        <span id={`${inputId}-hint`} className="gridify-input__message">
          {isError ? (errorText || 'Error') : helperText}
        </span>
      )}
    </label>
  );
}
