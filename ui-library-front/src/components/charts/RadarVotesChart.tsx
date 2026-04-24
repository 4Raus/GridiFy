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
import { chartGridColor, chartLabelColor, chartTickColor } from './chartTheme';

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
    values: number[];
    datasetLabel?: string;
    minValue?: number;
    maxValue?: number;
    height?: number;
    backgroundColor?: string;
    borderColor?: string;
    pointColor?: string;
};

export default function RadarVotesChart({
    labels,
    values,
    datasetLabel = 'Dataset',
    minValue = 0,
    maxValue = 10,
    height = 320,
    backgroundColor = 'rgba(132, 204, 22, 0.22)',
    borderColor = '#84cc16',
    pointColor = '#84cc16',
}: RadarVotesChartProps) {
    return (
        <div style={{ height }}>
            <Radar
                data={{
                    labels,
                    datasets: [
                        {
                            label: datasetLabel,
                            data: values,
                            backgroundColor,
                            borderColor,
                            borderWidth: 2,
                            pointBackgroundColor: pointColor,
                            pointBorderColor: pointColor,
                            pointRadius: 5,
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
                                boxWidth: 18,
                            },
                        },
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
                                font: { size: 13, weight: 600 },
                            },
                        },
                    },
                }}
            />
        </div>
    );
}
