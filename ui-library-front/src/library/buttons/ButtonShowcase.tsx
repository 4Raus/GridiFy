import type { Locale } from '../../shared/types/locale';
import ButtonAllVariants from './ButtonAllVariants';

export default function ButtonShowcase({ locale = 'ru' }: { locale?: Locale }) {
  return <ButtonAllVariants locale={locale} />;
}
