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
    actual: number[];
    forecast: number[];
    actualColor?: string;
    forecastColor?: string;
    height?: number;
};

export default function ForecastLineChart({
    labels,
    actual,
    forecast,
    actualColor = '#111827',
    forecastColor = '#84cc16',
    height = 320,
}: Props) {
    return (
        <div style={{ height }}>
            <Line
                data={{
                    labels,
                    datasets: [
                        {
                            label: 'Actual',
                            data: actual,
                            borderColor: actualColor,
                            backgroundColor: `${actualColor}1c`,
                            spanGaps: false,
                            tension: 0.34,
                            pointRadius: 4,
                        },
                        {
                            label: 'Forecast',
                            data: forecast,
                            borderColor: forecastColor,
                            backgroundColor: `${forecastColor}18`,
                            borderDash: [8, 6],
                            spanGaps: false,
                            tension: 0.34,
                            pointRadius: 4,
                        },
                    ],
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
                            },
                        },
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
