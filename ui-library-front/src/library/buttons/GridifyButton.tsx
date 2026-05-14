import type { GridifyButtonProps } from './button.types';

export default function GridifyButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  disabled,
  type = 'button',
  ...props
}: GridifyButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      className={`gridify-button gridify-button--${variant} gridify-button--${size} ${loading ? 'is-loading' : ''}`}
    >
      {loading && <span className="gridify-button__spinner" />}
      <span>{children}</span>
    </button>
  );
}
