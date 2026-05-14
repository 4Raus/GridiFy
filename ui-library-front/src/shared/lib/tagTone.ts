import type { ComponentStatus, PreviewType } from '../../entities/component/model/component.types';
import type { TagBadgeTone } from '../ui/TagBadge';
import { getComponentStatusTone } from './componentStatus';

export function getTagTone(tag: string, status?: ComponentStatus, previewType?: PreviewType): TagBadgeTone {
  if (status) return getComponentStatusTone(status);

  const value = tag.toLowerCase();
  if (value.startsWith('@') || value.includes('creator') || value.includes('author')) return 'author';
  if (value.includes('gridify') || value === previewType) return 'group';
  return 'neutral';
}
