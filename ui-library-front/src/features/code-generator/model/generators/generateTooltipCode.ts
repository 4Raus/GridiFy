import type { ComponentRegistryItem } from '../../../../entities/component/model/component.types';
import type { PlaygroundState } from '../../../component-playground/model/playground.types';
import { createGeneratedCode, stringifyProps } from '../generateComponentCode';

export function generateTooltipCode(item: ComponentRegistryItem, state: PlaygroundState) {
  const tooltip = item.previewData?.tooltip ?? { message: 'Tooltip', placement: 'top', theme: 'light', multiline: false };
  const props = {
    ...tooltip,
    width: Number(state.width) || 280,
    visible: state.visible !== false,
  };

  const code = `
import { GridifyTooltip } from 'gridify';

export function Demo() {
  return (
    <GridifyTooltip
      message="${props.message}"
      placement="${props.placement}"
      theme="${props.theme}"
      multiline={${props.multiline}}
      width={${props.width}}
      visible={${props.visible}}
    >
      <button type="button">Hover / focus</button>
    </GridifyTooltip>
  );
}
`;

  return createGeneratedCode(code, stringifyProps(props));
}
