import type {
  ComponentErrorDoc,
  ComponentPropDoc,
  ComponentRegistryItem,
  LocalizedText,
} from './component.types';
import {
  forecastLineChartExample,
  candlestickChartExample,
  groupedBarChartExample,
  lineTrendChartExample,
  pieDonutChartExample,
  radarVotesChartExample,
  scatterPlotChartExample,
} from '../data/chartExamples';
import { financialSpreadsheetData, spreadsheetData } from '../data/tableExamples';
import {
  buttonUsageExample,
  feedbackStatesExample,
  iconSetExample,
  inputFieldExample,
  scrollPanelUsageExample,
  selectFieldExample,
  tooltipExample,
} from '../data/uiExamples';
import { oilGasUsageExample } from '../data/oilGasExamples';

const install = 'npm install gridify';

function text(ru: string, en: string, de: string): LocalizedText {
  return { ru, en, de };
}

function prop(
  name: string,
  type: string,
  required: boolean,
  defaultValue: string | undefined,
  description: LocalizedText,
): ComponentPropDoc {
  return { name, type, required, defaultValue, description };
}

function errorDoc(code: string, reason: LocalizedText, fix: LocalizedText): ComponentErrorDoc {
  return { code, reason, fix };
}

const heightProp = prop(
  'height',
  'number',
  false,
  '320',
  text('Высота области визуализации.', 'Visualization area height.', 'Höhe des Visualisierungsbereichs.'),
);

const chartErrorDocs = [
  errorDoc(
    'EMPTY_LABELS',
    text('Список подписей пуст.', 'The labels list is empty.', 'Die Beschriftungsliste ist leer.'),
    text('Добавьте хотя бы одну подпись.', 'Add at least one label.', 'Fügen Sie mindestens eine Beschriftung hinzu.'),
  ),
  errorDoc(
    'LENGTH_MISMATCH',
    text('Количество подписей и значений не совпадает.', 'Labels and values have different lengths.', 'Beschriftungen und Werte haben unterschiedliche Längen.'),
    text('Выровняйте массивы labels и values.', 'Align labels and values arrays.', 'Gleichen Sie labels und values an.'),
  ),
  errorDoc(
    'INVALID_NUMBER',
    text('В числовом поле есть текст или некорректное число.', 'A numeric field contains text or an invalid number.', 'Ein Zahlenfeld enthält Text oder eine ungültige Zahl.'),
    text('Оставьте только числа, разделённые запятыми.', 'Keep only comma-separated numbers.', 'Verwenden Sie nur durch Kommas getrennte Zahlen.'),
  ),
];

