import { BrowserRouter } from 'react-router-dom';
import type { ReactNode } from 'react';
import { LocaleProvider } from './LocaleProvider';
import { ThemeProvider } from './ThemeProvider';

type AppProvidersProps = {
  children: ReactNode;
};

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LocaleProvider>{children}</LocaleProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
