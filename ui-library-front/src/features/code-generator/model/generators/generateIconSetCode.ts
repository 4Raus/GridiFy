import type { ComponentRegistryItem } from '../../../../entities/component/model/component.types';
import type { PlaygroundState } from '../../../component-playground/model/playground.types';
import { createGeneratedCode, formatTsValue, stringifyProps } from '../generateComponentCode';

export function generateIconSetCode(item: ComponentRegistryItem, state: PlaygroundState) {
  const props = {
    icons: item.previewData?.iconSet?.icons ?? [],
    variant: item.previewData?.iconSet?.variant ?? 'soft',
    size: item.previewData?.iconSet?.size ?? 'md',
    showLabels: state.showLabels !== false,
  };

  const code = `
import { GridifyIconSet } from 'gridify';

export function Demo() {
  return (
    <GridifyIconSet
      icons={${formatTsValue(props.icons)}}
      variant="${props.variant}"
      size="${props.size}"
      showLabels={${props.showLabels}}
    />
  );
}
`;

  return createGeneratedCode(code, stringifyProps(props));
}
