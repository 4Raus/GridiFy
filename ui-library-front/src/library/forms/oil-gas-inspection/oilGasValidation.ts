import type { Locale } from '../../../shared/types/locale';
import { t } from '../../../shared/lib/i18n';
import type {
  OilGasInspectionValues,
  OilGasRiskSummary,
  OilGasValidationMessage,
} from './oilGasInspection.types';

export type OilGasThresholds = {
  pressureThreshold: number;
  h2sThreshold: number;
};

function toNumber(value: string) {
  if (!value.trim()) return null;
  if (!/^-?\d+(?:[.,]\d+)?$/.test(value.trim())) return Number.NaN;
  return Number(value.replace(',', '.'));
}

function push(
  result: OilGasValidationMessage[],
  level: 'error' | 'warning',
  message: string,
  field?: keyof OilGasInspectionValues,
) {
  result.push({ level, message, field });
}

export function calculateOilGasRisk(
  values: OilGasInspectionValues,
  locale: Locale,
  thresholds: OilGasThresholds,
): OilGasRiskSummary {
  const reasons: string[] = [];
  const pressure = toNumber(values.pressure);
  const h2s = toNumber(values.h2s);
  const vibration = toNumber(values.vibration);
  let score = 0;

  if (typeof pressure === 'number' && Number.isFinite(pressure)) {
    if (pressure > thresholds.pressureThreshold) {
      score += 2;
      reasons.push(t({ ru: 'давление выше порога', en: 'pressure high', de: 'Druck über Grenzwert' }, locale));
    } else if (pressure > thresholds.pressureThreshold * 0.9) {
      score += 1;
      reasons.push(t({ ru: 'давление близко к порогу', en: 'pressure near threshold', de: 'Druck nahe Grenzwert' }, locale));
    }
  }

  if (typeof h2s === 'number' && Number.isFinite(h2s)) {
    if (h2s > thresholds.h2sThreshold) {
      score += 2;
      reasons.push(t({ ru: 'H₂S выше порога', en: 'h2s threshold exceeded', de: 'H₂S-Grenzwert überschritten' }, locale));
    } else if (h2s > thresholds.h2sThreshold * 0.8) {
      score += 1;
      reasons.push(t({ ru: 'H₂S близко к порогу', en: 'h2s near threshold', de: 'H₂S nahe Grenzwert' }, locale));
    }
  }

  if (typeof vibration === 'number' && Number.isFinite(vibration) && vibration > 10) {
    score += 1;
    reasons.push(t({ ru: 'повышенная вибрация', en: 'high vibration', de: 'erhöhte Vibration' }, locale));
  }

  if (values.leakageDetected) {
    score += 3;
    reasons.push(t({ ru: 'обнаружена утечка', en: 'leakage detected', de: 'Leckage erkannt' }, locale));
  }
  if (!values.emergencyAccessClear) {
    score += 2;
    reasons.push(t({ ru: 'аварийный доступ заблокирован', en: 'emergency access blocked', de: 'Notzugang blockiert' }, locale));
  }
  if (!values.gasDetectorReady) {
    score += 1;
    reasons.push(t({ ru: 'газоанализатор не готов', en: 'gas detector not ready', de: 'Gasdetektor nicht bereit' }, locale));
  }
  if (!values.permitToWorkActive) {
    score += 1;
    reasons.push(t({ ru: 'наряд-допуск не активен', en: 'permit to work is not active', de: 'Arbeitserlaubnis ist nicht aktiv' }, locale));
  }
  if (values.recommendedAction === 'shutdown-required') {
    score += 2;
    reasons.push(t({ ru: 'рекомендована остановка', en: 'shutdown recommended', de: 'Stillstand empfohlen' }, locale));
  }

  if (reasons.length === 0) {
    reasons.push(t({ ru: 'параметры в норме', en: 'parameters are stable', de: 'Parameter sind stabil' }, locale));
  }

  if (score >= 6) return { level: 'critical', reasons };
  if (score >= 4) return { level: 'high', reasons };
  if (score >= 1) return { level: 'medium', reasons };
  return { level: 'low', reasons };
}

