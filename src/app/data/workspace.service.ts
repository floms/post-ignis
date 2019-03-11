import {Injectable} from '@angular/core';
import * as uuid from 'uuid/v4';
import {map} from 'rxjs/operators';
import {DataHandler} from './data-handler';

@Injectable()
export class WorkspaceService extends DataHandler {
  // private db = new DataProvider('__workspace__');
  //
  // constructor() {
  // }
  //
  // update(record: any) {
  //   return this.db.update({
  //     ...record,
  //   });
  // }

  db() {
    return '__workspace__';
  }

  insert(record: any) {
    return this.add({
      ...record,
      id: uuid()
    });
  }

  // remove(record: any) {
  //   return this.db.delete(record);
  // }

  all() {
    return super.all().pipe(
      map((items) => {
        return items.sort((a: any, b: any) => {
          return new Date(a.date.opened).getTime() - new Date(b.date.opened).getTime();
        });
      })
    );
  }
}
