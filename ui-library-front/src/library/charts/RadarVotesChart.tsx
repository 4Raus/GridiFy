import { memo, useMemo } from 'react';
import {
    Chart as ChartJS,
    Filler,
    Legend,
    LineElement,
    PointElement,
    RadialLinearScale,
    Tooltip,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import type { RadarDataset } from '../../entities/component/model/preview.types';
import { chartGridColor, chartLabelColor, chartTickColor } from './chartTheme';
import { createTopLegendOptions } from './chartOptions';
import { createLegendMarginPlugin } from './chartLegendPlugin';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
);

type RadarVotesChartProps = {
    labels: string[];
    datasets?: RadarDataset[];
    values?: number[];
    datasetLabel?: string;
    minValue?: number;
    maxValue?: number;
    height?: number;
    backgroundColor?: string;
    borderColor?: string;
    pointColor?: string;
};

function normalizeDatasets(
    datasets: RadarDataset[] | undefined,
    values: number[],
    datasetLabel: string,
    borderColor: string,
): RadarDataset[] {
    if (datasets && datasets.length > 0) return datasets;
    return [{ id: 'radar-dataset', label: datasetLabel, values, color: borderColor }];
}

function RadarVotesChart({
    labels,
    datasets,
    values = [],
    datasetLabel = 'Dataset',
    minValue = 0,
    maxValue = 10,
    height = 320,
    backgroundColor = 'rgba(132, 204, 22, 0.22)',
    borderColor = '#84cc16',
    pointColor = '#84cc16',
}: RadarVotesChartProps) {
    const normalizedDatasets = useMemo(
        () => normalizeDatasets(datasets, values, datasetLabel, borderColor),
        [borderColor, datasetLabel, datasets, values],
    );

    const data = useMemo(() => ({
        labels,
        datasets: normalizedDatasets.map((dataset) => ({
            label: dataset.label,
            data: dataset.values,
            backgroundColor: dataset.color === borderColor ? backgroundColor : `${dataset.color}22`,
            borderColor: dataset.color,
            borderWidth: 2,
            pointBackgroundColor: dataset.color || pointColor,
            pointBorderColor: dataset.color || pointColor,
            pointRadius: 5,
        })),
    }), [backgroundColor, borderColor, labels, normalizedDatasets, pointColor]);

    const options = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: createTopLegendOptions(),
        },
        scales: {
            r: {
                min: minValue,
                max: maxValue,
                ticks: {
                    stepSize: 1,
                    showLabelBackdrop: false,
                    color: chartTickColor,
                },
                grid: { color: chartGridColor },
                angleLines: { color: chartGridColor },
                pointLabels: {
                    color: chartLabelColor,
                    font: { size: 13, weight: 600 as const },
                },
            },
        },
    }), [maxValue, minValue]);

    const plugins = useMemo(() => [createLegendMarginPlugin(12)], []);

    return (
        <div style={{ height }}>
            <Radar data={data} options={options} plugins={plugins} />
        </div>
    );
}

export default memo(RadarVotesChart);
