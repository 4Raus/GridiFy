import { memo } from 'react';
import type { ComponentRegistryItem } from '../../entities/component/model/component.types';
import type {
  SpreadsheetData,
  SpreadsheetViewMode,
} from '../../library/tables/spreadsheet/model/spreadsheet.types';
import GroupedBarChart from '../../library/charts/GroupedBarChart';
import LineTrendChart from '../../library/charts/LineTrendChart';
import PieDonutChart from '../../library/charts/PieDonutChart';
import RadarVotesChart from '../../library/charts/RadarVotesChart';
import ScatterPlotChart from '../../library/charts/ScatterPlotChart';
import ForecastLineChart from '../../library/charts/ForecastLineChart';
import CandlestickChart from '../../library/charts/CandlestickChart';
import SpreadsheetTable from '../../library/tables/spreadsheet/SpreadsheetTable';
import ButtonAllVariants from '../../library/buttons/ButtonAllVariants';
import ButtonDemo from '../../library/buttons/ButtonDemo';
import GridifyActionButtonDemo from '../../library/buttons/GridifyActionButtonDemo';
import FeedbackStates from '../../library/feedback/FeedbackStates';
import TooltipShowcase from '../../library/tooltip/TooltipShowcase';
import InputFieldShowcase from '../../library/inputs/InputFieldShowcase';
import SelectFieldShowcase from '../../library/selects/SelectFieldShowcase';
import GridifyIconSet from '../../library/icons/GridifyIconSet';
import OilGasInspectionForm from '../../library/forms/oil-gas-inspection/OilGasInspectionForm';
import ScrollPanelShowcase from '../../library/scroll-panel/ScrollPanelShowcase';
import type { Locale } from '../../shared/types/locale';
import type { PlaygroundState } from '../../features/component-playground/model/playground.types';
import { getScrollPanelDensity } from '../../features/component-playground/model/playgroundState';
import type { OilGasInspectionMode, OilGasInspectionScenario } from '../../library/forms/oil-gas-inspection/oilGasInspection.types';

type Props = {
  item: ComponentRegistryItem;
  height?: number;
  editable?: boolean;
  locale?: Locale;
  onTableChange?: (next: SpreadsheetData) => void;
  onValidationChange?: (messages: { level: 'error' | 'warning'; message: string }[]) => void;
  tableViewMode?: SpreadsheetViewMode;
  playgroundState?: PlaygroundState;
};

function normalizeOilGasPreviewProps(playgroundState: PlaygroundState) {
  const scenario: OilGasInspectionScenario =
    playgroundState.scenario === 'warning' || playgroundState.scenario === 'critical'
      ? playgroundState.scenario
      : 'normal';
  const mode: OilGasInspectionMode = playgroundState.mode === 'compact' ? 'compact' : 'detailed';

  return {
    scenario,
    mode,
    pressureThreshold: Number(playgroundState.pressureThreshold) || 190,
    h2sThreshold: Number(playgroundState.h2sThreshold) || 10,
    showChecklist: playgroundState.showChecklist !== false,
    showRiskPanel: playgroundState.showRiskPanel !== false,
    readonly: playgroundState.readonly === true,
    resetKey: `${String(scenario)}-${String(playgroundState.resetVersion ?? 0)}`,
  };
}

function normalizeScrollPanelPreviewProps(playgroundState: PlaygroundState) {
  return {
    maxHeight: Number(playgroundState.maxHeight) || 360,
    density: getScrollPanelDensity(playgroundState),
    itemCount: Number(playgroundState.itemCount) || 18,
  };
}

