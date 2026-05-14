import type { Locale } from '../../shared/types/locale';
import { t } from '../../shared/lib/i18n';
import GridifyTooltip from './GridifyTooltip';
import type { TooltipPlacement } from './tooltip.types';

type Props = {
  locale: Locale;
  message: string;
  placement: TooltipPlacement;
  theme: 'light' | 'dark';
  multiline: boolean;
  width: number;
  visible: boolean;
  gridPlacements?: boolean;
};

const placements: TooltipPlacement[] = [
  'top',
  'top-start',
  'top-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
];

export default function TooltipShowcase({
  locale,
  message,
  placement,
  theme,
  multiline,
  width,
  visible,
  gridPlacements = false,
}: Props) {
  if (gridPlacements) {
    return (
      <div className={`tooltip-showcase tooltip-showcase--grid tooltip-showcase--${theme}`}>
        {placements.map((item) => (
          <GridifyTooltip
            key={item}
            message={message}
            placement={item}
            theme={theme}
            multiline={multiline}
            width={width}
            visible
          >
            <button type="button" className="tooltip-showcase__anchor">{item}</button>
          </GridifyTooltip>
        ))}
      </div>
    );
  }

  return (
    <div className={`tooltip-showcase tooltip-showcase--${theme}`}>
      <GridifyTooltip
        message={message}
        placement={placement}
        theme={theme}
        multiline={multiline}
        width={width}
        visible={visible}
      >
        <button type="button" className="secondary-button">
          {t({ ru: 'Навести / фокус', en: 'Hover / focus', de: 'Hover / Fokus' }, locale)}
        </button>
      </GridifyTooltip>
    </div>
  );
}
