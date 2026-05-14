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
import type { ForecastDataset } from '../../entities/component/model/preview.types';
import { createCartesianScales, createTopLegendOptions } from './chartOptions';
import { createLegendMarginPlugin } from './chartLegendPlugin';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

type Props = {
    labels: string[];
    actual?: ForecastDataset;
    forecastDatasets?: ForecastDataset[];
    forecast?: Array<number | null>;
    actualColor?: string;
    forecastColor?: string;
    height?: number;
};

function normalizeActual(actual: ForecastDataset | undefined, actualColor: string): ForecastDataset {
    if (actual) return actual;
    return {
        id: 'actual',
        label: 'Actual',
        values: [],
        color: actualColor,
    };
}

function normalizeForecastDatasets(
    forecastDatasets: ForecastDataset[] | undefined,
    forecast: Array<number | null>,
    forecastColor: string,
): ForecastDataset[] {
    if (forecastDatasets && forecastDatasets.length > 0) return forecastDatasets;
    return [{
        id: 'forecast',
        label: 'Forecast',
        values: forecast,
        color: forecastColor,
    }];
}

function ForecastLineChart({
    labels,
    actual: actualProp,
    forecastDatasets: forecastDatasetsProp,
    forecast = [],
    actualColor = '#111827',
    forecastColor = '#84cc16',
    height = 320,
}: Props) {
    const actual = useMemo(() => normalizeActual(actualProp, actualColor), [actualColor, actualProp]);
    const forecastDatasets = useMemo(
        () => normalizeForecastDatasets(forecastDatasetsProp, forecast, forecastColor),
        [forecast, forecastColor, forecastDatasetsProp],
    );

    const data = useMemo(() => ({
        labels,
        datasets: [
            {
                label: actual.label,
                data: actual.values,
                borderColor: actual.color,
                backgroundColor: `${actual.color}1c`,
                spanGaps: false,
                tension: 0.34,
                pointRadius: 4,
            },
            ...forecastDatasets.map((dataset) => ({
                label: dataset.label,
                data: dataset.values,
                borderColor: dataset.color,
                backgroundColor: `${dataset.color}18`,
                borderDash: [8, 6],
                spanGaps: false,
                tension: 0.34,
                pointRadius: 4,
            })),
        ],
    }), [actual, forecastDatasets, labels]);

    const options = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: createTopLegendOptions(),
        },
        scales: createCartesianScales(),
    }), []);

    const plugins = useMemo(() => [createLegendMarginPlugin(16)], []);

    return (
        <div style={{ height }}>
            <Line data={data} options={options} plugins={plugins} />
        </div>
    );
}

export default memo(ForecastLineChart);
