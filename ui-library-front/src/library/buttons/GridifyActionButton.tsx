import type { GridifyActionButtonProps } from './gridifyActionButton.types';
import './GridifyActionButton.css';

export default function GridifyActionButton({
  variant = 'solid',
  intent = 'brand',
  size = 'md',
  iconSlot,
  trailingSlot,
  loading = false,
  disabled,
  fullWidth = false,
  showBrandPrefix = false,
  brandPrefixText = 'GridiFy',
  children,
  className = '',
  type = 'button',
  ...props
}: GridifyActionButtonProps) {
  const classes = [
    'gridify-action-button',
    `gridify-action-button--${variant}`,
    `gridify-action-button--${intent}`,
    `gridify-action-button--${size}`,
    fullWidth ? 'gridify-action-button--full' : '',
    loading ? 'is-loading' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button {...props} type={type} disabled={disabled || loading} className={classes}>
      {showBrandPrefix && (
        <span className="gridify-action-button__brand" data-brand={brandPrefixText || 'GridiFy'}>
          {brandPrefixText || 'GridiFy'}
        </span>
      )}
      {loading ? <span className="gridify-action-button__spinner" aria-hidden="true" /> : iconSlot && (
        <span className="gridify-action-button__slot">{iconSlot}</span>
      )}
      <span className="gridify-action-button__content">{children}</span>
      {trailingSlot && <span className="gridify-action-button__trailing">{trailingSlot}</span>}
    </button>
  );
}
