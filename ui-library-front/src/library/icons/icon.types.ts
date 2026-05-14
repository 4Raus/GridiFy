import type { FeedbackStateType } from '../../entities/component/model/preview.types';

export type GridifyIconName =
  | 'neutral'
  | 'info'
  | 'warning'
  | 'error'
  | 'success'
  | 'plus'
  | 'copy'
  | 'check'
  | 'close'
  | 'chevron-down'
  | 'search';

export type GridifyIconTone = FeedbackStateType | 'brand';
export type GridifyIconVariant = 'solid' | 'soft' | 'outline';

export type GridifyIconProps = {
  name: GridifyIconName;
  size?: 16 | 20 | 24 | 32;
  tone?: GridifyIconTone;
  variant?: GridifyIconVariant;
  label?: string;
};

export type GridifyIconSetProps = {
  icons: Array<{ name: string; type: FeedbackStateType }>;
  variant?: GridifyIconVariant;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  selectedIcon?: string;
};
