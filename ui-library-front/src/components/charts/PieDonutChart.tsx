import {
    ArcElement,
    Chart as ChartJS,
    Legend,
    Tooltip,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { chartTickColor } from './chartTheme';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
    labels: string[];
    values: number[];
    colors: string[];
    height?: number;
};

export default function PieDonutChart({ labels, values, colors, height = 320 }: Props) {
    return (
        <div style={{ height }}>
            <Doughnut
                data={{
                    labels,
                    datasets: [
                        {
                            data: values,
                            backgroundColor: colors,
                            borderWidth: 0,
                            hoverOffset: 4,
                        },
                    ],
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '64%',
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                color: chartTickColor,
                                usePointStyle: true,
                            },
                        },
                    },
                }}
            />
        </div>
    );
}
