import type { Chart, Plugin } from 'chart.js';

type LegendWithFit = NonNullable<Chart['legend']> & {
  $gridifyLegendMargin?: number;
};

export function createLegendMarginPlugin(margin: number): Plugin {
  return {
    id: `gridify-legend-margin-${margin}`,
    beforeInit(chart) {
      const legend = chart.legend as LegendWithFit | undefined;
      if (!legend || legend.$gridifyLegendMargin === margin) return;

      const originalFit = legend.fit.bind(legend);
      legend.fit = function fitWithGridifyMargin(this: LegendWithFit) {
        originalFit();
        this.height += margin;
      };
      legend.$gridifyLegendMargin = margin;
    },
  };
}
