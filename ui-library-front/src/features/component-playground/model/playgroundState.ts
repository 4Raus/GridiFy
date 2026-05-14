import type { ComponentRegistryItem } from '../../../entities/component/model/component.types';
import type {
  FeedbackStateType,
  TooltipPlacement,
  CandlestickPoint,
} from '../../../entities/component/model/preview.types';
import type { SpreadsheetData } from '../../../library/tables/spreadsheet/model/spreadsheet.types';
import { t } from '../../../shared/lib/i18n';
import type { Locale } from '../../../shared/types/locale';
import {
  findInvalidNumberTokens,
  findInvalidPointTokens,
  isParsedNumber,
  parseFlexibleNumberList,
  parsePointList,
  parseTextList,
} from '../../chart-playground/model/chartParsers';
import { buildChartIssues } from '../../chart-playground/model/chartValidation';
import type { ChartDatasetInput } from '../../chart-playground/model/chartPlaygroundTypes';
import { isChartPreviewType } from '../../chart-playground/model/isChartPreviewType';
import type {
  ButtonPlaygroundState,
  ChartPlaygroundStateBase,
  OilGasPlaygroundState,
  PlaygroundState,
  PlaygroundValidation,
  ScrollPanelDensity,
} from './playground.types';

function defaultButtonLabel(locale: Locale) {
  return t({ ru: 'Создать заявку', en: 'Create request', de: 'Anfrage erstellen' }, locale);
}

function csv(values: Array<string | number>) {
  return values.join(', ');
}

function nullableCsv(values: Array<number | null>) {
  return values.map((value) => (value === null || Number.isNaN(value) ? 'null' : String(value))).join(', ');
}

function datasetInput(
  id: string,
  label: string,
  values: number[],
  color: string,
  fill?: boolean,
): ChartDatasetInput {
  return {
    id,
    label,
    valuesInput: csv(values),
    pointsInput: '',
    color,
    fill,
  };
}

function forecastDatasetInput(
  id: string,
  label: string,
  values: Array<number | null>,
  color: string,
): ChartDatasetInput {
  return {
    id,
    label,
    valuesInput: nullableCsv(values),
    pointsInput: '',
    color,
    fill: false,
  };
}

function scatterDatasetInput(
  id: string,
  label: string,
  points: { x: number; y: number }[],
  color: string,
): ChartDatasetInput {
  return {
    id,
    label,
    valuesInput: '',
    pointsInput: points.map((point) => `${point.x}:${point.y}`).join(', '),
    color,
    fill: false,
  };
}

const tooltipPlacements: TooltipPlacement[] = [
  'top',
  'top-start',
  'top-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
];

function isHexColor(value: unknown) {
  return typeof value === 'string' && /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(value);
}

function parseOptionsInput(input: unknown) {
  const text = typeof input === 'string' ? input : '';
  return text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((label) => ({
      label,
      value: label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || label,
    }));
}

function parseCandlestickData(state: PlaygroundState): CandlestickPoint[] {
  const labels = parseTextList(String(state.labelsInput ?? ''));
  const open = parseFlexibleNumberList(String(state.openValuesInput ?? '')).filter(isParsedNumber);
  const high = parseFlexibleNumberList(String(state.highValuesInput ?? '')).filter(isParsedNumber);
  const low = parseFlexibleNumberList(String(state.lowValuesInput ?? '')).filter(isParsedNumber);
  const close = parseFlexibleNumberList(String(state.closeValuesInput ?? '')).filter(isParsedNumber);
  const length = Math.min(labels.length, open.length, high.length, low.length, close.length);

  return Array.from({ length }, (_, index) => ({
    label: labels[index],
    open: open[index],
    high: high[index],
    low: low[index],
    close: close[index],
  }));
}

