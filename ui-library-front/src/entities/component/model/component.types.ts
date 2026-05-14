import type { Locale } from '../../../shared/types/locale';
import type { ComponentStatus } from '../../../shared/types/status';
import type { ComponentPreviewData } from './preview.types';

export type { ComponentStatus };

export type LocalizedText = Record<Locale, string>;

export type ComponentSection =
  | 'tokens'
  | 'base-components'
  | 'forms'
  | 'tables'
  | 'charts'
  | 'diagrams'
  | 'industry';

export type PreviewType =
  | 'buttons'
  | 'gridify-action-button'
  | 'feedback-states'
  | 'tooltip'
  | 'input-field'
  | 'select-field'
  | 'icon-set'
  | 'candlestick'
  | 'scroll-panel'
  | 'oilgas-form'
  | 'spreadsheet'
  | 'bar'
  | 'line'
  | 'scatter'
  | 'forecast'
  | 'pie'
  | 'radar';

export type ComponentPropDoc = {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description: LocalizedText;
};

export type ComponentEventDoc = {
  name: string;
  payload: string;
  description: LocalizedText;
};

export type ComponentErrorDoc = {
  code: string;
  reason: LocalizedText;
  fix: LocalizedText;
};

export type ComponentRegistryItem = {
  slug: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  description: LocalizedText;
  section: ComponentSection;
  previewType: PreviewType;
  status: ComponentStatus;
  tags: string[];
  packageName?: string;
  importPath?: string;
  figmaName?: string;
  lifecycle?: {
    readyDate?: string;
    stageNote?: LocalizedText;
  };
  usage: {
    install?: string;
    importCode: string;
    exampleCode: string;
  };
  docs: {
    overview: LocalizedText;
    whenToUse?: LocalizedText[];
    features?: LocalizedText[];
    limitations?: LocalizedText[];
    dataExample: string;
    logic?: LocalizedText;
    props?: ComponentPropDoc[];
    events?: ComponentEventDoc[];
    errors?: ComponentErrorDoc[];
  };
  previewData?: ComponentPreviewData;
};
