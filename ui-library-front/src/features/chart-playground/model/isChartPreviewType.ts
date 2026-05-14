import type { PreviewType } from '../../../entities/component/model/component.types';

export type ChartPreviewType = Extract<PreviewType, 'bar' | 'line' | 'scatter' | 'forecast' | 'pie' | 'radar'>;

const chartPreviewTypes: ChartPreviewType[] = ['bar', 'line', 'scatter', 'forecast', 'pie', 'radar'];

export function isChartPreviewType(type: PreviewType): type is ChartPreviewType {
  return chartPreviewTypes.includes(type as ChartPreviewType);
}