export function validateOilGasInspection(
  values: OilGasInspectionValues,
  locale: Locale,
  thresholds: OilGasThresholds,
) {
  const result: OilGasValidationMessage[] = [];
  const pressureValue = toNumber(values.pressure);
  const tempValue = toNumber(values.temperature);
  const flowValue = toNumber(values.flowRate);
  const h2sValue = toNumber(values.h2s);
  const waterCutValue = toNumber(values.waterCut);
  const chokeSizeValue = toNumber(values.chokeSize);
  const vibrationValue = toNumber(values.vibration);
  const risk = calculateOilGasRisk(values, locale, thresholds);

  if (!/^WELL-\d{3,4}$/.test(values.wellId)) {
    push(result, 'error', t({
      ru: 'ID скважины должен иметь формат WELL-204 или WELL-1234.',
      en: 'Well ID must match WELL-204 or WELL-1234.',
      de: 'Die Well-ID muss WELL-204 oder WELL-1234 entsprechen.',
    }, locale), 'wellId');
  }
  if (!values.fieldName.trim()) {
    push(result, 'warning', t({ ru: 'Укажите участок.', en: 'Field name is recommended.', de: 'Feldname wird empfohlen.' }, locale), 'fieldName');
  }
  if (!values.inspector.trim()) {
    push(result, 'warning', t({ ru: 'Укажите инспектора.', en: 'Inspector name is recommended.', de: 'Inspektorname wird empfohlen.' }, locale), 'inspector');
  }

  if (pressureValue === null || Number.isNaN(pressureValue)) {
    push(result, 'error', t({ ru: 'Давление должно быть числом.', en: 'Pressure must be numeric.', de: 'Druck muss numerisch sein.' }, locale), 'pressure');
  } else if (pressureValue < 0) {
    push(result, 'error', t({ ru: 'Давление не может быть отрицательным.', en: 'Pressure cannot be negative.', de: 'Druck darf nicht negativ sein.' }, locale), 'pressure');
  } else if (pressureValue > thresholds.pressureThreshold) {
    push(result, 'warning', t({
      ru: `Давление выше порога ${thresholds.pressureThreshold} бар.`,
      en: `Pressure is above ${thresholds.pressureThreshold} bar threshold.`,
      de: `Druck liegt über dem Grenzwert von ${thresholds.pressureThreshold} bar.`,
    }, locale), 'pressure');
  }

  if (tempValue === null || Number.isNaN(tempValue)) {
    push(result, 'error', t({ ru: 'Температура должна быть числом.', en: 'Temperature must be numeric.', de: 'Temperatur muss numerisch sein.' }, locale), 'temperature');
  } else if (tempValue < -60 || tempValue > 180) {
    push(result, 'error', t({
      ru: 'Температура вне диапазона -60…180 °C.',
      en: 'Temperature is outside -60…180 °C.',
      de: 'Temperatur liegt außerhalb von -60…180 °C.',
    }, locale), 'temperature');
  }

  if (flowValue === null || Number.isNaN(flowValue)) {
    push(result, 'error', t({ ru: 'Дебит должен быть числом.', en: 'Flow rate must be numeric.', de: 'Förderrate muss numerisch sein.' }, locale), 'flowRate');
  } else if (flowValue < 0) {
    push(result, 'error', t({ ru: 'Дебит не может быть отрицательным.', en: 'Flow rate cannot be negative.', de: 'Förderrate darf nicht negativ sein.' }, locale), 'flowRate');
  }

  if (h2sValue === null || Number.isNaN(h2sValue)) {
    push(result, 'error', t({ ru: 'H₂S должен быть числом.', en: 'H₂S must be numeric.', de: 'H₂S muss numerisch sein.' }, locale), 'h2s');
  } else if (h2sValue < 0) {
    push(result, 'error', t({ ru: 'H₂S не может быть отрицательным.', en: 'H₂S cannot be negative.', de: 'H₂S darf nicht negativ sein.' }, locale), 'h2s');
  } else if (h2sValue > thresholds.h2sThreshold) {
    push(result, 'warning', t({
      ru: `H₂S выше порога ${thresholds.h2sThreshold} ppm.`,
      en: `H₂S is above ${thresholds.h2sThreshold} ppm threshold.`,
      de: `H₂S liegt über dem Grenzwert von ${thresholds.h2sThreshold} ppm.`,
    }, locale), 'h2s');
  }

  if (waterCutValue === null || Number.isNaN(waterCutValue) || waterCutValue < 0 || waterCutValue > 100) {
    push(result, 'error', t({ ru: 'Water cut должен быть в диапазоне 0–100%.', en: 'Water cut must be within 0–100%.', de: 'Water Cut muss im Bereich 0–100% liegen.' }, locale), 'waterCut');
  }
  if (chokeSizeValue === null || Number.isNaN(chokeSizeValue) || chokeSizeValue <= 0) {
    push(result, 'error', t({ ru: 'Choke size должен быть положительным числом.', en: 'Choke size must be a positive number.', de: 'Choke Size muss eine positive Zahl sein.' }, locale), 'chokeSize');
  }
  if (vibrationValue === null || Number.isNaN(vibrationValue) || vibrationValue < 0) {
    push(result, 'error', t({ ru: 'Вибрация должна быть неотрицательным числом.', en: 'Vibration must be a non-negative number.', de: 'Vibration muss eine nicht negative Zahl sein.' }, locale), 'vibration');
  }

  if (values.leakageDetected) {
    push(result, 'warning', t({ ru: 'Обнаружена утечка: нужен немедленный контроль.', en: 'Leakage detected: immediate review required.', de: 'Leckage erkannt: sofortige Prüfung erforderlich.' }, locale), 'leakageDetected');
  }
  if (!values.gasDetectorReady) {
    push(result, 'warning', t({ ru: 'Газоанализатор не готов.', en: 'Gas detector is not ready.', de: 'Gasdetektor ist nicht bereit.' }, locale), 'gasDetectorReady');
  }
  if (!values.emergencyAccessClear) {
    push(result, 'warning', t({ ru: 'Аварийный доступ должен быть свободен.', en: 'Emergency access must be clear.', de: 'Notzugang muss frei sein.' }, locale), 'emergencyAccessClear');
  }
  if (values.recommendedAction === 'shutdown-required' && risk.level !== 'high' && risk.level !== 'critical') {
    push(result, 'warning', t({
      ru: 'Для shutdown-required риск должен быть high или critical.',
      en: 'shutdown-required should correspond to high or critical risk.',
      de: 'shutdown-required sollte zu hohem oder kritischem Risiko passen.',
    }, locale), 'recommendedAction');
  }

  return result;
}
