import { useEffect, useState, type KeyboardEvent, type ReactNode } from 'react';
import { copyToClipboard } from '../lib/clipboard';
import { cn } from '../lib/cn';
import { t } from '../lib/i18n';
import type { Locale } from '../types/locale';
import './CopyableBlock.css';

type CopyableBlockProps = {
  value: string;
  children?: ReactNode;
  locale: Locale;
  variant?: 'code' | 'inline';
  className?: string;
  ariaLabel?: string;
};

function hasSelectedText() {
  if (typeof window === 'undefined') return false;
  return Boolean(window.getSelection()?.toString());
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.2 4L19 7" />
    </svg>
  );
}

export default function CopyableBlock({
  value,
  children,
  locale,
  variant = 'code',
  className,
  ariaLabel,
}: CopyableBlockProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    const ok = await copyToClipboard(value);
    if (ok) setCopied(true);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    void copy();
  };
  const copyLabel = ariaLabel ?? t({ ru: 'Скопировать', en: 'Copy', de: 'Kopieren' }, locale);

  return (
    <div
      className={cn('copyable-block', `copyable-block--${variant}`, copied && 'is-copied', className)}
      role="button"
      tabIndex={0}
      aria-label={copyLabel}
      onClick={() => {
        if (!hasSelectedText()) void copy();
      }}
      onKeyDown={handleKeyDown}
    >
      {children ?? value}
      <span className="copyable-block__icon" aria-hidden="true">
        {copied ? <CheckIcon /> : <CopyIcon />}
      </span>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {copied ? t({ ru: 'Скопировано', en: 'Copied', de: 'Kopiert' }, locale) : ''}
      </span>
    </div>
  );
}
