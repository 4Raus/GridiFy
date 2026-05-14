export type OilGasInspectionMode = 'compact' | 'detailed';
export type OilGasRiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type OilGasInspectionScenario = 'normal' | 'warning' | 'critical';
export type OilGasInspectionStatus = 'normal' | 'needs-review' | 'shutdown';

export type OilGasRecommendedAction =
  | 'continue-operation'
  | 'monitor'
  | 'maintenance-required'
  | 'shutdown-required';

export type OilGasInspectionValues = {
  wellId: string;
  fieldName: string;
  pad: string;
  inspector: string;
  inspectionDate: string;
  inspectionType: string;
  status: OilGasInspectionStatus;
  pressure: string;
  temperature: string;
  flowRate: string;
  h2s: string;
  waterCut: string;
  chokeSize: string;
  vibration: string;
  lastMaintenanceDate: string;
  ppeChecked: boolean;
  leakageDetected: boolean;
  gasDetectorReady: boolean;
  emergencyAccessClear: boolean;
  permitToWorkActive: boolean;
  notes: string;
  recommendedAction: OilGasRecommendedAction;
};

export type OilGasValidationMessage = {
  level: 'error' | 'warning';
  message: string;
  field?: keyof OilGasInspectionValues;
};

export type OilGasRiskSummary = {
  level: OilGasRiskLevel;
  reasons: string[];
};