export function createInitialPlaygroundState(item: ComponentRegistryItem, locale: Locale): PlaygroundState {
  if (item.previewType === 'buttons') {
    return {
      label: defaultButtonLabel(locale),
      variant: 'primary',
      size: 'md',
      loading: false,
      disabled: false,
      viewMode: 'single',
    } satisfies ButtonPlaygroundState;
  }

  if (item.previewType === 'gridify-action-button') {
    return {
      label: defaultButtonLabel(locale),
      variant: 'solid',
      intent: 'brand',
      size: 'md',
      loading: false,
      disabled: false,
      fullWidth: false,
      withIcon: true,
      trailingBadge: true,
      showBrandPrefix: false,
      brandPrefixText: 'GridiFy',
    };
  }

  if (item.previewType === 'feedback-states' && item.previewData?.feedbackStates) {
    return {
      size: 'md',
      orientation: 'row',
      showLabels: true,
      enabledNeutral: true,
      enabledInfo: true,
      enabledWarning: true,
      enabledError: true,
      enabledSuccess: true,
    };
  }

  if (item.previewType === 'tooltip' && item.previewData?.tooltip) {
    return {
      message: item.previewData.tooltip.message,
      placement: item.previewData.tooltip.placement,
      theme: item.previewData.tooltip.theme,
      multiline: item.previewData.tooltip.multiline,
      width: 280,
      visible: true,
      gridPlacements: false,
    };
  }

  if (item.previewType === 'input-field' && item.previewData?.inputField) {
    return {
      ...item.previewData.inputField,
      type: 'text',
      viewMode: 'single',
    };
  }

  if (item.previewType === 'select-field' && item.previewData?.selectField) {
    return {
      ...item.previewData.selectField,
      optionsInput: item.previewData.selectField.options.map((option) => option.label).join(', '),
      selectedValue: Array.isArray(item.previewData.selectField.value)
        ? item.previewData.selectField.value.join(', ')
        : item.previewData.selectField.value,
      disabled: false,
      viewMode: 'single',
    };
  }

  if (item.previewType === 'icon-set' && item.previewData?.iconSet) {
    return {
      variant: item.previewData.iconSet.variant,
      size: item.previewData.iconSet.size,
      tone: 'brand',
      showLabels: true,
      selectedIcon: 'info',
    };
  }

  if (item.previewType === 'candlestick' && item.previewData?.candlestick) {
    return {
      height: item.previewData.candlestick.height,
      labelsInput: csv(item.previewData.candlestick.data.map((point) => point.label)),
      openValuesInput: csv(item.previewData.candlestick.data.map((point) => point.open)),
      highValuesInput: csv(item.previewData.candlestick.data.map((point) => point.high)),
      lowValuesInput: csv(item.previewData.candlestick.data.map((point) => point.low)),
      closeValuesInput: csv(item.previewData.candlestick.data.map((point) => point.close)),
      upColor: item.previewData.candlestick.upColor,
      downColor: item.previewData.candlestick.downColor,
      neutralColor: item.previewData.candlestick.neutralColor,
      showGrid: true,
      showTooltip: true,
    };
  }

  if (item.previewType === 'scroll-panel') {
    return {
      maxHeight: 360,
      density: 'default',
      itemCount: 18,
    };
  }

  if (item.previewType === 'oilgas-form') {
    return {
      resetVersion: 0,
      scenario: 'normal',
      mode: 'detailed',
      pressureThreshold: 190,
      h2sThreshold: 10,
      showChecklist: true,
      showRiskPanel: true,
      readonly: false,
    } satisfies OilGasPlaygroundState;
  }

  if (item.previewType === 'spreadsheet') {
    return {
      tableViewMode: item.slug === 'financial-planning-table' ? 'app' : 'spreadsheet',
      editable: true,
      height: 500,
    };
  }

  if (item.previewType === 'bar' && item.previewData?.bar) {
    return {
      height: 360,
      labelsInput: csv(item.previewData.bar.labels),
      datasets: item.previewData.bar.datasets.map((dataset) => (
        datasetInput(dataset.id, dataset.label, dataset.values, dataset.color)
      )),
      forecastActual: forecastDatasetInput('forecast-actual', 'Actual', [], '#111827'),
      forecastDatasets: [],
      valuesInput: '',
      pieColors: ['#84cc16', '#111827', '#a3e635', '#d9f99d'],
      barMinY: item.previewData.bar.minY,
      barMaxY: item.previewData.bar.maxY,
      radarMax: 10,
      pointRadius: 6,
    } satisfies ChartPlaygroundStateBase;
  }

  if (item.previewType === 'line' && item.previewData?.line) {
    return {
      height: 360,
      labelsInput: csv(item.previewData.line.labels),
      datasets: item.previewData.line.datasets.map((dataset) => (
        datasetInput(dataset.id, dataset.label, dataset.values, dataset.color, dataset.fill)
      )),
      forecastActual: forecastDatasetInput('forecast-actual', 'Actual', [], '#111827'),
      forecastDatasets: [],
      valuesInput: '',
      pieColors: ['#84cc16', '#111827', '#a3e635', '#d9f99d'],
      barMinY: 0,
      barMaxY: 1000,
      radarMax: 10,
      pointRadius: 6,
    } satisfies ChartPlaygroundStateBase;
  }

  if (item.previewType === 'scatter' && item.previewData?.scatter) {
    return {
      height: 360,
      labelsInput: '',
      datasets: item.previewData.scatter.datasets.map((dataset) => (
        scatterDatasetInput(dataset.id, dataset.label, dataset.points, dataset.color)
      )),
      forecastActual: forecastDatasetInput('forecast-actual', 'Actual', [], '#111827'),
      forecastDatasets: [],
      valuesInput: '',
      pieColors: ['#84cc16', '#111827', '#a3e635', '#d9f99d'],
      barMinY: 0,
      barMaxY: 1000,
      radarMax: 10,
      pointRadius: item.previewData.scatter.pointRadius,
    } satisfies ChartPlaygroundStateBase;
  }

  if (item.previewType === 'forecast' && item.previewData?.forecast) {
    return {
      height: 360,
      labelsInput: csv(item.previewData.forecast.labels),
      datasets: [],
      forecastActual: forecastDatasetInput(
        item.previewData.forecast.actual.id,
        item.previewData.forecast.actual.label,
        item.previewData.forecast.actual.values,
        item.previewData.forecast.actual.color,
      ),
      forecastDatasets: item.previewData.forecast.forecastDatasets.map((dataset) => (
        forecastDatasetInput(dataset.id, dataset.label, dataset.values, dataset.color)
      )),
      valuesInput: '',
      pieColors: ['#84cc16', '#111827', '#a3e635', '#d9f99d'],
      barMinY: 0,
      barMaxY: 1000,
      radarMax: 10,
      pointRadius: 6,
    } satisfies ChartPlaygroundStateBase;
  }

  if (item.previewType === 'pie' && item.previewData?.pie) {
    return {
      height: 360,
      labelsInput: csv(item.previewData.pie.labels),
      datasets: [],
      forecastActual: forecastDatasetInput('forecast-actual', 'Actual', [], '#111827'),
      forecastDatasets: [],
      valuesInput: csv(item.previewData.pie.values),
      pieColors: item.previewData.pie.colors,
      barMinY: 0,
      barMaxY: 1000,
      radarMax: 10,
      pointRadius: 6,
    } satisfies ChartPlaygroundStateBase;
  }

  if (item.previewType === 'radar' && item.previewData?.radar) {
    return {
      height: 360,
      labelsInput: csv(item.previewData.radar.labels),
      datasets: item.previewData.radar.datasets.map((dataset) => (
        datasetInput(dataset.id, dataset.label, dataset.values, dataset.color)
      )),
      forecastActual: forecastDatasetInput('forecast-actual', 'Actual', [], '#111827'),
      forecastDatasets: [],
      valuesInput: '',
      pieColors: ['#84cc16', '#111827', '#a3e635', '#d9f99d'],
      barMinY: 0,
      barMaxY: 1000,
      radarMax: item.previewData.radar.maxValue,
      pointRadius: 6,
    } satisfies ChartPlaygroundStateBase;
  }

  return {};
}

