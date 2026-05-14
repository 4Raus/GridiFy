import { memo, useMemo } from 'react';
import {
    Chart as ChartJS,
    Legend,
    LinearScale,
    PointElement,
    Tooltip,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import type { ScatterDataset } from '../../entities/component/model/preview.types';
import { createHiddenLegendOptions, createScatterScales, createTopLegendOptions } from './chartOptions';
import { createLegendMarginPlugin } from './chartLegendPlugin';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

type Props = {
    datasets?: ScatterDataset[];
    points?: { x: number; y: number }[];
    color?: string;
    pointRadius?: number;
    height?: number;
};

function normalizeDatasets({
    datasets,
    points = [],
    color = '#84cc16',
}: Props): ScatterDataset[] {
    if (datasets && datasets.length > 0) return datasets;
    return [{ id: 'points', label: 'Points', points, color }];
}

function ScatterPlotChart({
    datasets,
    points = [],
    color = '#84cc16',
    pointRadius = 6,
    height = 320,
}: Props) {
    const normalizedDatasets = useMemo(
        () => normalizeDatasets({ datasets, points, color }),
        [color, datasets, points],
    );
    const showLegend = normalizedDatasets.length > 1;

    const data = useMemo(() => ({
        datasets: normalizedDatasets.map((dataset) => ({
            label: dataset.label,
            data: dataset.points,
            backgroundColor: dataset.color,
            pointRadius,
            pointHoverRadius: pointRadius + 1,
        })),
    }), [normalizedDatasets, pointRadius]);

    const options = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: showLegend ? createTopLegendOptions() : createHiddenLegendOptions(),
        },
        scales: createScatterScales(),
    }), [showLegend]);

    const plugins = useMemo(() => [createLegendMarginPlugin(12)], []);

    return (
        <div style={{ height }}>
            <Scatter data={data} options={options} plugins={plugins} />
        </div>
    );
}

export default memo(ScatterPlotChart);
