import { memo, useCallback, useMemo } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { Locale } from '../../../shared/types/locale';
import { t } from '../../../shared/lib/i18n';
import { createId } from '../../../shared/lib/id';
import ColorControl from '../../../shared/ui/ColorControl';
import ColorListControl from '../../../shared/ui/ColorListControl';
import type { ChartDatasetInput, ChartPlaygroundState } from '../model/chartPlaygroundTypes';
import type { ChartPreviewType } from '../model/isChartPreviewType';
import { parseFlexibleNumberList } from '../model/chartParsers';

type Props = {
  locale: Locale;
  previewType: ChartPreviewType;
  state: ChartPlaygroundState;
  setState: Dispatch<SetStateAction<ChartPlaygroundState>>;
};

type DatasetEditorProps = {
  dataset: ChartDatasetInput;
  locale: Locale;
  title: string;
  mode: 'values' | 'points';
  canRemove: boolean;
  showFill?: boolean;
  onChange: (id: string, patch: Partial<ChartDatasetInput>) => void;
  onRemove: (id: string) => void;
};

const palette = ['#84cc16', '#2563eb', '#f97316', '#dc2626', '#8b5cf6', '#111827'];

function createDatasetInput(previewType: ChartPreviewType, index: number): ChartDatasetInput {
  const labelPrefix: Record<ChartPreviewType, string> = {
    bar: 'Series',
    line: 'Line',
    scatter: 'Dataset',
    forecast: 'Scenario',
    pie: 'Segment',
    radar: 'Product',
  };

  return {
    id: createId(previewType),
    label: `${labelPrefix[previewType]} ${index + 1}`,
    valuesInput: previewType === 'forecast' ? 'null, null, null, 34, 39, 46' : '10, 20, 30',
    pointsInput: '5:18, 8:11, 11:19',
    color: palette[index % palette.length],
    fill: previewType === 'line' ? index === 0 : false,
  };
}

