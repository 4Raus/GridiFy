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

В этом разделе показаны основные схемы работы GridiFy: путь пользователя, сценарии использования, внутренняя архитектура, последовательность открытия компонента, жизненный цикл компонента и логическая модель данных каталога.

Диаграммы написаны в формате Mermaid, поэтому они отображаются прямо в GitHub README.

---

### User Way

Диаграмма показывает путь пользователя от открытия главной страницы до выбора компонента, изменения параметров и копирования готового кода.

```mermaid
journey
    title User Way: путь пользователя в GridiFy
    section Знакомство
      Открывает главную страницу: 5: Пользователь
      Изучает назначение библиотеки: 4: Пользователь
      Переходит в каталог компонентов: 5: Пользователь
    section Поиск компонента
      Использует поиск и фильтры: 4: Пользователь
      Открывает карточку компонента: 5: Пользователь
      Переходит на страницу компонента: 5: Пользователь
    section Работа с компонентом
      Просматривает preview: 5: Пользователь
      Меняет параметры в playground: 5: Пользователь
      Проверяет ошибки и состояния: 4: Пользователь
      Изучает props и документацию: 5: Пользователь
    section Использование
      Копирует React TSX или Props JSON: 5: Пользователь
      Использует код в своём проекте: 5: Пользователь
```

---

### Use Case

Диаграмма показывает основные сценарии использования GridiFy текущими пользователями и будущей административной ролью.

```mermaid
flowchart LR
    Visitor["Посетитель"]
    Developer["Разработчик"]
    Designer["Дизайнер"]
    Admin["Администратор<br/>будущее развитие"]

    subgraph System["GridiFy UI Library"]
        UC1["Открыть главную страницу"]
        UC2["Просмотреть каталог"]
        UC3["Искать компонент"]
        UC4["Открыть страницу компонента"]
        UC5["Посмотреть preview"]
        UC6["Изменить параметры"]
        UC7["Изучить документацию"]
        UC8["Скопировать код"]
        UC9["Переключить тему"]
        UC10["Переключить язык"]
        UC11["Создать компонент"]
        UC12["Редактировать metadata"]
        UC13["Опубликовать версию"]
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
    Admin -.-> UC13

    UC4 --> UC5
    UC4 --> UC7
    UC6 --> UC5
    UC7 --> UC8
```

---

### Activity Diagram

Диаграмма описывает процесс открытия страницы компонента: приложение получает `slug`, ищет компонент в registry и отображает preview, playground, code preview и документацию.

```mermaid
flowchart TD
    Start([Старт]) --> OpenPage["Пользователь открывает /library/:slug"]
    OpenPage --> Router["React Router передаёт slug"]
    Router --> FindComponent["getComponentBySlug(slug)"]
    FindComponent --> Decision{"Компонент найден?"}

    Decision -- Да --> LoadMetadata["Загрузить metadata компонента"]
    LoadMetadata --> LoadPreview["Получить previewType и previewData"]
    LoadPreview --> RenderHeader["Показать заголовок, описание, статус и теги"]
    RenderHeader --> RenderPreview["Показать ComponentPreview"]
    RenderPreview --> RenderPlayground["Показать ComponentPlayground"]
    RenderPlayground --> RenderCode["Показать CodePreview"]
    RenderCode --> RenderDocs["Показать ComponentDocs"]

    RenderDocs --> UserChanges{"Пользователь меняет параметры?"}
    UserChanges -- Да --> Validate["Проверить данные playground"]
    Validate --> HasErrors{"Есть ошибки?"}
    HasErrors -- Да --> ShowErrors["Показать ValidationAlert"]
    HasErrors -- Нет --> UpdatePreview["Обновить preview и generated code"]
    ShowErrors --> RenderPlayground
    UpdatePreview --> CopyCode["Пользователь копирует код"]
    UserChanges -- Нет --> CopyCode
    CopyCode --> End([Конец])

    Decision -- Нет --> NotFound["Показать состояние Компонент не найден"]
    NotFound --> BackToCatalog["Предложить вернуться в каталог"]
    BackToCatalog --> End
```

