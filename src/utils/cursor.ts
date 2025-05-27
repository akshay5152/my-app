export class Cursor {
  static encode(data: any): string {
    return Buffer.from(JSON.stringify(data)).toString('base64');
  }

  static decode(cursor: string): any {
    try {
      return JSON.parse(Buffer.from(cursor, 'base64').toString());
    } catch {
      throw new Error('Invalid cursor');
    }
  }

  static createCursor(doc: any): string {
    const cursorData = {
      id: doc._id.toString(),
      createdAt: doc.createdAt.getTime(),
    };
    return this.encode(cursorData);
  }

  static parseCursor(cursor: string): { id: string; createdAt: Date } {
    const data = this.decode(cursor);
    return {
      id: data.id,
      createdAt: new Date(data.createdAt),
    };
  }
} 