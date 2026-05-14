export type GridifySelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type GridifySelectState = 'default' | 'hover' | 'focus' | 'filled' | 'disabled' | 'error';
export type GridifySelectMode = 'single' | 'search' | 'multiple';
export type GridifySelectSize = 'sm' | 'md' | 'lg';

export type GridifySelectProps = {
  label?: string;
  placeholder?: string;
  value?: string | string[];
  options: GridifySelectOption[];
  mode?: GridifySelectMode;
  state?: GridifySelectState;
  size?: GridifySelectSize;
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  errorText?: string;
  open?: boolean;
  onChange?: (value: string | string[]) => void;
};
