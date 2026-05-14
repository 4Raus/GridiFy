import { componentRegistry } from './componentRegistry';

export function getComponentBySlug(slug: string) {
  return componentRegistry.find((item) => item.slug === slug);
}
