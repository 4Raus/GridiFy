export type ChartPlaygroundState = {
  height: number;
  labelsInput: string;
  datasets: ChartDatasetInput[];
  forecastActual: ChartDatasetInput;
  forecastDatasets: ChartDatasetInput[];
  valuesInput: string;
  pieColors: string[];
  barMinY: number;
  barMaxY: number;
  radarMax: number;
  pointRadius: number;
};

export type ChartPoint = {
  x: number;
  y: number;
};

export type ChartDatasetInput = {
  id: string;
  label: string;
  valuesInput: string;
  pointsInput: string;
  color: string;
  fill?: boolean;
};