function asChartState(state: PlaygroundState): ChartPlaygroundStateBase {
  return state as ChartPlaygroundStateBase;
}

export function buildComponentPreviewItem(
  baseItem: ComponentRegistryItem,
  state: PlaygroundState,
  tableData: SpreadsheetData | null,
): ComponentRegistryItem {
  if (!isChartPreviewType(baseItem.previewType)) {
    if (baseItem.previewType === 'spreadsheet' && tableData && baseItem.previewData) {
      return {
        ...baseItem,
        previewData: {
          ...baseItem.previewData,
          spreadsheet: tableData,
        },
      };
    }
    if (baseItem.previewType === 'feedback-states' && baseItem.previewData?.feedbackStates) {
      const enabled = new Set<FeedbackStateType>();
      if (state.enabledNeutral !== false) enabled.add('neutral');
      if (state.enabledInfo !== false) enabled.add('info');
      if (state.enabledWarning !== false) enabled.add('warning');
      if (state.enabledError !== false) enabled.add('error');
      if (state.enabledSuccess !== false) enabled.add('success');
      return {
        ...baseItem,
        previewData: {
          ...baseItem.previewData,
          feedbackStates: {
            states: baseItem.previewData.feedbackStates.states
              .filter((item) => enabled.has(item.type))
              .map((item) => ({ ...item, label: item.label || item.type })),
          },
        },
      };
    }
    if (baseItem.previewType === 'tooltip' && baseItem.previewData?.tooltip) {
      const placement = tooltipPlacements.includes(state.placement as TooltipPlacement) ? state.placement as TooltipPlacement : 'top';
      return {
        ...baseItem,
        previewData: {
          ...baseItem.previewData,
          tooltip: {
            message: typeof state.message === 'string' && state.message.trim() ? state.message : baseItem.previewData.tooltip.message,
            placement,
            theme: state.theme === 'dark' ? 'dark' : 'light',
            multiline: state.multiline === true,
          },
        },
      };
    }
    if (baseItem.previewType === 'input-field' && baseItem.previewData?.inputField) {
      return {
        ...baseItem,
        previewData: {
          ...baseItem.previewData,
          inputField: {
            label: String(state.label ?? baseItem.previewData.inputField.label),
            value: String(state.value ?? ''),
            placeholder: String(state.placeholder ?? baseItem.previewData.inputField.placeholder),
            state: ['default', 'hover', 'focus', 'filled', 'disabled', 'error'].includes(String(state.state)) ? state.state as never : 'default',
            size: state.size === 'sm' || state.size === 'lg' ? state.size : 'md',
            required: state.required === true,
            helperText: String(state.helperText ?? ''),
            errorText: String(state.errorText ?? 'Error'),
          },
        },
      };
    }
    if (baseItem.previewType === 'select-field' && baseItem.previewData?.selectField) {
      const options = parseOptionsInput(state.optionsInput);
      const mode = state.mode === 'search' || state.mode === 'multiple' ? state.mode : 'single';
      const selectedText = String(state.selectedValue ?? '');
      return {
        ...baseItem,
        previewData: {
          ...baseItem.previewData,
          selectField: {
            label: String(state.label ?? baseItem.previewData.selectField.label),
            placeholder: String(state.placeholder ?? baseItem.previewData.selectField.placeholder),
            value: mode === 'multiple' ? parseTextList(selectedText) : selectedText,
            options,
            state: ['default', 'hover', 'focus', 'filled', 'disabled', 'error'].includes(String(state.state)) ? state.state as never : 'default',
            mode,
            size: state.size === 'sm' || state.size === 'lg' ? state.size : 'md',
            searchable: state.searchable === true,
            clearable: state.clearable !== false,
            errorText: String(state.errorText ?? 'Error'),
          },
        },
      };
    }
    if (baseItem.previewType === 'icon-set' && baseItem.previewData?.iconSet) {
      return {
        ...baseItem,
        previewData: {
          ...baseItem.previewData,
          iconSet: {
            variant: state.variant === 'solid' || state.variant === 'outline' ? state.variant : 'soft',
            size: state.size === 'sm' || state.size === 'lg' ? state.size : 'md',
            icons: baseItem.previewData.iconSet.icons,
          },
        },
      };
    }
    if (baseItem.previewType === 'candlestick' && baseItem.previewData?.candlestick) {
      return {
        ...baseItem,
        previewData: {
          ...baseItem.previewData,
          candlestick: {
            data: parseCandlestickData(state),
            upColor: isHexColor(state.upColor) ? String(state.upColor) : baseItem.previewData.candlestick.upColor,
            downColor: isHexColor(state.downColor) ? String(state.downColor) : baseItem.previewData.candlestick.downColor,
            neutralColor: isHexColor(state.neutralColor) ? String(state.neutralColor) : baseItem.previewData.candlestick.neutralColor,
            height: Number(state.height) || baseItem.previewData.candlestick.height,
          },
        },
      };
    }
    return baseItem;
  }

  const chartState = asChartState(state);
  const labels = parseTextList(chartState.labelsInput);

  if (baseItem.previewType === 'bar' && baseItem.previewData?.bar) {
    return {
      ...baseItem,
      previewData: {
        ...baseItem.previewData,
        bar: {
          labels,
          datasets: chartState.datasets.map((dataset) => ({
            id: dataset.id,
            label: dataset.label.trim(),
            values: parseFlexibleNumberList(dataset.valuesInput).filter(isParsedNumber),
            color: dataset.color,
          })),
          minY: chartState.barMinY,
          maxY: chartState.barMaxY,
        },
      },
    };
  }

  if (baseItem.previewType === 'line' && baseItem.previewData?.line) {
    return {
      ...baseItem,
      previewData: {
        ...baseItem.previewData,
        line: {
          labels,
          datasets: chartState.datasets.map((dataset) => ({
            id: dataset.id,
            label: dataset.label.trim(),
            values: parseFlexibleNumberList(dataset.valuesInput).filter(isParsedNumber),
            color: dataset.color,
            fill: dataset.fill === true,
          })),
        },
      },
    };
  }

  if (baseItem.previewType === 'scatter' && baseItem.previewData?.scatter) {
    return {
      ...baseItem,
      previewData: {
        ...baseItem.previewData,
        scatter: {
          datasets: chartState.datasets.map((dataset) => ({
            id: dataset.id,
            label: dataset.label.trim(),
            points: parsePointList(dataset.pointsInput),
            color: dataset.color,
          })),
          pointRadius: chartState.pointRadius,
        },
      },
    };
  }

  if (baseItem.previewType === 'forecast' && baseItem.previewData?.forecast) {
    return {
      ...baseItem,
      previewData: {
        ...baseItem.previewData,
        forecast: {
          labels,
          actual: {
            id: chartState.forecastActual.id,
            label: chartState.forecastActual.label.trim() || 'Actual',
            values: parseFlexibleNumberList(chartState.forecastActual.valuesInput),
            color: chartState.forecastActual.color,
          },
          forecastDatasets: chartState.forecastDatasets.map((dataset) => ({
            id: dataset.id,
            label: dataset.label.trim(),
            values: parseFlexibleNumberList(dataset.valuesInput),
            color: dataset.color,
          })),
        },
      },
    };
  }

  if (baseItem.previewType === 'pie' && baseItem.previewData?.pie) {
    return {
      ...baseItem,
      previewData: {
        ...baseItem.previewData,
        pie: {
          labels,
          values: parseFlexibleNumberList(chartState.valuesInput).filter(isParsedNumber),
          colors: chartState.pieColors,
        },
      },
    };
  }

  if (baseItem.previewType === 'radar' && baseItem.previewData?.radar) {
    return {
      ...baseItem,
      previewData: {
        ...baseItem.previewData,
        radar: {
          labels,
          datasets: chartState.datasets.map((dataset) => ({
            id: dataset.id,
            label: dataset.label.trim(),
            values: parseFlexibleNumberList(dataset.valuesInput).filter(isParsedNumber),
            color: dataset.color,
          })),
          maxValue: chartState.radarMax,
        },
      },
    };
  }

  return baseItem;
}