export const componentRegistry: ComponentRegistryItem[] = [
  {
    slug: 'button-system',
    previewType: 'buttons',
    section: 'base-components',
    tags: ['button', 'states', 'actions'],
    status: 'ready',
    packageName: 'gridify',
    importPath: 'gridify',
    figmaName: 'Button System',
    title: text('Кнопки', 'Buttons', 'Buttons'),
    shortDescription: text(
      'Основные состояния кнопок для бизнес-интерфейсов.',
      'Core button states for business interfaces.',
      'Zentrale Button-Zustände für Business-Oberflächen.',
    ),
    description: text(
      'Набор кнопок: primary, secondary, outline, ghost, danger, success, loading и disabled. Подходит для форм, таблиц и панелей управления.',
      'A button set: primary, secondary, outline, ghost, danger, success, loading, and disabled. Suitable for forms, tables, and control panels.',
      'Ein Button-Set mit primary, secondary, outline, ghost, danger, success, loading und disabled. Geeignet für Formulare, Tabellen und Steuerbereiche.',
    ),
    usage: { install, ...buttonUsageExample },
    docs: {
      overview: text(
        'Button System задаёт единый визуальный и поведенческий контракт для действий в интерфейсе.',
        'Button System defines a consistent visual and behavioral contract for actions in the interface.',
        'Das Button System definiert einen einheitlichen visuellen und funktionalen Vertrag für Aktionen in der Oberfläche.',
      ),
      whenToUse: [
        text('Основное действие формы или панели.', 'Primary action in a form or panel.', 'Primäre Aktion in einem Formular oder Bedienfeld.'),
        text('Опасное действие с явной визуальной маркировкой.', 'Destructive action with clear visual treatment.', 'Destruktive Aktion mit klarer visueller Kennzeichnung.'),
        text('Вторичные команды в тулбарах и таблицах.', 'Secondary commands in toolbars and tables.', 'Sekundäre Befehle in Toolbars und Tabellen.'),
      ],
      features: [
        text('Шесть вариантов и три размера.', 'Six variants and three sizes.', 'Sechs Varianten und drei Größen.'),
        text('Состояния loading и disabled блокируют повторное действие.', 'Loading and disabled states prevent repeated actions.', 'Loading- und Disabled-Zustände verhindern doppelte Aktionen.'),
        text('Демо показывает один управляемый пример или сетку вариантов.', 'The demo shows one controlled example or a variant grid.', 'Die Demo zeigt ein steuerbares Beispiel oder ein Variantenraster.'),
      ],
      limitations: [
        text('Компонент не хранит бизнес-состояние, его нужно передавать через props.', 'The component does not store business state; pass it via props.', 'Die Komponente speichert keinen Fachzustand; übergeben Sie ihn per Props.'),
      ],
      dataExample: buttonUsageExample.dataExample,
      logic: text(
        'Если label пустой, demo использует локализованную подпись по умолчанию. Некорректные variant и size откатываются к primary/md.',
        'If label is empty, the demo uses a localized default label. Invalid variant and size fall back to primary/md.',
        'Ist label leer, nutzt die Demo eine lokalisierte Standardbeschriftung. Ungültige variant- und size-Werte fallen auf primary/md zurück.',
      ),
      props: [
        prop('variant', "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'", false, 'primary', text('Визуальный вариант кнопки.', 'Visual button variant.', 'Visuelle Button-Variante.')),
        prop('size', "'sm' | 'md' | 'lg'", false, 'md', text('Размер кнопки.', 'Button size.', 'Button-Größe.')),
        prop('loading', 'boolean', false, 'false', text('Показывает состояние загрузки и блокирует кнопку.', 'Shows loading state and disables the button.', 'Zeigt den Ladezustand und deaktiviert den Button.')),
        prop('disabled', 'boolean', false, 'false', text('Отключает действие пользователя.', 'Disables user action.', 'Deaktiviert die Benutzeraktion.')),
        prop('children', 'ReactNode', true, undefined, text('Текст или содержимое кнопки.', 'Button text or content.', 'Text oder Inhalt des Buttons.')),
      ],
      events: [
        {
          name: 'onClick',
          payload: 'MouseEvent<HTMLButtonElement>',
          description: text('Срабатывает при клике, если кнопка не disabled и не loading.', 'Fires on click when the button is not disabled or loading.', 'Wird bei Klick ausgelöst, wenn der Button weder disabled noch loading ist.'),
        },
      ],
      errors: [
        errorDoc('EMPTY_LABEL', text('Подпись кнопки пустая.', 'Button label is empty.', 'Die Button-Beschriftung ist leer.'), text('Будет показана локализованная подпись по умолчанию.', 'A localized default label will be shown.', 'Es wird eine lokalisierte Standardbeschriftung angezeigt.')),
        errorDoc('INVALID_VARIANT', text('Передан неизвестный variant.', 'Unknown variant was provided.', 'Eine unbekannte variant wurde übergeben.'), text('Используется primary.', 'primary is used.', 'primary wird verwendet.')),
        errorDoc('INVALID_SIZE', text('Передан неизвестный size.', 'Unknown size was provided.', 'Eine unbekannte size wurde übergeben.'), text('Используется md.', 'md is used.', 'md wird verwendet.')),
      ],
    },
  },
  {
    slug: 'oilgas-inspection-form',
    previewType: 'oilgas-form',
    section: 'industry',
    tags: ['form', 'validation', 'oilgas'],
    status: 'review',
    packageName: 'gridify',
    importPath: 'gridify',
    figmaName: 'Oil & Gas Inspection Form',
    title: text('Форма нефтегазового контроля', 'Oil & gas inspection form', 'Öl- und Gas-Prüfformular'),
    shortDescription: text(
      'Форма с отраслевой валидацией параметров.',
      'A form with domain-specific parameter validation.',
      'Ein Formular mit branchenspezifischer Parameterprüfung.',
    ),
    description: text(
      'Пример формы для заполнения параметров скважины: давление, температура, дебит, H₂S и статус контроля. Показывает ошибки рядом с компонентом.',
      'An example form for well parameters: pressure, temperature, flow rate, H₂S, and inspection status. Displays validation errors near the component.',
      'Ein Beispielformular für Bohrlochparameter: Druck, Temperatur, Förderrate, H₂S und Prüfstatus. Validierungsfehler erscheinen direkt am Komponentenbeispiel.',
    ),
    usage: { install, ...oilGasUsageExample },
    docs: {
      overview: text(
        'Форма демонстрирует локальную валидацию полей без backend-логики.',
        'The form demonstrates local field validation without backend logic.',
        'Das Formular demonstriert lokale Feldvalidierung ohne Backend-Logik.',
      ),
      whenToUse: [
        text('Инженерные чек-листы и контрольные формы.', 'Engineering checklists and inspection forms.', 'Technische Checklisten und Prüfformulare.'),
        text('Демо отраслевых правил в UI-библиотеке.', 'Demo of domain rules inside a UI library.', 'Demo fachlicher Regeln innerhalb einer UI-Bibliothek.'),
      ],
      features: [
        text('Проверяет формат WELL-204.', 'Validates WELL-204 format.', 'Validiert das Format WELL-204.'),
        text('Проверяет диапазоны давления, температуры, дебита и H₂S.', 'Validates pressure, temperature, flow rate, and H₂S ranges.', 'Prüft Bereiche für Druck, Temperatur, Förderrate und H₂S.'),
        text('Выводит ошибки через общий ValidationAlert.', 'Displays errors through shared ValidationAlert.', 'Zeigt Fehler über den gemeinsamen ValidationAlert an.'),
      ],
      limitations: [
        text('Это frontend-only demo: отправка данных не реализована.', 'This is a frontend-only demo: data submission is not implemented.', 'Dies ist eine reine Frontend-Demo: Datenversand ist nicht implementiert.'),
      ],
      dataExample: oilGasUsageExample.dataExample,
      logic: text(
        'Числовые поля принимают только числа. H₂S выше 10 ppm требует отметки инженера ТБ.',
        'Numeric fields accept only numbers. H₂S above 10 ppm requires HSE engineer approval.',
        'Zahlenfelder akzeptieren nur Zahlen. H₂S über 10 ppm erfordert eine Freigabe durch HSE.',
      ),
      props: [
        prop('locale', "'ru' | 'en' | 'de'", false, 'ru', text('Язык подписей и ошибок.', 'Language for labels and errors.', 'Sprache für Beschriftungen und Fehler.')),
      ],
      errors: [
        errorDoc('WELL_ID_FORMAT', text('ID скважины не соответствует WELL-204.', 'Well ID does not match WELL-204.', 'Die Well-ID entspricht nicht WELL-204.'), text('Введите WELL- и минимум три цифры.', 'Enter WELL- and at least three digits.', 'Geben Sie WELL- und mindestens drei Ziffern ein.')),
        errorDoc('PRESSURE_RANGE', text('Давление не число или вне 0–250 бар.', 'Pressure is not numeric or outside 0–250 bar.', 'Druck ist keine Zahl oder außerhalb von 0–250 bar.'), text('Исправьте значение давления.', 'Fix the pressure value.', 'Korrigieren Sie den Druckwert.')),
        errorDoc('TEMPERATURE_RANGE', text('Температура не число или вне -60…180 °C.', 'Temperature is not numeric or outside -60…180 °C.', 'Temperatur ist keine Zahl oder außerhalb von -60…180 °C.'), text('Исправьте значение температуры.', 'Fix the temperature value.', 'Korrigieren Sie die Temperatur.')),
        errorDoc('FLOW_RATE', text('Дебит не число или отрицательный.', 'Flow rate is not numeric or negative.', 'Förderrate ist keine Zahl oder negativ.'), text('Введите неотрицательное число.', 'Enter a non-negative number.', 'Geben Sie eine nicht negative Zahl ein.')),
        errorDoc('H2S_THRESHOLD', text('H₂S не число или выше порога.', 'H₂S is not numeric or above threshold.', 'H₂S ist keine Zahl oder über dem Grenzwert.'), text('Проверьте значение и получите подтверждение ТБ.', 'Check the value and obtain HSE approval.', 'Prüfen Sie den Wert und holen Sie HSE-Freigabe ein.')),
      ],
    },
  },
  {
    slug: 'scroll-panel',
    previewType: 'scroll-panel',
    section: 'base-components',
    tags: ['scroll', 'panel', 'log'],
    status: 'ready',
    packageName: 'gridify',
    importPath: 'gridify',
    figmaName: 'Scroll Panel',
    title: text('Скролл-панель', 'Scroll panel', 'Scroll-Panel'),
    shortDescription: text(
      'Прокручиваемый блок для логов, списков и навигации.',
      'A scrollable block for logs, lists, and navigation.',
      'Ein scrollbarer Bereich für Logs, Listen und Navigation.',
    ),
    description: text(
      'Компонент для длинных списков внутри dashboard: журналы операций, события, проверки, уведомления и категории.',
      'A component for long dashboard lists: operation logs, events, checks, notifications, and categories.',
      'Eine Komponente für lange Dashboard-Listen: Operationslogs, Ereignisse, Prüfungen, Benachrichtigungen und Kategorien.',
    ),
    usage: { install, ...scrollPanelUsageExample },
    docs: {
      overview: text(
        'Scroll Panel удерживает длинный список в ограниченной области и оставляет заголовок видимым.',
        'Scroll Panel keeps a long list inside a bounded area and keeps the header visible.',
        'Das Scroll-Panel hält lange Listen in einem begrenzten Bereich und lässt den Header sichtbar.',
      ),
      whenToUse: [
        text('Журнал операций в боковой панели.', 'Operations log in a side panel.', 'Operationslog in einer Seitenleiste.'),
        text('Списки уведомлений, проверок или категорий.', 'Notification, check, or category lists.', 'Listen für Benachrichtigungen, Prüfungen oder Kategorien.'),
      ],
      features: [
        text('Стабильный набор демо-данных без Math.random на уровне модуля.', 'Stable demo data without module-level Math.random.', 'Stabile Demo-Daten ohne Math.random auf Modulebene.'),
        text('Настраиваемые maxHeight, density и itemCount в playground.', 'Configurable maxHeight, density, and itemCount in the playground.', 'Konfigurierbare maxHeight, density und itemCount im Playground.'),
      ],
      limitations: [
        text('Виртуализация списка не входит в текущий frontend-only пример.', 'List virtualization is not part of the current frontend-only example.', 'Listenvirtualisierung ist nicht Teil dieses reinen Frontend-Beispiels.'),
      ],
      dataExample: scrollPanelUsageExample.dataExample,
      logic: text(
        'Высота ограничивает внутренний scroll, а sticky header остаётся доступен при прокрутке.',
        'Height limits internal scrolling, while the sticky header stays available.',
        'Die Höhe begrenzt das interne Scrollen, während der Sticky-Header verfügbar bleibt.',
      ),
      props: [
        prop('maxHeight', 'number', false, '360', text('Максимальная высота прокручиваемой области.', 'Maximum scrollable area height.', 'Maximale Höhe des scrollbaren Bereichs.')),
        prop('density', "'compact' | 'default' | 'comfortable'", false, 'default', text('Плотность строк списка.', 'List row density.', 'Dichte der Listenzeilen.')),
        prop('itemCount', 'number', false, '18', text('Количество демо-записей.', 'Number of demo records.', 'Anzahl der Demo-Einträge.')),
      ],
      errors: [
        errorDoc('MAX_HEIGHT_RANGE', text('maxHeight слишком маленький или слишком большой.', 'maxHeight is too small or too large.', 'maxHeight ist zu klein oder zu groß.'), text('Используйте диапазон 160–640 px.', 'Use the 160–640 px range.', 'Verwenden Sie den Bereich 160–640 px.')),
        errorDoc('ITEM_COUNT_RANGE', text('itemCount вне допустимого диапазона.', 'itemCount is outside the allowed range.', 'itemCount liegt außerhalb des zulässigen Bereichs.'), text('Используйте 1–50 элементов.', 'Use 1–50 items.', 'Verwenden Sie 1–50 Einträge.')),
      ],
    },
  },
  {
    slug: 'spreadsheet-table',
    previewType: 'spreadsheet',
    section: 'tables',
    tags: ['table', 'spreadsheet', 'excel-like'],
    status: 'beta',
    packageName: 'gridify',
    importPath: 'gridify',
    figmaName: 'Spreadsheet Table',
    title: text('Excel-подобная таблица', 'Excel-like table', 'Excel-ähnliche Tabelle'),
    shortDescription: text(
      'Редактируемая таблица со строками, столбцами, объединением и формулами.',
      'Editable table with rows, columns, merging, and formulas.',
      'Editierbare Tabelle mit Zeilen, Spalten, Zellverbund und Formeln.',
    ),
    description: text(
      'Базовая табличная сетка для CRM, ERP, финансовых кабинетов и бэк-офисов. Поддерживает редактирование, выделение диапазонов, объединение ячеек и формулы SUM/AVG/MIN/MAX.',
      'A base spreadsheet grid for CRM, ERP, financial dashboards, and back-office products. Supports editing, range selection, cell merge, and SUM/AVG/MIN/MAX formulas.',
      'Eine Basis-Tabellenmatrix für CRM, ERP, Finanz-Dashboards und Backoffice-Produkte. Unterstützt Bearbeitung, Bereichsauswahl, Zellverbund und SUM/AVG/MIN/MAX-Formeln.',
    ),
    usage: {
      install,
      importCode: "import { SpreadsheetTable } from 'gridify';",
      exampleCode: '<SpreadsheetTable data={data} editable />',
    },
    docs: {
      overview: text(
        'Spreadsheet Table переносит привычные табличные действия в React-компонент без серверной логики.',
        'Spreadsheet Table brings familiar spreadsheet interactions into a React component without server logic.',
        'Spreadsheet Table bringt bekannte Tabelleninteraktionen in eine React-Komponente ohne Serverlogik.',
      ),
      whenToUse: [
        text('Редактируемые бизнес-таблицы и back-office формы.', 'Editable business tables and back-office forms.', 'Editierbare Business-Tabellen und Backoffice-Formulare.'),
        text('Финансовые и операционные расчёты на клиенте.', 'Client-side financial and operational calculations.', 'Clientseitige Finanz- und Operationsberechnungen.'),
      ],
      features: [
        text('Поддерживает app и spreadsheet режимы.', 'Supports app and spreadsheet modes.', 'Unterstützt app- und spreadsheet-Modus.'),
        text('Есть fx-строка, выделение диапазонов и объединение ячеек.', 'Includes fx bar, range selection, and cell merging.', 'Enthält fx-Leiste, Bereichsauswahl und Zellverbund.'),
        text('Формулы SUM / AVG / MIN / MAX / NPV / PMT валидируются локально.', 'SUM / AVG / MIN / MAX / NPV / PMT formulas are validated locally.', 'SUM / AVG / MIN / MAX / NPV / PMT werden lokal validiert.'),
      ],
      limitations: [
        text('Экспорт и серверное сохранение не входят в компонент.', 'Export and server persistence are not part of the component.', 'Export und serverseitige Speicherung sind nicht Teil der Komponente.'),
      ],
      dataExample: 'A1 = Revenue\nB1 = 180000\nD4 = =SUM(B1:B3)',
      logic: text(
        'Формулы читают диапазоны ячеек и возвращают #ERR или #CYCLE для некорректных состояний.',
        'Formulas read cell ranges and return #ERR or #CYCLE for invalid states.',
        'Formeln lesen Zellbereiche und geben bei ungültigen Zuständen #ERR oder #CYCLE zurück.',
      ),
      props: [
        prop('data', 'SpreadsheetData', true, undefined, text('Колонки, строки, объединения и заголовок таблицы.', 'Columns, rows, merges, and table title.', 'Spalten, Zeilen, Zellverbünde und Tabellentitel.')),
        prop('editable', 'boolean', false, 'false', text('Включает toolbar, редактирование ячеек и fx-строку.', 'Enables toolbar, cell editing, and fx bar.', 'Aktiviert Toolbar, Zellbearbeitung und fx-Leiste.')),
        prop('viewMode', "'app' | 'spreadsheet'", false, 'spreadsheet', text('Внешний вид: продуктовая таблица или сетка с координатами.', 'Appearance: product table or coordinate grid.', 'Darstellung: Produkttabelle oder Raster mit Koordinaten.')),
        heightProp,
      ],
      errors: [
        errorDoc('NO_COLUMNS', text('В таблице нет столбцов.', 'The table has no columns.', 'Die Tabelle hat keine Spalten.'), text('Добавьте хотя бы один столбец.', 'Add at least one column.', 'Fügen Sie mindestens eine Spalte hinzu.')),
        errorDoc('ROW_LENGTH', text('Длина строки отличается от числа колонок.', 'Row length differs from column count.', 'Die Zeilenlänge unterscheidet sich von der Spaltenanzahl.'), text('Выровняйте строки по columns.', 'Align rows to columns.', 'Richten Sie Zeilen an columns aus.')),
        errorDoc('MERGE_BOUNDS', text('Объединение выходит за границы таблицы или пересекается.', 'Merge exceeds table bounds or overlaps.', 'Ein Zellverbund überschreitet Grenzen oder überlappt.'), text('Измените диапазон объединения.', 'Adjust the merge range.', 'Passen Sie den Zellverbundbereich an.')),
        errorDoc('FORMULA_INVALID', text('Формула неверная, циклическая или с некорректным типом.', 'Formula is invalid, cyclic, or has an invalid type.', 'Die Formel ist ungültig, zyklisch oder typfehlerhaft.'), text('Проверьте синтаксис, диапазоны и типы колонок.', 'Check syntax, ranges, and column types.', 'Prüfen Sie Syntax, Bereiche und Spaltentypen.')),
      ],
    },
    previewData: { spreadsheet: spreadsheetData },
  },
  {
    slug: 'financial-planning-table',
    previewType: 'spreadsheet',
    section: 'tables',
    tags: ['table', 'finance', 'planning'],
    status: 'beta',
    packageName: 'gridify',
    importPath: 'gridify',
    figmaName: 'Financial Planning Table',
    title: text('Финансовая таблица', 'Financial planning table', 'Finanzplanungstabelle'),
    shortDescription: text(
      'Таблица для план-факта, cash-flow и операционного контроля.',
      'A table for plan-vs-actual, cash flow, and operational control.',
      'Eine Tabelle für Plan-Ist, Cashflow und operative Kontrolle.',
    ),
    description: text(
      'Вариант табличного компонента с процентами, валютой и формульными итогами. Подходит для финтеха и business-приложений.',
      'A spreadsheet variant with percentages, currency columns, and formula totals. Suitable for fintech and business apps.',
      'Eine Tabellenvariante mit Prozentwerten, Währungsspalten und Formelergebnissen. Geeignet für Fintech- und Business-Anwendungen.',
    ),
    usage: {
      install,
      importCode: "import { SpreadsheetTable } from 'gridify';",
      exampleCode: '<SpreadsheetTable data={financialData} editable />',
    },
    docs: {
      overview: text(
        'Финансовый шаблон показывает spreadsheet-компонент на сценарии план-факт анализа.',
        'The financial template shows the spreadsheet component in a plan-vs-actual scenario.',
        'Die Finanzvorlage zeigt die Spreadsheet-Komponente in einem Plan-Ist-Szenario.',
      ),
      whenToUse: [
        text('Планирование бюджета и контроль исполнения.', 'Budget planning and execution control.', 'Budgetplanung und Umsetzungskontrolle.'),
        text('Дашборды с валютой, процентами и итоговыми формулами.', 'Dashboards with currency, percentages, and formula totals.', 'Dashboards mit Währung, Prozentwerten und Formelsummen.'),
      ],
      features: [
        text('Форматирует currency и percent колонки.', 'Formats currency and percent columns.', 'Formatiert Währungs- und Prozentspalten.'),
        text('Поддерживает формульные итоги и локальную проверку диапазонов.', 'Supports formula totals and local range validation.', 'Unterstützt Formelsummen und lokale Bereichsprüfung.'),
      ],
      limitations: [
        text('Не заменяет полноценную финансовую модель или audit trail.', 'Does not replace a full financial model or audit trail.', 'Ersetzt kein vollständiges Finanzmodell oder Audit-Trail.'),
      ],
      dataExample: 'C4 = =SUM(C1:C3)\nCompletion % must stay within 0-100',
      logic: text(
        'Для процентных колонок действует ограничение 0–100, а currency/number не принимают текст.',
        'Percentage columns are limited to 0–100, and currency/number columns reject text.',
        'Prozentspalten sind auf 0–100 begrenzt, Währungs- und Zahlenspalten lehnen Text ab.',
      ),
      props: [
        prop('data', 'SpreadsheetData', true, undefined, text('Финансовая модель таблицы.', 'Financial table model.', 'Finanzielles Tabellenmodell.')),
        prop('editable', 'boolean', false, 'false', text('Разрешает редактирование демо-данных.', 'Allows editing demo data.', 'Erlaubt das Bearbeiten der Demo-Daten.')),
        prop('viewMode', "'app' | 'spreadsheet'", false, 'app', text('Режим отображения таблицы.', 'Table display mode.', 'Anzeigemodus der Tabelle.')),
        heightProp,
      ],
      errors: [
        errorDoc('PERCENT_RANGE', text('Процент вне 0–100.', 'Percent is outside 0–100.', 'Prozentwert liegt außerhalb von 0–100.'), text('Введите процент в допустимом диапазоне.', 'Enter a percent within the allowed range.', 'Geben Sie einen Prozentwert im zulässigen Bereich ein.')),
        errorDoc('NUMERIC_TYPE', text('currency/number содержит текст.', 'currency/number contains text.', 'currency/number enthält Text.'), text('Используйте числовое значение.', 'Use a numeric value.', 'Verwenden Sie einen Zahlenwert.')),
      ],
    },
    previewData: { spreadsheet: financialSpreadsheetData },
  },
  {
    slug: 'grouped-bar-chart',
    previewType: 'bar',
    section: 'charts',
    tags: ['bar', 'analytics', 'finance'],
    status: 'ready',
    packageName: 'gridify',
    importPath: 'gridify',
    figmaName: 'Grouped Bar Chart',
    title: text('Столбчатый график', 'Bar chart', 'Balkendiagramm'),
    shortDescription: text('Сравнение нескольких наборов данных по периодам.', 'Compare multiple datasets across periods.', 'Vergleicht mehrere Datensätze über Zeiträume.'),
    description: text(
      'Подходит для сравнения выручки, расходов, заявок, сегментов и периодов в бизнес- и финтех-интерфейсах.',
      'Suitable for comparing revenue, expenses, requests, segments, and periods in business and fintech interfaces.',
      'Geeignet zum Vergleich von Umsatz, Kosten, Anfragen, Segmenten und Perioden in Business- und Fintech-Oberflächen.',
    ),
    usage: {
      install,
      importCode: "import { GroupedBarChart } from 'gridify';",
      exampleCode: '<GroupedBarChart labels={["Jan","Feb"]} datasets={[{ label: "Revenue", data: [420,400], color: "#84cc16" }]} />',
    },
    docs: {
      overview: text('Grouped Bar Chart сравнивает два ряда значений в одинаковых категориях.', 'Grouped Bar Chart compares two value series across the same categories.', 'Grouped Bar Chart vergleicht zwei Wertreihen über dieselben Kategorien.'),
      whenToUse: [
        text('План-факт, выручка-расходы, заявки по каналам.', 'Plan-vs-actual, revenue-vs-cost, requests by channel.', 'Plan-Ist, Umsatz-Kosten, Anfragen nach Kanal.'),
      ],
      features: [
        text('Поддерживает два набора данных, minY/maxY и отдельные цвета.', 'Supports two datasets, minY/maxY, and separate colors.', 'Unterstützt zwei Datensätze, minY/maxY und getrennte Farben.'),
        text('Playground проверяет границы и длину рядов.', 'The playground validates bounds and series length.', 'Der Playground prüft Grenzen und Reihenlängen.'),
      ],
      limitations: [
        text('Для большого числа рядов лучше разделить график на несколько представлений.', 'For many series, split the chart into multiple views.', 'Bei vielen Reihen sollte das Diagramm in mehrere Ansichten geteilt werden.'),
      ],
      dataExample: 'labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]\ndataset1: [420, 400, 220, 150, 970, 740]\ndataset2: [430, 820, 130, 500, 240, 350]',
      logic: text('Для каждой категории отображается один или несколько столбцов: y = value, x = index(labels).', 'Each category shows one or more bars: y = value, x = index(labels).', 'Jede Kategorie zeigt einen oder mehrere Balken: y = value, x = index(labels).'),
      props: [
        prop('labels', 'string[]', true, undefined, text('Подписи категорий по оси X.', 'Category labels on the X axis.', 'Kategoriebeschriftungen auf der X-Achse.')),
        prop('datasets', 'BarChartDataset[]', true, undefined, text('Ряды данных с label, data и color.', 'Data series with label, data, and color.', 'Datenreihen mit label, data und color.')),
        prop('minY', 'number', false, '0', text('Минимум шкалы Y.', 'Y-axis minimum.', 'Minimum der Y-Achse.')),
        prop('maxY', 'number', false, '1000', text('Максимум шкалы Y.', 'Y-axis maximum.', 'Maximum der Y-Achse.')),
        heightProp,
      ],
      errors: [...chartErrorDocs, errorDoc('BAR_RANGE', text('maxY меньше или равен minY, либо значения вне диапазона.', 'maxY is less than or equal to minY, or values are out of range.', 'maxY ist kleiner/gleich minY oder Werte liegen außerhalb des Bereichs.'), text('Проверьте границы шкалы и значения.', 'Check scale bounds and values.', 'Prüfen Sie Skalenbereich und Werte.'))],
    },
    previewData: { bar: groupedBarChartExample },
  },
  {
    slug: 'line-chart',
    previewType: 'line',
    section: 'charts',
    tags: ['line', 'trend', 'dashboard'],
    status: 'ready',
    packageName: 'gridify',
    importPath: 'gridify',
    figmaName: 'Line Chart',
    title: text('Линейный график', 'Line chart', 'Liniendiagramm'),
    shortDescription: text('Показывает динамику показателя во времени.', 'Shows metric change over time.', 'Zeigt die Entwicklung einer Kennzahl über die Zeit.'),
    description: text('Используется для трендов: MAU, оборот, конверсия, загрузка, активность пользователей.', 'Used for trends: MAU, turnover, conversion, workload, and user activity.', 'Geeignet für Trends wie MAU, Umsatz, Conversion, Auslastung und Nutzeraktivität.'),
    usage: {
      install,
      importCode: "import { LineTrendChart } from 'gridify';",
      exampleCode: '<LineTrendChart labels={["Mon", "Tue"]} values={[22, 34]} color="#84cc16" />',
    },
    docs: {
      overview: text('Line Chart показывает последовательность значений как тренд.', 'Line Chart shows a value sequence as a trend.', 'Line Chart zeigt eine Wertefolge als Trend.'),
      whenToUse: [text('Метрики во времени: трафик, продажи, SLA, нагрузка.', 'Time-based metrics: traffic, sales, SLA, workload.', 'Zeitbasierte Metriken: Traffic, Verkäufe, SLA, Auslastung.')],
      features: [text('Поддерживает цвет, заливку под линией и высоту.', 'Supports color, area fill, and height.', 'Unterstützt Farbe, Flächenfüllung und Höhe.')],
      limitations: [text('Не предназначен для категориального сравнения многих независимых рядов.', 'Not intended for categorical comparison of many independent series.', 'Nicht für kategoriale Vergleiche vieler unabhängiger Reihen gedacht.')],
      dataExample: 'labels: ["Mon", "Tue", "Wed"]\nvalues: [22, 34, 31]',
      logic: text('Ломаная строится по точкам (x_i, y_i), где x_i — позиция подписи, y_i — значение.', 'The line is built from points (x_i, y_i), where x_i is the label position and y_i is the value.', 'Die Linie entsteht aus Punkten (x_i, y_i), wobei x_i die Labelposition und y_i der Wert ist.'),
      props: [
        prop('labels', 'string[]', true, undefined, text('Подписи точек.', 'Point labels.', 'Punktbeschriftungen.')),
        prop('values', 'number[]', true, undefined, text('Числовые значения тренда.', 'Numeric trend values.', 'Numerische Trendwerte.')),
        prop('color', 'string', false, '#84cc16', text('Цвет линии и точек.', 'Line and point color.', 'Farbe von Linie und Punkten.')),
        prop('fill', 'boolean', false, 'true', text('Заливка области под линией.', 'Area fill under the line.', 'Flächenfüllung unter der Linie.')),
        heightProp,
      ],
      errors: chartErrorDocs,
    },
    previewData: { line: lineTrendChartExample },
  },
  {
    slug: 'scatter-chart',
    previewType: 'scatter',
    section: 'charts',
    tags: ['scatter', 'correlation', 'analytics'],
    status: 'beta',
    packageName: 'gridify',
    importPath: 'gridify',
    figmaName: 'Scatter Chart',
    title: text('Точечный график', 'Scatter chart', 'Streudiagramm'),
    shortDescription: text('Отображает распределение и корреляцию.', 'Displays distribution and correlation.', 'Zeigt Verteilung und Korrelation.'),
    description: text('Подходит для анализа сегментов, стоимости привлечения, чеков, скоринга и риск-профилей.', 'Suitable for segments, acquisition cost, order values, scoring, and risk profiles.', 'Geeignet für Segmente, Akquisitionskosten, Warenkörbe, Scoring und Risikoprofile.'),
    usage: {
      install,
      importCode: "import { ScatterPlotChart } from 'gridify';",
      exampleCode: '<ScatterPlotChart points={[{ x: 5, y: 18 }]} color="#84cc16" />',
    },
    docs: {
      overview: text('Scatter Chart показывает независимые точки на плоскости X/Y.', 'Scatter Chart shows independent points on an X/Y plane.', 'Scatter Chart zeigt unabhängige Punkte auf einer X/Y-Fläche.'),
      whenToUse: [text('Корреляция, распределение, кластеры и выбросы.', 'Correlation, distribution, clusters, and outliers.', 'Korrelation, Verteilung, Cluster und Ausreißer.')],
      features: [text('Настраиваются точки, цвет, радиус и высота.', 'Points, color, radius, and height are configurable.', 'Punkte, Farbe, Radius und Höhe sind konfigurierbar.')],
      limitations: [text('Формат ввода точек в playground: x:y через запятую.', 'Playground point format: comma-separated x:y.', 'Punktformat im Playground: x:y durch Kommas getrennt.')],
      dataExample: 'points: [{x: 5, y: 18}, {x: 9, y: 12}]',
      logic: text('Каждая точка описывается парой координат (x, y).', 'Each point is described by a coordinate pair (x, y).', 'Jeder Punkt wird durch ein Koordinatenpaar (x, y) beschrieben.'),
      props: [
        prop('points', '{ x: number; y: number }[]', true, undefined, text('Массив координат.', 'Coordinate array.', 'Koordinatenarray.')),
        prop('color', 'string', false, '#84cc16', text('Цвет точек.', 'Point color.', 'Punktfarbe.')),
        prop('pointRadius', 'number', false, '6', text('Радиус точки.', 'Point radius.', 'Punktradius.')),
        heightProp,
      ],
      errors: [
        errorDoc('EMPTY_POINTS', text('Список точек пуст.', 'Points list is empty.', 'Die Punkteliste ist leer.'), text('Добавьте хотя бы одну точку.', 'Add at least one point.', 'Fügen Sie mindestens einen Punkt hinzu.')),
        errorDoc('INVALID_POINT', text('Точка не соответствует формату x:y.', 'Point does not match x:y format.', 'Der Punkt entspricht nicht dem Format x:y.'), text('Используйте пары вроде 5:18.', 'Use pairs such as 5:18.', 'Verwenden Sie Paare wie 5:18.')),
        errorDoc('POINT_RADIUS', text('pointRadius меньше или равен 0.', 'pointRadius is less than or equal to 0.', 'pointRadius ist kleiner oder gleich 0.'), text('Введите положительное значение.', 'Enter a positive value.', 'Geben Sie einen positiven Wert ein.')),
      ],
    },
    previewData: { scatter: scatterPlotChartExample },
  },
  {
    slug: 'forecast-chart',
    previewType: 'forecast',
    section: 'charts',
    tags: ['forecast', 'projection', 'analytics'],
    status: 'review',
    packageName: 'gridify',
    importPath: 'gridify',
    figmaName: 'Forecast Chart',
    title: text('График прогнозирования', 'Forecast chart', 'Prognosediagramm'),
    shortDescription: text('Показывает факт и прогноз на одной оси.', 'Shows actual and forecast on a single axis.', 'Zeigt Ist- und Prognosewerte auf einer Achse.'),
    description: text('Подходит для план-факт анализа, прогноза выручки, спроса, нагрузки и пользовательского роста.', 'Suitable for plan-vs-actual analysis, revenue forecast, demand, workload, and user growth.', 'Geeignet für Plan-Ist-Analysen, Umsatzprognosen, Nachfrage, Auslastung und Nutzerwachstum.'),
    usage: {
      install,
      importCode: "import { ForecastLineChart } from 'gridify';",
      exampleCode: '<ForecastLineChart labels={["Q1"]} actual={[18]} forecast={[18]} />',
    },
    docs: {
      overview: text('Forecast Chart разделяет фактическую и прогнозную линию, сохраняя общие подписи.', 'Forecast Chart separates actual and forecast lines while keeping shared labels.', 'Forecast Chart trennt Ist- und Prognoselinien bei gemeinsamen Labels.'),
      whenToUse: [text('План-факт и прогнозные панели.', 'Plan-vs-actual and forecasting dashboards.', 'Plan-Ist- und Prognose-Dashboards.')],
      features: [text('Поддерживает пропуски через null в playground и Number.NaN в данных графика.', 'Supports gaps through null in the playground and Number.NaN in chart data.', 'Unterstützt Lücken über null im Playground und Number.NaN in Diagrammdaten.')],
      limitations: [text('Прогноз не рассчитывается автоматически, он передаётся как готовый ряд.', 'Forecast is not calculated automatically; pass it as a prepared series.', 'Die Prognose wird nicht automatisch berechnet, sondern als fertige Reihe übergeben.')],
      dataExample: 'labels: ["Q1", "Q2", "Q3"]\nactual: [18, 22, 29]\nforecast: [null, 22, 31]',
      logic: text('Одна серия описывает факт, вторая — прогноз; прогноз обычно начинается с последней фактической точки.', 'One series shows actual values, the second shows the forecast; forecast usually starts from the last actual point.', 'Eine Reihe zeigt Ist-Werte, die zweite die Prognose; Prognosen beginnen oft am letzten Ist-Punkt.'),
      props: [
        prop('labels', 'string[]', true, undefined, text('Подписи периодов.', 'Period labels.', 'Periodenbeschriftungen.')),
        prop('actual', 'number[]', true, undefined, text('Фактический ряд.', 'Actual series.', 'Ist-Reihe.')),
        prop('forecast', 'number[]', true, undefined, text('Прогнозный ряд.', 'Forecast series.', 'Prognosereihe.')),
        prop('actualColor', 'string', false, '#111827', text('Цвет факта.', 'Actual color.', 'Farbe der Ist-Reihe.')),
        prop('forecastColor', 'string', false, '#84cc16', text('Цвет прогноза.', 'Forecast color.', 'Farbe der Prognose.')),
        heightProp,
      ],
      errors: chartErrorDocs,
    },
    previewData: { forecast: forecastLineChartExample },
  },
  {
    slug: 'pie-chart',
    previewType: 'pie',
    section: 'diagrams',
    tags: ['pie', 'donut', 'share'],
    status: 'ready',
    packageName: 'gridify',
    importPath: 'gridify',
    figmaName: 'Pie Chart',
    title: text('Круговая диаграмма', 'Pie chart', 'Kreisdiagramm'),
    shortDescription: text('Показывает доли в общем объёме.', 'Shows shares in a whole.', 'Zeigt Anteile an einem Gesamtwert.'),
    description: text('Используется для структуры затрат, каналов продаж, распределения заявок и сегментов.', 'Used for cost structure, sales channels, request distribution, and segments.', 'Geeignet für Kostenstruktur, Vertriebskanäle, Anfrageverteilung und Segmente.'),
    usage: {
      install,
      importCode: "import { PieDonutChart } from 'gridify';",
      exampleCode: '<PieDonutChart labels={["Cards"]} values={[42]} />',
    },
    docs: {
      overview: text('Pie Chart показывает вклад каждого сегмента в общий объём.', 'Pie Chart shows each segment contribution to a whole.', 'Pie Chart zeigt den Beitrag jedes Segments zum Gesamtwert.'),
      whenToUse: [text('Доли, структура портфеля, распределение категорий.', 'Shares, portfolio structure, category distribution.', 'Anteile, Portfoliostruktur, Kategorienverteilung.')],
      features: [text('Цвета сегментов редактируются через палитру, color picker и hex-поле.', 'Segment colors are edited through palette, color picker, and hex field.', 'Segmentfarben werden über Palette, Color Picker und Hex-Feld bearbeitet.')],
      limitations: [text('Не используйте для точного сравнения близких значений.', 'Do not use for precise comparison of close values.', 'Nicht für präzise Vergleiche ähnlicher Werte verwenden.')],
      dataExample: 'labels: ["Cards", "Loans"]\nvalues: [42, 24]\ncolors: ["#84cc16", "#111827"]',
      logic: text('Сектор = value_i / sum(values) * 360°.', 'Sector = value_i / sum(values) * 360°.', 'Sektor = value_i / sum(values) * 360°.'),
      props: [
        prop('labels', 'string[]', true, undefined, text('Названия сегментов.', 'Segment names.', 'Segmentnamen.')),
        prop('values', 'number[]', true, undefined, text('Значения сегментов.', 'Segment values.', 'Segmentwerte.')),
        prop('colors', 'string[]', false, 'preset palette', text('Цвета сегментов.', 'Segment colors.', 'Segmentfarben.')),
        heightProp,
      ],
      errors: [...chartErrorDocs, errorDoc('PIE_COLORS', text('Цветов меньше, чем сегментов.', 'There are fewer colors than segments.', 'Es gibt weniger Farben als Segmente.'), text('Добавьте цвет или уменьшите число сегментов.', 'Add a color or reduce segment count.', 'Fügen Sie eine Farbe hinzu oder reduzieren Sie die Segmentanzahl.'))],
    },
    previewData: { pie: pieDonutChartExample },
  },
  {
    slug: 'radar-votes-chart',
    previewType: 'radar',
    section: 'diagrams',
    tags: ['radar', 'petal', 'comparison'],
    status: 'beta',
    packageName: 'gridify',
    importPath: 'gridify',
    figmaName: 'Radar Chart',
    title: text('Лепестковая диаграмма', 'Radar chart', 'Radardiagramm'),
    shortDescription: text('Сравнение значений по нескольким осям.', 'Compares values across multiple axes.', 'Vergleicht Werte über mehrere Achsen.'),
    description: text('Подходит для сравнения KPI, продуктовых характеристик, команд, сегментов или пользовательских оценок.', 'Suitable for comparing KPIs, product characteristics, teams, segments, or user ratings.', 'Geeignet zum Vergleich von KPIs, Produkteigenschaften, Teams, Segmenten oder Nutzerbewertungen.'),
    usage: {
      install,
      importCode: "import { RadarVotesChart } from 'gridify';",
      exampleCode: '<RadarVotesChart labels={["Speed"]} values={[7]} datasetLabel="Product A" />',
    },
    docs: {
      overview: text('Radar Chart сравнивает несколько характеристик на общей радиальной шкале.', 'Radar Chart compares multiple characteristics on a shared radial scale.', 'Radar Chart vergleicht mehrere Merkmale auf einer gemeinsamen radialen Skala.'),
      whenToUse: [text('KPI-профили, оценки продукта, сравнительные матрицы.', 'KPI profiles, product ratings, comparison matrices.', 'KPI-Profile, Produktbewertungen, Vergleichsmatrizen.')],
      features: [text('Поддерживает maxValue и цвет ряда.', 'Supports maxValue and series color.', 'Unterstützt maxValue und Reihenfarbe.')],
      limitations: [text('Слишком много осей снижает читаемость.', 'Too many axes reduce readability.', 'Zu viele Achsen verringern die Lesbarkeit.')],
      dataExample: 'labels: ["Speed", "UX"]\nvalues: [7, 9]',
      logic: text('Каждая ось отображает отдельный показатель. Нормализация часто задаётся как value_i / maxValue.', 'Each axis represents a separate metric. Normalization is often defined as value_i / maxValue.', 'Jede Achse steht für eine eigene Kennzahl. Normalisierung wird oft als value_i / maxValue definiert.'),
      props: [
        prop('labels', 'string[]', true, undefined, text('Названия осей.', 'Axis names.', 'Achsenbeschriftungen.')),
        prop('values', 'number[]', true, undefined, text('Значения по осям.', 'Axis values.', 'Achsenwerte.')),
        prop('datasetLabel', 'string', false, 'Dataset', text('Название набора данных.', 'Dataset name.', 'Name des Datensatzes.')),
        prop('maxValue', 'number', false, '10', text('Максимум радиальной шкалы.', 'Radial scale maximum.', 'Maximum der radialen Skala.')),
        prop('borderColor', 'string', false, '#84cc16', text('Цвет линии.', 'Line color.', 'Linienfarbe.')),
        heightProp,
      ],
      errors: [...chartErrorDocs, errorDoc('RADAR_MAX', text('Значение превышает maxValue.', 'A value exceeds maxValue.', 'Ein Wert überschreitet maxValue.'), text('Увеличьте maxValue или уменьшите значение.', 'Increase maxValue or reduce the value.', 'Erhöhen Sie maxValue oder reduzieren Sie den Wert.'))],
    },
    previewData: { radar: radarVotesChartExample },
  },
];

