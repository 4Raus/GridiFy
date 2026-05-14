import type { ComponentRegistryItem } from '../../../../entities/component/model/component.types';
import { createGeneratedCode, formatTsValue, stringifyProps } from '../generateComponentCode';

export function generateSelectCode(item: ComponentRegistryItem) {
  const props = item.previewData?.selectField ?? {
    label: 'Select',
    placeholder: 'Select',
    value: '',
    options: [],
    mode: 'single',
    state: 'default',
    size: 'md',
    searchable: false,
    clearable: true,
  };

  const code = `
import { GridifySelect } from 'gridify';

const options = ${formatTsValue(props.options)};

export function Demo() {
  return (
    <GridifySelect
      label="${props.label}"
      placeholder="${props.placeholder}"
      value={${formatTsValue(props.value)}}
      options={options}
      mode="${props.mode}"
      state="${props.state}"
      size="${props.size}"
      searchable={${props.searchable}}
      clearable={${props.clearable}}
      errorText="${props.errorText ?? ''}"
    />
  );
}
`;

  return createGeneratedCode(code, stringifyProps(props));
}
