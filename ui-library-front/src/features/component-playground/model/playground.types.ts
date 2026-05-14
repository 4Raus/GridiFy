import type { GridifyButtonSize, GridifyButtonVariant } from '../../../library/buttons/button.types';
import type { OilGasInspectionMode, OilGasInspectionScenario } from '../../../library/forms/oil-gas-inspection/oilGasInspection.types';
import type { SpreadsheetViewMode } from '../../../library/tables/spreadsheet/model/spreadsheet.types';

type BaseControl = {
  key: string;
  label: string;
  disabled?: boolean;
};

export type TextControl = BaseControl & {
  type: 'text';
  placeholder?: string;
};

export type NumberControl = BaseControl & {
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
};

export type RangeControl = BaseControl & {
  type: 'range';
  min: number;
  max: number;
  step?: number;
};

export type SelectControl = BaseControl & {
  type: 'select';
  options: Array<{ label: string; value: string }>;
};

export type SwitchControl = BaseControl & {
  type: 'switch';
};

export type ColorControl = BaseControl & {
  type: 'color';
};

export type ColorListControl = BaseControl & {
  type: 'color-list';
  minItems?: number;
};

export type TextAreaControl = BaseControl & {
  type: 'textarea';
  rows?: number;
};

export type SegmentedControl = BaseControl & {
  type: 'segmented';
  options: Array<{ label: string; value: string }>;
};

export type PlaygroundControl =
  | TextControl
  | NumberControl
  | RangeControl
  | SelectControl
  | SwitchControl
  | ColorControl
  | ColorListControl
  | TextAreaControl
  | SegmentedControl;

export type PlaygroundState = Record<string, unknown>;

export type ButtonViewMode = 'single' | 'allVariants';

export type ButtonPlaygroundState = PlaygroundState & {
  label: string;
  variant: GridifyButtonVariant;
  size: GridifyButtonSize;
  loading: boolean;
  disabled: boolean;
  viewMode: ButtonViewMode;
};

export type ChartPlaygroundStateBase = PlaygroundState & {
  height: number;
  labelsInput: string;
  datasets: Array<{
    id: string;
    label: string;
    valuesInput: string;
    pointsInput: string;
    color: string;
    fill?: boolean;
  }>;
  forecastActual: {
    id: string;
    label: string;
    valuesInput: string;
    pointsInput: string;
    color: string;
    fill?: boolean;
  };
  forecastDatasets: Array<{
    id: string;
    label: string;
    valuesInput: string;
    pointsInput: string;
    color: string;
    fill?: boolean;
  }>;
  valuesInput: string;
  pieColors: string[];
  barMinY: number;
  barMaxY: number;
  radarMax: number;
  pointRadius: number;
};

export type SpreadsheetPlaygroundState = PlaygroundState & {
  tableViewMode: SpreadsheetViewMode;
  editable: boolean;
  height: number;
};

export type ScrollPanelDensity = 'compact' | 'default' | 'comfortable';

export type ScrollPanelPlaygroundState = PlaygroundState & {
  maxHeight: number;
  density: ScrollPanelDensity;
  itemCount: number;
};

export type OilGasPlaygroundState = PlaygroundState & {
  resetVersion: number;
  scenario: OilGasInspectionScenario;
  mode: OilGasInspectionMode;
  pressureThreshold: number;
  h2sThreshold: number;
  showChecklist: boolean;
  showRiskPanel: boolean;
  readonly: boolean;
};

export type PlaygroundValidation = {
  errors: string[];
  warnings: string[];
};
