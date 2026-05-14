export type CodePreviewTabId = 'react-tsx' | 'props-json';

export type GeneratedCodeBlock = {
  id: CodePreviewTabId;
  label: string;
  code: string;
};

export type GeneratedComponentCode = {
  tabs: GeneratedCodeBlock[];
};
