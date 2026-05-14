import type { Locale } from '../../../../shared/types/locale';
import {
  buttonVariants,
  normalizeButtonLabel,
  normalizeButtonSize,
  normalizeButtonVariant,
} from '../../../../library/buttons/buttonDemo.model';
import type { PlaygroundState } from '../../../component-playground/model/playground.types';
import { createGeneratedCode, stringifyProps } from '../generateComponentCode';

function renderBooleanProp(name: string, enabled: boolean) {
  return enabled ? ` ${name}` : '';
}

function renderButtonProps(state: PlaygroundState) {
  const variant = normalizeButtonVariant(state.variant);
  const size = normalizeButtonSize(state.size);
  const loading = state.loading === true;
  const disabled = state.disabled === true;

  return [
    variant !== 'primary' ? ` variant="${variant}"` : '',
    size !== 'md' ? ` size="${size}"` : '',
    renderBooleanProp('loading', loading),
    renderBooleanProp('disabled', disabled),
  ].join('');
}

export function generateButtonCode(state: PlaygroundState, locale: Locale) {
  const label = normalizeButtonLabel(state.label, locale);
  const props = {
    variant: normalizeButtonVariant(state.variant),
    size: normalizeButtonSize(state.size),
    loading: state.loading === true,
    disabled: state.disabled === true,
    children: label,
    viewMode: state.viewMode === 'allVariants' ? 'allVariants' : 'single',
  };

  if (state.viewMode === 'allVariants') {
    const code = `
import { GridifyButton } from 'gridify';

const variants = ${JSON.stringify(buttonVariants)};

export function Demo() {
  return (
    <div>
      {variants.map((variant) => (
        <GridifyButton key={variant} variant={variant}${normalizeButtonSize(state.size) !== 'md' ? ` size="${normalizeButtonSize(state.size)}"` : ''}${renderBooleanProp('loading', props.loading)}${renderBooleanProp('disabled', props.disabled)}>
          ${label}
        </GridifyButton>
      ))}
    </div>
  );
}
`;
    return createGeneratedCode(code, stringifyProps(props));
  }

  const code = `
import { GridifyButton } from 'gridify';

export function Demo() {
  return (
    <GridifyButton${renderButtonProps(state)}>
      ${label}
    </GridifyButton>
  );
}
`;

  return createGeneratedCode(code, stringifyProps(props));
}
