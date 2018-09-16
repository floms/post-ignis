export abstract class DataPersistence {
  private databasase: any;

  constructor() {
    this.databasase = new PouchDB(this.name());
  }

  abstract name(): string;

  async all(options?: any) {
    const query = {
      ...options,
      include_docs: true
    };

    const results = await this.databasase.allDocs(query);

    return results.rows.map(row => ({
      id: row.id,
      rev: row.value.rev,
      request: {
        ...row.doc.request
      }
    }));
  }

  async add(request) {
    return this.databasase.put({
      _id: new Date().toJSON(),
      ...request
    });
  }

  async update(request) {
    const record = await this.databasase.get(request.id);

    record.request = request.request;

    return this.databasase.put(record);
  }

  async remove(request) {
    const record = await this.databasase.get(request.id);
    record._deleted = true;

    return this.databasase.put(record);
  }

}