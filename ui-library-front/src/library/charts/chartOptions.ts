import type { ChartOptions } from 'chart.js';
import { chartGridColor, chartTickColor } from './chartTheme';

export function createTopLegendOptions(pointStyle: 'circle' | 'rectRounded' = 'circle') {
  return {
    position: 'top' as const,
    align: 'start' as const,
    labels: {
      color: chartTickColor,
      usePointStyle: true,
      pointStyle,
      padding: 18,
    },
  };
}

export function createHiddenLegendOptions() {
  return { display: false };
}

export function createCartesianScales(minY?: number, maxY?: number): ChartOptions<'line' | 'bar' | 'scatter'>['scales'] {
  return {
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
  };
}

export function createScatterScales(): ChartOptions<'scatter'>['scales'] {
  return {
    x: {
      grid: { color: chartGridColor },
      ticks: { color: chartTickColor },
    },
    y: {
      grid: { color: chartGridColor },
      ticks: { color: chartTickColor },
    },
  };
}
