import type { Locale } from '../../../shared/types/locale';
import { t } from '../../../shared/lib/i18n';
import type { ChartPoint } from './chartPlaygroundTypes';
import type { ChartPreviewType } from './isChartPreviewType';
import { isParsedNumber } from './chartParsers';

type ChartValidationDataset = {
  id: string;
  label: string;
  values: Array<number | null>;
  points: ChartPoint[];
  color: string;
};

type ChartValidationInput = {
  previewType: ChartPreviewType;
  labels: string[];
  datasets: ChartValidationDataset[];
  forecastActual: ChartValidationDataset;
  forecastDatasets: ChartValidationDataset[];
  pieValues: Array<number | null>;
  pieColors: string[];
  barMinY: number;
  barMaxY: number;
  radarMax: number;
  pointRadius: number;
  height: number;
  invalidNumberTokens: string[];
  invalidPointTokens: string[];
  locale: Locale;
};

export function buildChartIssues({
  previewType,
  labels,
  datasets,
  forecastActual,
  forecastDatasets,
  pieValues,
  pieColors,
  barMinY,
  barMaxY,
  radarMax,
  pointRadius,
  height,
  invalidNumberTokens,
  invalidPointTokens,
  locale,
}: ChartValidationInput) {
  const messages: string[] = [];
  const labelsCount = labels.length;
  const activeDatasets = previewType === 'forecast'
    ? [forecastActual, ...forecastDatasets]
    : datasets;
  const numericValues = activeDatasets.flatMap((dataset) => dataset.values.filter(isParsedNumber));
  const pieNumbers = pieValues.filter(isParsedNumber);
  const isHexColor = (value: string) => /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(value);

  const copy = {
    emptyLabels: t({ ru: 'Подписи пусты.', en: 'Labels are empty.', de: 'Beschriftungen sind leer.' }, locale),
    emptyPoints: t({ ru: 'Список точек пуст.', en: 'Points are empty.', de: 'Die Punkteliste ist leer.' }, locale),
    emptyDataset: t({ ru: 'Добавьте хотя бы один ряд данных.', en: 'Add at least one dataset.', de: 'Fügen Sie mindestens einen Datensatz hinzu.' }, locale),
    emptyDatasetLabel: t({ ru: 'Название ряда не должно быть пустым.', en: 'Dataset label must not be empty.', de: 'Der Datensatzname darf nicht leer sein.' }, locale),
    invalidColor: t({ ru: 'Цвет ряда должен быть hex-значением.', en: 'Dataset color must be a hex value.', de: 'Die Datensatzfarbe muss ein Hex-Wert sein.' }, locale),
    labelValueLen: t(
      {
        ru: 'Количество подписей должно совпадать с длиной каждого ряда.',
        en: 'Labels count should match every dataset length.',
        de: 'Die Anzahl der Beschriftungen muss zu jeder Datenreihe passen.',
      },
      locale,
    ),
    forecastLen: t(
      {
        ru: 'Для прогноза длины labels, actual и всех forecast-сценариев должны совпадать. Используйте null для пустых точек.',
        en: 'Labels count should match actual and every forecast scenario. Use null for empty slots.',
        de: 'Für Prognosen müssen labels, Ist-Werte und alle Szenarien gleich lang sein. Nutzen Sie null für Lücken.',
      },
      locale,
    ),
    pieColors: t(
      {
        ru: 'Недостаточно цветов для всех сегментов.',
        en: 'Not enough colors for all segments.',
        de: 'Es gibt nicht genug Farben für alle Segmente.',
      },
      locale,
    ),
    barBounds: t({ ru: 'Y max должен быть больше Y min.', en: 'Y max must be greater than Y min.', de: 'Y max muss größer als Y min sein.' }, locale),
    barOutOfRange: t(
      {
        ru: 'Есть значения, выходящие за границы Y min/Y max.',
        en: 'Some values exceed Y min/Y max.',
        de: 'Einige Werte liegen außerhalb von Y min/Y max.',
      },
      locale,
    ),
    radar: t(
      {
        ru: 'Значения radar должны быть в диапазоне 0..max scale.',
        en: 'Radar values must be within 0..max scale.',
        de: 'Radarwerte müssen im Bereich 0..max scale liegen.',
      },
      locale,
    ),
    invalidNumeric: t(
      {
        ru: 'В числовые поля нельзя вводить текст или NaN.',
        en: 'Numeric inputs cannot contain text or NaN.',
        de: 'Zahlenfelder dürfen keinen Text oder NaN enthalten.',
      },
      locale,
    ),
    invalidPoint: t(
      {
        ru: 'Точки должны быть в формате x:y, например 5:18.',
        en: 'Points must use x:y format, for example 5:18.',
        de: 'Punkte müssen das Format x:y haben, zum Beispiel 5:18.',
      },
      locale,
    ),
    pointRadius: t(
      {
        ru: 'Радиус точки должен быть больше 0.',
        en: 'Point radius must be greater than 0.',
        de: 'Der Punktradius muss größer als 0 sein.',
      },
      locale,
    ),
    heightRange: t(
      {
        ru: 'Высота графика должна быть в диапазоне 220-760 px.',
        en: 'Chart height must be within 220-760 px.',
        de: 'Die Diagrammhöhe muss im Bereich 220-760 px liegen.',
      },
      locale,
    ),
  };

  if (height < 220 || height > 760 || Number.isNaN(height)) messages.push(copy.heightRange);
  if (invalidNumberTokens.length > 0) messages.push(copy.invalidNumeric);
  if (invalidPointTokens.length > 0) messages.push(copy.invalidPoint);

  if (previewType !== 'scatter' && labelsCount === 0) messages.push(copy.emptyLabels);
  if (previewType === 'scatter' && activeDatasets.flatMap((dataset) => dataset.points).length === 0) {
    messages.push(copy.emptyPoints);
  }

  if (previewType !== 'pie' && activeDatasets.length === 0) messages.push(copy.emptyDataset);
  activeDatasets.forEach((dataset) => {
    if (!dataset.label.trim()) messages.push(copy.emptyDatasetLabel);
    if (!isHexColor(dataset.color)) messages.push(copy.invalidColor);
  });

  if (previewType === 'line' || previewType === 'radar') {
    if (activeDatasets.some((dataset) => labelsCount !== dataset.values.filter(isParsedNumber).length)) {
      messages.push(copy.labelValueLen);
    }
  }

  if (previewType === 'bar') {
    if (activeDatasets.some((dataset) => labelsCount !== dataset.values.filter(isParsedNumber).length)) {
      messages.push(copy.labelValueLen);
    }
    if (barMaxY <= barMinY) messages.push(copy.barBounds);
    if (numericValues.some((value) => value < barMinY || value > barMaxY)) messages.push(copy.barOutOfRange);
  }

  if (previewType === 'forecast' && activeDatasets.some((dataset) => labelsCount !== dataset.values.length)) {
    messages.push(copy.forecastLen);
  }

  if (previewType === 'pie') {
    if (labelsCount !== pieNumbers.length) messages.push(copy.labelValueLen);
    if (pieColors.length < pieNumbers.length) messages.push(copy.pieColors);
  }

  if (previewType === 'radar' && numericValues.some((value) => value < 0 || value > radarMax)) {
    messages.push(copy.radar);
  }
  if (previewType === 'scatter' && pointRadius <= 0) messages.push(copy.pointRadius);

  return [...new Set(messages)];
}
