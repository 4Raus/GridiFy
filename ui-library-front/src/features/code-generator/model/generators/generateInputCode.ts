import type { ComponentRegistryItem } from '../../../../entities/component/model/component.types';
import type { PlaygroundState } from '../../../component-playground/model/playground.types';
import { createGeneratedCode, stringifyProps } from '../generateComponentCode';

export function generateInputCode(item: ComponentRegistryItem, state: PlaygroundState) {
  const props = {
    ...(item.previewData?.inputField ?? {}),
    type: state.type === 'email' || state.type === 'number' || state.type === 'password' ? state.type : 'text',
  };

  const code = `
import { GridifyInput } from 'gridify';

export function Demo() {
  return (
    <GridifyInput
      label="${props.label ?? ''}"
      value="${props.value ?? ''}"
      placeholder="${props.placeholder ?? ''}"
      state="${props.state ?? 'default'}"
      size="${props.size ?? 'md'}"
      required={${props.required === true}}
      helperText="${props.helperText ?? ''}"
      errorText="${props.errorText ?? ''}"
      type="${props.type}"
    />
  );
}
`;

  return createGeneratedCode(code, stringifyProps(props));
}
