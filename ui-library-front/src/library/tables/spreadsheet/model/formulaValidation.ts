export function isFormulaRange(value: string) {
  return /^[A-Z]+\d+(?::[A-Z]+\d+)?$/i.test(value);
}
