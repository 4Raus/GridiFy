import { scrollPanelDemoItems } from '../../entities/component/data/uiExamples';
import { t } from '../../shared/lib/i18n';
import type { Locale } from '../../shared/types/locale';

type ScrollPanelDensity = 'compact' | 'default' | 'comfortable';

type ScrollPanelShowcaseProps = {
  locale?: Locale;
  maxHeight?: number;
  density?: ScrollPanelDensity;
  itemCount?: number;
};

export default function ScrollPanelShowcase({
  locale = 'ru',
  maxHeight = 360,
  density = 'default',
  itemCount = 18,
}: ScrollPanelShowcaseProps) {
  const items = scrollPanelDemoItems.slice(0, Math.max(1, Math.min(itemCount, scrollPanelDemoItems.length)));

  return (
    <div className={`scroll-panel-demo scroll-panel-demo--${density}`}>
      <div className="scroll-panel-demo__head">
        <strong>{t({ ru: 'Журнал операций', en: 'Operations log', de: 'Betriebsprotokoll' }, locale)}</strong>
        <span>{t({ ru: 'Прокручиваемая панель', en: 'Scrollable panel', de: 'Scrollbares Panel' }, locale)}</span>
      </div>
      <div className="scroll-panel-demo__body" style={{ maxHeight }}>
        {items.map((item) => <div key={item.id} className="scroll-panel-demo__item"><span>{item.title}</span><strong>{item.value}%</strong></div>)}
      </div>
    </div>
  );
}
