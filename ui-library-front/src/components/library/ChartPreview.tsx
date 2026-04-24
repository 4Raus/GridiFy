import type { LibraryComponentItem } from '../../data/componentRegistry';
import GroupedBarChart from '../charts/GroupedBarChart';
import LineTrendChart from '../charts/LineTrendChart';
import PieDonutChart from '../charts/PieDonutChart';
import RadarVotesChart from '../charts/RadarVotesChart';
import ScatterPlotChart from '../charts/ScatterPlotChart';
import ForecastLineChart from '../charts/ForecastLineChart';

type Props = {
    item: LibraryComponentItem;
    height?: number;
};

export default function ChartPreview({ item, height = 280 }: Props) {
    if (item.previewType === 'bar' && item.previewData.bar) {
        return (
            <GroupedBarChart
                labels={item.previewData.bar.labels}
                datasets={item.previewData.bar.datasets}
                minY={item.previewData.bar.minY}
                maxY={item.previewData.bar.maxY}
                height={height}
            />
        );
    }

    if (item.previewType === 'line' && item.previewData.line) {
        return (
            <LineTrendChart
                labels={item.previewData.line.labels}
                values={item.previewData.line.values}
                color={item.previewData.line.color}
                fill={item.previewData.line.fill}
                height={height}
            />
        );
    }

    if (item.previewType === 'scatter' && item.previewData.scatter) {
        return (
            <ScatterPlotChart
                points={item.previewData.scatter.points}
                color={item.previewData.scatter.color}
                pointRadius={item.previewData.scatter.pointRadius}
                height={height}
            />
        );
    }

    if (item.previewType === 'forecast' && item.previewData.forecast) {
        return (
            <ForecastLineChart
                labels={item.previewData.forecast.labels}
                actual={item.previewData.forecast.actual}
                forecast={item.previewData.forecast.forecast}
                actualColor={item.previewData.forecast.actualColor}
                forecastColor={item.previewData.forecast.forecastColor}
                height={height}
            />
        );
    }

    if (item.previewType === 'pie' && item.previewData.pie) {
        return (
            <PieDonutChart
                labels={item.previewData.pie.labels}
                values={item.previewData.pie.values}
                colors={item.previewData.pie.colors}
                height={height}
            />
        );
    }

    if (item.previewType === 'radar' && item.previewData.radar) {
        return (
            <RadarVotesChart
                labels={item.previewData.radar.labels}
                values={item.previewData.radar.values}
                datasetLabel={item.previewData.radar.datasetLabel}
                maxValue={item.previewData.radar.maxValue}
                borderColor={item.previewData.radar.color}
                pointColor={item.previewData.radar.color}
                backgroundColor={`${item.previewData.radar.color}22`}
                height={height}
            />
        );
    }

    return null;
}
