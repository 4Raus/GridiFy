import './TagBadge.css';

export type TagBadgeTone =
  | 'status-ready'
  | 'status-beta'
  | 'status-development'
  | 'status-review'
  | 'status-planned'
  | 'status-deprecated'
  | 'group'
  | 'author'
  | 'neutral';

type TagBadgeProps = {
  label: string;
  tone?: TagBadgeTone;
  size?: 'sm' | 'md';
  title?: string;
};

export default function TagBadge({ label, tone = 'neutral', size = 'sm', title }: TagBadgeProps) {
  return (
    <span className={`tag-badge tag-badge--${tone} tag-badge--${size}`} title={title}>
      {label}
    </span>
  );
}
