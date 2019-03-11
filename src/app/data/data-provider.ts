import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {get, merge} from '../util';
import {DataProviderBase} from './data-provider-base';

export class DataProvider extends DataProviderBase {
  all(options?: any): Observable<any> {
    const query = {
      ...options,
      include_docs: true
    };

    return super.all(query).pipe(
      map((rows: any) => rows.map(this.unwrapRecord))
    );
  }

  save(object: any): Observable<any> {
    return super.save(this.wrapRecord(object)).pipe(
      map(record => this.wrapRecord({...object, ...record})),
      map(this.unwrapRecord)
    );
  }

  find(id: any) {
    return super.find(id).pipe(map(this.unwrapRecord));
  }

  update(record) {
    return this.find(record.id).pipe(
      switchMap(current => {
        const payload = merge(current);

        const toSave = payload(record);

        return this.save(toSave);
      })
    );
  }

  private unwrapRecord(row: any) {
    const data = get(row);
    return {
      id: data('id', data('_id')),
      rev: data('value.rev', data('_rev')),
      ...data('document', data('doc.document'))
    };
  }

  private wrapRecord(object: any) {
    const id = object.id || object._id;
    const rev = object.rev || object._rev;
    delete object.id;
    delete object._id;
    delete object.rev;
    delete object._rev;

    const document = {...object};

    return {
      _id: id,
      _rev: rev,
      document
    };
  }
}
