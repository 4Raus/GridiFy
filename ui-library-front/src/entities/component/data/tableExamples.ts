import type { SpreadsheetData } from '../../../library/tables/spreadsheet/model/spreadsheet.types';

export const spreadsheetData: SpreadsheetData = {
  title: 'Quarter P&L',
  columns: [
    { key: 'metric', label: 'Metric', type: 'text' },
    { key: 'q1', label: 'Q1', type: 'currency' },
    { key: 'q2', label: 'Q2', type: 'currency' },
    { key: 'q3', label: 'Q3', type: 'currency' },
    { key: 'margin', label: 'Margin %', type: 'percent' },
  ],
  rows: [
    ['Revenue', '180000', '210000', '245000', '24'],
    ['Cost', '82000', '94000', '108000', '13'],
    ['Profit', '=SUM(B1:D1)', '=SUM(B2:D2)', '137000', '31'],
    ['Forecast', '190000', '220000', '=MAX(B1:C1)', '26'],
  ],
  merges: [],
};

export const financialSpreadsheetData: SpreadsheetData = {
  title: 'Cash flow monitor',
  columns: [
    { key: 'item', label: 'Item', type: 'text' },
    { key: 'plan', label: 'Plan', type: 'currency' },
    { key: 'fact', label: 'Fact', type: 'currency' },
    { key: 'delta', label: 'Delta', type: 'currency' },
    { key: 'completion', label: 'Completion', type: 'percent' },
  ],
  rows: [
    ['Payroll', '44000', '43200', '-800', '98'],
    ['Infra', '18000', '20100', '2100', '112'],
    ['Marketing', '24000', '23600', '-400', '98'],
    ['Reserve', '=SUM(B1:B3)', '=SUM(C1:C3)', '=SUM(D1:D3)', '96'],
  ],
  merges: [],
};
