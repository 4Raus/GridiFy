import {
    Chart as ChartJS,
    Legend,
    LinearScale,
    PointElement,
    Tooltip,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { chartGridColor, chartTickColor } from './chartTheme';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

type Props = {
    points: { x: number; y: number }[];
    color?: string;
    pointRadius?: number;
    height?: number;
};

export default function ScatterPlotChart({
    points,
    color = '#84cc16',
    pointRadius = 6,
    height = 320,
}: Props) {
    return (
        <div style={{ height }}>
            <Scatter
                data={{
                    datasets: [
                        {
                            label: 'Points',
                            data: points,
                            backgroundColor: color,
                            pointRadius,
                            pointHoverRadius: pointRadius + 1,
                        },
                    ],
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: {
                            grid: { color: chartGridColor },
                            ticks: { color: chartTickColor },
                        },
                        y: {
                            grid: { color: chartGridColor },
                            ticks: { color: chartTickColor },
                        },
                    },
                }}
            />
        </div>
    );
}