componentRegistry.splice(1, 0, {
  slug: 'gridify-action-button',
  previewType: 'gridify-action-button',
  section: 'base-components',
  tags: ['button', 'gridify', 'action'],
  status: 'review',
  packageName: 'gridify',
  importPath: 'gridify',
  figmaName: 'GridiFy Action Button draft',
  title: text('GridiFy Action Button', 'GridiFy Action Button', 'GridiFy Action Button'),
  shortDescription: text(
    'Брендированная action-кнопка GridiFy со слотами и intent-состояниями.',
    'A branded GridiFy action button with slots and intent states.',
    'Ein gebrandeter GridiFy Action Button mit Slots und Intent-Zuständen.',
  ),
  description: text(
    'Дополнительная кнопка для явных бизнес-действий. Figma-файл недоступен из среды, поэтому компонент собран по текущим tokens GridiFy и приложенному визуальному референсу.',
    'An additional button for explicit business actions. The Figma file is not available from this environment, so the component uses current GridiFy tokens and the attached visual reference.',
    'Ein zusätzlicher Button für klare Business-Aktionen. Die Figma-Datei ist in dieser Umgebung nicht verfügbar, daher nutzt die Komponente aktuelle GridiFy Tokens und die angehängte visuelle Referenz.',
  ),
  usage: {
    install,
    importCode: "import { GridifyActionButton } from 'gridify';",
    exampleCode: '<GridifyActionButton variant="solid" intent="brand" iconSlot={<span>+</span>}>Create request</GridifyActionButton>',
  },
  docs: {
    overview: text(
      'GridiFy Action Button отличается от обычного GridifyButton бренд-плашкой, intent-палитрой и слотами для иконки/бейджа.',
      'GridiFy Action Button differs from GridifyButton through a brand prefix, intent palette, and icon/badge slots.',
      'GridiFy Action Button unterscheidet sich vom GridifyButton durch Brand-Prefix, Intent-Palette und Icon-/Badge-Slots.',
    ),
    whenToUse: [
      text('Основные действия в business-панелях, где нужен явный GridiFy-бренд.', 'Primary actions in business panels where the GridiFy brand should be visible.', 'Primäre Aktionen in Business-Panels, bei denen die GridiFy-Marke sichtbar sein soll.'),
      text('Кнопки с иконкой слева или коротким статусным бейджем справа.', 'Buttons with a leading icon or a short trailing status badge.', 'Buttons mit führendem Icon oder kurzem Status-Badge rechts.'),
    ],
    features: [
      text('variant: solid, soft, outline, ghost.', 'Variants: solid, soft, outline, ghost.', 'Varianten: solid, soft, outline, ghost.'),
      text('intent: neutral, brand, success, warning, danger.', 'Intents: neutral, brand, success, warning, danger.', 'Intents: neutral, brand, success, warning, danger.'),
      text('Поддерживает loading, disabled, fullWidth, iconSlot и trailingSlot.', 'Supports loading, disabled, fullWidth, iconSlot, and trailingSlot.', 'Unterstützt loading, disabled, fullWidth, iconSlot und trailingSlot.'),
    ],
    limitations: [
      text('Это инженерная заготовка: для точного соответствия нужен экспорт или screenshot из Figma.', 'This is an engineering draft: exact matching requires a Figma export or screenshot.', 'Dies ist ein technischer Entwurf: Für exakte Übereinstimmung ist ein Figma-Export oder Screenshot nötig.'),
    ],
    dataExample: '{ variant: "solid", intent: "brand", size: "md", loading: false }',
    logic: text(
      'loading блокирует кнопку так же, как disabled. Слоты рендерятся только при наличии значения.',
      'loading disables the button like disabled. Slots render only when provided.',
      'loading deaktiviert den Button wie disabled. Slots werden nur gerendert, wenn sie vorhanden sind.',
    ),
    props: [
      prop('variant', "'solid' | 'soft' | 'outline' | 'ghost'", false, 'solid', text('Визуальный вариант кнопки.', 'Visual button variant.', 'Visuelle Button-Variante.')),
      prop('intent', "'neutral' | 'brand' | 'success' | 'warning' | 'danger'", false, 'brand', text('Смысловой цвет действия.', 'Semantic action color.', 'Semantische Aktionsfarbe.')),
      prop('size', "'sm' | 'md' | 'lg'", false, 'md', text('Размер кнопки.', 'Button size.', 'Button-Größe.')),
      prop('iconSlot', 'ReactNode', false, undefined, text('Слот слева от текста.', 'Slot before the text.', 'Slot vor dem Text.')),
      prop('trailingSlot', 'ReactNode', false, undefined, text('Слот справа от текста.', 'Slot after the text.', 'Slot nach dem Text.')),
      prop('loading', 'boolean', false, 'false', text('Показывает spinner и блокирует действие.', 'Shows a spinner and blocks action.', 'Zeigt einen Spinner und blockiert die Aktion.')),
      prop('fullWidth', 'boolean', false, 'false', text('Растягивает кнопку на ширину контейнера.', 'Stretches the button to container width.', 'Streckt den Button auf Containerbreite.')),
    ],
    errors: [
      errorDoc('FIGMA_UNAVAILABLE', text('Figma-файл недоступен без авторизации.', 'The Figma file is unavailable without authorization.', 'Die Figma-Datei ist ohne Autorisierung nicht verfügbar.'), text('Передайте экспорт/screenshot для pixel-perfect реализации.', 'Provide an export/screenshot for pixel-perfect implementation.', 'Stellen Sie Export/Screenshot für eine pixelgenaue Umsetzung bereit.')),
    ],
  },
});

