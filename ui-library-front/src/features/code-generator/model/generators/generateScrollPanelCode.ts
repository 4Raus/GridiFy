import type { PlaygroundState } from '../../../component-playground/model/playground.types';
import { createGeneratedCode, stringifyProps } from '../generateComponentCode';

export function generateScrollPanelCode(state: PlaygroundState) {
  const props = {
    maxHeight: Number(state.maxHeight) || 360,
    density: state.density === 'compact' || state.density === 'comfortable' ? state.density : 'default',
    itemCount: Number(state.itemCount) || 18,
  };

  const code = `
import { ScrollPanelShowcase } from 'gridify';

export function Demo() {
  return (
    <ScrollPanelShowcase
      maxHeight={${props.maxHeight}}
      density="${props.density}"
      itemCount={${props.itemCount}}
    />
  );
}
`;

  return createGeneratedCode(code, stringifyProps(props));
}
