import { memo, useMemo } from 'react';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { createCartesianScales, createTopLegendOptions } from './chartOptions';
import { createLegendMarginPlugin } from './chartLegendPlugin';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export type BarChartDataset = {
    id?: string;
    label: string;
    values?: number[];
    data?: number[];
    color: string;
};

type GroupedBarChartProps = {
    labels: string[];
    datasets: BarChartDataset[];
    minY?: number;
    maxY?: number;
    height?: number;
};

function GroupedBarChart({
    labels,
    datasets,
    minY = 0,
    maxY = 1000,
    height = 320,
}: GroupedBarChartProps) {
    const data = useMemo(() => ({
        labels,
        datasets: datasets.map((dataset) => ({
            label: dataset.label,
            data: dataset.values ?? dataset.data ?? [],
            backgroundColor: dataset.color,
            borderRadius: 10,
            maxBarThickness: 34,
        })),
    }), [datasets, labels]);

    const options = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: createTopLegendOptions('rectRounded'),
        },
        scales: createCartesianScales(minY, maxY),
    }), [maxY, minY]);

    const plugins = useMemo(() => [createLegendMarginPlugin(14)], []);

    return (
        <div style={{ height }}>
            <Bar data={data} options={options} plugins={plugins} />
        </div>
    );
}

export default memo(GroupedBarChart);
