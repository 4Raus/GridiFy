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
import { chartGridColor, chartTickColor } from './chartTheme';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

type Props = {
    labels: string[];
    values: number[];
    color?: string;
    fill?: boolean;
    height?: number;
};

export default function LineTrendChart({
    labels,
    values,
    color = '#84cc16',
    fill = true,
    height = 320,
}: Props) {
    return (
        <div style={{ height }}>
            <Line
                data={{
                    labels,
                    datasets: [
                        {
                            label: 'Trend',
                            data: values,
                            tension: 0.38,
                            fill,
                            borderColor: color,
                            backgroundColor: `${color}22`,
                            pointBackgroundColor: color,
                            pointBorderWidth: 0,
                            pointRadius: 4,
                        },
                    ],
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                    },
                    scales: {
                        x: {
                            grid: { display: false },
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
