import type {
  BarPreviewData,
  ForecastPreviewData,
  LinePreviewData,
  PiePreviewData,
  RadarPreviewData,
  ScatterPreviewData,
  CandlestickPreviewData,
} from '../model/preview.types';

export const groupedBarChartExample: BarPreviewData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    { id: 'bar-revenue', label: 'Revenue', values: [420, 400, 220, 150, 970, 740], color: '#84cc16' },
    { id: 'bar-cost', label: 'Cost', values: [430, 820, 130, 500, 240, 350], color: '#1f2937' },
  ],
  minY: 0,
  maxY: 1000,
};

export const lineTrendChartExample: LinePreviewData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      id: 'line-current',
      label: 'Current',
      values: [22, 34, 31, 48, 43, 51, 57],
      color: '#84cc16',
      fill: true,
    },
    {
      id: 'line-target',
      label: 'Target',
      values: [28, 32, 38, 45, 50, 55, 62],
      color: '#2563eb',
      fill: false,
    },
  ],
};

export const scatterPlotChartExample: ScatterPreviewData = {
  datasets: [
    {
      id: 'scatter-enterprise',
      label: 'Enterprise',
      points: [
        { x: 5, y: 18 },
        { x: 8, y: 11 },
        { x: 11, y: 19 },
        { x: 14, y: 31 },
        { x: 17, y: 25 },
        { x: 21, y: 38 },
      ],
      color: '#84cc16',
    },
    {
      id: 'scatter-smb',
      label: 'SMB',
      points: [
        { x: 4, y: 10 },
        { x: 7, y: 16 },
        { x: 10, y: 14 },
        { x: 13, y: 22 },
        { x: 18, y: 29 },
      ],
      color: '#2563eb',
    },
  ],
  pointRadius: 6,
};

export const forecastLineChartExample: ForecastPreviewData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
  actual: {
    id: 'forecast-actual',
    label: 'Actual',
    values: [18, 22, 29, 34, null, null],
    color: '#111827',
  },
  forecastDatasets: [
    {
      id: 'forecast-baseline',
      label: 'Baseline',
      values: [null, null, null, 34, 39, 46],
      color: '#84cc16',
    },
    {
      id: 'forecast-optimistic',
      label: 'Optimistic',
      values: [null, null, null, 34, 42, 52],
      color: '#2563eb',
    },
  ],
};

export const pieDonutChartExample: PiePreviewData = {
  labels: ['Cards', 'Loans', 'Deposits', 'Insurance'],
  values: [42, 24, 18, 16],
  colors: ['#84cc16', '#111827', '#a3e635', '#d9f99d'],
};

export const radarVotesChartExample: RadarPreviewData = {
  labels: ['Speed', 'UX', 'Security', 'Support', 'API', 'Cost'],
  datasets: [
    { id: 'radar-product-a', label: 'Product A', values: [7, 9, 8, 6, 7, 5], color: '#84cc16' },
    { id: 'radar-product-b', label: 'Product B', values: [6, 7, 9, 8, 6, 7], color: '#2563eb' },
    { id: 'radar-product-c', label: 'Product C', values: [8, 6, 7, 7, 9, 6], color: '#f97316' },
  ],
  maxValue: 10,
};

export const candlestickChartExample: CandlestickPreviewData = {
  data: [
    { label: 'Mon', open: 102, high: 116, low: 98, close: 112 },
    { label: 'Tue', open: 112, high: 118, low: 104, close: 106 },
    { label: 'Wed', open: 106, high: 121, low: 103, close: 119 },
    { label: 'Thu', open: 119, high: 125, low: 113, close: 114 },
    { label: 'Fri', open: 114, high: 128, low: 112, close: 126 },
    { label: 'Sat', open: 126, high: 130, low: 120, close: 126 },
  ],
  upColor: '#16a34a',
  downColor: '#dc2626',
  neutralColor: '#64748b',
  height: 340,
};
