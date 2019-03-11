import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export class DataProviderBase {
  private database: any;

  constructor(name: string) {
    this.database = new PouchDB(name, {auto_compaction: true});
  }

  all(options?: any): Observable<any> {
    const query = {
      ...options,
      include_docs: true
    };
    return from(this.database.allDocs(query)).pipe(map((data: any) => data.rows));
  }

  save(object: any): Observable<any> {
    return from(this.database.put(object, {
      include_docs: true
    }));
  }

  find(id: any) {
    return from(this.database.get(id, {
      include_docs: true
    }));
  }

  delete(payload: any) {
    return from(this.database.remove({
      _id: payload.id,
      _rev: payload.rev,
    }));
  }

  destroy() {
    return from(this.database.destroy());
  }
}
