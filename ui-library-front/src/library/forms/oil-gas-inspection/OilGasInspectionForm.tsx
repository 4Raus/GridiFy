import { useMemo, useState } from 'react';
import ValidationAlert from '../../feedback/ValidationAlert';
import { oilGasInspectionScenarios } from '../../../entities/component/data/oilGasExamples';
import { calculateOilGasRisk, validateOilGasInspection } from './oilGasValidation';
import type {
  OilGasInspectionMode,
  OilGasInspectionScenario,
  OilGasInspectionValues,
  OilGasRecommendedAction,
  OilGasValidationMessage,
} from './oilGasInspection.types';
import type { Locale } from '../../../shared/types/locale';
import { t } from '../../../shared/lib/i18n';
import './OilGasInspectionForm.css';

type OilGasInspectionFormProps = {
  locale?: Locale;
  scenario?: OilGasInspectionScenario;
  mode?: OilGasInspectionMode;
  pressureThreshold?: number;
  h2sThreshold?: number;
  showChecklist?: boolean;
  showRiskPanel?: boolean;
  readonly?: boolean;
};

const recommendedActions: OilGasRecommendedAction[] = [
  'continue-operation',
  'monitor',
  'maintenance-required',
  'shutdown-required',
];

function actionLabel(action: OilGasRecommendedAction, locale: Locale) {
  const labels: Record<OilGasRecommendedAction, Record<Locale, string>> = {
    'continue-operation': { ru: 'Продолжить работу', en: 'Continue operation', de: 'Betrieb fortsetzen' },
    monitor: { ru: 'Наблюдать', en: 'Monitor', de: 'Überwachen' },
    'maintenance-required': { ru: 'Требуется обслуживание', en: 'Maintenance required', de: 'Wartung erforderlich' },
    'shutdown-required': { ru: 'Требуется остановка', en: 'Shutdown required', de: 'Stillstand erforderlich' },
  };
  return labels[action][locale];
}

function fieldMessages(messages: OilGasValidationMessage[], field: keyof OilGasInspectionValues) {
  return messages.filter((message) => message.field === field);
}

function FieldMessage({ messages }: { messages: OilGasValidationMessage[] }) {
  return (
    <span className="oilgas-field__message">
      {messages.map((message) => message.message).join(' ')}
    </span>
  );
}

