import type { PlaygroundState } from '../../../component-playground/model/playground.types';
import { createGeneratedCode, stringifyProps } from '../generateComponentCode';
import {
  normalizeIntent,
  normalizeSize,
  normalizeVariant,
} from '../../../../library/buttons/gridifyActionButton.model';

function booleanProp(name: string, enabled: boolean) {
  return enabled ? ` ${name}` : '';
}

export function generateGridifyActionButtonCode(state: PlaygroundState) {
  const label = typeof state.label === 'string' && state.label.trim() ? state.label : 'Create request';
  const props = {
    variant: normalizeVariant(state.variant),
    intent: normalizeIntent(state.intent),
    size: normalizeSize(state.size),
    loading: state.loading === true,
    disabled: state.disabled === true,
    fullWidth: state.fullWidth === true,
    showBrandPrefix: state.showBrandPrefix === true,
    brandPrefixText: typeof state.brandPrefixText === 'string' && state.brandPrefixText.trim() ? state.brandPrefixText : 'GridiFy',
    iconSlot: state.withIcon === true,
    trailingSlot: state.trailingBadge === true,
    children: label,
  };

  const code = `
import { GridifyActionButton } from 'gridify';

export function Demo() {
  return (
    <GridifyActionButton
      variant="${props.variant}"
      intent="${props.intent}"
      size="${props.size}"${booleanProp('loading', props.loading)}${booleanProp('disabled', props.disabled)}${booleanProp('fullWidth', props.fullWidth)}${booleanProp('showBrandPrefix', props.showBrandPrefix)}${props.showBrandPrefix ? `\n      brandPrefixText="${props.brandPrefixText}"` : ''}
      iconSlot={${props.iconSlot ? '<span>+</span>' : 'undefined'}}
      trailingSlot={${props.trailingSlot ? '<span>3</span>' : 'undefined'}}
    >
      ${label}
    </GridifyActionButton>
  );
}
`;

  return createGeneratedCode(code, stringifyProps(props));
}
