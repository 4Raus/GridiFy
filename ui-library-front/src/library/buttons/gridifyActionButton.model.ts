import type {
  GridifyActionButtonIntent,
  GridifyActionButtonSize,
  GridifyActionButtonVariant,
} from './gridifyActionButton.types';

export const gridifyActionButtonVariants: GridifyActionButtonVariant[] = ['solid', 'soft', 'outline', 'ghost'];
export const gridifyActionButtonIntents: GridifyActionButtonIntent[] = ['neutral', 'brand', 'success', 'warning', 'danger'];
export const gridifyActionButtonSizes: GridifyActionButtonSize[] = ['sm', 'md', 'lg'];

export function normalizeVariant(value: unknown): GridifyActionButtonVariant {
  return gridifyActionButtonVariants.includes(value as GridifyActionButtonVariant) ? value as GridifyActionButtonVariant : 'solid';
}

export function normalizeIntent(value: unknown): GridifyActionButtonIntent {
  return gridifyActionButtonIntents.includes(value as GridifyActionButtonIntent) ? value as GridifyActionButtonIntent : 'brand';
}

export function normalizeSize(value: unknown): GridifyActionButtonSize {
  return gridifyActionButtonSizes.includes(value as GridifyActionButtonSize) ? value as GridifyActionButtonSize : 'md';
}
