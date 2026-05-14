import type { Dispatch, SetStateAction } from 'react';
import { t } from '../../shared/lib/i18n';
import type { Locale } from '../../shared/types/locale';
import type { ComponentRegistryItem } from '../../entities/component/model/component.types';
import ChartPlayground from '../../features/chart-playground/ui/ChartPlayground';
import type { ChartPlaygroundState } from '../../features/chart-playground/model/chartPlaygroundTypes';
import { isChartPreviewType } from '../../features/chart-playground/model/isChartPreviewType';
import SpreadsheetPlayground from '../../features/spreadsheet-playground/ui/SpreadsheetPlayground';
import type {
  ButtonPlaygroundState,
  OilGasPlaygroundState,
  PlaygroundState,
  ScrollPanelDensity,
  SpreadsheetPlaygroundState,
} from '../../features/component-playground/model/playground.types';
import type { GridifyButtonSize, GridifyButtonVariant } from '../../library/buttons/button.types';
import type { OilGasInspectionMode, OilGasInspectionScenario } from '../../library/forms/oil-gas-inspection/oilGasInspection.types';
import {
  gridifyActionButtonIntents,
  gridifyActionButtonSizes,
  gridifyActionButtonVariants,
} from '../../library/buttons/gridifyActionButton.model';
import ColorControl from '../../shared/ui/ColorControl';

type Props = {
  item: ComponentRegistryItem;
  locale: Locale;
  state: PlaygroundState;
  setState: Dispatch<SetStateAction<PlaygroundState>>;
};

const buttonVariants: GridifyButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success'];
const buttonSizes: GridifyButtonSize[] = ['sm', 'md', 'lg'];
const densityOptions: ScrollPanelDensity[] = ['compact', 'default', 'comfortable'];
const oilGasScenarios: OilGasInspectionScenario[] = ['normal', 'warning', 'critical'];
const oilGasModes: OilGasInspectionMode[] = ['compact', 'detailed'];
const fieldStates = ['default', 'hover', 'focus', 'filled', 'disabled', 'error'];
const fieldSizes = ['sm', 'md', 'lg'];
const tooltipPlacements = ['top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end'];
const selectModes = ['single', 'search', 'multiple'];
const iconVariants = ['solid', 'soft', 'outline'];
const iconSizes = ['sm', 'md', 'lg'];