function ComponentPreview({
  item,
  height = 280,
  editable = false,
  locale = 'ru',
  onTableChange,
  onValidationChange,
  tableViewMode,
  playgroundState = {},
}: Props) {
  const previewData = item.previewData;

  switch (item.previewType) {
    case 'bar':
      return previewData?.bar ? (
        <GroupedBarChart
          labels={previewData.bar.labels}
          datasets={previewData.bar.datasets}
          minY={previewData.bar.minY}
          maxY={previewData.bar.maxY}
          height={height}
        />
      ) : null;

    case 'line':
      return previewData?.line ? (
        <LineTrendChart
          labels={previewData.line.labels}
          datasets={previewData.line.datasets}
          height={height}
        />
      ) : null;

    case 'scatter':
      return previewData?.scatter ? (
        <ScatterPlotChart
          datasets={previewData.scatter.datasets}
          pointRadius={previewData.scatter.pointRadius}
          height={height}
        />
      ) : null;

    case 'forecast':
      return previewData?.forecast ? (
        <ForecastLineChart
          labels={previewData.forecast.labels}
          actual={previewData.forecast.actual}
          forecastDatasets={previewData.forecast.forecastDatasets}
          height={height}
        />
      ) : null;

    case 'pie':
      return previewData?.pie ? (
        <PieDonutChart
          labels={previewData.pie.labels}
          values={previewData.pie.values}
          colors={previewData.pie.colors}
          height={height}
        />
      ) : null;

    case 'radar':
      return previewData?.radar ? (
        <RadarVotesChart
          labels={previewData.radar.labels}
          datasets={previewData.radar.datasets}
          maxValue={previewData.radar.maxValue}
          height={height}
        />
      ) : null;

    case 'candlestick':
      return previewData?.candlestick ? (
        <CandlestickChart
          data={previewData.candlestick.data}
          upColor={previewData.candlestick.upColor}
          downColor={previewData.candlestick.downColor}
          neutralColor={previewData.candlestick.neutralColor}
          height={height ?? previewData.candlestick.height}
          showGrid={playgroundState.showGrid !== false}
          showTooltip={playgroundState.showTooltip !== false}
        />
      ) : null;

    case 'feedback-states':
      return previewData?.feedbackStates ? (
        <FeedbackStates
          states={previewData.feedbackStates.states}
          size={playgroundState.size === 'sm' || playgroundState.size === 'lg' ? playgroundState.size : 'md'}
          showLabels={playgroundState.showLabels !== false}
          orientation={playgroundState.orientation === 'grid' ? 'grid' : 'row'}
        />
      ) : null;

    case 'tooltip':
      return previewData?.tooltip ? (
        <TooltipShowcase
          locale={locale}
          message={previewData.tooltip.message}
          placement={previewData.tooltip.placement}
          theme={previewData.tooltip.theme}
          multiline={previewData.tooltip.multiline}
          width={Number(playgroundState.width) || 280}
          visible={playgroundState.visible !== false}
          gridPlacements={playgroundState.gridPlacements === true}
        />
      ) : null;

    case 'input-field':
      return previewData?.inputField ? (
        <InputFieldShowcase
          {...previewData.inputField}
          type={playgroundState.type === 'email' || playgroundState.type === 'number' || playgroundState.type === 'password' ? playgroundState.type : 'text'}
          viewMode={playgroundState.viewMode === 'allStates' ? 'allStates' : 'single'}
        />
      ) : null;

    case 'select-field':
      return previewData?.selectField ? (
        <SelectFieldShowcase
          {...previewData.selectField}
          disabled={previewData.selectField.state === 'disabled'}
          viewMode={playgroundState.viewMode === 'allStates' || playgroundState.viewMode === 'dropdown' ? playgroundState.viewMode : 'single'}
        />
      ) : null;

    case 'icon-set':
      return previewData?.iconSet ? (
        <GridifyIconSet
          icons={previewData.iconSet.icons}
          variant={previewData.iconSet.variant}
          size={previewData.iconSet.size}
          showLabels={playgroundState.showLabels !== false}
          selectedIcon={typeof playgroundState.selectedIcon === 'string' ? playgroundState.selectedIcon : undefined}
        />
      ) : null;

    case 'spreadsheet':
      return previewData?.spreadsheet ? (
        <SpreadsheetTable
          data={previewData.spreadsheet}
          height={height}
          editable={editable}
          locale={locale}
          viewMode={tableViewMode ?? (item.slug === 'financial-planning-table' ? 'app' : 'spreadsheet')}
          onChange={onTableChange}
          onValidationChange={onValidationChange}
        />
      ) : null;

    case 'buttons':
      return playgroundState.viewMode === 'allVariants' ? (
        <ButtonAllVariants
          locale={locale}
          label={playgroundState.label}
          size={playgroundState.size}
          loading={playgroundState.loading}
          disabled={playgroundState.disabled}
        />
      ) : (
        <ButtonDemo
          locale={locale}
          label={playgroundState.label}
          variant={playgroundState.variant}
          size={playgroundState.size}
          loading={playgroundState.loading}
          disabled={playgroundState.disabled}
        />
      );

    case 'gridify-action-button':
      return <GridifyActionButtonDemo locale={locale} state={playgroundState} />;

    case 'oilgas-form': {
      const oilGasProps = normalizeOilGasPreviewProps(playgroundState);
      return (
        <OilGasInspectionForm
          key={oilGasProps.resetKey}
          locale={locale}
          scenario={oilGasProps.scenario}
          mode={oilGasProps.mode}
          pressureThreshold={oilGasProps.pressureThreshold}
          h2sThreshold={oilGasProps.h2sThreshold}
          showChecklist={oilGasProps.showChecklist}
          showRiskPanel={oilGasProps.showRiskPanel}
          readonly={oilGasProps.readonly}
        />
      );
    }

    case 'scroll-panel': {
      const scrollPanelProps = normalizeScrollPanelPreviewProps(playgroundState);
      return (
        <ScrollPanelShowcase
          locale={locale}
          maxHeight={scrollPanelProps.maxHeight}
          density={scrollPanelProps.density}
          itemCount={scrollPanelProps.itemCount}
        />
      );
    }

    default:
      return null;
  }
}

export default memo(ComponentPreview);
