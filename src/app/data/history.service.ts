import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import * as uuid from 'uuid/v4';
import {DataHandler} from './data-handler';

@Injectable()
export class HistoryService extends DataHandler {
  db() {
    return '__history__';
  }

  insert(record: any) {
    return super.add({
      ...record,
      id: uuid()
    });
  }

  all(desc: boolean = true) {
    return super.all().pipe(
      map((items) => {
        return items.sort((a: any, b: any) => {
          if (desc) {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          }

          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
      })
    );
  }
}