export function buildPlaygroundValidation(
  item: ComponentRegistryItem,
  state: PlaygroundState,
  tableValidation: PlaygroundValidation,
  locale: Locale,
): PlaygroundValidation {
  if (isChartPreviewType(item.previewType)) {
    const chartState = asChartState(state);
    const allowNull = item.previewType === 'forecast';
    const valueInputs = item.previewType === 'pie'
      ? [chartState.valuesInput]
      : item.previewType === 'forecast'
        ? [chartState.forecastActual.valuesInput, ...chartState.forecastDatasets.map((dataset) => dataset.valuesInput)]
        : chartState.datasets.map((dataset) => dataset.valuesInput);
    const invalidNumberTokens = [
      ...valueInputs.flatMap((input) => findInvalidNumberTokens(input, allowNull)),
    ];
    const invalidPointTokens = item.previewType === 'scatter'
      ? chartState.datasets.flatMap((dataset) => findInvalidPointTokens(dataset.pointsInput))
      : [];

    return {
      errors: buildChartIssues({
        previewType: item.previewType,
        labels: parseTextList(chartState.labelsInput),
        datasets: chartState.datasets.map((dataset) => ({
          id: dataset.id,
          label: dataset.label,
          values: parseFlexibleNumberList(dataset.valuesInput),
          points: parsePointList(dataset.pointsInput),
          color: dataset.color,
        })),
        forecastActual: {
          id: chartState.forecastActual.id,
          label: chartState.forecastActual.label,
          values: parseFlexibleNumberList(chartState.forecastActual.valuesInput),
          points: [],
          color: chartState.forecastActual.color,
        },
        forecastDatasets: chartState.forecastDatasets.map((dataset) => ({
          id: dataset.id,
          label: dataset.label,
          values: parseFlexibleNumberList(dataset.valuesInput),
          points: [],
          color: dataset.color,
        })),
        pieValues: parseFlexibleNumberList(chartState.valuesInput),
        pieColors: chartState.pieColors,
        barMinY: chartState.barMinY,
        barMaxY: chartState.barMaxY,
        radarMax: chartState.radarMax,
        pointRadius: chartState.pointRadius,
        height: chartState.height,
        invalidNumberTokens,
        invalidPointTokens,
        locale,
      }),
      warnings: [],
    };
  }

  if (item.previewType === 'scroll-panel') {
    const maxHeight = Number(state.maxHeight);
    const itemCount = Number(state.itemCount);
    const errors: string[] = [];
    if (!Number.isFinite(maxHeight) || maxHeight < 160 || maxHeight > 640) {
      errors.push(
        t(
          {
            ru: 'maxHeight должен быть в диапазоне 160–640 px.',
            en: 'maxHeight must be within 160–640 px.',
            de: 'maxHeight muss im Bereich 160–640 px liegen.',
          },
          locale,
        ),
      );
    }
    if (!Number.isFinite(itemCount) || itemCount < 1 || itemCount > 50) {
      errors.push(
        t(
          {
            ru: 'itemCount должен быть в диапазоне 1–50.',
            en: 'itemCount must be within 1–50.',
            de: 'itemCount muss im Bereich 1–50 liegen.',
          },
          locale,
        ),
      );
    }
    return { errors, warnings: [] };
  }

  if (item.previewType === 'feedback-states') {
    const enabledCount = ['enabledNeutral', 'enabledInfo', 'enabledWarning', 'enabledError', 'enabledSuccess']
      .filter((key) => state[key] !== false).length;
    return {
      errors: [],
      warnings: enabledCount === 0
        ? [t({ ru: 'Выберите хотя бы одно feedback-состояние.', en: 'Select at least one feedback state.', de: 'Wählen Sie mindestens einen Feedback-Zustand.' }, locale)]
        : [],
    };
  }

  if (item.previewType === 'tooltip') {
    const width = Number(state.width);
    const warnings: string[] = [];
    if (typeof state.message !== 'string' || state.message.trim() === '') {
      warnings.push(t({ ru: 'Tooltip message пустой, используется fallback.', en: 'Tooltip message is empty; fallback is used.', de: 'Tooltip message ist leer; Fallback wird genutzt.' }, locale));
    }
    if (!Number.isFinite(width) || width < 160 || width > 420) {
      warnings.push(t({ ru: 'Tooltip width должен быть в диапазоне 160-420 px.', en: 'Tooltip width must be within 160-420 px.', de: 'Tooltip width muss im Bereich 160-420 px liegen.' }, locale));
    }
    return { errors: [], warnings };
  }

  if (item.previewType === 'input-field') {
    const errors: string[] = [];
    const warnings: string[] = [];
    const value = String(state.value ?? '');
    if (state.required === true && value.trim() === '') {
      errors.push(t({ ru: 'REQUIRED_EMPTY: обязательное поле пустое.', en: 'REQUIRED_EMPTY: required field is empty.', de: 'REQUIRED_EMPTY: Pflichtfeld ist leer.' }, locale));
    }
    if (state.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors.push(t({ ru: 'INVALID_EMAIL: email имеет неверный формат.', en: 'INVALID_EMAIL: email has invalid format.', de: 'INVALID_EMAIL: E-Mail-Format ist ungültig.' }, locale));
    }
    if (state.type === 'number' && value && Number.isNaN(Number(value.replace(',', '.')))) {
      errors.push(t({ ru: 'INVALID_NUMBER: значение должно быть числом.', en: 'INVALID_NUMBER: value must be numeric.', de: 'INVALID_NUMBER: Wert muss numerisch sein.' }, locale));
    }
    if (typeof state.label !== 'string' || state.label.trim() === '') {
      warnings.push(t({ ru: 'Label пустой, UI остаётся доступным через placeholder.', en: 'Label is empty; UI remains usable through placeholder.', de: 'Label ist leer; UI bleibt über placeholder nutzbar.' }, locale));
    }
    return { errors, warnings };
  }

  if (item.previewType === 'select-field') {
    const errors: string[] = [];
    const warnings: string[] = [];
    const options = parseOptionsInput(state.optionsInput);
    const values = options.map((option) => option.value);
    const selected = state.mode === 'multiple' ? parseTextList(String(state.selectedValue ?? '')) : [String(state.selectedValue ?? '')].filter(Boolean);
    if (options.length === 0) errors.push(t({ ru: 'EMPTY_OPTIONS: список options пуст.', en: 'EMPTY_OPTIONS: options list is empty.', de: 'EMPTY_OPTIONS: options-Liste ist leer.' }, locale));
    if (new Set(values).size !== values.length) warnings.push(t({ ru: 'DUPLICATE_OPTIONS: значения options повторяются.', en: 'DUPLICATE_OPTIONS: option values are duplicated.', de: 'DUPLICATE_OPTIONS: Optionswerte sind doppelt.' }, locale));
    if (selected.some((value) => value && !values.includes(value))) warnings.push(t({ ru: 'UNKNOWN_VALUE: выбранное значение отсутствует в options.', en: 'UNKNOWN_VALUE: selected value is not present in options.', de: 'UNKNOWN_VALUE: Ausgewählter Wert fehlt in options.' }, locale));
    return { errors, warnings };
  }

  if (item.previewType === 'icon-set') {
    const warnings: string[] = [];
    if (state.size !== 'sm' && state.size !== 'md' && state.size !== 'lg') {
      warnings.push(t({ ru: 'INVALID_SIZE: используется fallback md.', en: 'INVALID_SIZE: md fallback is used.', de: 'INVALID_SIZE: Fallback md wird genutzt.' }, locale));
    }
    return { errors: [], warnings };
  }

  if (item.previewType === 'candlestick') {
    const errors: string[] = [];
    const labels = parseTextList(String(state.labelsInput ?? ''));
    const valueInputs = [
      String(state.openValuesInput ?? ''),
      String(state.highValuesInput ?? ''),
      String(state.lowValuesInput ?? ''),
      String(state.closeValuesInput ?? ''),
    ];
    const parsedLists = valueInputs.map((input) => parseFlexibleNumberList(input).filter(isParsedNumber));
    const invalidNumbers = valueInputs.flatMap((input) => findInvalidNumberTokens(input));
    const height = Number(state.height);
    if (labels.length === 0) errors.push(t({ ru: 'EMPTY_DATA: данные свечей пустые.', en: 'EMPTY_DATA: candlestick data is empty.', de: 'EMPTY_DATA: Candlestick-Daten sind leer.' }, locale));
    if (invalidNumbers.length > 0) errors.push(t({ ru: 'INVALID_NUMBER: OHLC значения должны быть числами.', en: 'INVALID_NUMBER: OHLC values must be numeric.', de: 'INVALID_NUMBER: OHLC-Werte müssen numerisch sein.' }, locale));
    if (parsedLists.some((list) => list.length !== labels.length)) errors.push(t({ ru: 'OHLC_LENGTH_MISMATCH: длины labels/open/high/low/close должны совпадать.', en: 'OHLC_LENGTH_MISMATCH: labels/open/high/low/close lengths must match.', de: 'OHLC_LENGTH_MISMATCH: labels/open/high/low/close müssen gleich lang sein.' }, locale));
    const data = parseCandlestickData(state);
    if (data.some((point) => point.high < Math.max(point.open, point.close) || point.low > Math.min(point.open, point.close))) {
      errors.push(t({ ru: 'HIGH_LOW_INVALID: high/low не покрывают open/close.', en: 'HIGH_LOW_INVALID: high/low do not contain open/close.', de: 'HIGH_LOW_INVALID: high/low umfassen open/close nicht.' }, locale));
    }
    if (![state.upColor, state.downColor, state.neutralColor].every(isHexColor)) {
      errors.push(t({ ru: 'INVALID_COLOR: цвета должны быть hex.', en: 'INVALID_COLOR: colors must be hex values.', de: 'INVALID_COLOR: Farben müssen Hex-Werte sein.' }, locale));
    }
    if (!Number.isFinite(height) || height < 240 || height > 640) {
      errors.push(t({ ru: 'height должен быть в диапазоне 240-640 px.', en: 'height must be within 240-640 px.', de: 'height muss im Bereich 240-640 px liegen.' }, locale));
    }
    return { errors, warnings: [] };
  }

  if (item.previewType === 'spreadsheet') return tableValidation;

  return { errors: [], warnings: [] };
}

export function getPreviewHeight(item: ComponentRegistryItem, state: PlaygroundState) {
  if (item.previewType === 'spreadsheet' || item.previewType === 'candlestick' || isChartPreviewType(item.previewType)) {
    return Number(state.height) || (item.previewType === 'spreadsheet' ? 500 : 360);
  }
  return undefined;
}

export function getScrollPanelDensity(state: PlaygroundState): ScrollPanelDensity {
  return state.density === 'compact' || state.density === 'comfortable' ? state.density : 'default';
}
