import type { LibraryComponentItem } from '../../data/componentRegistry';
import type { SpreadsheetViewMode } from '../tables/SpreadsheetTable';
import GroupedBarChart from '../charts/GroupedBarChart';
import LineTrendChart from '../charts/LineTrendChart';
import PieDonutChart from '../charts/PieDonutChart';
import RadarVotesChart from '../charts/RadarVotesChart';
import ScatterPlotChart from '../charts/ScatterPlotChart';
import ForecastLineChart from '../charts/ForecastLineChart';
import SpreadsheetTable from '../tables/SpreadsheetTable';
import ButtonShowcase from '../ui/ButtonShowcase';
import OilGasInspectionForm from '../ui/OilGasInspectionForm';
import ScrollPanelShowcase from '../ui/ScrollPanelShowcase';

type Props = {
  item: LibraryComponentItem;
  height?: number;
  editable?: boolean;
  locale?: 'ru' | 'en';
  onTableChange?: (next: NonNullable<LibraryComponentItem['previewData']['spreadsheet']>) => void;
  onValidationChange?: (messages: { level: 'error' | 'warning'; message: string }[]) => void;
  tableViewMode?: SpreadsheetViewMode;
};

export default function ChartPreview({ item, height = 280, editable = false, locale = 'ru', onTableChange, onValidationChange, tableViewMode }: Props) {
  if (item.previewType === 'bar' && item.previewData.bar) {
    return <GroupedBarChart labels={item.previewData.bar.labels} datasets={item.previewData.bar.datasets} minY={item.previewData.bar.minY} maxY={item.previewData.bar.maxY} height={height} />;
  }
  if (item.previewType === 'line' && item.previewData.line) {
    return <LineTrendChart labels={item.previewData.line.labels} values={item.previewData.line.values} color={item.previewData.line.color} fill={item.previewData.line.fill} height={height} />;
  }
  if (item.previewType === 'scatter' && item.previewData.scatter) {
    return <ScatterPlotChart points={item.previewData.scatter.points} color={item.previewData.scatter.color} pointRadius={item.previewData.scatter.pointRadius} height={height} />;
  }
  if (item.previewType === 'forecast' && item.previewData.forecast) {
    return <ForecastLineChart labels={item.previewData.forecast.labels} actual={item.previewData.forecast.actual} forecast={item.previewData.forecast.forecast} actualColor={item.previewData.forecast.actualColor} forecastColor={item.previewData.forecast.forecastColor} height={height} />;
  }
  if (item.previewType === 'pie' && item.previewData.pie) {
    return <PieDonutChart labels={item.previewData.pie.labels} values={item.previewData.pie.values} colors={item.previewData.pie.colors} height={height} />;
  }
  if (item.previewType === 'radar' && item.previewData.radar) {
    return <RadarVotesChart labels={item.previewData.radar.labels} values={item.previewData.radar.values} datasetLabel={item.previewData.radar.datasetLabel} maxValue={item.previewData.radar.maxValue} borderColor={item.previewData.radar.color} pointColor={item.previewData.radar.color} backgroundColor={`${item.previewData.radar.color}22`} height={height} />;
  }
  if (item.previewType === 'spreadsheet' && item.previewData.spreadsheet) {
    return <SpreadsheetTable data={item.previewData.spreadsheet} height={height} editable={editable} locale={locale} viewMode={tableViewMode ?? (item.slug === 'financial-planning-table' ? 'app' : 'spreadsheet')} onChange={onTableChange} onValidationChange={onValidationChange} />;
  }
  if (item.previewType === 'buttons') return <ButtonShowcase locale={locale} />;
  if (item.previewType === 'oilgas-form') return <OilGasInspectionForm locale={locale} />;
  if (item.previewType === 'scroll-panel') return <ScrollPanelShowcase locale={locale} />;
  return null;
}
