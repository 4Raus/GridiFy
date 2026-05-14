import type { ComponentSection, LocalizedText } from './component.types';

export const sectionOrder: ComponentSection[] = [
  'tokens',
  'base-components',
  'forms',
  'tables',
  'charts',
  'diagrams',
  'industry',
];

export const sectionLabels: Record<ComponentSection, LocalizedText> = {
  tokens: { ru: 'Токены', en: 'Tokens', de: 'Tokens' },
  'base-components': { ru: 'Базовые компоненты', en: 'Base components', de: 'Basiskomponenten' },
  forms: { ru: 'Формы', en: 'Forms', de: 'Formulare' },
  tables: { ru: 'Таблицы', en: 'Tables', de: 'Tabellen' },
  charts: { ru: 'Графики', en: 'Charts', de: 'Diagramme' },
  diagrams: { ru: 'Диаграммы', en: 'Diagrams', de: 'Visualisierungen' },
  industry: { ru: 'Отраслевые решения', en: 'Industry', de: 'Branchenlösungen' },
};