componentRegistry.push(
  {
    slug: 'feedback-states',
    previewType: 'feedback-states',
    section: 'base-components',
    tags: ['feedback', 'error', 'status', 'gridify-feedback'],
    status: 'ready',
    packageName: 'gridify',
    importPath: 'gridify',
    figmaName: 'Feedback States',
    title: text('Feedback states', 'Feedback states', 'Feedback States'),
    shortDescription: text('Набор статусных иконок для ошибок, предупреждений и успешных операций.', 'Status icons for errors, warnings, information, and success.', 'Status-Icons für Fehler, Warnungen, Informationen und Erfolg.'),
    description: text('Компонент показывает компактные состояния feedback в бизнес-интерфейсах.', 'The component shows compact feedback states in business interfaces.', 'Die Komponente zeigt kompakte Feedback-Zustände in Business-Oberflächen.'),
    usage: { install, importCode: "import { FeedbackStates } from 'gridify';", exampleCode: '<FeedbackStates states={states} size="md" orientation="row" />' },
    docs: {
      overview: text('Feedback states визуализирует neutral/info/warning/error/success как доступные status-icons.', 'Feedback states visualizes neutral/info/warning/error/success as accessible status icons.', 'Feedback States visualisiert neutral/info/warning/error/success als zugängliche Status-Icons.'),
      whenToUse: [text('Показывать результат проверки, операции или состояние записи.', 'Show validation, operation result, or record state.', 'Validierung, Operationsergebnis oder Datensatzstatus anzeigen.')],
      features: [text('Поддерживает row/grid, размеры и скрытие label.', 'Supports row/grid, sizes, and optional labels.', 'Unterstützt row/grid, Größen und optionale Labels.')],
      limitations: [text('Не заменяет подробный текст ошибки в критичных сценариях.', 'Does not replace detailed error text in critical flows.', 'Ersetzt keinen detaillierten Fehlertext in kritischen Abläufen.')],
      dataExample: JSON.stringify(feedbackStatesExample, null, 2),
      logic: text('Пустой label заменяется fallback по типу состояния.', 'Empty labels fall back to the state type.', 'Leere Labels fallen auf den Zustandstyp zurück.'),
      props: [
        prop('states', '{ type; label; message? }[]', true, undefined, text('Список отображаемых состояний.', 'States to display.', 'Anzuzeigende Zustände.')),
        prop('size', "'sm' | 'md' | 'lg'", false, 'md', text('Размер иконок и touch target.', 'Icon and touch target size.', 'Icon- und Touch-Target-Größe.')),
        prop('orientation', "'row' | 'grid'", false, 'row', text('Расположение элементов.', 'Item layout.', 'Anordnung der Elemente.')),
      ],
      errors: [
        errorDoc('EMPTY_STATES', text('Список states пуст.', 'states list is empty.', 'states-Liste ist leer.'), text('Добавьте хотя бы одно состояние.', 'Add at least one state.', 'Fügen Sie mindestens einen Zustand hinzu.')),
        errorDoc('EMPTY_LABEL', text('Label состояния пуст.', 'State label is empty.', 'Statuslabel ist leer.'), text('Используется fallback по locale.', 'Locale fallback is used.', 'Locale-Fallback wird genutzt.')),
      ],
    },
    previewData: { feedbackStates: feedbackStatesExample },
  },
  {
    slug: 'tooltip',
    previewType: 'tooltip',
    section: 'base-components',
    tags: ['tooltip', 'overlay', 'gridify-tooltip'],
    status: 'beta',
    packageName: 'gridify',
    importPath: 'gridify',
    figmaName: 'Tooltip',
    title: text('Tooltip', 'Tooltip', 'Tooltip'),
    shortDescription: text('Всплывающая подсказка с 12 placements и light/dark темами.', 'Tooltip with 12 placements and light/dark themes.', 'Tooltip mit 12 Platzierungen und Light/Dark Themes.'),
    description: text('Подсказка для краткого контекста при hover/focus.', 'A tooltip for short contextual help on hover/focus.', 'Ein Tooltip für kurzen Kontext bei Hover/Fokus.'),
    usage: { install, importCode: "import { GridifyTooltip } from 'gridify';", exampleCode: '<GridifyTooltip message="Context" placement="top"><button>Hover</button></GridifyTooltip>' },
    docs: {
      overview: text('GridifyTooltip поддерживает light/dark оформление, arrow и 12 placements.', 'GridifyTooltip supports light/dark styling, arrow, and 12 placements.', 'GridifyTooltip unterstützt Light/Dark Styling, Arrow und 12 Platzierungen.'),
      whenToUse: [text('Короткое пояснение к полю, кнопке или статусу.', 'Short explanation for a field, button, or status.', 'Kurze Erklärung für Feld, Button oder Status.')],
      features: [text('Показывается по hover/focus или принудительно через visible.', 'Shows on hover/focus or forced through visible.', 'Wird bei Hover/Fokus oder per visible angezeigt.')],
      limitations: [text('Не используйте tooltip для критически важных данных.', 'Do not use tooltips for critical information.', 'Nutzen Sie Tooltips nicht für kritische Informationen.')],
      dataExample: JSON.stringify(tooltipExample, null, 2),
      logic: text('width ограничивается безопасным диапазоном 160-420 px.', 'width is clamped to 160-420 px.', 'width wird auf 160-420 px begrenzt.'),
      props: [
        prop('message', 'string', true, undefined, text('Текст подсказки.', 'Tooltip text.', 'Tooltip-Text.')),
        prop('placement', 'TooltipPlacement', false, 'top', text('Положение относительно trigger.', 'Position relative to trigger.', 'Position relativ zum Trigger.')),
        prop('theme', "'light' | 'dark'", false, 'light', text('Цветовая тема.', 'Color theme.', 'Farbtheme.')),
      ],
      errors: [
        errorDoc('EMPTY_MESSAGE', text('message пустой.', 'message is empty.', 'message ist leer.'), text('Используется fallback message.', 'Fallback message is used.', 'Fallback message wird genutzt.')),
        errorDoc('INVALID_WIDTH', text('width вне диапазона.', 'width is out of range.', 'width liegt außerhalb des Bereichs.'), text('Укажите 160-420 px.', 'Use 160-420 px.', 'Nutzen Sie 160-420 px.')),
      ],
    },
    previewData: { tooltip: tooltipExample },
  },
  {
    slug: 'input-field',
    previewType: 'input-field',
    section: 'forms',
    tags: ['input', 'form', 'validation', 'gridify-input'],
    status: 'ready',
    packageName: 'gridify',
    importPath: 'gridify',
    figmaName: 'Input',
    title: text('Input field', 'Input field', 'Input Field'),
    shortDescription: text('Текстовое поле с состояниями validation и размерами.', 'Text input with validation states and sizes.', 'Texteingabe mit Validierungszuständen und Größen.'),
    description: text('GridifyInput покрывает default/hover/focus/filled/disabled/error состояния.', 'GridifyInput covers default/hover/focus/filled/disabled/error states.', 'GridifyInput deckt default/hover/focus/filled/disabled/error ab.'),
    usage: { install, importCode: "import { GridifyInput } from 'gridify';", exampleCode: '<GridifyInput label="Name" placeholder="Enter" required />' },
    docs: {
      overview: text('Input field задаёт единый ритм форм и validation messages.', 'Input field defines consistent form rhythm and validation messages.', 'Input Field definiert konsistenten Formularrhythmus und Validierungsmeldungen.'),
      whenToUse: [text('Ввод коротких текстовых, email, number или password значений.', 'Enter short text, email, number, or password values.', 'Eingabe kurzer Text-, Email-, Number- oder Password-Werte.')],
      features: [text('Есть allStates preview для проверки визуальных состояний.', 'Includes allStates preview for visual state checks.', 'Enthält allStates Preview für visuelle Zustände.')],
      limitations: [text('Не содержит маски ввода и сложного форматирования.', 'Does not include masking or complex formatting.', 'Enthält keine Masken oder komplexe Formatierung.')],
      dataExample: JSON.stringify(inputFieldExample, null, 2),
      logic: text('required/email/number validation выполняется на стороне playground.', 'required/email/number validation runs in the playground.', 'required/email/number Validierung läuft im Playground.'),
      props: [
        prop('label', 'string', false, undefined, text('Подпись поля.', 'Field label.', 'Feldlabel.')),
        prop('value', 'string', false, "''", text('Значение поля.', 'Field value.', 'Feldwert.')),
        prop('state', 'InputState', false, 'default', text('Визуальное состояние.', 'Visual state.', 'Visueller Zustand.')),
        prop('type', "'text' | 'email' | 'number' | 'password'", false, 'text', text('HTML input type.', 'HTML input type.', 'HTML input type.')),
      ],
      errors: [
        errorDoc('REQUIRED_EMPTY', text('Обязательное поле пустое.', 'Required field is empty.', 'Pflichtfeld ist leer.'), text('Введите значение.', 'Enter a value.', 'Geben Sie einen Wert ein.')),
        errorDoc('INVALID_EMAIL', text('Email неверного формата.', 'Email has invalid format.', 'E-Mail-Format ist ungültig.'), text('Используйте корректный email.', 'Use a valid email.', 'Nutzen Sie eine gültige E-Mail.')),
        errorDoc('INVALID_NUMBER', text('Значение не число.', 'Value is not numeric.', 'Wert ist nicht numerisch.'), text('Введите число.', 'Enter a number.', 'Geben Sie eine Zahl ein.')),
      ],
    },
    previewData: { inputField: inputFieldExample },
  },
  {
    slug: 'select-field',
    previewType: 'select-field',
    section: 'forms',
    tags: ['select', 'form', 'dropdown', 'gridify-select'],
    status: 'beta',
    packageName: 'gridify',
    importPath: 'gridify',
    figmaName: 'Select',
    title: text('Select field', 'Select field', 'Select Field'),
    shortDescription: text('Single/search/multiple select с dropdown и chips.', 'Single/search/multiple select with dropdown and chips.', 'Single/Search/Multiple Select mit Dropdown und Chips.'),
    description: text('GridifySelect показывает form-select состояния и доступный dropdown.', 'GridifySelect shows form-select states and an accessible dropdown.', 'GridifySelect zeigt Select-Zustände und ein zugängliches Dropdown.'),
    usage: { install, importCode: "import { GridifySelect } from 'gridify';", exampleCode: '<GridifySelect label="Status" options={options} clearable />' },
    docs: {
      overview: text('Select field поддерживает single, search и multiple режимы.', 'Select field supports single, search, and multiple modes.', 'Select Field unterstützt single, search und multiple.'),
      whenToUse: [text('Выбор одного или нескольких значений из ограниченного списка.', 'Choose one or more values from a bounded list.', 'Ein oder mehrere Werte aus einer begrenzten Liste auswählen.')],
      features: [text('Есть clear button, chips и role=listbox/option.', 'Includes clear button, chips, and role=listbox/option.', 'Enthält Clear Button, Chips und role=listbox/option.')],
      limitations: [text('Dropdown без popper-позиционирования, подходит для демо UI-библиотеки.', 'Dropdown has no popper positioning, suitable for UI-library demos.', 'Dropdown ohne Popper-Positionierung, passend für UI-Library-Demos.')],
      dataExample: JSON.stringify(selectFieldExample, null, 2),
      logic: text('selected value проверяется против options; duplicate values дают warning.', 'selected value is checked against options; duplicate values create warnings.', 'selected value wird gegen options geprüft; doppelte Werte erzeugen Warnungen.'),
      props: [
        prop('options', 'GridifySelectOption[]', true, undefined, text('Список вариантов.', 'Options list.', 'Optionsliste.')),
        prop('mode', "'single' | 'search' | 'multiple'", false, 'single', text('Режим выбора.', 'Selection mode.', 'Auswahlmodus.')),
        prop('clearable', 'boolean', false, 'false', text('Показывает clear control.', 'Shows clear control.', 'Zeigt Clear Control.')),
      ],
      errors: [
        errorDoc('EMPTY_OPTIONS', text('options пустой.', 'options are empty.', 'options sind leer.'), text('Добавьте варианты.', 'Add options.', 'Fügen Sie Optionen hinzu.')),
        errorDoc('UNKNOWN_VALUE', text('value отсутствует в options.', 'value is not present in options.', 'value fehlt in options.'), text('Выберите существующее значение.', 'Choose an existing value.', 'Wählen Sie einen vorhandenen Wert.')),
        errorDoc('DUPLICATE_OPTIONS', text('option values повторяются.', 'option values are duplicated.', 'option values sind doppelt.'), text('Сделайте value уникальными.', 'Make values unique.', 'Machen Sie values eindeutig.')),
      ],
    },
    previewData: { selectField: selectFieldExample },
  },
  {
    slug: 'icon-set',
    previewType: 'icon-set',
    section: 'tokens',
    tags: ['icons', 'status', 'gridify-icons'],
    status: 'ready',
    packageName: 'gridify',
    importPath: 'gridify',
    figmaName: 'Icon Set',
    title: text('Icon set', 'Icon set', 'Icon Set'),
    shortDescription: text('Набор SVG-иконок без внешних зависимостей.', 'SVG icon set without external dependencies.', 'SVG-Iconset ohne externe Abhängigkeiten.'),
    description: text('GridifyIcon покрывает статусные и action-иконки для базовых controls.', 'GridifyIcon covers status and action icons for base controls.', 'GridifyIcon deckt Status- und Action-Icons für Controls ab.'),
    usage: { install, importCode: "import { GridifyIcon, GridifyIconSet } from 'gridify';", exampleCode: '<GridifyIcon name="success" tone="success" label="Completed" />' },
    docs: {
      overview: text('Icon set использует inline SVG paths и tone/variant оформление.', 'Icon set uses inline SVG paths and tone/variant styling.', 'Icon Set nutzt Inline-SVG-Paths und tone/variant Styling.'),
      whenToUse: [text('Статусы, кнопки, select arrows и поиск.', 'Statuses, buttons, select arrows, and search.', 'Status, Buttons, Select-Pfeile und Suche.')],
      features: [text('Поддерживает semantic label или aria-hidden для декоративного режима.', 'Supports semantic label or aria-hidden for decorative use.', 'Unterstützt semantisches Label oder aria-hidden für dekorative Nutzung.')],
      limitations: [text('Набор намеренно маленький, для расширения добавляйте SVG path.', 'The set is intentionally small; extend it by adding SVG paths.', 'Das Set ist bewusst klein; erweitern Sie es mit SVG Paths.')],
      dataExample: JSON.stringify(iconSetExample, null, 2),
      logic: text('Неизвестная иконка fallback на neutral.', 'Unknown icons fall back to neutral.', 'Unbekannte Icons fallen auf neutral zurück.'),
      props: [
        prop('name', 'GridifyIconName', true, undefined, text('Имя иконки.', 'Icon name.', 'Iconname.')),
        prop('tone', 'GridifyIconTone', false, 'neutral', text('Смысловой цвет.', 'Semantic color.', 'Semantische Farbe.')),
        prop('variant', "'solid' | 'soft' | 'outline'", false, 'soft', text('Визуальный стиль.', 'Visual style.', 'Visueller Stil.')),
      ],
      errors: [
        errorDoc('UNKNOWN_ICON', text('Имя иконки неизвестно.', 'Icon name is unknown.', 'Iconname ist unbekannt.'), text('Используется neutral.', 'neutral is used.', 'neutral wird genutzt.')),
        errorDoc('INVALID_SIZE', text('Размер некорректный.', 'Size is invalid.', 'Größe ist ungültig.'), text('Используется 20/md.', '20/md fallback is used.', '20/md Fallback wird genutzt.')),
      ],
    },
    previewData: { iconSet: iconSetExample },
  },
  {
    slug: 'candlestick-chart',
    previewType: 'candlestick',
    section: 'charts',
    tags: ['chart', 'finance', 'ohlc', 'gridify-chart'],
    status: 'in-development',
    packageName: 'gridify',
    importPath: 'gridify',
    figmaName: 'Candlestick Chart',
    lifecycle: {
      readyDate: 'Q2 2026',
      stageNote: text(
        'Компонент проходит финальную настройку API и визуальных состояний.',
        'The component is undergoing final API and visual state tuning.',
        'Die Komponente befindet sich in der finalen Abstimmung von API und visuellen Zuständen.',
      ),
    },
    title: text('Candlestick chart', 'Candlestick chart', 'Candlestick Chart'),
    shortDescription: text('SVG свечная диаграмма для OHLC данных.', 'SVG candlestick chart for OHLC data.', 'SVG Candlestick Chart für OHLC-Daten.'),
    description: text('CandlestickChart показывает open/high/low/close без внешних chart plugins.', 'CandlestickChart shows open/high/low/close without external chart plugins.', 'CandlestickChart zeigt open/high/low/close ohne externe Chart-Plugins.'),
    usage: { install, importCode: "import { CandlestickChart } from 'gridify';", exampleCode: '<CandlestickChart data={ohlcData} height={340} />' },
    docs: {
      overview: text('Свечная диаграмма строится на SVG и адаптируется через viewBox.', 'The candlestick chart is SVG-based and responsive through viewBox.', 'Der Candlestick Chart basiert auf SVG und ist per viewBox responsiv.'),
      whenToUse: [text('Финансовые OHLC ряды, котировки, торговые диапазоны.', 'Financial OHLC series, quotes, and trading ranges.', 'Finanzielle OHLC-Reihen, Kurse und Handelsspannen.')],
      features: [text('up/down/neutral colors, grid, labels и SVG title tooltip.', 'up/down/neutral colors, grid, labels, and SVG title tooltip.', 'up/down/neutral Farben, Grid, Labels und SVG title Tooltip.')],
      limitations: [
        text('Это demo-компонент без zoom/pan и технических индикаторов.', 'This is a demo component without zoom/pan or technical indicators.', 'Dies ist eine Demo-Komponente ohne Zoom/Pan oder technische Indikatoren.'),
        text('Компонент находится в разработке: API и визуальные состояния могут измениться до релиза.', 'The component is in development: API and visual states may change before release.', 'Die Komponente befindet sich in Entwicklung: API und visuelle Zustände können sich vor dem Release ändern.'),
      ],
      dataExample: JSON.stringify(candlestickChartExample, null, 2),
      logic: text('Цвет свечи зависит от close/open; high и low валидируются относительно open/close.', 'Candle color depends on close/open; high and low are validated against open/close.', 'Kerzenfarbe hängt von close/open ab; high und low werden gegen open/close validiert.'),
      props: [
        prop('data', 'CandlestickPoint[]', true, undefined, text('OHLC точки.', 'OHLC points.', 'OHLC-Punkte.')),
        prop('upColor', 'string', false, '#16a34a', text('Цвет растущей свечи.', 'Up candle color.', 'Farbe steigender Kerzen.')),
        prop('downColor', 'string', false, '#dc2626', text('Цвет падающей свечи.', 'Down candle color.', 'Farbe fallender Kerzen.')),
      ],
      errors: [
        errorDoc('EMPTY_DATA', text('data пустой.', 'data is empty.', 'data ist leer.'), text('Добавьте OHLC точки.', 'Add OHLC points.', 'Fügen Sie OHLC-Punkte hinzu.')),
        errorDoc('OHLC_LENGTH_MISMATCH', text('Длины массивов не совпадают.', 'Array lengths do not match.', 'Array-Längen stimmen nicht überein.'), text('Выровняйте labels/open/high/low/close.', 'Align labels/open/high/low/close.', 'Gleichen Sie labels/open/high/low/close an.')),
        errorDoc('HIGH_LOW_INVALID', text('high/low не покрывают open/close.', 'high/low do not contain open/close.', 'high/low umfassen open/close nicht.'), text('Исправьте high и low.', 'Fix high and low.', 'Korrigieren Sie high und low.')),
        errorDoc('INVALID_NUMBER', text('OHLC значение не число.', 'OHLC value is not numeric.', 'OHLC-Wert ist nicht numerisch.'), text('Оставьте только числа.', 'Keep numeric values only.', 'Nutzen Sie nur Zahlen.')),
        errorDoc('INVALID_COLOR', text('Цвет не hex.', 'Color is not hex.', 'Farbe ist kein Hex-Wert.'), text('Используйте #16a34a.', 'Use #16a34a.', 'Nutzen Sie #16a34a.')),
      ],
    },
    previewData: { candlestick: candlestickChartExample },
  },
);

