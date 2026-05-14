import { memo, useMemo } from 'react';
import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { LineDataset } from '../../entities/component/model/preview.types';
import { createCartesianScales, createHiddenLegendOptions, createTopLegendOptions } from './chartOptions';
import { createLegendMarginPlugin } from './chartLegendPlugin';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

type Props = {
    labels: string[];
    datasets?: LineDataset[];
    values?: number[];
    color?: string;
    fill?: boolean;
    height?: number;
};

function normalizeDatasets(datasets: LineDataset[] | undefined, values: number[], color: string, fill: boolean): LineDataset[] {
    if (datasets && datasets.length > 0) return datasets;
    return [{ id: 'trend', label: 'Trend', values, color, fill }];
}

function LineTrendChart({
    labels,
    datasets,
    values = [],
    color = '#84cc16',
    fill = true,
    height = 320,
}: Props) {
    const normalizedDatasets = useMemo(
        () => normalizeDatasets(datasets, values, color, fill),
        [color, datasets, fill, values],
    );
    const showLegend = normalizedDatasets.length > 1;

    const data = useMemo(() => ({
        labels,
        datasets: normalizedDatasets.map((dataset) => ({
            label: dataset.label,
            data: dataset.values,
            tension: 0.38,
            fill: dataset.fill === true,
            borderColor: dataset.color,
            backgroundColor: `${dataset.color}22`,
            pointBackgroundColor: dataset.color,
            pointBorderWidth: 0,
            pointRadius: 4,
        })),
    }), [labels, normalizedDatasets]);

    const options = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: showLegend ? createTopLegendOptions() : createHiddenLegendOptions(),
        },
        scales: createCartesianScales(),
    }), [showLegend]);

    const plugins = useMemo(() => [createLegendMarginPlugin(12)], []);

    return (
        <div style={{ height }}>
            <Line data={data} options={options} plugins={plugins} />
        </div>
    );
}

export default memo(LineTrendChart);
