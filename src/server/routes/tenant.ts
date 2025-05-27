import { Router } from 'express';
import { TenantModel, ITenant } from '../models/tenant';

const router = Router();

// Get tenant by domain
router.get('/detect', async (req, res) => {
  try {
    const { domain } = req.query;
    
    if (!domain) {
      return res.status(400).json({ error: 'Domain parameter is required' });
    }

    const tenant = await TenantModel.findOne({ domain });
    
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    res.json(tenant);
  } catch (error) {
    console.error('Error detecting tenant:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new tenant
router.post('/', async (req, res) => {
  try {
    const { name, domain, settings } = req.body;

    const existingTenant = await TenantModel.findOne({ domain });
    if (existingTenant) {
      return res.status(400).json({ error: 'Domain already exists' });
    }

    const tenant = new TenantModel({
      name,
      domain,
      settings,
    });

    await tenant.save();
    res.status(201).json(tenant);
  } catch (error) {
    console.error('Error creating tenant:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update tenant settings
router.patch('/:id/settings', async (req, res) => {
  try {
    const { id } = req.params;
    const { settings } = req.body;

    const tenant = await TenantModel.findByIdAndUpdate(
      id,
      { $set: { settings } },
      { new: true }
    );

    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    res.json(tenant);
  } catch (error) {
    console.error('Error updating tenant settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 