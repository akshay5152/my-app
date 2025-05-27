import { BaseRepository } from './BaseRepository';
import { TenantModel, ITenant } from '../server/models/tenant';

export class TenantRepository extends BaseRepository<ITenant> {
  constructor() {
    super(TenantModel);
  }

  async findByDomain(domain: string): Promise<ITenant | null> {
    return this.model.findOne({ domain });
  }

  async findWithFeature(feature: string, pagination: CursorPagination) {
    return this.findWithCursor(pagination, {
      'settings.features': feature,
    });
  }

  async updateSettings(id: string, settings: ITenant['settings']) {
    return this.update(id, { settings });
  }
} 