import type { PlaygroundState } from '../../../component-playground/model/playground.types';
import { createGeneratedCode, stringifyProps } from '../generateComponentCode';

export function generateOilGasFormCode(state: PlaygroundState) {
  const props = {
    scenario: state.scenario === 'warning' || state.scenario === 'critical' ? state.scenario : 'normal',
    mode: state.mode === 'compact' ? 'compact' : 'detailed',
    pressureThreshold: Number(state.pressureThreshold) || 190,
    h2sThreshold: Number(state.h2sThreshold) || 10,
    showChecklist: state.showChecklist !== false,
    showRiskPanel: state.showRiskPanel !== false,
    readonly: state.readonly === true,
  };

  const propLines = [
    props.scenario !== 'normal' ? `      scenario="${props.scenario}"` : '',
    props.mode !== 'detailed' ? `      mode="${props.mode}"` : '',
    props.pressureThreshold !== 190 ? `      pressureThreshold={${props.pressureThreshold}}` : '',
    props.h2sThreshold !== 10 ? `      h2sThreshold={${props.h2sThreshold}}` : '',
    props.showChecklist === false ? '      showChecklist={false}' : '',
    props.showRiskPanel === false ? '      showRiskPanel={false}' : '',
    props.readonly ? '      readonly' : '',
  ].filter(Boolean);

  const code = `
import { OilGasInspectionForm } from 'gridify';

export function Demo() {
  return (
    <OilGasInspectionForm${propLines.length > 0 ? '\n' : ' '}${propLines.join('\n')}${propLines.length > 0 ? '\n    ' : ''}/>
  );
}
`;

  return createGeneratedCode(code, stringifyProps(props));
}
