export type LocalizedText = {
    ru: string;
    en: string;
};

export type ComponentSection =
    | 'tokens'
    | 'base-components'
    | 'forms'
    | 'tables'
    | 'charts'
    | 'diagrams';

export type PreviewType = 'radar' | 'bar' | 'line' | 'scatter' | 'forecast' | 'pie';

export type LibraryComponentItem = {
    slug: string;
    previewType: PreviewType;
    section: ComponentSection;
    tags: string[];
    title: LocalizedText;
    shortDescription: LocalizedText;
    description: LocalizedText;
    status?: 'ready' | 'draft';
    npmName?: string;
    figmaName?: string;
    dataExample: string;
    formula?: LocalizedText;
    code: {
        react: string;
    };
    previewData: {
        radar?: {
            labels: string[];
            values: number[];
            datasetLabel: string;
            maxValue: number;
            color: string;
        };
        bar?: {
            labels: string[];
            datasets: { label: string; data: number[]; color: string }[];
            minY: number;
            maxY: number;
        };
        line?: {
            labels: string[];
            values: number[];
            color: string;
            fill: boolean;
        };
        scatter?: {
            points: { x: number; y: number }[];
            color: string;
            pointRadius: number;
        };
        forecast?: {
            labels: string[];
            actual: number[];
            forecast: number[];
            actualColor: string;
            forecastColor: string;
        };
        pie?: {
            labels: string[];
            values: number[];
            colors: string[];
        };
    };
};

export const sectionOrder: ComponentSection[] = [
    'tokens',
    'base-components',
    'forms',
    'tables',
    'charts',
    'diagrams',
];

export const sectionLabels: Record<ComponentSection, LocalizedText> = {
    tokens: { ru: 'Токены', en: 'Tokens' },
    'base-components': { ru: 'Базовые компоненты', en: 'Base components' },
    forms: { ru: 'Формы', en: 'Forms' },
    tables: { ru: 'Таблицы', en: 'Tables' },
    charts: { ru: 'Графики', en: 'Charts' },
    diagrams: { ru: 'Диаграммы', en: 'Diagrams' },
};

