import { Model, Document, FilterQuery } from 'mongoose';
import { Connection, CursorPagination, Edge, PageInfo } from '../types/cursor';
import { Cursor } from '../utils/cursor';

export class BaseRepository<T extends Document> {
  constructor(protected model: Model<T>) {}

  async findWithCursor(
    pagination: CursorPagination,
    filter: FilterQuery<T> = {}
  ): Promise<Connection<T>> {
    const limit = pagination.first || pagination.last || 10;
    const query: FilterQuery<T> = { ...filter };

    if (pagination.after) {
      const { createdAt } = Cursor.parseCursor(pagination.after);
      query.createdAt = { $gt: createdAt };
    } else if (pagination.before) {
      const { createdAt } = Cursor.parseCursor(pagination.before);
      query.createdAt = { $lt: createdAt };
    }

    // Get one extra item to determine if there are more pages
    const items = await this.model
      .find(query)
      .sort({ createdAt: pagination.last ? -1 : 1 })
      .limit(limit + 1)
      .exec();

    const hasMore = items.length > limit;
    const nodes = hasMore ? items.slice(0, limit) : items;
    
    if (pagination.last) {
      nodes.reverse();
    }

    const edges: Edge<T>[] = nodes.map((node) => ({
      node,
      cursor: Cursor.createCursor(node),
    }));

    const pageInfo: PageInfo = {
      hasNextPage: pagination.first != null ? hasMore : false,
      hasPreviousPage: pagination.last != null ? hasMore : false,
      startCursor: edges.length > 0 ? edges[0].cursor : null,
      endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
    };

    const totalCount = await this.model.countDocuments(filter);

    return {
      edges,
      pageInfo,
      totalCount,
    };
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id);
    return result !== null;
  }
} 