import type { Locale } from '../../shared/types/locale';
import GridifyButton from './GridifyButton';
import {
  buttonVariants,
  normalizeButtonLabel,
  normalizeButtonSize,
} from './buttonDemo.model';

type ButtonAllVariantsProps = {
  locale: Locale;
  label?: unknown;
  size?: unknown;
  loading?: unknown;
  disabled?: unknown;
};

export default function ButtonAllVariants({
  locale,
  label,
  size,
  loading,
  disabled,
}: ButtonAllVariantsProps) {
  const normalizedSize = normalizeButtonSize(size);
  const normalizedLabel = normalizeButtonLabel(label, locale);

  return (
    <div className="button-all-variants">
      {buttonVariants.map((variant) => (
        <GridifyButton
          key={variant}
          variant={variant}
          size={normalizedSize}
          loading={loading === true}
          disabled={disabled === true}
        >
          {normalizedLabel}
        </GridifyButton>
      ))}
    </div>
  );
}
