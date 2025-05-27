import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { TenantProvider } from './contexts/TenantContext';
import { ThemeProvider } from './contexts/ThemeProvider';
import { TenantLayout } from './components/layout/TenantLayout';

const App: React.FC = () => {
  return (
    <Router>
      <TenantProvider>
        <ThemeProvider>
          <TenantLayout>
            {/* Add your routes here */}
            <div className="p-4">
              <h1 className="text-2xl font-bold text-primary">
                Welcome to Multi-Tenant App
              </h1>
              <p className="mt-2 text-gray-600">
                This is a multi-tenant application with dynamic theming and configuration.
              </p>
            </div>
          </TenantLayout>
        </ThemeProvider>
      </TenantProvider>
    </Router>
  );
};

export default App; 