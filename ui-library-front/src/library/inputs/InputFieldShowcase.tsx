import GridifyInput from './GridifyInput';
import type { GridifyInputProps, GridifyInputState } from './input.types';

type Props = GridifyInputProps & {
  viewMode?: 'single' | 'allStates';
};

const states: GridifyInputState[] = ['default', 'hover', 'focus', 'filled', 'disabled', 'error'];

export default function InputFieldShowcase({
  viewMode = 'single',
  ...props
}: Props) {
  if (viewMode === 'allStates') {
    return (
      <div className="gridify-input-showcase gridify-input-showcase--grid">
        {states.map((state) => (
          <GridifyInput
            key={state}
            {...props}
            state={state}
            value={state === 'default' || state === 'hover' || state === 'focus' ? '' : props.value || 'Entered'}
            errorText={state === 'error' ? props.errorText || 'Error' : props.errorText}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="gridify-input-showcase">
      <GridifyInput {...props} />
    </div>
  );
}
