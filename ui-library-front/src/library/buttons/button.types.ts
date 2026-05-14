import type { ButtonHTMLAttributes } from 'react';

export type GridifyButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'success';

export type GridifyButtonSize = 'sm' | 'md' | 'lg';

export type GridifyButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: GridifyButtonVariant;
  size?: GridifyButtonSize;
  loading?: boolean;
};
