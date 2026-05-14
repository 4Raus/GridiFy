import { memo, useMemo } from 'react';
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

function PieDonutChart({ labels, values, colors, height = 320 }: Props) {
    const data = useMemo(() => ({
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: colors,
                borderWidth: 0,
                hoverOffset: 4,
            },
        ],
    }), [colors, labels, values]);

    const options = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        cutout: '64%',
        plugins: {
            legend: {
                position: 'right' as const,
                labels: {
                    color: chartTickColor,
                    usePointStyle: true,
                    padding: 16,
                },
            },
        },
    }), []);

    return (
        <div style={{ height }}>
            <Doughnut data={data} options={options} />
        </div>
    );
}

export default memo(PieDonutChart);
