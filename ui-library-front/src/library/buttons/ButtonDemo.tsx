import type { Locale } from '../../shared/types/locale';
import GridifyButton from './GridifyButton';
import { normalizeButtonLabel, normalizeButtonSize, normalizeButtonVariant } from './buttonDemo.model';

type ButtonDemoProps = {
  locale: Locale;
  label?: unknown;
  variant?: unknown;
  size?: unknown;
  loading?: unknown;
  disabled?: unknown;
};

export default function ButtonDemo({
  locale,
  label,
  variant,
  size,
  loading,
  disabled,
}: ButtonDemoProps) {
  return (
    <div className="button-demo">
      <GridifyButton
        variant={normalizeButtonVariant(variant)}
        size={normalizeButtonSize(size)}
        loading={loading === true}
        disabled={disabled === true}
      >
        {normalizeButtonLabel(label, locale)}
      </GridifyButton>
    </div>
  );
}
