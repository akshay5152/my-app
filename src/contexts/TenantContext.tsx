import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Tenant, TenantContext as ITenantContext } from '../types/tenant';

const TenantContext = createContext<ITenantContext>({
  tenant: null,
  loading: true,
  error: null,
});

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};

interface TenantProviderProps {
  children: React.ReactNode;
}

export const TenantProvider: React.FC<TenantProviderProps> = ({ children }) => {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const detectAndLoadTenant = async () => {
      try {
        // Get tenant information based on the current hostname
        const hostname = window.location.hostname;
        const response = await fetch(`/api/tenants/detect?domain=${hostname}`);
        
        if (!response.ok) {
          throw new Error('Failed to load tenant information');
        }

        const tenantData = await response.json();
        setTenant(tenantData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    detectAndLoadTenant();
  }, []);

  return (
    <TenantContext.Provider value={{ tenant, loading, error }}>
      {children}
    </TenantContext.Provider>
  );
}; 