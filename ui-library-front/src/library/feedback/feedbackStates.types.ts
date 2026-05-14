import type { FeedbackStateType } from '../../entities/component/model/preview.types';

export type FeedbackStatesProps = {
  states: Array<{
    type: FeedbackStateType;
    label: string;
    message?: string;
  }>;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  orientation?: 'row' | 'grid';
};
