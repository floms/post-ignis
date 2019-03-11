import {Injectable} from '@angular/core';
import * as uuid from 'uuid/v4';
import {DataHandler} from './data-handler';

@Injectable()
export class EnvironmentService extends DataHandler {

  // private db = new DataProvider('__environment__');

  db() {
    return '__environment__';
  }


  insert(record: any) {
    return this.add({
      ...record,
      id: uuid()
    });
  }
}
