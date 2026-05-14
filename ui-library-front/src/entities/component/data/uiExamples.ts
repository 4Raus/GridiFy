export const buttonUsageExample = {
  dataExample: 'variant: primary | secondary | outline | ghost | danger | success',
  importCode: "import { GridifyButton } from 'gridify';",
  exampleCode: '<GridifyButton variant="primary">Save</GridifyButton>',
};

export const scrollPanelDemoItems = Array.from({ length: 18 }, (_, index) => ({
  id: index + 1,
  title: `LOG-${String(index + 1).padStart(3, '0')}`,
  value: 60 + ((index * 17) % 41),
}));

export const scrollPanelUsageExample = {
  dataExample: 'max-height + overflow-y + sticky header',
  importCode: "import { ScrollPanel } from 'gridify';",
  exampleCode: '<ScrollPanel items={items} />',
};

export const feedbackStatesExample = {
  states: [
    { type: 'neutral' as const, label: 'Neutral', message: 'No status yet' },
    { type: 'info' as const, label: 'Info', message: 'Additional context' },
    { type: 'warning' as const, label: 'Warning', message: 'Needs attention' },
    { type: 'error' as const, label: 'Error', message: 'Action failed' },
    { type: 'success' as const, label: 'Success', message: 'Action completed' },
  ],
};

export const tooltipExample = {
  message: 'Tooltips messages with multiple lines. Tooltips messages with multiple lines.',
  placement: 'top' as const,
  theme: 'light' as const,
  multiline: true,
};

export const inputFieldExample = {
  label: 'Name form',
  value: '',
  placeholder: 'Enter',
  state: 'default' as const,
  size: 'md' as const,
  required: false,
  helperText: 'Use a clear business name.',
  errorText: 'Error',
};

export const selectFieldExample = {
  label: 'Select',
  placeholder: 'Select',
  value: '',
  options: [
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
    { label: 'Disabled option', value: 'option-disabled', disabled: true },
  ],
  state: 'default' as const,
  mode: 'single' as const,
  size: 'md' as const,
  searchable: false,
  clearable: true,
  errorText: 'Error',
};

export const iconSetExample = {
  variant: 'soft' as const,
  size: 'md' as const,
  icons: [
    { name: 'neutral', type: 'neutral' as const },
    { name: 'info', type: 'info' as const },
    { name: 'warning', type: 'warning' as const },
    { name: 'error', type: 'error' as const },
    { name: 'success', type: 'success' as const },
    { name: 'plus', type: 'neutral' as const },
    { name: 'search', type: 'info' as const },
  ],
};