export const componentRegistry: LibraryComponentItem[] = [
    {
        slug: 'grouped-bar-chart',
        previewType: 'bar',
        section: 'charts',
        tags: ['bar', 'analytics', 'finance'],
        status: 'ready',
        npmName: '@gridify/grouped-bar-chart',
        figmaName: 'Grouped Bar Chart',
        title: {
            ru: 'Столбчатый график',
            en: 'Bar chart',
        },
        shortDescription: {
            ru: 'Сравнение нескольких наборов данных по периодам.',
            en: 'Compare multiple datasets across periods.',
        },
        description: {
            ru: 'Подходит для сравнения выручки, расходов, заявок, сегментов и периодов в бизнес- и финтех-интерфейсах.',
            en: 'Suitable for comparing revenue, expenses, requests, segments, and periods in business and fintech interfaces.',
        },
        dataExample: `labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]\ndataset1: [420, 400, 220, 150, 970, 740]\ndataset2: [430, 820, 130, 500, 240, 350]`,
        formula: {
            ru: 'Для каждой категории отображается один или несколько столбцов: y = value, x = index(labels).',
            en: 'Each category shows one or more bars: y = value, x = index(labels).',
        },
        code: {
            react: `<GroupedBarChart\n  labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}\n  datasets={[\n    { label: "Revenue", data: [420, 400, 220, 150, 970, 740], color: "#84cc16" },\n    { label: "Cost", data: [430, 820, 130, 500, 240, 350], color: "#18181b" },\n  ]}\n/>`,
        },
        previewData: {
            bar: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    { label: 'Revenue', data: [420, 400, 220, 150, 970, 740], color: '#84cc16' },
                    { label: 'Cost', data: [430, 820, 130, 500, 240, 350], color: '#1f2937' },
                ],
                minY: 0,
                maxY: 1000,
            },
        },
    },
    {
        slug: 'line-chart',
        previewType: 'line',
        section: 'charts',
        tags: ['line', 'trend', 'dashboard'],
        status: 'ready',
        npmName: '@gridify/line-chart',
        figmaName: 'Line Chart',
        title: { ru: 'Линейный график', en: 'Line chart' },
        shortDescription: {
            ru: 'Показывает динамику показателя во времени.',
            en: 'Shows metric change over time.',
        },
        description: {
            ru: 'Используется для трендов: MAU, оборот, конверсия, загрузка, активность пользователей.',
            en: 'Used for trends: MAU, turnover, conversion, workload, and user activity.',
        },
        dataExample: `labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]\nvalues: [22, 34, 31, 48, 43, 51, 57]`,
        formula: {
            ru: 'Ломаная строится по точкам (x_i, y_i), где x_i — позиция подписи, y_i — значение.',
            en: 'The line is built from points (x_i, y_i), where x_i is the label position and y_i is the value.',
        },
        code: {
            react: `<LineTrendChart\n  labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}\n  values={[22, 34, 31, 48, 43, 51, 57]}\n  color="#84cc16"\n/>`,
        },
        previewData: {
            line: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                values: [22, 34, 31, 48, 43, 51, 57],
                color: '#84cc16',
                fill: true,
            },
        },
    },
    {
        slug: 'scatter-chart',
        previewType: 'scatter',
        section: 'charts',
        tags: ['scatter', 'correlation', 'analytics'],
        status: 'ready',
        npmName: '@gridify/scatter-chart',
        figmaName: 'Scatter Chart',
        title: { ru: 'Точечный график', en: 'Scatter chart' },
        shortDescription: {
            ru: 'Отображает распределение и корреляцию.',
            en: 'Displays distribution and correlation.',
        },
        description: {
            ru: 'Подходит для анализа сегментов, стоимости привлечения, чеков, скоринга и риск-профилей.',
            en: 'Suitable for segments, acquisition cost, order values, scoring, and risk profiles.',
        },
        dataExample: `points: [{x: 5, y: 18}, {x: 9, y: 12}, {x: 13, y: 30}]`,
        formula: {
            ru: 'Каждая точка описывается парой координат (x, y).',
            en: 'Each point is described by a coordinate pair (x, y).',
        },
        code: {
            react: `<ScatterPlotChart\n  points={[{ x: 5, y: 18 }, { x: 9, y: 12 }, { x: 13, y: 30 }]}\n  color="#84cc16"\n/>`,
        },
        previewData: {
            scatter: {
                points: [
                    { x: 5, y: 18 },
                    { x: 8, y: 11 },
                    { x: 11, y: 19 },
                    { x: 14, y: 31 },
                    { x: 17, y: 25 },
                    { x: 21, y: 38 },
                ],
                color: '#84cc16',
                pointRadius: 6,
            },
        },
    },
    {
        slug: 'forecast-chart',
        previewType: 'forecast',
        section: 'charts',
        tags: ['forecast', 'projection', 'analytics'],
        status: 'ready',
        npmName: '@gridify/forecast-chart',
        figmaName: 'Forecast Chart',
        title: { ru: 'График прогнозирования', en: 'Forecast chart' },
        shortDescription: {
            ru: 'Показывает факт и прогноз на одной оси.',
            en: 'Shows actual and forecast on a single axis.',
        },
        description: {
            ru: 'Подходит для план-факт анализа, прогноза выручки, спроса, нагрузки и пользовательского роста.',
            en: 'Suitable for plan-vs-actual analysis, revenue forecast, demand, workload, and user growth.',
        },
        dataExample: `labels: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"]\nactual: [18, 22, 29, 34, null, null]\nforecast: [null, null, null, 34, 39, 46]`,
        formula: {
            ru: 'Одна серия описывает факт, вторая — прогноз; прогноз обычно начинается с последней фактической точки.',
            en: 'One series shows actual values, the second shows the forecast; forecast usually starts from the last actual point.',
        },
        code: {
            react: `<ForecastLineChart\n  labels={["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"]}\n  actual={[18, 22, 29, 34, null, null]}\n  forecast={[null, null, null, 34, 39, 46]}\n/>`,
        },
        previewData: {
            forecast: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
                actual: [18, 22, 29, 34, Number.NaN, Number.NaN],
                forecast: [Number.NaN, Number.NaN, Number.NaN, 34, 39, 46],
                actualColor: '#111827',
                forecastColor: '#84cc16',
            },
        },
    },
    {
        slug: 'pie-chart',
        previewType: 'pie',
        section: 'diagrams',
        tags: ['pie', 'donut', 'share'],
        status: 'ready',
        npmName: '@gridify/pie-chart',
        figmaName: 'Pie Chart',
        title: { ru: 'Круговая диаграмма', en: 'Pie chart' },
        shortDescription: {
            ru: 'Показывает доли в общем объёме.',
            en: 'Shows shares in a whole.',
        },
        description: {
            ru: 'Используется для структуры затрат, каналов продаж, распределения заявок и сегментов.',
            en: 'Used for cost structure, sales channels, request distribution, and segments.',
        },
        dataExample: `labels: ["Cards", "Loans", "Deposits", "Insurance"]\nvalues: [42, 24, 18, 16]`,
        formula: {
            ru: 'Сектор = value_i / sum(values) * 360°.',
            en: 'Sector = value_i / sum(values) * 360°.',
        },
        code: {
            react: `<PieDonutChart\n  labels={["Cards", "Loans", "Deposits", "Insurance"]}\n  values={[42, 24, 18, 16]}\n/>`,
        },
        previewData: {
            pie: {
                labels: ['Cards', 'Loans', 'Deposits', 'Insurance'],
                values: [42, 24, 18, 16],
                colors: ['#84cc16', '#111827', '#a3e635', '#d9f99d'],
            },
        },
    },
    {
        slug: 'radar-votes-chart',
        previewType: 'radar',
        section: 'diagrams',
        tags: ['radar', 'petal', 'comparison'],
        status: 'ready',
        npmName: '@gridify/radar-chart',
        figmaName: 'Radar Chart',
        title: { ru: 'Лепестковая диаграмма', en: 'Radar chart' },
        shortDescription: {
            ru: 'Сравнение значений по нескольким осям.',
            en: 'Compares values across multiple axes.',
        },
        description: {
            ru: 'Подходит для сравнения KPI, продуктовых характеристик, команд, сегментов или пользовательских оценок.',
            en: 'Suitable for comparing KPIs, product characteristics, teams, segments, or user ratings.',
        },
        dataExample: `labels: ["Speed", "UX", "Security", "Support", "API", "Cost"]\nvalues: [7, 9, 8, 6, 7, 5]`,
        formula: {
            ru: 'Каждая ось отображает отдельный показатель. Нормализация часто задаётся как value_i / maxValue.',
            en: 'Each axis represents a separate metric. Normalization is often defined as value_i / maxValue.',
        },
        code: {
            react: `<RadarVotesChart\n  labels={["Speed", "UX", "Security", "Support", "API", "Cost"]}\n  values={[7, 9, 8, 6, 7, 5]}\n  datasetLabel="Product A"\n/>`,
        },
        previewData: {
            radar: {
                labels: ['Speed', 'UX', 'Security', 'Support', 'API', 'Cost'],
                values: [7, 9, 8, 6, 7, 5],
                datasetLabel: 'Product A',
                maxValue: 10,
                color: '#84cc16',
            },
        },
    },
];

export function getComponentBySlug(slug: string) {
    return componentRegistry.find((item) => item.slug === slug);
}
