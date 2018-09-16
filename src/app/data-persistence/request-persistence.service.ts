import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataPersistence } from './data-persistence.class';

@Injectable({
  providedIn: 'root'
})
export class RequestPersistence extends DataPersistence {

  name() {
    return 'requests';
  }
}
