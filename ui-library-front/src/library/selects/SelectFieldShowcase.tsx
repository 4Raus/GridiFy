import GridifySelect from './GridifySelect';
import type { GridifySelectProps, GridifySelectState } from './select.types';

type Props = GridifySelectProps & {
  viewMode?: 'single' | 'allStates' | 'dropdown';
};

const states: GridifySelectState[] = ['default', 'hover', 'focus', 'filled', 'disabled', 'error'];

export default function SelectFieldShowcase({
  viewMode = 'single',
  ...props
}: Props) {
  if (viewMode === 'allStates') {
    return (
      <div className="gridify-select-showcase gridify-select-showcase--grid">
        {states.map((state) => (
          <GridifySelect
            key={state}
            {...props}
            state={state}
            value={state === 'filled' ? props.options[0]?.value : props.value}
            open={false}
            errorText={state === 'error' ? props.errorText || 'Error' : props.errorText}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="gridify-select-showcase">
      <GridifySelect {...props} open={viewMode === 'dropdown' ? true : props.open} />
    </div>
  );
}
