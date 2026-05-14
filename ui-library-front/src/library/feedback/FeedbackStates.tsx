import GridifyIcon from '../icons/GridifyIcon';
import type { FeedbackStatesProps } from './feedbackStates.types';
import './FeedbackStates.css';

const iconByType = {
  neutral: 'neutral',
  info: 'info',
  warning: 'warning',
  error: 'error',
  success: 'success',
} as const;

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
} as const;

export default function FeedbackStates({
  states,
  size = 'md',
  showLabels = true,
  orientation = 'row',
}: FeedbackStatesProps) {
  return (
    <div className={`feedback-states feedback-states--${orientation} feedback-states--${size}`} role="list">
      {states.map((state) => (
        <button
          key={state.type}
          type="button"
          className={`feedback-states__item feedback-states__item--${state.type}`}
          title={state.message ?? state.label}
          aria-label={`${state.label}${state.message ? `: ${state.message}` : ''}`}
        >
          <GridifyIcon name={iconByType[state.type]} tone={state.type} variant="soft" size={sizeMap[size]} />
          {showLabels && <span>{state.label}</span>}
        </button>
      ))}
    </div>
  );
}
