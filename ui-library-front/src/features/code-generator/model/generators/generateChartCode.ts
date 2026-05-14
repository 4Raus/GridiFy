import type { ComponentRegistryItem } from '../../../../entities/component/model/component.types';
import type { PlaygroundState } from '../../../component-playground/model/playground.types';
import { createGeneratedCode, formatTsValue, stringifyProps } from '../generateComponentCode';

function componentName(previewType: ComponentRegistryItem['previewType']) {
  switch (previewType) {
    case 'bar':
      return 'GroupedBarChart';
    case 'line':
      return 'LineTrendChart';
    case 'scatter':
      return 'ScatterPlotChart';
    case 'forecast':
      return 'ForecastLineChart';
    case 'pie':
      return 'PieDonutChart';
    case 'radar':
      return 'RadarVotesChart';
    default:
      return 'Chart';
  }
}

function buildChartProps(item: ComponentRegistryItem, state: PlaygroundState) {
  const height = Number(state.height) || 360;

  if (item.previewType === 'bar' && item.previewData?.bar) {
    return {
      labels: item.previewData.bar.labels,
      datasets: item.previewData.bar.datasets,
      minY: item.previewData.bar.minY,
      maxY: item.previewData.bar.maxY,
      height,
    };
  }

  if (item.previewType === 'line' && item.previewData?.line) {
    return {
      labels: item.previewData.line.labels,
      datasets: item.previewData.line.datasets,
      height,
    };
  }

  if (item.previewType === 'scatter' && item.previewData?.scatter) {
    return {
      datasets: item.previewData.scatter.datasets,
      pointRadius: item.previewData.scatter.pointRadius,
      height,
    };
  }

  if (item.previewType === 'forecast' && item.previewData?.forecast) {
    return {
      labels: item.previewData.forecast.labels,
      actual: item.previewData.forecast.actual,
      forecastDatasets: item.previewData.forecast.forecastDatasets,
      height,
    };
  }

  if (item.previewType === 'pie' && item.previewData?.pie) {
    return { ...item.previewData.pie, height };
  }

  if (item.previewType === 'radar' && item.previewData?.radar) {
    return {
      labels: item.previewData.radar.labels,
      datasets: item.previewData.radar.datasets,
      maxValue: item.previewData.radar.maxValue,
      height,
    };
  }

  return {};
}

export function generateChartCode(item: ComponentRegistryItem, state: PlaygroundState) {
  const name = componentName(item.previewType);
  const props = buildChartProps(item, state);
  const propLines = Object.entries(props)
    .map(([key, value]) => `      ${key}={${formatTsValue(value)}}`)
    .join('\n');

  const code = `
import { ${name} } from 'gridify';

export function Demo() {
  return (
    <${name}
${propLines}
    />
  );
}
`;

  return createGeneratedCode(code, stringifyProps(props));
}
