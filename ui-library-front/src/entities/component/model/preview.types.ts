import type { SpreadsheetData } from '../../../library/tables/spreadsheet/model/spreadsheet.types';

export type ChartDataset = {
  id: string;
  label: string;
  values: number[];
  color: string;
};

export type RadarDataset = {
  id: string;
  label: string;
  values: number[];
  color: string;
};

export type LineDataset = {
  id: string;
  label: string;
  values: number[];
  color: string;
  fill?: boolean;
};

export type ScatterDataset = {
  id: string;
  label: string;
  points: { x: number; y: number }[];
  color: string;
};

export type ForecastDataset = {
  id: string;
  label: string;
  values: Array<number | null>;
  color: string;
};

export type FeedbackStateType = 'info' | 'warning' | 'error' | 'success' | 'neutral';

export type FeedbackStatesPreviewData = {
  states: Array<{
    type: FeedbackStateType;
    label: string;
    message: string;
  }>;
};

export type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end';

export type TooltipPreviewData = {
  message: string;
  placement: TooltipPlacement;
  theme: 'light' | 'dark';
  multiline: boolean;
};

export type InputFieldPreviewData = {
  label: string;
  value: string;
  placeholder: string;
  state: 'default' | 'hover' | 'focus' | 'filled' | 'disabled' | 'error';
  size: 'sm' | 'md' | 'lg';
  required: boolean;
  helperText?: string;
  errorText?: string;
};

export type SelectFieldPreviewData = {
  label: string;
  placeholder: string;
  value: string | string[];
  options: Array<{ label: string; value: string; disabled?: boolean }>;
  state: 'default' | 'hover' | 'focus' | 'filled' | 'disabled' | 'error';
  mode: 'single' | 'search' | 'multiple';
  size: 'sm' | 'md' | 'lg';
  searchable: boolean;
  clearable: boolean;
  errorText?: string;
};

export type IconSetPreviewData = {
  variant: 'solid' | 'soft' | 'outline';
  size: 'sm' | 'md' | 'lg';
  icons: Array<{
    name: string;
    type: FeedbackStateType;
  }>;
};

export type CandlestickPoint = {
  label: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

export type CandlestickPreviewData = {
  data: CandlestickPoint[];
  upColor: string;
  downColor: string;
  neutralColor: string;
  height: number;
};

export type BarPreviewData = {
  labels: string[];
  datasets: ChartDataset[];
  minY: number;
  maxY: number;
};

export type LinePreviewData = {
  labels: string[];
  datasets: LineDataset[];
};

export type ScatterPreviewData = {
  datasets: ScatterDataset[];
  pointRadius: number;
};

export type ForecastPreviewData = {
  labels: string[];
  actual: ForecastDataset;
  forecastDatasets: ForecastDataset[];
};

export type PiePreviewData = {
  labels: string[];
  values: number[];
  colors: string[];
};

export type RadarPreviewData = {
  labels: string[];
  datasets: RadarDataset[];
  maxValue: number;
};

export type ComponentPreviewData = {
  radar?: RadarPreviewData;
  bar?: BarPreviewData;
  line?: LinePreviewData;
  scatter?: ScatterPreviewData;
  forecast?: ForecastPreviewData;
  pie?: PiePreviewData;
  feedbackStates?: FeedbackStatesPreviewData;
  tooltip?: TooltipPreviewData;
  inputField?: InputFieldPreviewData;
  selectField?: SelectFieldPreviewData;
  iconSet?: IconSetPreviewData;
  candlestick?: CandlestickPreviewData;
  spreadsheet?: SpreadsheetData;
};
