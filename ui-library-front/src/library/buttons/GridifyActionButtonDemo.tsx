import type { Locale } from '../../shared/types/locale';
import { t } from '../../shared/lib/i18n';
import type { PlaygroundState } from '../../features/component-playground/model/playground.types';
import GridifyActionButton from './GridifyActionButton';
import { normalizeIntent, normalizeSize, normalizeVariant } from './gridifyActionButton.model';

type Props = {
  locale: Locale;
  state: PlaygroundState;
};

export default function GridifyActionButtonDemo({ locale, state }: Props) {
  const label = typeof state.label === 'string' && state.label.trim()
    ? state.label
    : t({ ru: 'Создать заявку', en: 'Create request', de: 'Anfrage erstellen' }, locale);

  return (
    <div className="gridify-action-button-demo">
      <GridifyActionButton
        variant={normalizeVariant(state.variant)}
        intent={normalizeIntent(state.intent)}
        size={normalizeSize(state.size)}
        loading={state.loading === true}
        disabled={state.disabled === true}
        fullWidth={state.fullWidth === true}
        showBrandPrefix={state.showBrandPrefix === true}
        brandPrefixText={typeof state.brandPrefixText === 'string' ? state.brandPrefixText : 'GridiFy'}
        iconSlot={state.withIcon === true ? <span className="gridify-action-button-demo__icon">+</span> : undefined}
        trailingSlot={state.trailingBadge === true ? <span className="gridify-action-button-demo__badge">3</span> : undefined}
      >
        {label}
      </GridifyActionButton>
    </div>
  );
}
