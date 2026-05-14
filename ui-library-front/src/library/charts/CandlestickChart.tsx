import { memo, useMemo } from 'react';
import type { CandlestickPoint } from '../../entities/component/model/preview.types';
import { chartGridColor, chartLabelColor, chartTickColor } from './chartTheme';

type CandlestickChartProps = {
  data: CandlestickPoint[];
  upColor?: string;
  downColor?: string;
  neutralColor?: string;
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
};

const width = 760;
const padding = { top: 24, right: 32, bottom: 42, left: 54 };

function scaleY(value: number, min: number, max: number, innerHeight: number) {
  if (max === min) return padding.top + innerHeight / 2;
  return padding.top + ((max - value) / (max - min)) * innerHeight;
}

function formatPrice(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

function CandlestickChart({
  data,
  upColor = '#16a34a',
  downColor = '#dc2626',
  neutralColor = '#64748b',
  height = 320,
  showGrid = true,
  showTooltip = true,
}: CandlestickChartProps) {
  const chart = useMemo(() => {
    const highs = data.map((item) => item.high);
    const lows = data.map((item) => item.low);
    const min = Math.min(...lows);
    const max = Math.max(...highs);
    const range = Math.max(max - min, 1);
    const yMin = min - range * 0.08;
    const yMax = max + range * 0.08;
    const innerWidth = width - padding.left - padding.right;
    const innerHeight = height - padding.top - padding.bottom;
    const step = data.length > 1 ? innerWidth / data.length : innerWidth;
    const candleWidth = Math.max(8, Math.min(28, step * 0.42));
    const ticks = Array.from({ length: 5 }, (_, index) => yMin + ((yMax - yMin) / 4) * index);

    return { yMin, yMax, innerWidth, innerHeight, step, candleWidth, ticks };
  }, [data, height]);

  if (data.length === 0) return null;

  return (
    <div className="candlestick-chart" style={{ height }}>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Candlestick chart">
        {showGrid && chart.ticks.map((tick) => {
          const y = scaleY(tick, chart.yMin, chart.yMax, chart.innerHeight);
          return (
            <g key={tick}>
              <line x1={padding.left} x2={width - padding.right} y1={y} y2={y} stroke={chartGridColor} />
              <text x={padding.left - 10} y={y + 4} textAnchor="end" fill={chartTickColor} fontSize="11">
                {formatPrice(tick)}
              </text>
            </g>
          );
        })}
        <line x1={padding.left} x2={width - padding.right} y1={height - padding.bottom} y2={height - padding.bottom} stroke={chartGridColor} />
        {data.map((item, index) => {
          const x = padding.left + chart.step * index + chart.step / 2;
          const highY = scaleY(item.high, chart.yMin, chart.yMax, chart.innerHeight);
          const lowY = scaleY(item.low, chart.yMin, chart.yMax, chart.innerHeight);
          const openY = scaleY(item.open, chart.yMin, chart.yMax, chart.innerHeight);
          const closeY = scaleY(item.close, chart.yMin, chart.yMax, chart.innerHeight);
          const color = item.close > item.open ? upColor : item.close < item.open ? downColor : neutralColor;
          const bodyY = Math.min(openY, closeY);
          const bodyHeight = Math.max(Math.abs(closeY - openY), 3);

          return (
            <g key={item.label}>
              <line x1={x} x2={x} y1={highY} y2={lowY} stroke={color} strokeWidth="2" strokeLinecap="round" />
              <rect
                x={x - chart.candleWidth / 2}
                y={bodyY}
                width={chart.candleWidth}
                height={bodyHeight}
                rx="3"
                fill={color}
                opacity="0.9"
              >
                {showTooltip && <title>{`${item.label}: O ${item.open}, H ${item.high}, L ${item.low}, C ${item.close}`}</title>}
              </rect>
              <text x={x} y={height - 18} textAnchor="middle" fill={chartLabelColor} fontSize="11">
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default memo(CandlestickChart);