componentRegistry.forEach((item) => {
  if (['bar', 'line', 'forecast', 'scatter', 'radar'].includes(item.previewType)) {
    item.docs.features = [
      ...(item.docs.features ?? []),
      text(
        'Playground поддерживает несколько dataset-ов с label, values/points и color.',
        'The playground supports multiple datasets with label, values/points, and color.',
        'Der Playground unterstützt mehrere Datensätze mit label, values/points und color.',
      ),
    ];
    item.docs.errors = [
      ...(item.docs.errors ?? []),
      errorDoc(
        'DATASET_VALIDATION',
        text('У ряда пустой label, некорректный color или длина values не совпадает с labels.', 'A dataset has an empty label, invalid color, or values length that does not match labels.', 'Ein Datensatz hat leeres Label, ungültige Farbe oder eine values-Länge, die nicht zu labels passt.'),
        text('Заполните label, используйте hex-color и выровняйте длины массивов.', 'Fill the label, use a hex color, and align array lengths.', 'Füllen Sie label, nutzen Sie Hex-Farbe und gleichen Sie Array-Längen an.'),
      ),
    ];
  }

  if (item.previewType === 'radar') {
    item.docs.features = [
      ...(item.docs.features ?? []),
      text('Можно сравнивать Product A / Product B / Product C или любые другие сущности.', 'You can compare Product A / Product B / Product C or any other entities.', 'Sie können Product A / Product B / Product C oder andere Entitäten vergleichen.'),
    ];
    item.docs.props = [
      ...(item.docs.props ?? []),
      prop('datasets', '{ id: string; label: string; values: number[]; color: string }[]', true, undefined, text('Сравниваемые продукты или сущности.', 'Compared products or entities.', 'Verglichene Produkte oder Entitäten.')),
    ];
  }

  if (item.previewType === 'spreadsheet') {
    item.docs.features = [
      ...(item.docs.features ?? []),
      text('Editable-режим показывает вычисленный результат формулы вне активной ячейки и raw formula в активной ячейке.', 'Editable mode shows computed formula results outside the active cell and raw formula in the active cell.', 'Der Editiermodus zeigt berechnete Formelergebnisse außerhalb der aktiven Zelle und die Rohformel in der aktiven Zelle.'),
      text('Формульные ячейки подсвечиваются, ошибки показывают #ERR или #CYCLE.', 'Formula cells are highlighted; errors show #ERR or #CYCLE.', 'Formelzellen werden hervorgehoben; Fehler zeigen #ERR oder #CYCLE.'),
      text('Quick formula panel применяет примеры SUM, AVG, MIN, MAX, COUNT, ROUND, ABS, IF, NPV и PMT.', 'The quick formula panel applies SUM, AVG, MIN, MAX, COUNT, ROUND, ABS, IF, NPV, and PMT examples.', 'Das Quick-Formula-Panel wendet SUM, AVG, MIN, MAX, COUNT, ROUND, ABS, IF, NPV und PMT an.'),
      text('Названия столбцов редактируются прямо в header и попадают в generated code.', 'Column labels are editable in the header and flow into generated code.', 'Spaltennamen sind direkt im Header editierbar und landen im generierten Code.'),
    ];
  }

  if (item.previewType === 'oilgas-form') {
    item.docs.features = [
      ...(item.docs.features ?? []),
      text('Сетка использует стабильные oilgas-field wrappers, risk panel и thresholds для pressure/H2S.', 'The grid uses stable oilgas-field wrappers, risk panel, and pressure/H2S thresholds.', 'Das Grid nutzt stabile oilgas-field Wrapper, Risk Panel und pressure/H2S-Schwellenwerte.'),
    ];
  }
});
