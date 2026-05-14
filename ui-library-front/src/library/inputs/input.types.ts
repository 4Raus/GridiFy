export type GridifyInputState = 'default' | 'hover' | 'focus' | 'filled' | 'disabled' | 'error';
export type GridifyInputSize = 'sm' | 'md' | 'lg';

export type GridifyInputProps = {
  label?: string;
  value?: string;
  placeholder?: string;
  state?: GridifyInputState;
  size?: GridifyInputSize;
  required?: boolean;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  readOnly?: boolean;
  type?: 'text' | 'email' | 'number' | 'password';
  onChange?: (value: string) => void;
};