export default function ComponentPlayground({ item, locale, state, setState }: Props) {
  const update = <Value,>(key: string, value: Value) => {
    setState((current) => ({ ...current, [key]: value }));
  };

  if (isChartPreviewType(item.previewType)) {
    return (
      <div className="sidebar-box">
        <h3>Playground</h3>
        <ChartPlayground
          locale={locale}
          previewType={item.previewType}
          state={state as ChartPlaygroundState}
          setState={setState as Dispatch<SetStateAction<ChartPlaygroundState>>}
        />
      </div>
    );
  }

  if (item.previewType === 'spreadsheet') {
    const spreadsheetState = state as SpreadsheetPlaygroundState;
    return (
      <div className="sidebar-box">
        <h3>Playground</h3>
        <SpreadsheetPlayground
          locale={locale}
          tableViewMode={spreadsheetState.tableViewMode}
          setTableViewMode={(next) => update('tableViewMode', typeof next === 'function' ? next(spreadsheetState.tableViewMode) : next)}
          editable={spreadsheetState.editable}
          setEditable={(next) => update('editable', next)}
          height={spreadsheetState.height}
          setHeight={(next) => update('height', next)}
        />
      </div>
    );
  }

  if (item.previewType === 'buttons') {
    const buttonState = state as ButtonPlaygroundState;
    return (
      <div className="sidebar-box">
        <h3>Playground</h3>
        <label className="form-field">
          <span>{t({ ru: 'Подпись', en: 'Label', de: 'Beschriftung' }, locale)}</span>
          <input value={buttonState.label} onChange={(event) => update('label', event.target.value)} />
        </label>
        <label className="form-field">
          <span>Variant</span>
          <select value={buttonState.variant} onChange={(event) => update('variant', event.target.value)}>
            {buttonVariants.map((variant) => <option key={variant} value={variant}>{variant}</option>)}
          </select>
        </label>
        <label className="form-field">
          <span>Size</span>
          <select value={buttonState.size} onChange={(event) => update('size', event.target.value)}>
            {buttonSizes.map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
        </label>
        <label className="checkbox-field">
          <input type="checkbox" checked={buttonState.loading} onChange={(event) => update('loading', event.target.checked)} />
          <span>Loading</span>
        </label>
        <label className="checkbox-field">
          <input type="checkbox" checked={buttonState.disabled} onChange={(event) => update('disabled', event.target.checked)} />
          <span>Disabled</span>
        </label>
        <div className="component-helper-box">
          <p>{t({ ru: 'Режим показа', en: 'View mode', de: 'Ansichtsmodus' }, locale)}</p>
          <div className="segmented-control">
            <button type="button" className={buttonState.viewMode === 'single' ? 'active' : ''} onClick={() => update('viewMode', 'single')}>
              {t({ ru: 'Одна', en: 'Single', de: 'Einzeln' }, locale)}
            </button>
            <button type="button" className={buttonState.viewMode === 'allVariants' ? 'active' : ''} onClick={() => update('viewMode', 'allVariants')}>
              {t({ ru: 'Все варианты', en: 'All variants', de: 'Alle Varianten' }, locale)}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (item.previewType === 'gridify-action-button') {
    return (
      <div className="sidebar-box">
        <h3>Playground</h3>
        <label className="form-field">
          <span>{t({ ru: 'Подпись', en: 'Label', de: 'Beschriftung' }, locale)}</span>
          <input value={String(state.label ?? '')} onChange={(event) => update('label', event.target.value)} />
        </label>
        <label className="form-field">
          <span>Variant</span>
          <select value={String(state.variant ?? 'solid')} onChange={(event) => update('variant', event.target.value)}>
            {gridifyActionButtonVariants.map((variant) => <option key={variant} value={variant}>{variant}</option>)}
          </select>
        </label>
        <label className="form-field">
          <span>Intent</span>
          <select value={String(state.intent ?? 'brand')} onChange={(event) => update('intent', event.target.value)}>
            {gridifyActionButtonIntents.map((intent) => <option key={intent} value={intent}>{intent}</option>)}
          </select>
        </label>
        <label className="form-field">
          <span>Size</span>
          <select value={String(state.size ?? 'md')} onChange={(event) => update('size', event.target.value)}>
            {gridifyActionButtonSizes.map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
        </label>
        <label className="checkbox-field">
          <input type="checkbox" checked={state.loading === true} onChange={(event) => update('loading', event.target.checked)} />
          <span>Loading</span>
        </label>
        <label className="checkbox-field">
          <input type="checkbox" checked={state.disabled === true} onChange={(event) => update('disabled', event.target.checked)} />
          <span>Disabled</span>
        </label>
        <label className="checkbox-field">
          <input type="checkbox" checked={state.fullWidth === true} onChange={(event) => update('fullWidth', event.target.checked)} />
          <span>Full width</span>
        </label>
        <label className="checkbox-field">
          <input type="checkbox" checked={state.withIcon === true} onChange={(event) => update('withIcon', event.target.checked)} />
          <span>Icon slot</span>
        </label>
        <label className="checkbox-field">
          <input type="checkbox" checked={state.trailingBadge === true} onChange={(event) => update('trailingBadge', event.target.checked)} />
          <span>Trailing badge</span>
        </label>
        <label className="checkbox-field">
          <input type="checkbox" checked={state.showBrandPrefix === true} onChange={(event) => update('showBrandPrefix', event.target.checked)} />
          <span>Brand prefix</span>
        </label>
        <label className="form-field">
          <span>brandPrefixText</span>
          <input value={String(state.brandPrefixText ?? 'GridiFy')} onChange={(event) => update('brandPrefixText', event.target.value)} />
        </label>
      </div>
    );
  }

  if (item.previewType === 'feedback-states') {
    return (
      <div className="sidebar-box">
        <h3>Playground</h3>
        <label className="form-field">
          <span>Size</span>
          <select value={String(state.size ?? 'md')} onChange={(event) => update('size', event.target.value)}>
            {fieldSizes.map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
        </label>
        <label className="form-field">
          <span>Orientation</span>
          <select value={String(state.orientation ?? 'row')} onChange={(event) => update('orientation', event.target.value)}>
            {['row', 'grid'].map((orientation) => <option key={orientation} value={orientation}>{orientation}</option>)}
          </select>
        </label>
        <label className="checkbox-field">
          <input type="checkbox" checked={state.showLabels !== false} onChange={(event) => update('showLabels', event.target.checked)} />
          <span>showLabels</span>
        </label>
        {[
          ['enabledNeutral', 'neutral'],
          ['enabledInfo', 'info'],
          ['enabledWarning', 'warning'],
          ['enabledError', 'error'],
          ['enabledSuccess', 'success'],
        ].map(([key, label]) => (
          <label key={key} className="checkbox-field">
            <input type="checkbox" checked={state[key] !== false} onChange={(event) => update(key, event.target.checked)} />
            <span>{label}</span>
          </label>
        ))}
      </div>
    );
  }

  if (item.previewType === 'tooltip') {
    return (
      <div className="sidebar-box">
        <h3>Playground</h3>
        <label className="form-field">
          <span>Message</span>
          <textarea rows={3} value={String(state.message ?? '')} onChange={(event) => update('message', event.target.value)} />
        </label>
        <label className="form-field">
          <span>Placement</span>
          <select value={String(state.placement ?? 'top')} onChange={(event) => update('placement', event.target.value)}>
            {tooltipPlacements.map((placement) => <option key={placement} value={placement}>{placement}</option>)}
          </select>
        </label>
        <label className="form-field">
          <span>Theme</span>
          <select value={String(state.theme ?? 'light')} onChange={(event) => update('theme', event.target.value)}>
            {['light', 'dark'].map((theme) => <option key={theme} value={theme}>{theme}</option>)}
          </select>
        </label>
        <label className="form-field">
          <span>Width</span>
          <input type="range" min="160" max="420" step="10" value={Number(state.width ?? 280)} onChange={(event) => update('width', Number(event.target.value))} />
        </label>
        <label className="checkbox-field"><input type="checkbox" checked={state.multiline === true} onChange={(event) => update('multiline', event.target.checked)} /><span>multiline</span></label>
        <label className="checkbox-field"><input type="checkbox" checked={state.visible !== false} onChange={(event) => update('visible', event.target.checked)} /><span>visible</span></label>
        <label className="checkbox-field"><input type="checkbox" checked={state.gridPlacements === true} onChange={(event) => update('gridPlacements', event.target.checked)} /><span>gridPlacements</span></label>
      </div>
    );
  }

  if (item.previewType === 'input-field') {
    return (
      <div className="sidebar-box">
        <h3>Playground</h3>
        {['label', 'value', 'placeholder', 'helperText', 'errorText'].map((key) => (
          <label key={key} className="form-field">
            <span>{key}</span>
            <input value={String(state[key] ?? '')} onChange={(event) => update(key, event.target.value)} />
          </label>
        ))}
        <label className="form-field"><span>State</span><select value={String(state.state ?? 'default')} onChange={(event) => update('state', event.target.value)}>{fieldStates.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label className="form-field"><span>Size</span><select value={String(state.size ?? 'md')} onChange={(event) => update('size', event.target.value)}>{fieldSizes.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label className="form-field"><span>Type</span><select value={String(state.type ?? 'text')} onChange={(event) => update('type', event.target.value)}>{['text', 'email', 'number', 'password'].map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label className="form-field"><span>View mode</span><select value={String(state.viewMode ?? 'single')} onChange={(event) => update('viewMode', event.target.value)}>{['single', 'allStates'].map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label className="checkbox-field"><input type="checkbox" checked={state.required === true} onChange={(event) => update('required', event.target.checked)} /><span>required</span></label>
      </div>
    );
  }

  if (item.previewType === 'select-field') {
    return (
      <div className="sidebar-box">
        <h3>Playground</h3>
        {['label', 'placeholder', 'selectedValue', 'optionsInput', 'errorText'].map((key) => (
          <label key={key} className="form-field">
            <span>{key}</span>
            <input value={String(state[key] ?? '')} onChange={(event) => update(key, event.target.value)} />
          </label>
        ))}
        <label className="form-field"><span>Mode</span><select value={String(state.mode ?? 'single')} onChange={(event) => update('mode', event.target.value)}>{selectModes.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label className="form-field"><span>State</span><select value={String(state.state ?? 'default')} onChange={(event) => update('state', event.target.value)}>{fieldStates.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label className="form-field"><span>Size</span><select value={String(state.size ?? 'md')} onChange={(event) => update('size', event.target.value)}>{fieldSizes.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label className="form-field"><span>View mode</span><select value={String(state.viewMode ?? 'single')} onChange={(event) => update('viewMode', event.target.value)}>{['single', 'allStates', 'dropdown'].map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label className="checkbox-field"><input type="checkbox" checked={state.searchable === true} onChange={(event) => update('searchable', event.target.checked)} /><span>searchable</span></label>
        <label className="checkbox-field"><input type="checkbox" checked={state.clearable !== false} onChange={(event) => update('clearable', event.target.checked)} /><span>clearable</span></label>
      </div>
    );
  }

  if (item.previewType === 'icon-set') {
    return (
      <div className="sidebar-box">
        <h3>Playground</h3>
        <label className="form-field"><span>Variant</span><select value={String(state.variant ?? 'soft')} onChange={(event) => update('variant', event.target.value)}>{iconVariants.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label className="form-field"><span>Size</span><select value={String(state.size ?? 'md')} onChange={(event) => update('size', event.target.value)}>{iconSizes.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label className="form-field"><span>Selected icon</span><select value={String(state.selectedIcon ?? 'info')} onChange={(event) => update('selectedIcon', event.target.value)}>{['neutral', 'info', 'warning', 'error', 'success', 'plus', 'check', 'close', 'chevron-down', 'search'].map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label className="checkbox-field"><input type="checkbox" checked={state.showLabels !== false} onChange={(event) => update('showLabels', event.target.checked)} /><span>showLabels</span></label>
      </div>
    );
  }

  if (item.previewType === 'candlestick') {
    return (
      <div className="sidebar-box">
        <h3>Playground</h3>
        {[
          ['labelsInput', 'Labels'],
          ['openValuesInput', 'Open'],
          ['highValuesInput', 'High'],
          ['lowValuesInput', 'Low'],
          ['closeValuesInput', 'Close'],
        ].map(([key, label]) => (
          <label key={key} className="form-field">
            <span>{label}</span>
            <textarea rows={2} value={String(state[key] ?? '')} onChange={(event) => update(key, event.target.value)} />
          </label>
        ))}
        <label className="form-field"><span>Height</span><input type="range" min="240" max="640" step="10" value={Number(state.height ?? 340)} onChange={(event) => update('height', Number(event.target.value))} /></label>
        <div className="form-field"><ColorControl label="Up color" value={String(state.upColor ?? '#16a34a')} onChange={(next) => update('upColor', next)} locale={locale} /></div>
        <div className="form-field"><ColorControl label="Down color" value={String(state.downColor ?? '#dc2626')} onChange={(next) => update('downColor', next)} locale={locale} /></div>
        <div className="form-field"><ColorControl label="Neutral color" value={String(state.neutralColor ?? '#64748b')} onChange={(next) => update('neutralColor', next)} locale={locale} /></div>
        <label className="checkbox-field"><input type="checkbox" checked={state.showGrid !== false} onChange={(event) => update('showGrid', event.target.checked)} /><span>showGrid</span></label>
        <label className="checkbox-field"><input type="checkbox" checked={state.showTooltip !== false} onChange={(event) => update('showTooltip', event.target.checked)} /><span>showTooltip</span></label>
      </div>
    );
  }

  if (item.previewType === 'scroll-panel') {
    return (
      <div className="sidebar-box">
        <h3>Playground</h3>
        <label className="form-field">
          <span>maxHeight</span>
          <input type="range" min="160" max="640" step="20" value={Number(state.maxHeight)} onChange={(event) => update('maxHeight', Number(event.target.value))} />
        </label>
        <label className="form-field">
          <span>density</span>
          <select value={String(state.density)} onChange={(event) => update('density', event.target.value)}>
            {densityOptions.map((density) => <option key={density} value={density}>{density}</option>)}
          </select>
        </label>
        <label className="form-field">
          <span>itemCount</span>
          <input type="number" min="1" max="50" value={Number(state.itemCount)} onChange={(event) => update('itemCount', Number(event.target.value))} />
        </label>
      </div>
    );
  }

  if (item.previewType === 'oilgas-form') {
    const oilGasState = state as OilGasPlaygroundState;
    return (
      <div className="sidebar-box">
        <h3>Playground</h3>
        <label className="form-field">
          <span>scenario</span>
          <select value={oilGasState.scenario} onChange={(event) => update('scenario', event.target.value)}>
            {oilGasScenarios.map((scenario) => <option key={scenario} value={scenario}>{scenario}</option>)}
          </select>
          <small className="control-hint">
            {t({ ru: 'Сценарий заполняет demo-значения формы.', en: 'Scenario fills the demo form values.', de: 'Das Szenario füllt die Demo-Werte.' }, locale)}
          </small>
        </label>
        <label className="form-field">
          <span>mode</span>
          <select value={oilGasState.mode} onChange={(event) => update('mode', event.target.value)}>
            {oilGasModes.map((mode) => <option key={mode} value={mode}>{mode}</option>)}
          </select>
        </label>
        <label className="form-field">
          <span>pressureThreshold: {oilGasState.pressureThreshold} bar</span>
          <input type="range" min="120" max="260" step="5" value={oilGasState.pressureThreshold} onChange={(event) => update('pressureThreshold', Number(event.target.value))} />
        </label>
        <label className="form-field">
          <span>h2sThreshold: {oilGasState.h2sThreshold} ppm</span>
          <input type="number" min="1" max="50" step="1" value={oilGasState.h2sThreshold} onChange={(event) => update('h2sThreshold', Number(event.target.value))} />
        </label>
        <label className="checkbox-field">
          <input type="checkbox" checked={oilGasState.showChecklist} onChange={(event) => update('showChecklist', event.target.checked)} />
          <span>showChecklist</span>
        </label>
        <label className="checkbox-field">
          <input type="checkbox" checked={oilGasState.showRiskPanel} onChange={(event) => update('showRiskPanel', event.target.checked)} />
          <span>showRiskPanel</span>
        </label>
        <label className="checkbox-field">
          <input type="checkbox" checked={oilGasState.readonly} onChange={(event) => update('readonly', event.target.checked)} />
          <span>readonly</span>
        </label>
        <button type="button" className="secondary-button" onClick={() => update('resetVersion', Number(state.resetVersion ?? 0) + 1)}>
          {t({ ru: 'Сбросить demo', en: 'Reset demo', de: 'Demo zurücksetzen' }, locale)}
        </button>
      </div>
    );
  }

  return null;
}
