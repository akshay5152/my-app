import { Request, Response, NextFunction } from 'express';
import { TenantModel } from '../models/tenant';

// Extend Express Request type to include tenant
declare global {
  namespace Express {
    interface Request {
      tenant?: any;
    }
  }
}

export const tenantMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get tenant identifier from subdomain or custom header
    const tenantId = req.headers['x-tenant-id'] as string;
    const hostname = req.hostname;

    if (!tenantId && !hostname) {
      return res.status(400).json({ error: 'Tenant identifier not provided' });
    }

    // Find tenant by ID or domain
    const tenant = await TenantModel.findOne({
      $or: [
        { id: tenantId },
        { domain: hostname }
      ]
    });

    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    // Attach tenant to request object
    req.tenant = tenant;
    next();
  } catch (error) {
    console.error('Tenant middleware error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 