---

### Sequence Diagram

Диаграмма показывает последовательность взаимодействия между пользователем, роутером, registry, preview resolver, playground и генератором кода.

```mermaid
sequenceDiagram
    actor User as Пользователь
    participant Browser as Browser
    participant Router as React Router
    participant Page as ComponentDetailsPage
    participant Registry as Component Registry
    participant Preview as ComponentPreview
    participant Library as Library Component
    participant Playground as ComponentPlayground
    participant Generator as Code Generator
    participant Docs as ComponentDocs

    User->>Browser: Открывает /library/:slug
    Browser->>Router: Передаёт URL
    Router->>Page: Рендерит страницу с slug

    Page->>Registry: getComponentBySlug(slug)
    Registry-->>Page: ComponentRegistryItem

    alt Компонент найден
        Page->>Preview: Передаёт previewType и previewData
        Preview->>Library: Выбирает компонент из src/library
        Library-->>Preview: JSX preview
        Preview-->>Page: Готовый preview block

        Page->>Playground: Передаёт playground state
        Playground-->>Page: Обновлённые параметры

        Page->>Generator: generateComponentCode(item, state)
        Generator-->>Page: React TSX и Props JSON

        Page->>Docs: Передаёт metadata и docs
        Docs-->>Page: Документация компонента

        User->>Playground: Меняет параметры
        Playground-->>Preview: Обновляет preview
        Playground-->>Generator: Обновляет generated code

        User->>Page: Копирует код
    else Компонент не найден
        Page-->>User: Показывает ошибку и ссылку на каталог
    end
```

---

### Component Architecture

Диаграмма показывает целевую архитектуру проекта и разделение ответственности между слоями.

```mermaid
flowchart TB
    subgraph App["src/app"]
        AppRoot["App.tsx"]
        Router["router.tsx"]
        Providers["AppProviders"]
        ThemeProvider["ThemeProvider"]
        LocaleProvider["LocaleProvider"]
    end

    subgraph Pages["src/pages"]
        Landing["LandingPage"]
        Library["LibraryPage"]
        Details["ComponentDetailsPage"]
    end

    subgraph Widgets["src/widgets"]
        Header["AppHeader"]
        CatalogGrid["CatalogGrid"]
        ComponentPreview["ComponentPreview"]
        ComponentDocs["ComponentDocs"]
        ComponentPlayground["ComponentPlayground"]
        CodePreview["CodePreview"]
        StatusOverlay["ComponentStatusOverlay"]
    end

    subgraph Features["src/features"]
        Search["Component Search"]
        CodeGenerator["Code Generator"]
        ChartPlayground["Chart Playground"]
        SpreadsheetPlayground["Spreadsheet Playground"]
        Validation["Validation"]
    end

    subgraph Entities["src/entities"]
        Registry["Component Registry"]
        Types["Component Types"]
        DemoData["Demo Data"]
    end

    subgraph LibraryLayer["src/library"]
        Buttons["Buttons"]
        Inputs["Inputs"]
        Selects["Selects"]
        Tooltips["Tooltip"]
        Icons["Icons"]
        Charts["Charts"]
        Tables["Tables"]
        OilGas["OilGas Form"]
        Feedback["Feedback States"]
    end

    subgraph Shared["src/shared"]
        SharedUI["Shared UI"]
        SharedLib["Shared Lib"]
        SharedTypes["Shared Types"]
        Config["Config"]
    end

    AppRoot --> Router
    AppRoot --> Providers
    Providers --> ThemeProvider
    Providers --> LocaleProvider

    Router --> Landing
    Router --> Library
    Router --> Details

    Landing --> Header
    Library --> CatalogGrid
    Library --> Search
    Library --> Registry

    Details --> Registry
    Details --> ComponentPreview
    Details --> ComponentPlayground
    Details --> CodePreview
    Details --> ComponentDocs
    Details --> StatusOverlay

    ComponentPreview --> Buttons
    ComponentPreview --> Inputs
    ComponentPreview --> Selects
    ComponentPreview --> Tooltips
    ComponentPreview --> Icons
    ComponentPreview --> Charts
    ComponentPreview --> Tables
    ComponentPreview --> OilGas
    ComponentPreview --> Feedback

    ComponentPlayground --> ChartPlayground
    ComponentPlayground --> SpreadsheetPlayground
    CodePreview --> CodeGenerator
    ComponentPlayground --> Validation

    Registry --> Types
    Registry --> DemoData

    Widgets --> Shared
    Features --> Shared
    LibraryLayer --> Shared
```

