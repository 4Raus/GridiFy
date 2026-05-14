export type SpreadsheetColumnType = 'text' | 'number' | 'currency' | 'percent';

export type SpreadsheetColumn = {
  key: string;
  label: string;
  type: SpreadsheetColumnType;
};

export type SpreadsheetMerge = {
  row: number;
  col: number;
  rowSpan: number;
  colSpan: number;
};

export type SpreadsheetData = {
  columns: SpreadsheetColumn[];
  rows: string[][];
  merges?: SpreadsheetMerge[];
  title?: string;
};

export type SpreadsheetValidationMessage = {
  level: 'error' | 'warning';
  message: string;
};

export type SpreadsheetViewMode = 'app' | 'spreadsheet';

export type CellPoint = {
  row: number;
  col: number;
};

export type CellRange = {
  startRow: number;
  endRow: number;
  startCol: number;
  endCol: number;
};
