<div align="center">

# ◆ GridiFy

### UI-библиотека и документационная платформа для бизнес-интерфейсов

**GridiFy** — frontend-only платформа компонентов для корпоративных, аналитических, финансовых и отраслевых веб-сервисов.
Проект объединяет каталог UI-компонентов, live-preview, playground, генерацию кода, документацию, дизайн-токены и подготовленную архитектуру для дальнейшего масштабирования.

<br />

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge\&logo=react\&logoColor=111827)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)](https://vite.dev/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.5-FF6384?style=for-the-badge\&logo=chartdotjs\&logoColor=white)](https://www.chartjs.org/)

</div>

---

## Содержание

* [О проекте](#о-проекте)
* [Для кого предназначен GridiFy](#для-кого-предназначен-gridify)
* [Бизнес-ценность](#бизнес-ценность)
* [Возможности первой версии](#возможности-первой-версии)
* [Компоненты](#компоненты)
* [Архитектура](#архитектура)
* [Дизайн-система](#дизайн-система)
* [Установка и запуск](#установка-и-запуск)
* [Структура проекта](#структура-проекта)
* [Сценарий использования и архитектурные схемы](#Сценарий-использования-и-архитектурные-схемы)
* [Документация и схемы](#документация-и-схемы)
* [Проблемы и решения](#проблемы-и-решения)
* [Дальнейшее развитие](#дальнейшее-развитие)
* [Команда и контакты](#команда-и-контакты)

---

## О проекте

**GridiFy** — это демонстрационная и инженерная основа UI-библиотеки для бизнес-приложений.

Проект решает задачу систематизации интерфейсных компонентов: вместо разрозненных кнопок, таблиц, графиков и форм GridiFy предоставляет единый каталог с описанием, live-preview, изменяемыми параметрами и автоматически генерируемым примером кода.

На текущем этапе GridiFy реализован как **frontend-only приложение**. Это означает, что проект не требует backend, базы данных, авторизации или отдельной серверной инфраструктуры. Все компоненты, данные для демонстрации и документация хранятся в коде приложения.

Ключевая инженерная идея проекта:

```txt
Components as code.
Registry as metadata.
Preview as resolver.
Docs as structured content.
```

На русском:

```txt
Компоненты хранятся как код.
Каталог хранится как metadata.
Preview строится через resolver.
Документация хранится структурированно.
```

Такой подход позволяет быстро развивать первую версию библиотеки и при этом сохранить возможность дальнейшего перехода к backend registry, базе данных, админке, версионированию и публикации пакета.

---

## Для кого предназначен GridiFy

GridiFy рассчитан на команды, которые создают интерфейсы для бизнес-систем:

| Аудитория                           | Польза                                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------------------------ |
| Frontend-разработчики               | Быстро берут готовые компоненты, видят props, примеры кода и ошибки использования                |
| UI/UX-дизайнеры                     | Проверяют состояния компонентов, визуальную консистентность и поведение при изменении параметров |
| Бизнес-аналитики                    | Видят, какие интерфейсные блоки уже доступны для проектирования бизнес-сценариев                 |
| Команды корпоративной разработки    | Сокращают повторную разработку типовых элементов интерфейса                                      |
| Продуктовые команды                 | Быстрее собирают прототипы, MVP и внутренние панели управления                                   |
| Образовательные и дипломные проекты | Получают пример инженерно оформленной frontend-платформы компонентов                             |

---

## Бизнес-ценность

GridiFy ориентирован не только на визуальную демонстрацию UI-компонентов, но и на снижение повторной работы в командах разработки.

Проблема, которую решает библиотека:

* одни и те же кнопки, поля, таблицы и графики повторно реализуются в разных проектах;
* документация компонентов часто отсутствует или устаревает;
* разработчики тратят время на подбор состояний, цветов, отступов и вариантов отображения;
* дизайнерские решения сложно переносить в код без расхождений;
* компоненты развиваются хаотично и не имеют единого жизненного цикла.

### Оценочная модель экономии

GridiFy не заявляет гарантированную экономию, но позволяет оценить потенциальный эффект через повторяемые UI-задачи.

Пример расчёта:

```txt
Экономия времени в месяц =
Количество разработчиков × Часы в месяц × Доля UI-задач × Ожидаемое снижение повторной работы
```

Пример для небольшой команды:

| Показатель                                  |        Значение |
| ------------------------------------------- | --------------: |
| Frontend-разработчики                       |               3 |
| Рабочие часы на человека в месяц            |             160 |
| Доля задач, связанных с UI                  |             30% |
| Консервативное снижение повторной UI-работы |             20% |
| Потенциальная экономия                      | 28,8 часа/месяц |

Формула:

```txt
3 × 160 × 0.30 × 0.20 = 28.8 часа/месяц
```

Эта модель показывает не прибыль напрямую, а высвобождение времени команды за счёт переиспользования компонентов, документации и единого набора правил.

---

## Возможности первой версии

В первой версии GridiFy реализованы:

* каталог компонентов;
* live-preview компонентов;
* playground для изменения параметров;
* генерация React TSX-кода;
* генерация Props JSON;
* копирование кода по клику;
* документация компонентов;
* статусы жизненного цикла компонентов;
* цветные теги и группировка;
* поддержка трёх языков: RU / EN / DE;
* светлая и тёмная тема;
* адаптивное отображение;
* компонентные страницы в стиле документации UI-библиотек;
* графики и диаграммы на основе Chart.js и SVG;
* табличные компоненты с формулами;
* отраслевой Oil & Gas компонент;
* frontend-only архитектура без backend.

---

## Компоненты

### Базовые компоненты

| Компонент             | Назначение                                                             |
| --------------------- | ---------------------------------------------------------------------- |
| Buttons               | Базовые кнопки с вариантами, размерами и состояниями                   |
| GridiFy Action Button | Расширенная кнопка с опциональным brand-prefix                         |
| Input Field           | Поля ввода с состояниями default, focus, filled, disabled, error       |
| Select Field          | Single, searchable и multiple select с options и validation            |
| Tooltip               | Всплывающие подсказки с light/dark темой и разными placement           |
| Icon Set              | Набор SVG-иконок для статусов, действий и интерфейсных элементов       |
| Feedback States       | Компонент отображения статусов: info, warning, error, success, neutral |

### Таблицы

| Компонент                | Назначение                                                                 |
| ------------------------ | -------------------------------------------------------------------------- |
| Spreadsheet Table        | Таблица с координатами, редактированием, формулами и выделением диапазонов |
| Financial Planning Table | Таблица для финансового планирования и демонстрации расчётных сценариев    |

### Графики и диаграммы

| Компонент         | Назначение                                                       |
| ----------------- | ---------------------------------------------------------------- |
| Grouped Bar Chart | Сравнение нескольких сущностей по категориям                     |
| Line Chart        | Отображение динамики и трендов                                   |
| Forecast Chart    | Сравнение фактических и прогнозных значений                      |
| Radar Chart       | Сравнение нескольких продуктов или сущностей по набору критериев |
| Scatter Plot      | Точечная диаграмма для анализа распределения                     |
| Pie / Donut Chart | Долевое распределение значений                                   |
| Candlestick Chart | Свечная диаграмма для OHLC-данных                                |

### Отраслевые компоненты

| Компонент                 | Назначение                                                       |
| ------------------------- | ---------------------------------------------------------------- |
| Oil & Gas Inspection Form | Форма инспекции скважины с параметрами, checklist и risk summary |

---

## Архитектура

GridiFy построен как frontend-only component platform.

```txt
src/
  app/          # запуск приложения, router, providers, глобальные стили
  pages/        # страницы: landing, library, component details
  widgets/      # крупные UI-блоки страниц
  features/     # пользовательские сценарии: playground, search, code generation
  entities/     # registry компонентов, metadata, типы и demo data
  library/      # реальные UI-компоненты библиотеки
  shared/       # общие утилиты, типы, UI-примитивы и config
```

### Принцип разделения

| Слой       | Ответственность                                                      |
| ---------- | -------------------------------------------------------------------- |
| `app`      | Подключение провайдеров, маршрутизация, глобальная конфигурация      |
| `pages`    | Сборка страниц из widgets/features/entities                          |
| `widgets`  | Крупные блоки интерфейса: preview, docs, code block, catalog         |
| `features` | Логика действий пользователя: playground, генерация кода, validation |
| `entities` | Модель компонента, registry, demo data                               |
| `library`  | Реальные React-компоненты                                            |
| `shared`   | Переиспользуемые утилиты, типы, маленькие UI-блоки                   |

---

## Дизайн-система

GridiFy строится на собственной системе дизайн-токенов.

В основу заложены:

* семантическая цветовая система;
* светлая и тёмная тема;
* Open Sans как основной шрифт;
* модульная сетка 8px;
* типографические роли;
* радиусы;
* тени;
* состояния focus, error, success;
* utility-классы для фонов, текста, границ и поверхностей.

### Цветовые роли

```txt
Default
Primary
Secondary
Info
Success
Warning
Error
```

Каждая роль имеет набор оттенков от `dark-2` до `light-4`.

### Типографика

```txt
font-family: Open Sans
base font size: 14px
spacing unit: 8px
heading scale: 18px / 20px / 24px / 32px
```

### Радиусы

```txt
none: 0px
sm: 2px
md: 4px
lg: 8px
xl: 16px
2xl: 24px
full: 999px
```

### Тени

```txt
shadow-sm
shadow-md
shadow-lg
shadow-xl
shadow-2xl
shadow-focus
shadow-error
shadow-success
```

Эта система позволяет делать интерфейс визуально консистентным: кнопки, поля, таблицы, подсказки, карточки, теги и графики используют общие правила цвета, отступов и состояний.

---

## Установка и запуск

### Требования

Перед запуском должны быть установлены:

```txt
Node.js
npm
Git
```

Рекомендуется использовать актуальную LTS-версию Node.js.

### Клонирование проекта

```bash
git clone https://github.com/4Raus/GridiFy.git
cd GridiFy/ui-library-front
```

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

После запуска Vite покажет локальный адрес, обычно:

```txt
http://localhost:5173
```

### Проверка TypeScript

```bash
npm run typecheck
```

### Сборка проекта

```bash
npm run build
```

### Предпросмотр production-сборки

```bash
npm run preview
```

---

## Структура проекта

```txt
GridiFy/
  ui-library-front/
    public/
    src/
      app/
      entities/
      features/
      library/
      pages/
      shared/
      widgets/
    index.html
    package.json
    package-lock.json
    vite.config.ts
    tsconfig.json
    eslint.config.js
```

### Основные файлы

| Файл / папка                                               | Назначение                       |
| ---------------------------------------------------------- | -------------------------------- |
| `src/entities/component/model/componentRegistry.ts`        | Registry компонентов             |
| `src/widgets/component-preview/ComponentPreview.tsx`       | Resolver preview-компонентов     |
| `src/widgets/component-docs/ComponentDocs.tsx`             | Документация компонента          |
| `src/widgets/component-playground/ComponentPlayground.tsx` | Панель изменения параметров      |
| `src/widgets/code-preview/CodePreview.tsx`                 | Блок live-кода                   |
| `src/features/code-generator/`                             | Генерация React TSX и Props JSON |
| `src/library/`                                             | Реальные компоненты библиотеки   |

---

## Сценарий использования и архитектурные схемы

В этом разделе показаны основные схемы работы GridiFy: путь пользователя, сценарии использования, архитектура проекта, последовательность открытия компонента, жизненный цикл компонента и логическая модель каталога.

Диаграммы написаны в формате Mermaid, поэтому они отображаются прямо в GitHub README.

---

### User Way

Диаграмма показывает общий путь пользователя: от входа на сайт до выбора компонента, настройки параметров и копирования кода.

```mermaid
flowchart TD
    A["Главная страница"] --> B["Каталог<br/>компонентов"]
    B --> C["Поиск<br/>и фильтры"]
    C --> D["Карточка<br/>компонента"]
    D --> E["Страница<br/>компонента"]

    E --> F["Preview"]
    E --> G["Playground"]
    E --> H["Docs"]
    E --> I["Code"]

    G --> J["Изменение<br/>параметров"]
    J --> K["Проверка<br/>ошибок"]
    K --> L["Обновление<br/>preview"]
    L --> M["Обновление<br/>кода"]

    I --> N["Copy<br/>React TSX"]
    I --> O["Copy<br/>Props JSON"]

    N --> P["Использование<br/>в проекте"]
    O --> P
```

---

### Use Case

Диаграмма показывает основные сценарии использования GridiFy для разных типов пользователей.

```mermaid
flowchart LR
    Visitor["Посетитель"]
    Developer["Разработчик"]
    Designer["Дизайнер"]
    Admin["Администратор<br/>будущее"]

    subgraph G["GridiFy"]
        UC1["Открыть<br/>главную"]
        UC2["Смотреть<br/>каталог"]
        UC3["Искать<br/>компонент"]
        UC4["Открыть<br/>компонент"]
        UC5["Смотреть<br/>preview"]
        UC6["Менять<br/>параметры"]
        UC7["Читать<br/>docs"]
        UC8["Копировать<br/>код"]
        UC9["Сменить<br/>тему"]
        UC10["Сменить<br/>язык"]
        UC11["Создать<br/>компонент"]
        UC12["Опубликовать<br/>версию"]
    end

    Visitor --> UC1
    Visitor --> UC2
    Visitor --> UC3
    Visitor --> UC4
    Visitor --> UC5
    Visitor --> UC9
    Visitor --> UC10

    Developer --> UC6
    Developer --> UC7
    Developer --> UC8

    Designer --> UC5
    Designer --> UC7
    Designer --> UC9

    Admin -.-> UC11
    Admin -.-> UC12
```

---

### Activity Diagram

Диаграмма показывает процесс открытия страницы компонента.

```mermaid
flowchart TD
    Start([Start]) --> A["Открыть<br/>/library/:slug"]
    A --> B["Получить<br/>slug"]
    B --> C["Найти компонент<br/>в registry"]
    C --> D{"Найден?"}

    D -- "Да" --> E["Загрузить<br/>metadata"]
    E --> F["Загрузить<br/>previewData"]
    F --> G["Показать<br/>header"]
    G --> H["Показать<br/>preview"]
    H --> I["Показать<br/>playground"]
    I --> J["Показать<br/>code"]
    J --> K["Показать<br/>docs"]

    K --> L{"Параметры<br/>изменены?"}
    L -- "Да" --> M["Validation"]
    M --> N{"Есть<br/>ошибки?"}

    N -- "Да" --> O["Показать<br/>alert"]
    O --> I

    N -- "Нет" --> P["Обновить<br/>preview"]
    P --> Q["Обновить<br/>code"]
    Q --> R["Copy code"]
    L -- "Нет" --> R

    D -- "Нет" --> S["Компонент<br/>не найден"]
    S --> T["Назад<br/>в каталог"]

    R --> End([End])
    T --> End
```

---

### Sequence Diagram

Диаграмма показывает, как страница компонента получает данные, строит preview и обновляет код при изменении параметров.

```mermaid
sequenceDiagram
    actor U as User
    participant R as Router
    participant P as Page
    participant Reg as Registry
    participant Prev as Preview
    participant Lib as Library
    participant Play as Playground
    participant Gen as Generator
    participant Docs as Docs

    U->>R: open /library/:slug
    R->>P: pass slug
    P->>Reg: getComponent(slug)
    Reg-->>P: component item

    alt found
        P->>Prev: previewType + data
        Prev->>Lib: select component
        Lib-->>Prev: render UI
        Prev-->>P: preview block

        P->>Play: state + controls
        Play-->>P: updated state

        P->>Gen: generate code
        Gen-->>P: TSX + JSON

        P->>Docs: metadata
        Docs-->>P: docs block

        U->>Play: change props
        Play-->>Prev: update preview
        Play-->>Gen: update code
        U->>P: copy code
    else not found
        P-->>U: show not found
    end
```

---

### Component Architecture

Диаграмма показывает целевую архитектуру проекта и разделение ответственности между слоями.

```mermaid
flowchart TB
    subgraph A["app"]
        A1["App"]
        A2["Router"]
        A3["Providers"]
    end

    subgraph P["pages"]
        P1["Landing"]
        P2["Library"]
        P3["Details"]
    end

    subgraph W["widgets"]
        W1["Header"]
        W2["Catalog"]
        W3["Preview"]
        W4["Playground"]
        W5["Code"]
        W6["Docs"]
        W7["Status<br/>Overlay"]
    end

    subgraph F["features"]
        F1["Search"]
        F2["Validation"]
        F3["Code<br/>Generator"]
        F4["Chart<br/>Playground"]
        F5["Table<br/>Playground"]
    end

    subgraph E["entities"]
        E1["Registry"]
        E2["Types"]
        E3["Demo<br/>Data"]
    end

    subgraph L["library"]
        L1["Buttons"]
        L2["Inputs"]
        L3["Selects"]
        L4["Tooltip"]
        L5["Icons"]
        L6["Charts"]
        L7["Tables"]
        L8["OilGas"]
        L9["Feedback"]
    end

    subgraph S["shared"]
        S1["UI"]
        S2["Lib"]
        S3["Types"]
        S4["Config"]
    end

    A1 --> A2
    A1 --> A3

    A2 --> P1
    A2 --> P2
    A2 --> P3

    P1 --> W1
    P2 --> W2
    P2 --> F1
    P2 --> E1

    P3 --> E1
    P3 --> W3
    P3 --> W4
    P3 --> W5
    P3 --> W6
    P3 --> W7

    W3 --> L1
    W3 --> L2
    W3 --> L3
    W3 --> L4
    W3 --> L5
    W3 --> L6
    W3 --> L7
    W3 --> L8
    W3 --> L9

    W4 --> F2
    W4 --> F4
    W4 --> F5
    W5 --> F3

    E1 --> E2
    E1 --> E3

    W --> S
    F --> S
    L --> S
```

---

### State Machine

Диаграмма показывает жизненный цикл компонента в каталоге.

```mermaid
stateDiagram-v2
    [*] --> Planned
    Planned --> Development
    Development --> Review
    Review --> Beta
    Review --> Development
    Beta --> Ready
    Ready --> Deprecated
    Deprecated --> Removed
    Deprecated --> Development

    Planned: Planned
    Development: In development
    Review: In review
    Beta: Beta
    Ready: Ready
    Deprecated: Deprecated
    Removed: Removed
```

Статусы используются для отображения готовности компонента в каталоге:

| Статус           | Значение                                    |
| ---------------- | ------------------------------------------- |
| `ready`          | Компонент готов к использованию             |
| `beta`           | Компонент доступен, но API может уточняться |
| `in-development` | Компонент находится в разработке            |
| `review`         | Компонент проходит проверку                 |
| `planned`        | Компонент запланирован                      |
| `deprecated`     | Компонент устаревает                        |

---

### ERD

Так как первая версия GridiFy реализована без backend и базы данных, ERD показывает логическую модель каталога. Сейчас эта модель хранится в TypeScript registry, но в будущем может быть перенесена в backend и БД.

```mermaid
erDiagram
    COMPONENT {
        string slug PK
        string title
        string description
        string section
        string previewType
        string status
        string packageName
        string importPath
    }

    USAGE {
        string id PK
        string componentSlug FK
        string installCommand
        string importCode
        string exampleCode
    }

    DOCS {
        string id PK
        string componentSlug FK
        string overview
        string dataExample
        string logic
    }

    PROP {
        string id PK
        string componentSlug FK
        string name
        string type
        boolean required
        string defaultValue
        string description
    }

    ERROR_STATE {
        string id PK
        string componentSlug FK
        string code
        string reason
        string fix
    }

    TAG {
        string id PK
        string componentSlug FK
        string label
        string tone
    }

    VERSION {
        string id PK
        string componentSlug FK
        string version
        string changelog
        datetime createdAt
        datetime publishedAt
    }

    USER {
        string id PK
        string name
        string email
        string role
    }

    COMPONENT ||--|| USAGE : has
    COMPONENT ||--|| DOCS : has
    COMPONENT ||--o{ PROP : props
    COMPONENT ||--o{ ERROR_STATE : errors
    COMPONENT ||--o{ TAG : tags
    COMPONENT ||--o{ VERSION : versions
    USER ||--o{ VERSION : publishes
```

---

### Future Backend Flow

Диаграмма показывает возможное развитие проекта: переход от статического TypeScript registry к backend registry, базе данных, админке и аналитике.

```mermaid
flowchart LR
    subgraph C["Current"]
        C1["TS<br/>Registry"]
        C2["React<br/>Components"]
        C3["Static<br/>Docs"]
    end

    subgraph FE["Frontend"]
        F1["Catalog"]
        F2["Preview"]
        F3["Playground"]
        F4["Code<br/>Generator"]
    end

    subgraph BE["Future Backend"]
        B1["Admin<br/>Panel"]
        B2["API"]
        B3["Database"]
        B4["Versions"]
        B5["Analytics"]
    end

    C1 --> F1
    C2 --> F2
    C3 --> F4

    F1 --> F2
    F3 --> F2
    F3 --> F4

    B1 -.-> B2
    B2 -.-> B3
    B3 -.-> B4
    B2 -.-> B5

    B2 -.-> F1
    B2 -.-> F3
    B2 -.-> F4
```


---

## Документация и схемы

Рекомендуемая структура документации:

```txt
docs/
  architecture/
    component-architecture.puml
    user-way.puml
    use-case.puml
    sequence.puml
    activity.puml
    state-machine.puml
    erd.puml
  decisions/
    frontend-only.md
    registry-as-metadata.md
    future-backend.md
  screenshots/
    landing.png
    catalog.png
    component-page.png
```

### Что стоит добавить в будущем

| Документ                  | Назначение                                                        |
| ------------------------- | ----------------------------------------------------------------- |
| `frontend-only.md`        | Почему первая версия реализована без backend                      |
| `registry-as-metadata.md` | Почему компоненты хранятся как код, а registry как metadata       |
| `future-backend.md`       | Как будет устроено масштабирование                                |
| `component-lifecycle.md`  | Статусы компонентов: ready, beta, review, in-development, planned |

---

## Проблемы и решения

### 1. `npm install` падает

Решение:

```bash
rm -rf node_modules package-lock.json
npm install
```

Если `package-lock.json` нужен для фиксации версий, после успешной установки его можно оставить и закоммитить.

### 2. `npm run build` падает из-за `node_modules`

Иногда после переноса архива или работы на другой системе могут ломаться native/optional зависимости.

Решение:

```bash
rm -rf node_modules
npm install
npm run build
```

### 3. `vite: Permission denied` или `eslint: Permission denied`

Часто возникает после переноса проекта архивом между системами.

Решение для Linux/macOS:

```bash
chmod +x node_modules/.bin/vite
chmod +x node_modules/.bin/eslint
```

Или полностью переустановить зависимости:

```bash
rm -rf node_modules
npm install
```

### 4. Порт Vite занят

Запустить на другом порту:

```bash
npm run dev -- --port 5174
```

### 5. TypeScript-ошибки после изменения registry

Проверить:

```bash
npm run typecheck
```

Чаще всего ошибка связана с тем, что для нового компонента не заполнены:

```txt
title
description
previewType
usage
docs
previewData
```

---

## Дальнейшее развитие

GridiFy первой версии — это frontend-only библиотека и документационная платформа.

Дальнейшее развитие предполагает переход к полноценной component platform.

### Этап 1. Текущая версия

```txt
Frontend-only
Static TypeScript registry
React components as code
Live preview
Playground
Docs
Code generation
```

### Этап 2. Пакетная поставка

```txt
npm package
export public components
semantic versioning
changelog
storybook-like examples
```

### Этап 3. Backend registry

В будущем registry можно вынести в backend.

Предполагаемая backend-структура:

```txt
API
  GET /components
  GET /components/:slug
  POST /admin/components
  PATCH /admin/components/:id
  POST /admin/components/:id/publish

Database
  components
  component_versions
  component_docs
  component_props
  component_examples
  users
  roles
```

Backend не должен хранить исполняемый TSX-код как основной источник компонента. Реальные компоненты должны оставаться в npm-пакете или репозитории, а backend должен хранить metadata:

```txt
slug
title
description
status
version
tags
props
docs
examples
preview data
changelog
```

### Этап 4. Админка и роли

```txt
Admin
Maintainer
Designer
Developer
Viewer
```

Возможности:

* создание карточки компонента;
* редактирование документации;
* изменение статуса;
* добавление props;
* публикация новой версии;
* просмотр истории изменений.

### Этап 5. Аналитика использования

```txt
component views
copy code events
popular components
deprecated component usage
search queries
```

Эта аналитика позволит понимать, какие компоненты действительно используются, какие требуют доработки и какие стоит развивать в первую очередь.

---

## Roadmap

| Этап                  | Статус  | Описание                             |
| --------------------- | ------- | ------------------------------------ |
| Каталог компонентов   | Done    | Реализован каталог с карточками      |
| Component preview     | Done    | Реализовано интерактивное preview    |
| Playground            | Done    | Параметры компонентов можно менять   |
| Code generation       | Done    | Генерация React TSX и Props JSON     |
| RU / EN / DE          | Done    | Добавлена локализация                |
| Design tokens         | Done    | Цвета, типографика, радиусы, тени    |
| Таблицы с формулами   | Beta    | Реализованы формулы и редактирование |
| Отраслевые компоненты | Review  | Добавлен Oil & Gas сценарий          |
| npm package           | Planned | Подготовка публичного пакета         |
| Backend registry      | Planned | API, DB, админка, версии             |
| Analytics             | Planned | Метрики использования компонентов    |

---

## Figma

Дизайн и визуальные референсы проекта:

```txt
Figma: https://www.figma.com/design/4cHJUxz5OpwfRlk2AJGepN/Diplome
```

---

## Команда и контакты

GridiFy разрабатывается как учебный, исследовательский и инженерный проект, направленный на создание масштабируемой UI-библиотеки для бизнес-интерфейсов.

### Контакты

```txt
Authors / Team: Александра и Анастасия
Telegram: @whatdouwantm и @barllley
GitHub: https://github.com/4Raus и https://github.com/barllley
```

### Для связи

Если вы хотите предложить улучшение, сообщить об ошибке или обсудить развитие проекта, используйте:

```txt
GitHub Issues: https://github.com/4Raus/GridiFy/issues
```

---

## Лицензия

```txt
All rights reserved until the public package release.
```

---

<div align="center">

**GridiFy**
Reusable UI components for business interfaces.

</div>
