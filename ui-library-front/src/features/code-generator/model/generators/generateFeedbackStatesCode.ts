import type { ComponentRegistryItem } from '../../../../entities/component/model/component.types';
import type { PlaygroundState } from '../../../component-playground/model/playground.types';
import { createGeneratedCode, formatTsValue, stringifyProps } from '../generateComponentCode';

export function generateFeedbackStatesCode(item: ComponentRegistryItem, state: PlaygroundState) {
  const props = {
    states: item.previewData?.feedbackStates?.states ?? [],
    size: state.size === 'sm' || state.size === 'lg' ? state.size : 'md',
    showLabels: state.showLabels !== false,
    orientation: state.orientation === 'grid' ? 'grid' : 'row',
  };

  const code = `
import { FeedbackStates } from 'gridify';

export function Demo() {
  return <FeedbackStates states={${formatTsValue(props.states)}} size="${props.size}" showLabels={${props.showLabels}} orientation="${props.orientation}" />;
}
`;

  return createGeneratedCode(code, stringifyProps(props));
}