const ChartLabelsEditor = memo(function ChartLabelsEditor({
  locale,
  value,
  onChange,
}: {
  locale: Locale;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="form-field">
      <span>{t({ ru: 'Подписи', en: 'Labels', de: 'Beschriftungen' }, locale)}</span>
      <textarea rows={3} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
});

const DatasetEditor = memo(function DatasetEditor({
  dataset,
  locale,
  title,
  mode,
  canRemove,
  showFill = false,
  onChange,
  onRemove,
}: DatasetEditorProps) {
  return (
    <div className="dataset-editor">
      <div className="dataset-editor__head">
        <strong>{title}</strong>
        <button type="button" className="ghost-button" disabled={!canRemove} onClick={() => onRemove(dataset.id)}>
          {t({ ru: 'Удалить', en: 'Remove', de: 'Entfernen' }, locale)}
        </button>
      </div>
      <label className="form-field">
        <span>{t({ ru: 'Название ряда', en: 'Dataset label', de: 'Datensatzname' }, locale)}</span>
        <input value={dataset.label} onChange={(event) => onChange(dataset.id, { label: event.target.value })} />
      </label>
      <label className="form-field">
        <span>{mode === 'points' ? t({ ru: 'Точки x:y', en: 'Points x:y', de: 'Punkte x:y' }, locale) : t({ ru: 'Значения', en: 'Values', de: 'Werte' }, locale)}</span>
        <textarea
          rows={mode === 'points' ? 4 : 3}
          value={mode === 'points' ? dataset.pointsInput : dataset.valuesInput}
          onChange={(event) => onChange(dataset.id, mode === 'points' ? { pointsInput: event.target.value } : { valuesInput: event.target.value })}
        />
      </label>
      <div className="form-field">
        <ColorControl
          label={t({ ru: 'Цвет ряда', en: 'Dataset color', de: 'Datensatzfarbe' }, locale)}
          value={dataset.color}
          onChange={(next) => onChange(dataset.id, { color: next })}
          locale={locale}
        />
      </div>
      {showFill && (
        <label className="checkbox-field">
          <input
            type="checkbox"
            checked={dataset.fill === true}
            onChange={(event) => onChange(dataset.id, { fill: event.target.checked })}
          />
          <span>{t({ ru: 'Заливка под линией', en: 'Fill area under line', de: 'Fläche unter der Linie füllen' }, locale)}</span>
        </label>
      )}
    </div>
  );
});

type DatasetListEditorProps = {
  locale: Locale;
  previewType: ChartPreviewType;
  datasets: ChartDatasetInput[];
  mode: 'values' | 'points';
  addLabel: string;
  showFill?: boolean;
  onDatasetChange: (id: string, patch: Partial<ChartDatasetInput>) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
};

const DatasetListEditor = memo(function DatasetListEditor({
  locale,
  previewType,
  datasets,
  mode,
  addLabel,
  showFill = false,
  onDatasetChange,
  onAdd,
  onRemove,
}: DatasetListEditorProps) {
  return (
    <div className="dataset-list-editor">
      {datasets.map((dataset, index) => (
        <DatasetEditor
          key={dataset.id}
          dataset={dataset}
          locale={locale}
          title={`${previewType === 'radar' ? 'Product' : 'Dataset'} ${index + 1}`}
          mode={mode}
          canRemove={datasets.length > 1}
          showFill={showFill}
          onChange={onDatasetChange}
          onRemove={onRemove}
        />
      ))}
      <button type="button" className="secondary-button" onClick={onAdd}>
        {addLabel}
      </button>
    </div>
  );
});

const ChartScaleControls = memo(function ChartScaleControls({
  previewType,
  state,
  onUpdate,
  locale,
}: {
  previewType: ChartPreviewType;
  state: ChartPlaygroundState;
  onUpdate: <Key extends keyof ChartPlaygroundState>(key: Key, value: ChartPlaygroundState[Key]) => void;
  locale: Locale;
}) {
  return (
    <>
      {previewType === 'scatter' && (
        <label className="form-field">
          <span>{t({ ru: 'Радиус точки', en: 'Point radius', de: 'Punktradius' }, locale)}</span>
          <input
            type="number"
            min="1"
            value={state.pointRadius}
            onChange={(event) => onUpdate('pointRadius', Number(event.target.value))}
          />
        </label>
      )}

      {previewType === 'bar' && (
        <>
          <label className="form-field">
            <span>Y min</span>
            <input type="number" value={state.barMinY} onChange={(event) => onUpdate('barMinY', Number(event.target.value))} />
          </label>
          <label className="form-field">
            <span>Y max</span>
            <input type="number" value={state.barMaxY} onChange={(event) => onUpdate('barMaxY', Number(event.target.value))} />
          </label>
        </>
      )}

      {previewType === 'radar' && (
        <label className="form-field">
          <span>{t({ ru: 'Максимум шкалы', en: 'Max scale', de: 'Maximale Skala' }, locale)}</span>
          <input
            type="number"
            min="1"
            value={state.radarMax}
            onChange={(event) => onUpdate('radarMax', Number(event.target.value))}
          />
        </label>
      )}
    </>
  );
});

export default function ChartPlayground({ locale, previewType, state, setState }: Props) {
  const update = useCallback(<Key extends keyof ChartPlaygroundState>(
    key: Key,
    value: ChartPlaygroundState[Key],
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, [setState]);

  const updateDataset = useCallback((id: string, patch: Partial<ChartDatasetInput>) => {
    setState((prev) => ({
      ...prev,
      datasets: prev.datasets.map((dataset) => (dataset.id === id ? { ...dataset, ...patch } : dataset)),
    }));
  }, [setState]);

  const addDataset = useCallback(() => {
    setState((prev) => ({
      ...prev,
      datasets: [...prev.datasets, createDatasetInput(previewType, prev.datasets.length)],
    }));
  }, [previewType, setState]);

  const removeDataset = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      datasets: prev.datasets.length <= 1 ? prev.datasets : prev.datasets.filter((dataset) => dataset.id !== id),
    }));
  }, [setState]);

  const updateForecastActual = useCallback((id: string, patch: Partial<ChartDatasetInput>) => {
    setState((prev) => ({
      ...prev,
      forecastActual: prev.forecastActual.id === id ? { ...prev.forecastActual, ...patch } : prev.forecastActual,
    }));
  }, [setState]);

  const updateForecastDataset = useCallback((id: string, patch: Partial<ChartDatasetInput>) => {
    setState((prev) => ({
      ...prev,
      forecastDatasets: prev.forecastDatasets.map((dataset) => (dataset.id === id ? { ...dataset, ...patch } : dataset)),
    }));
  }, [setState]);

  const addForecastDataset = useCallback(() => {
    setState((prev) => ({
      ...prev,
      forecastDatasets: [...prev.forecastDatasets, createDatasetInput('forecast', prev.forecastDatasets.length)],
    }));
  }, [setState]);

  const removeForecastDataset = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      forecastDatasets: prev.forecastDatasets.length <= 1
        ? prev.forecastDatasets
        : prev.forecastDatasets.filter((dataset) => dataset.id !== id),
    }));
  }, [setState]);

  const segmentCount = useMemo(
    () => previewType === 'pie'
      ? parseFlexibleNumberList(state.valuesInput).filter((value) => typeof value === 'number').length
      : 0,
    [previewType, state.valuesInput],
  );

  return (
    <>
      <label className="form-field">
        <span>{t({ ru: 'Высота', en: 'Height', de: 'Höhe' }, locale)}</span>
        <input
          type="range"
          min="220"
          max="760"
          step="10"
          value={state.height}
          onChange={(event) => update('height', Number(event.target.value))}
        />
      </label>

      {previewType !== 'scatter' && (
        <ChartLabelsEditor locale={locale} value={state.labelsInput} onChange={(next) => update('labelsInput', next)} />
      )}

      {previewType === 'pie' && (
        <>
          <label className="form-field">
            <span>{t({ ru: 'Значения сегментов', en: 'Segment values', de: 'Segmentwerte' }, locale)}</span>
            <textarea rows={3} value={state.valuesInput} onChange={(event) => update('valuesInput', event.target.value)} />
          </label>
          <div className="form-field">
            <ColorListControl
              label={t({ ru: 'Цвета сегментов', en: 'Segment colors', de: 'Segmentfarben' }, locale)}
              values={state.pieColors}
              onChange={(next) => update('pieColors', next)}
              locale={locale}
              requiredCount={segmentCount}
            />
          </div>
        </>
      )}

      {['bar', 'line', 'radar'].includes(previewType) && (
        <DatasetListEditor
          locale={locale}
          previewType={previewType}
          datasets={state.datasets}
          mode="values"
          addLabel={previewType === 'radar'
            ? t({ ru: 'Добавить продукт', en: 'Add product', de: 'Produkt hinzufügen' }, locale)
            : t({ ru: 'Добавить ряд', en: 'Add series', de: 'Reihe hinzufügen' }, locale)}
          showFill={previewType === 'line'}
          onDatasetChange={updateDataset}
          onAdd={addDataset}
          onRemove={removeDataset}
        />
      )}

      {previewType === 'scatter' && (
        <DatasetListEditor
          locale={locale}
          previewType={previewType}
          datasets={state.datasets}
          mode="points"
          addLabel={t({ ru: 'Добавить набор точек', en: 'Add dataset', de: 'Datensatz hinzufügen' }, locale)}
          onDatasetChange={updateDataset}
          onAdd={addDataset}
          onRemove={removeDataset}
        />
      )}

      {previewType === 'forecast' && (
        <>
          <DatasetEditor
            dataset={state.forecastActual}
            locale={locale}
            title="Actual"
            mode="values"
            canRemove={false}
            onChange={updateForecastActual}
            onRemove={() => undefined}
          />
          <DatasetListEditor
            locale={locale}
            previewType={previewType}
            datasets={state.forecastDatasets}
            mode="values"
            addLabel={t({ ru: 'Добавить forecast-сценарий', en: 'Add forecast scenario', de: 'Forecast-Szenario hinzufügen' }, locale)}
            onDatasetChange={updateForecastDataset}
            onAdd={addForecastDataset}
            onRemove={removeForecastDataset}
          />
        </>
      )}

      <ChartScaleControls previewType={previewType} state={state} onUpdate={update} locale={locale} />
    </>
  );
}
