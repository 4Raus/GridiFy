import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type GridifyActionButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost';
export type GridifyActionButtonIntent = 'neutral' | 'brand' | 'success' | 'warning' | 'danger';
export type GridifyActionButtonSize = 'sm' | 'md' | 'lg';

export type GridifyActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: GridifyActionButtonVariant;
  intent?: GridifyActionButtonIntent;
  size?: GridifyActionButtonSize;
  iconSlot?: ReactNode;
  trailingSlot?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  showBrandPrefix?: boolean;
  brandPrefixText?: string;
  children: ReactNode;
};
