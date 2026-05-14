import { useState } from 'react';
import type { GridifyTooltipProps } from './tooltip.types';
import './GridifyTooltip.css';

export default function GridifyTooltip({
  message,
  placement = 'top',
  theme = 'light',
  multiline = false,
  width = 280,
  visible,
  children,
}: GridifyTooltipProps) {
  const [open, setOpen] = useState(false);
  const isVisible = visible ?? open;
  const trigger = children ?? <button type="button" className="secondary-button">Tooltip</button>;

  return (
    <span
      className="gridify-tooltip"
      data-placement={placement}
      data-theme={theme}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span className="gridify-tooltip__trigger">{trigger}</span>
      <span
        role="tooltip"
        className={`gridify-tooltip__bubble ${isVisible ? 'is-visible' : ''} ${multiline ? 'is-multiline' : ''}`}
        style={{ width: Math.min(Math.max(width, 160), 420) }}
      >
        {message}
      </span>
    </span>
  );
}
