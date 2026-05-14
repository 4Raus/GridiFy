import { useEffect, useState } from 'react';
import { t } from '../../shared/lib/i18n';
import type { Locale } from '../../shared/types/locale';
import type { GeneratedComponentCode } from '../../features/code-generator/model/codeGenerator.types';
import { copyToClipboard } from '../../shared/lib/clipboard';
import CopyableBlock from '../../shared/ui/CopyableBlock';
import './CodePreview.css';

type CodePreviewProps = {
  generated: GeneratedComponentCode;
  locale: Locale;
};

export default function CodePreview({ generated, locale }: CodePreviewProps) {
  const [activeTab, setActiveTab] = useState(generated.tabs[0]?.id ?? 'react-tsx');
  const [copied, setCopied] = useState(false);
  const active = generated.tabs.find((tab) => tab.id === activeTab) ?? generated.tabs[0];

  useEffect(() => {
    if (!copied) return undefined;
    const timer = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  if (!active) return null;

  const handleCopy = async () => {
    const ok = await copyToClipboard(active.code);
    if (ok) setCopied(true);
  };

  return (
    <section className="code-preview">
      <div className="code-preview__head">
        <div>
          <div className="code-preview__eyebrow">
            {t({ ru: 'Нажмите на код, чтобы скопировать', en: 'Click code to copy', de: 'Code anklicken zum Kopieren' }, locale)}
          </div>
          <div className="code-preview__tabs">
            {generated.tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={tab.id === active.id ? 'active' : ''}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <button type="button" className="secondary-button" onClick={handleCopy}>
          {copied
            ? t({ ru: 'Скопировано', en: 'Copied', de: 'Kopiert' }, locale)
            : t({ ru: 'Copy', en: 'Copy', de: 'Kopieren' }, locale)}
        </button>
      </div>
      <CopyableBlock
        value={active.code}
        locale={locale}
        className="code-preview__copyable"
        ariaLabel={t({ ru: 'Скопировать код', en: 'Copy code', de: 'Code kopieren' }, locale)}
      >
        <pre className="code-preview__code"><code>{active.code}</code></pre>
      </CopyableBlock>
    </section>
  );
}
