import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppHeader from '../components/layout/AppHeader';
import ChartPreview from '../components/library/ChartPreview';
import { useLocale } from '../contexts/LocaleContext';
import { getComponentBySlug } from '../data/componentRegistry';

function parseTextList(input: string) {
    return input
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
}

function parseNumberList(input: string) {
    return input
        .split(',')
        .map((item) => Number(item.trim()))
        .filter((value) => !Number.isNaN(value));
}

function parsePointList(input: string) {
    return input
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
        .map((pair) => {
            const [x, y] = pair.split(':').map((value) => Number(value.trim()));
            return { x, y };
        })
        .filter((point) => !Number.isNaN(point.x) && !Number.isNaN(point.y));
}

function normalizeColorToHex(color: string) {
    if (color.startsWith('#')) return color;
    const numbers = color.match(/\d+/g);
    if (!numbers || numbers.length < 3) return '#84cc16';
    const [r, g, b] = numbers.slice(0, 3).map(Number);
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function toHex(value: number) {
    return value.toString(16).padStart(2, '0');
}

export default function ComponentPage() {
    const { slug = '' } = useParams();
    const { locale } = useLocale();
    const baseItem = useMemo(() => getComponentBySlug(slug), [slug]);
    const [height, setHeight] = useState(360);
    const [labelsInput, setLabelsInput] = useState('');
    const [valuesInput, setValuesInput] = useState('');
    const [secondaryValuesInput, setSecondaryValuesInput] = useState('');
    const [pointsInput, setPointsInput] = useState('');
    const [datasetColor, setDatasetColor] = useState('#84cc16');
    const [secondaryColor, setSecondaryColor] = useState('#111827');
    const [pieColorsInput, setPieColorsInput] = useState('#84cc16, #111827, #a3e635, #d9f99d');
    const [barMinY, setBarMinY] = useState(0);
    const [barMaxY, setBarMaxY] = useState(1000);
    const [radarMax, setRadarMax] = useState(10);
    const [fillLine, setFillLine] = useState(true);
    const [pointRadius, setPointRadius] = useState(6);

    useEffect(() => {
        if (!baseItem) return;
        setHeight(360);

        if (baseItem.previewType === 'bar' && baseItem.previewData.bar) {
            setLabelsInput(baseItem.previewData.bar.labels.join(', '));
            setValuesInput(baseItem.previewData.bar.datasets[0]?.data.join(', ') ?? '');
            setSecondaryValuesInput(baseItem.previewData.bar.datasets[1]?.data.join(', ') ?? '');
            setDatasetColor(normalizeColorToHex(baseItem.previewData.bar.datasets[0]?.color ?? '#84cc16'));
            setSecondaryColor(normalizeColorToHex(baseItem.previewData.bar.datasets[1]?.color ?? '#111827'));
            setBarMinY(baseItem.previewData.bar.minY);
            setBarMaxY(baseItem.previewData.bar.maxY);
        }

        if (baseItem.previewType === 'line' && baseItem.previewData.line) {
            setLabelsInput(baseItem.previewData.line.labels.join(', '));
            setValuesInput(baseItem.previewData.line.values.join(', '));
            setDatasetColor(baseItem.previewData.line.color);
            setFillLine(baseItem.previewData.line.fill);
        }

        if (baseItem.previewType === 'scatter' && baseItem.previewData.scatter) {
            setPointsInput(baseItem.previewData.scatter.points.map((point) => `${point.x}:${point.y}`).join(', '));
            setDatasetColor(baseItem.previewData.scatter.color);
            setPointRadius(baseItem.previewData.scatter.pointRadius);
        }

        if (baseItem.previewType === 'forecast' && baseItem.previewData.forecast) {
            setLabelsInput(baseItem.previewData.forecast.labels.join(', '));
            setValuesInput(baseItem.previewData.forecast.actual.map((value) => (Number.isNaN(value) ? 'null' : value)).join(', '));
            setSecondaryValuesInput(baseItem.previewData.forecast.forecast.map((value) => (Number.isNaN(value) ? 'null' : value)).join(', '));
            setDatasetColor(baseItem.previewData.forecast.actualColor);
            setSecondaryColor(baseItem.previewData.forecast.forecastColor);
        }

        if (baseItem.previewType === 'pie' && baseItem.previewData.pie) {
            setLabelsInput(baseItem.previewData.pie.labels.join(', '));
            setValuesInput(baseItem.previewData.pie.values.join(', '));
            setPieColorsInput(baseItem.previewData.pie.colors.join(', '));
        }

        if (baseItem.previewType === 'radar' && baseItem.previewData.radar) {
            setLabelsInput(baseItem.previewData.radar.labels.join(', '));
            setValuesInput(baseItem.previewData.radar.values.join(', '));
            setDatasetColor(baseItem.previewData.radar.color);
            setRadarMax(baseItem.previewData.radar.maxValue);
        }
    }, [baseItem]);

    if (!baseItem) {
        return (
            <div className="page-shell">
                <p>Component not found.</p>
                <Link to="/library">Back</Link>
            </div>
        );
    }

    const parsedLabels = parseTextList(labelsInput);
    const parsedValues = parseFlexibleNumberList(valuesInput);
    const parsedSecondaryValues = parseFlexibleNumberList(secondaryValuesInput);
    const pieColors = parseTextList(pieColorsInput);
    const parsedPoints = parsePointList(pointsInput);

    const item = JSON.parse(JSON.stringify(baseItem));

    if (item.previewType === 'bar' && item.previewData.bar) {
        item.previewData.bar.labels = parsedLabels;
        item.previewData.bar.datasets = [
            { label: 'Revenue', data: parsedValues.filter(isNumber), color: datasetColor },
            { label: 'Cost', data: parsedSecondaryValues.filter(isNumber), color: secondaryColor },
        ];
        item.previewData.bar.minY = barMinY;
        item.previewData.bar.maxY = barMaxY;
    }

    if (item.previewType === 'line' && item.previewData.line) {
        item.previewData.line.labels = parsedLabels;
        item.previewData.line.values = parsedValues.filter(isNumber);
        item.previewData.line.color = datasetColor;
        item.previewData.line.fill = fillLine;
    }

    if (item.previewType === 'scatter' && item.previewData.scatter) {
        item.previewData.scatter.points = parsedPoints;
        item.previewData.scatter.color = datasetColor;
        item.previewData.scatter.pointRadius = pointRadius;
    }

    if (item.previewType === 'forecast' && item.previewData.forecast) {
        item.previewData.forecast.labels = parsedLabels;
        item.previewData.forecast.actual = parsedValues.map((value) => (value === null ? Number.NaN : value));
        item.previewData.forecast.forecast = parsedSecondaryValues.map((value) => (value === null ? Number.NaN : value));
        item.previewData.forecast.actualColor = datasetColor;
        item.previewData.forecast.forecastColor = secondaryColor;
    }

    if (item.previewType === 'pie' && item.previewData.pie) {
        item.previewData.pie.labels = parsedLabels;
        item.previewData.pie.values = parsedValues.filter(isNumber);
        item.previewData.pie.colors = pieColors;
    }

    if (item.previewType === 'radar' && item.previewData.radar) {
        item.previewData.radar.labels = parsedLabels;
        item.previewData.radar.values = parsedValues.filter(isNumber);
        item.previewData.radar.color = datasetColor;
        item.previewData.radar.maxValue = radarMax;
    }

    const issues = buildIssues(item.previewType, parsedLabels, parsedValues, parsedSecondaryValues, parsedPoints, pieColors);

    return (
        <div className="component-shell">
            <AppHeader compact />

            <div className="component-page-top">
                <div>
                    <div className="component-page-top__breadcrumbs">
                        <Link to="/library">{locale === 'ru' ? 'Компоненты' : 'Components'}</Link>
                        <span>/</span>
                        <span>{baseItem.title[locale]}</span>
                    </div>
                    <h1>{baseItem.title[locale]}</h1>
                    <p>{baseItem.description[locale]}</p>
                </div>
                <Link className="secondary-button" to="/library">
                    {locale === 'ru' ? 'Назад к каталогу' : 'Back to catalog'}
                </Link>
            </div>

            <div className="component-layout-v2">
                <section className="component-canvas">
                    {issues.length > 0 && (
                        <div className="playground-alert">
                            {issues.map((issue) => (
                                <p key={issue}>{issue}</p>
                            ))}
                        </div>
                    )}

                    <div className="component-preview-surface">
                        <ChartPreview item={item} height={height} />
                    </div>
                </section>

                <aside className="component-controls">
                    <div className="sidebar-box">
                        <h3>Playground</h3>

                        <label className="form-field">
                            <span>{locale === 'ru' ? 'Высота' : 'Height'}</span>
                            <input type="range" min="260" max="560" step="10" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
                        </label>

                        {item.previewType !== 'scatter' && (
                            <label className="form-field">
                                <span>{locale === 'ru' ? 'Подписи' : 'Labels'}</span>
                                <textarea rows={3} value={labelsInput} onChange={(e) => setLabelsInput(e.target.value)} />
                            </label>
                        )}

                        {(item.previewType === 'bar' || item.previewType === 'line' || item.previewType === 'forecast' || item.previewType === 'pie' || item.previewType === 'radar') && (
                            <label className="form-field">
                                <span>{locale === 'ru' ? 'Основные значения' : 'Primary values'}</span>
                                <textarea rows={3} value={valuesInput} onChange={(e) => setValuesInput(e.target.value)} />
                            </label>
                        )}

                        {item.previewType === 'scatter' && (
                            <label className="form-field">
                                <span>{locale === 'ru' ? 'Точки x:y' : 'Points x:y'}</span>
                                <textarea rows={4} value={pointsInput} onChange={(e) => setPointsInput(e.target.value)} />
                            </label>
                        )}

                        {(item.previewType === 'bar' || item.previewType === 'forecast') && (
                            <label className="form-field">
                                <span>{locale === 'ru' ? 'Второй ряд значений' : 'Secondary values'}</span>
                                <textarea rows={3} value={secondaryValuesInput} onChange={(e) => setSecondaryValuesInput(e.target.value)} />
                            </label>
                        )}

                        {(item.previewType === 'bar' || item.previewType === 'line' || item.previewType === 'forecast' || item.previewType === 'scatter' || item.previewType === 'radar') && (
                            <label className="form-field">
                                <span>{locale === 'ru' ? 'Основной цвет' : 'Primary color'}</span>
                                <input type="color" value={datasetColor} onChange={(e) => setDatasetColor(e.target.value)} />
                            </label>
                        )}

                        {(item.previewType === 'bar' || item.previewType === 'forecast') && (
                            <label className="form-field">
                                <span>{locale === 'ru' ? 'Вторичный цвет' : 'Secondary color'}</span>
                                <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
                            </label>
                        )}

                        {item.previewType === 'pie' && (
                            <label className="form-field">
                                <span>{locale === 'ru' ? 'Цвета через запятую' : 'Colors comma-separated'}</span>
                                <textarea rows={3} value={pieColorsInput} onChange={(e) => setPieColorsInput(e.target.value)} />
                            </label>
                        )}

                        {item.previewType === 'line' && (
                            <label className="checkbox-field">
                                <input type="checkbox" checked={fillLine} onChange={(e) => setFillLine(e.target.checked)} />
                                <span>{locale === 'ru' ? 'Заливка под линией' : 'Fill area under line'}</span>
                            </label>
                        )}

                        {item.previewType === 'scatter' && (
                            <label className="form-field">
                                <span>{locale === 'ru' ? 'Радиус точки' : 'Point radius'}</span>
                                <input type="number" value={pointRadius} onChange={(e) => setPointRadius(Number(e.target.value))} />
                            </label>
                        )}

                        {item.previewType === 'bar' && (
                            <>
                                <label className="form-field">
                                    <span>Y min</span>
                                    <input type="number" value={barMinY} onChange={(e) => setBarMinY(Number(e.target.value))} />
                                </label>
                                <label className="form-field">
                                    <span>Y max</span>
                                    <input type="number" value={barMaxY} onChange={(e) => setBarMaxY(Number(e.target.value))} />
                                </label>
                            </>
                        )}

                        {item.previewType === 'radar' && (
                            <label className="form-field">
                                <span>{locale === 'ru' ? 'Максимум шкалы' : 'Max scale'}</span>
                                <input type="number" value={radarMax} onChange={(e) => setRadarMax(Number(e.target.value))} />
                            </label>
                        )}
                    </div>

                    <div className="sidebar-box component-doc-box">
                        <h3>{locale === 'ru' ? 'Документация' : 'Documentation'}</h3>
                        <p><strong>npm:</strong> {baseItem.npmName ?? 'TBD'}</p>
                        <p><strong>Figma:</strong> {baseItem.figmaName ?? 'TBD'}</p>
                        <p><strong>Tags:</strong> {baseItem.tags.join(', ')}</p>
                        <pre>{baseItem.code.react}</pre>
                    </div>
                </aside>
            </div>
        </div>
    );
}

function parseFlexibleNumberList(input: string) {
    return input
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => {
            if (item.toLowerCase() === 'null') return null;
            const value = Number(item);
            return Number.isNaN(value) ? null : value;
        });
}

