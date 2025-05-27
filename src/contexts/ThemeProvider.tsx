import React from 'react';
import { useTenant } from './TenantContext';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { tenant } = useTenant();

  // Generate CSS variables for tenant theme
  const themeStyles = tenant?.settings?.theme ? {
    '--color-primary': tenant.settings.theme.primary,
    '--color-secondary': tenant.settings.theme.secondary,
    '--color-accent': tenant.settings.theme.accent,
  } as React.CSSProperties : {};

  return (
    <div style={themeStyles} className="min-h-screen bg-background">
      {children}
    </div>
  );
}; 