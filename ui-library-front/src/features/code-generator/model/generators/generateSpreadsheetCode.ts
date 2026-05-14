import type { ComponentRegistryItem } from '../../../../entities/component/model/component.types';
import type { PlaygroundState } from '../../../component-playground/model/playground.types';
import { createGeneratedCode, stringifyProps } from '../generateComponentCode';

export function generateSpreadsheetCode(item: ComponentRegistryItem, state: PlaygroundState) {
  const data = item.previewData?.spreadsheet ?? { columns: [], rows: [] };
  const props = {
    data,
    editable: state.editable === true,
    viewMode: state.tableViewMode === 'app' ? 'app' : 'spreadsheet',
    height: Number(state.height) || 500,
  };

  const code = `
import { SpreadsheetTable } from 'gridify';

const data = ${JSON.stringify(data, null, 2)};

export function Demo() {
  return (
    <SpreadsheetTable
      data={data}
      editable={${String(props.editable)}}
      viewMode="${props.viewMode}"
      height={${props.height}}
    />
  );
}
`;

  return createGeneratedCode(code, stringifyProps(props));
}
