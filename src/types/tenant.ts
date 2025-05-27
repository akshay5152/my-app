export interface Tenant {
  id: string;
  name: string;
  domain: string;
  settings: TenantSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface TenantSettings {
  theme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  features: string[];
  customization: Record<string, any>;
}

export interface TenantContext {
  tenant: Tenant | null;
  loading: boolean;
  error: Error | null;
} 