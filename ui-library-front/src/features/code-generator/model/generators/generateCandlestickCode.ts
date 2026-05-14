import type { ComponentRegistryItem } from '../../../../entities/component/model/component.types';
import type { PlaygroundState } from '../../../component-playground/model/playground.types';
import { createGeneratedCode, formatTsValue, stringifyProps } from '../generateComponentCode';

export function generateCandlestickCode(item: ComponentRegistryItem, state: PlaygroundState) {
  const candle = item.previewData?.candlestick ?? { data: [], upColor: '#16a34a', downColor: '#dc2626', neutralColor: '#64748b', height: 340 };
  const props = {
    ...candle,
    showGrid: state.showGrid !== false,
    showTooltip: state.showTooltip !== false,
  };

  const code = `
import { CandlestickChart } from 'gridify';

const data = ${formatTsValue(props.data)};

export function Demo() {
  return (
    <CandlestickChart
      data={data}
      upColor="${props.upColor}"
      downColor="${props.downColor}"
      neutralColor="${props.neutralColor}"
      height={${props.height}}
      showGrid={${props.showGrid}}
      showTooltip={${props.showTooltip}}
    />
  );
}
`;

  return createGeneratedCode(code, stringifyProps(props));
}
