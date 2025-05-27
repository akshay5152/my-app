import { Schema, model, Document } from 'mongoose';

interface ITenantSettings {
  theme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  features: string[];
  customization: Record<string, any>;
}

export interface ITenant extends Document {
  name: string;
  domain: string;
  settings: ITenantSettings;
  createdAt: Date;
  updatedAt: Date;
}

const TenantSchema = new Schema<ITenant>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    domain: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    settings: {
      theme: {
        primary: {
          type: String,
          default: '#1a73e8',
        },
        secondary: {
          type: String,
          default: '#4285f4',
        },
        accent: {
          type: String,
          default: '#fbbc04',
        },
      },
      features: [{
        type: String,
        default: [],
      }],
      customization: {
        type: Schema.Types.Mixed,
        default: {},
      },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
TenantSchema.index({ domain: 1 });

export const TenantModel = model<ITenant>('Tenant', TenantSchema); 