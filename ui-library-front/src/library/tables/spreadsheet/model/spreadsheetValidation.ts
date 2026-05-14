import type { Locale } from '../../../../shared/types/locale';
import { t } from '../../../../shared/lib/i18n';
import type { SpreadsheetData, SpreadsheetMerge, SpreadsheetValidationMessage } from './spreadsheet.types';
import { getColumnLetter } from './cellAddress';
import { createFormulaEvaluationCache } from './formulaEngine';
import { parseNumericInput } from './spreadsheetFormatting';

function cellsForMerge(merge: SpreadsheetMerge) {
  const cells = new Set<string>();
  for (let row = merge.row; row < merge.row + merge.rowSpan; row += 1) {
    for (let col = merge.col; col < merge.col + merge.colSpan; col += 1) {
      cells.add(`${row}:${col}`);
    }
  }
  return cells;
}

function message(level: SpreadsheetValidationMessage['level'], text: string): SpreadsheetValidationMessage {
  return { level, message: text };
}

export function buildSpreadsheetValidation(
  data: SpreadsheetData,
  locale: Locale,
): SpreadsheetValidationMessage[] {
  const messages: SpreadsheetValidationMessage[] = [];
  const formulaCache = createFormulaEvaluationCache(data);

  if (data.columns.length === 0) {
    messages.push(message('error', t({ ru: 'В таблице нет столбцов.', en: 'The table has no columns.', de: 'Die Tabelle hat keine Spalten.' }, locale)));
  }
  if (data.rows.length === 0) {
    messages.push(message('warning', t({ ru: 'В таблице нет строк.', en: 'The table has no rows.', de: 'Die Tabelle hat keine Zeilen.' }, locale)));
  }

  const labelCounts = new Map<string, number>();
  data.columns.forEach((column, index) => {
    const label = column.label.trim();
    if (!label) {
      messages.push(message('warning', t(
        {
          ru: `Столбец ${index + 1}: пустое название будет заменено fallback-значением.`,
          en: `Column ${index + 1}: empty label will be replaced by a fallback value.`,
          de: `Spalte ${index + 1}: Leere Beschriftung wird durch einen Fallback ersetzt.`,
        },
        locale,
      )));
    }
    if (label) labelCounts.set(label.toLowerCase(), (labelCounts.get(label.toLowerCase()) ?? 0) + 1);
  });

  labelCounts.forEach((count, label) => {
    if (count > 1) {
      messages.push(message('warning', t(
        {
          ru: `Название столбца "${label}" повторяется.`,
          en: `Column label "${label}" is duplicated.`,
          de: `Spaltenbeschriftung "${label}" ist doppelt.`,
        },
        locale,
      )));
    }
  });

  data.rows.forEach((row, rowIndex) => {
    if (row.length !== data.columns.length) {
      messages.push(message('error', t(
        {
          ru: `Строка ${rowIndex + 1}: некорректное число ячеек.`,
          en: `Row ${rowIndex + 1}: invalid cell count.`,
          de: `Zeile ${rowIndex + 1}: ungültige Zellanzahl.`,
        },
        locale,
      )));
    }

    row.forEach((cell, colIndex) => {
      const column = data.columns[colIndex];
      if (!column) return;

      const cellName = `${getColumnLetter(colIndex)}${rowIndex + 1}`;

      if (column.type !== 'text' && cell && !cell.startsWith('=')) {
        const value = parseNumericInput(cell, column.type);

        if (value === null) {
          messages.push(message('error', t(
            {
              ru: `Ячейка ${cellName}: ожидается числовое значение.`,
              en: `Cell ${cellName}: numeric value expected.`,
              de: `Zelle ${cellName}: Zahlenwert erwartet.`,
            },
            locale,
          )));
        }

        if (column.type === 'percent' && value !== null && (value < 0 || value > 100)) {
          messages.push(message('error', t(
            {
              ru: `Ячейка ${cellName}: процент должен быть в диапазоне 0-100.`,
              en: `Cell ${cellName}: percent must be within 0-100.`,
              de: `Zelle ${cellName}: Prozentwert muss im Bereich 0-100 liegen.`,
            },
            locale,
          )));
        }
      }

      if (cell.startsWith('=')) {
        const evaluated = formulaCache.evaluateCell(rowIndex, colIndex);
        if (evaluated.error) {
          const reason = evaluated.detail ? ` ${evaluated.detail}` : '';
          messages.push(message('error', t(
            {
              ru: `Ячейка ${cellName}: результат формулы ${evaluated.error}.${reason}`,
              en: `Cell ${cellName}: formula result is ${evaluated.error}.${reason}`,
              de: `Zelle ${cellName}: Formelergebnis ist ${evaluated.error}.${reason}`,
            },
            locale,
          )));
        }
      }
    });
  });

  const occupied = new Map<string, number>();
  (data.merges ?? []).forEach((merge, index) => {
    if (merge.rowSpan < 1 || merge.colSpan < 1) {
      messages.push(message('error', t(
        {
          ru: `Объединение #${index + 1}: недопустимый размер.`,
          en: `Merge #${index + 1}: invalid size.`,
          de: `Zellverbund #${index + 1}: ungültige Größe.`,
        },
        locale,
      )));
    }

    if (
      merge.row + merge.rowSpan > data.rows.length ||
      merge.col + merge.colSpan > data.columns.length
    ) {
      messages.push(message('error', t(
        {
          ru: `Объединение #${index + 1}: выходит за границы таблицы.`,
          en: `Merge #${index + 1}: exceeds table bounds.`,
          de: `Zellverbund #${index + 1}: überschreitet die Tabellengrenzen.`,
        },
        locale,
      )));
    }

    cellsForMerge(merge).forEach((cellKey) => {
      const previous = occupied.get(cellKey);
      if (previous !== undefined) {
        messages.push(message('error', t(
          {
            ru: `Объединение #${index + 1}: пересекается с объединением #${previous + 1}.`,
            en: `Merge #${index + 1}: overlaps merge #${previous + 1}.`,
            de: `Zellverbund #${index + 1}: überschneidet sich mit Zellverbund #${previous + 1}.`,
          },
          locale,
        )));
      }
      occupied.set(cellKey, index);
    });
  });

  return messages;
}