export default function OilGasInspectionForm({
  locale = 'ru',
  scenario = 'normal',
  mode = 'detailed',
  pressureThreshold = 190,
  h2sThreshold = 10,
  showChecklist = true,
  showRiskPanel = true,
  readonly = false,
}: OilGasInspectionFormProps) {
  const [values, setValues] = useState<OilGasInspectionValues>(() => ({
    ...oilGasInspectionScenarios[scenario],
  }));

  const thresholds = useMemo(() => ({ pressureThreshold, h2sThreshold }), [h2sThreshold, pressureThreshold]);
  const validation = useMemo(
    () => validateOilGasInspection(values, locale, thresholds),
    [locale, thresholds, values],
  );
  const risk = useMemo(
    () => calculateOilGasRisk(values, locale, thresholds),
    [locale, thresholds, values],
  );
  const errors = validation.filter((message) => message.level === 'error');
  const warnings = validation.filter((message) => message.level === 'warning');

  const setField = <Field extends keyof OilGasInspectionValues>(
    field: Field,
    value: OilGasInspectionValues[Field],
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const inputProps = { readOnly: readonly };
  const selectProps = { disabled: readonly };

  return (
    <div className={`oilgas-form oilgas-form--${mode}`}>
      <ValidationAlert
        title={t({ ru: 'Ошибки заполнения', en: 'Input errors', de: 'Eingabefehler' }, locale)}
        messages={errors.map((message) => message.message)}
        variant="error"
      />
      <ValidationAlert
        title={t({ ru: 'Предупреждения', en: 'Warnings', de: 'Warnungen' }, locale)}
        messages={warnings.map((message) => message.message)}
        variant="warning"
      />

      <section className="oilgas-form__summary">
        <div>
          <span>{t({ ru: 'Скважина', en: 'Well', de: 'Bohrloch' }, locale)}</span>
          <strong>{values.wellId}</strong>
        </div>
        <div>
          <span>{t({ ru: 'Участок', en: 'Field', de: 'Feld' }, locale)}</span>
          <strong>{values.fieldName}</strong>
        </div>
        <div>
          <span>{t({ ru: 'Куст', en: 'Pad', de: 'Pad' }, locale)}</span>
          <strong>{values.pad}</strong>
        </div>
        <div>
          <span>{t({ ru: 'Инспектор', en: 'Inspector', de: 'Inspektor' }, locale)}</span>
          <strong>{values.inspector}</strong>
        </div>
        <div>
          <span>{t({ ru: 'Дата', en: 'Date', de: 'Datum' }, locale)}</span>
          <strong>{values.inspectionDate}</strong>
        </div>
        <div>
          <span>{t({ ru: 'Тип', en: 'Type', de: 'Typ' }, locale)}</span>
          <strong>{values.inspectionType}</strong>
        </div>
        <div className="oilgas-form__badges">
          <span className={`oilgas-badge oilgas-badge--${values.status}`}>{values.status}</span>
          <span className={`oilgas-badge oilgas-badge--risk-${risk.level}`}>{risk.level}</span>
        </div>
      </section>

      <section className="oilgas-form__grid">
        <label className="oilgas-field">
          <span>{t({ ru: 'ID скважины', en: 'Well ID', de: 'Well-ID' }, locale)}</span>
          <input {...inputProps} value={values.wellId} onChange={(e) => setField('wellId', e.target.value)} />
          <FieldMessage messages={fieldMessages(validation, 'wellId')} />
        </label>
        <label className="oilgas-field">
          <span>{t({ ru: 'Участок', en: 'Field name', de: 'Feldname' }, locale)}</span>
          <input {...inputProps} value={values.fieldName} onChange={(e) => setField('fieldName', e.target.value)} />
          <FieldMessage messages={fieldMessages(validation, 'fieldName')} />
        </label>
        <label className="oilgas-field">
          <span>{t({ ru: 'Куст', en: 'Pad', de: 'Pad' }, locale)}</span>
          <input {...inputProps} value={values.pad} onChange={(e) => setField('pad', e.target.value)} />
          <FieldMessage messages={[]} />
        </label>
        <label className="oilgas-field">
          <span>{t({ ru: 'Инспектор', en: 'Inspector', de: 'Inspektor' }, locale)}</span>
          <input {...inputProps} value={values.inspector} onChange={(e) => setField('inspector', e.target.value)} />
          <FieldMessage messages={fieldMessages(validation, 'inspector')} />
        </label>
        {mode === 'detailed' && (
          <>
            <label className="oilgas-field">
              <span>{t({ ru: 'Дата инспекции', en: 'Inspection date', de: 'Prüfdatum' }, locale)}</span>
              <input {...inputProps} type="date" value={values.inspectionDate} onChange={(e) => setField('inspectionDate', e.target.value)} />
              <FieldMessage messages={[]} />
            </label>
            <label className="oilgas-field">
              <span>{t({ ru: 'Тип инспекции', en: 'Inspection type', de: 'Prüftyp' }, locale)}</span>
              <input {...inputProps} value={values.inspectionType} onChange={(e) => setField('inspectionType', e.target.value)} />
              <FieldMessage messages={[]} />
            </label>
          </>
        )}
      </section>

      <section className="oilgas-form__section">
        <h4>{t({ ru: 'Операционные параметры', en: 'Operational parameters', de: 'Betriebsparameter' }, locale)}</h4>
        <div className="oilgas-form__grid">
          <label className="oilgas-field">
            <span>{t({ ru: 'Давление, бар', en: 'Pressure, bar', de: 'Druck, bar' }, locale)}</span>
            <input {...inputProps} value={values.pressure} onChange={(e) => setField('pressure', e.target.value)} />
            <FieldMessage messages={fieldMessages(validation, 'pressure')} />
          </label>
          <label className="oilgas-field">
            <span>{t({ ru: 'Температура, °C', en: 'Temperature, °C', de: 'Temperatur, °C' }, locale)}</span>
            <input {...inputProps} value={values.temperature} onChange={(e) => setField('temperature', e.target.value)} />
            <FieldMessage messages={fieldMessages(validation, 'temperature')} />
          </label>
          <label className="oilgas-field">
            <span>{t({ ru: 'Дебит, м³/сут', en: 'Flow rate, m³/day', de: 'Förderrate, m³/Tag' }, locale)}</span>
            <input {...inputProps} value={values.flowRate} onChange={(e) => setField('flowRate', e.target.value)} />
            <FieldMessage messages={fieldMessages(validation, 'flowRate')} />
          </label>
          <label className="oilgas-field">
            <span>H₂S, ppm</span>
            <input {...inputProps} value={values.h2s} onChange={(e) => setField('h2s', e.target.value)} />
            <FieldMessage messages={fieldMessages(validation, 'h2s')} />
          </label>
          {mode === 'detailed' && (
            <>
              <label className="oilgas-field">
                <span>Water cut, %</span>
                <input {...inputProps} value={values.waterCut} onChange={(e) => setField('waterCut', e.target.value)} />
                <FieldMessage messages={fieldMessages(validation, 'waterCut')} />
              </label>
              <label className="oilgas-field">
                <span>Choke size, mm</span>
                <input {...inputProps} value={values.chokeSize} onChange={(e) => setField('chokeSize', e.target.value)} />
                <FieldMessage messages={fieldMessages(validation, 'chokeSize')} />
              </label>
              <label className="oilgas-field">
                <span>{t({ ru: 'Вибрация, mm/s', en: 'Vibration, mm/s', de: 'Vibration, mm/s' }, locale)}</span>
                <input {...inputProps} value={values.vibration} onChange={(e) => setField('vibration', e.target.value)} />
                <FieldMessage messages={fieldMessages(validation, 'vibration')} />
              </label>
              <label className="oilgas-field">
                <span>{t({ ru: 'Последнее ТО', en: 'Last maintenance', de: 'Letzte Wartung' }, locale)}</span>
                <input {...inputProps} type="date" value={values.lastMaintenanceDate} onChange={(e) => setField('lastMaintenanceDate', e.target.value)} />
                <FieldMessage messages={[]} />
              </label>
            </>
          )}
        </div>
      </section>

      {showChecklist && (
        <section className="oilgas-form__section">
          <h4>{t({ ru: 'Safety checklist', en: 'Safety checklist', de: 'Sicherheitscheckliste' }, locale)}</h4>
          <div className="oilgas-form__checklist">
            {([
              ['ppeChecked', t({ ru: 'PPE проверен', en: 'PPE checked', de: 'PSA geprüft' }, locale)],
              ['leakageDetected', t({ ru: 'Обнаружена утечка', en: 'Leakage detected', de: 'Leckage erkannt' }, locale)],
              ['gasDetectorReady', t({ ru: 'Газоанализатор готов', en: 'Gas detector ready', de: 'Gasdetektor bereit' }, locale)],
              ['emergencyAccessClear', t({ ru: 'Аварийный доступ свободен', en: 'Emergency access clear', de: 'Notzugang frei' }, locale)],
              ['permitToWorkActive', t({ ru: 'Наряд-допуск активен', en: 'Permit to work active', de: 'Arbeitserlaubnis aktiv' }, locale)],
            ] as const).map(([field, label]) => (
              <label key={field} className="checkbox-field oilgas-form__check">
                <input
                  type="checkbox"
                  checked={values[field]}
                  disabled={readonly}
                  onChange={(event) => setField(field, event.target.checked)}
                />
                <span>{label}</span>
                <FieldMessage messages={fieldMessages(validation, field)} />
              </label>
            ))}
          </div>
        </section>
      )}

      <section className="oilgas-form__section">
        <h4>{t({ ru: 'Заметки и рекомендация', en: 'Notes and recommendation', de: 'Notizen und Empfehlung' }, locale)}</h4>
        <div className="oilgas-form__grid">
          <label className="oilgas-field oilgas-form__wide">
            <span>{t({ ru: 'Заметки', en: 'Notes', de: 'Notizen' }, locale)}</span>
            <textarea readOnly={readonly} rows={3} value={values.notes} onChange={(e) => setField('notes', e.target.value)} />
            <FieldMessage messages={[]} />
          </label>
          <label className="oilgas-field">
            <span>{t({ ru: 'Рекомендация', en: 'Recommended action', de: 'Empfohlene Aktion' }, locale)}</span>
            <select {...selectProps} value={values.recommendedAction} onChange={(e) => setField('recommendedAction', e.target.value as OilGasRecommendedAction)}>
              {recommendedActions.map((action) => (
                <option key={action} value={action}>{actionLabel(action, locale)}</option>
              ))}
            </select>
            <FieldMessage messages={fieldMessages(validation, 'recommendedAction')} />
          </label>
        </div>
      </section>

      {showRiskPanel && (
        <section className={`oilgas-risk-panel oilgas-risk-panel--${risk.level}`}>
          <div>
            <span>{t({ ru: 'Расчётный риск', en: 'Calculated risk', de: 'Berechnetes Risiko' }, locale)}</span>
            <strong>{risk.level}</strong>
          </div>
          <ul>
            {risk.reasons.map((reason) => <li key={reason}>{reason}</li>)}
          </ul>
        </section>
      )}
    </div>
  );
}