---

### ERD

Так как первая версия GridiFy реализована без backend и базы данных, ERD показывает логическую модель данных каталога. Сейчас эта модель хранится в TypeScript registry, но в будущем может быть перенесена в backend и БД.

```mermaid
erDiagram
    COMPONENT {
        string slug PK
        string titleRu
        string titleEn
        string titleDe
        string descriptionRu
        string descriptionEn
        string descriptionDe
        string section
        string previewType
        string status
        string packageName
        string importPath
        string figmaName
    }

    COMPONENT_USAGE {
        string id PK
        string componentSlug FK
        string installCommand
        string importCode
        string exampleCode
    }

    COMPONENT_DOCS {
        string id PK
        string componentSlug FK
        string overviewRu
        string overviewEn
        string overviewDe
        string dataExample
        string logicRu
        string logicEn
        string logicDe
    }

    COMPONENT_PROP {
        string id PK
        string componentSlug FK
        string name
        string type
        boolean required
        string defaultValue
        string descriptionRu
        string descriptionEn
        string descriptionDe
    }

    COMPONENT_ERROR {
        string id PK
        string componentSlug FK
        string code
        string reasonRu
        string reasonEn
        string reasonDe
        string fixRu
        string fixEn
        string fixDe
    }

    COMPONENT_TAG {
        string id PK
        string componentSlug FK
        string label
        string tone
    }

    COMPONENT_VERSION {
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

    COMPONENT ||--|| COMPONENT_USAGE : has
    COMPONENT ||--|| COMPONENT_DOCS : has
    COMPONENT ||--o{ COMPONENT_PROP : documents
    COMPONENT ||--o{ COMPONENT_ERROR : validates
    COMPONENT ||--o{ COMPONENT_TAG : marked_by
    COMPONENT ||--o{ COMPONENT_VERSION : may_have
    USER ||--o{ COMPONENT_VERSION : publishes
```

---

### Future Backend Flow

Диаграмма показывает возможное развитие проекта: переход от статического TypeScript registry к backend registry с API, базой данных, админкой и версиями компонентов.

```mermaid
flowchart LR
    subgraph Current["Текущая версия"]
        StaticRegistry["TypeScript Registry"]
        ReactComponents["React Components"]
        StaticDocs["Static Docs"]
    end

    subgraph Future["Будущее развитие"]
        AdminPanel["Admin Panel"]
        API["Backend API"]
        DB["Database"]
        Versions["Component Versions"]
        Analytics["Usage Analytics"]
    end

    subgraph Frontend["GridiFy Frontend"]
        Catalog["Component Catalog"]
        Preview["Live Preview"]
        Playground["Playground"]
        Code["Code Generator"]
    end

    StaticRegistry --> Catalog
    ReactComponents --> Preview
    StaticDocs --> Code

    AdminPanel -.-> API
    API -.-> DB
    DB -.-> Versions
    API -.-> Analytics

    API -.-> Catalog
    API -.-> Playground
    API -.-> Code

    Catalog --> Preview
    Playground --> Preview
    Playground --> Code
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
