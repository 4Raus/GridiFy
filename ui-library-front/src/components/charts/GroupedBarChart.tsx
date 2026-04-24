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
import { chartGridColor, chartTickColor } from './chartTheme';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export type BarChartDataset = {
    label: string;
    data: number[];
    color: string;
};

type GroupedBarChartProps = {
    labels: string[];
    datasets: BarChartDataset[];
    minY?: number;
    maxY?: number;
    height?: number;
};

export default function GroupedBarChart({
    labels,
    datasets,
    minY = 0,
    maxY = 1000,
    height = 320,
}: GroupedBarChartProps) {
    return (
        <div style={{ height }}>
            <Bar
                data={{
                    labels,
                    datasets: datasets.map((dataset) => ({
                        label: dataset.label,
                        data: dataset.data,
                        backgroundColor: dataset.color,
                        borderRadius: 10,
                        maxBarThickness: 34,
                    })),
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            align: 'start',
                            labels: {
                                color: chartTickColor,
                                usePointStyle: true,
                                pointStyle: 'rectRounded',
                            },
                        },
                    },
                    scales: {
                        x: {
                            grid: { display: false },
                            ticks: { color: chartTickColor },
                        },
                        y: {
                            min: minY,
                            max: maxY,
                            grid: { color: chartGridColor },
                            ticks: {
                                color: chartTickColor,
                                callback(value) {
                                    return Number(value).toLocaleString('en-US');
                                },
                            },
                        },
                    },
                }}
            />
        </div>
    );
}