function isNumber(value: number | null): value is number {
    return typeof value === 'number';
}

function buildIssues(
    previewType: string,
    labels: string[],
    values: Array<number | null>,
    secondValues: Array<number | null>,
    points: { x: number; y: number }[],
    pieColors: string[],
) {
    const messages: string[] = [];

    if (previewType !== 'scatter' && labels.length === 0) {
        messages.push('Labels are empty.');
    }

    if (previewType === 'scatter' && points.length === 0) {
        messages.push('Points are empty.');
    }

    if (previewType === 'line' || previewType === 'pie' || previewType === 'radar') {
        if (labels.length !== values.filter(isNumber).length) {
            messages.push('Labels count should match values count.');
        }
    }

    if (previewType === 'bar') {
        if (labels.length !== values.filter(isNumber).length || labels.length !== secondValues.filter(isNumber).length) {
            messages.push('Labels count should match both dataset lengths.');
        }
    }

    if (previewType === 'forecast') {
        if (labels.length !== values.length || labels.length !== secondValues.length) {
            messages.push('Labels count should match actual and forecast lengths. Use null for empty future or past slots.');
        }
    }

    if (previewType === 'pie' && pieColors.length < values.filter(isNumber).length) {
        messages.push('Not enough colors for all segments.');
    }

    return messages;
}
