import React from 'react';
import { useTenant } from '../../contexts/TenantContext';

interface TenantLayoutProps {
  children: React.ReactNode;
}

export const TenantLayout: React.FC<TenantLayoutProps> = ({ children }) => {
  const { tenant, loading, error } = useTenant();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">
          <h1 className="text-2xl font-bold">Error</h1>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  if (!tenant) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">
          <h1 className="text-2xl font-bold">Tenant Not Found</h1>
          <p>Unable to load tenant information</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">{tenant.name}</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-gray-100 border-t">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          © {new Date().getFullYear()} {tenant.name}
        </div>
      </footer>
    </div>
  );
}; 