import type { ReactNode } from 'react';
import type { TooltipPlacement } from '../../entities/component/model/preview.types';

export type { TooltipPlacement };

export type GridifyTooltipProps = {
  message: string;
  placement?: TooltipPlacement;
  theme?: 'light' | 'dark';
  multiline?: boolean;
  width?: number;
  visible?: boolean;
  children?: ReactNode;
};
