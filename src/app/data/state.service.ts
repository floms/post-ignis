import {Injectable} from '@angular/core';
import {DataProvider} from './data-provider';
import {catchError, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable()
export class StateService {
  private STATE_ID = 'workspace_state';
  private db = new DataProvider('__state__');

  get(): Observable<any> {
    return this.db.find(this.STATE_ID).pipe(
      catchError(() => {
        return of({
          activeTab: 0,
          sidebarWidth: 300,
          environment: ''
        });
      })
    );
  }

  set(state: any) {
    return this.db.find(this.STATE_ID).pipe(
      switchMap(e => {
        return this.db.update({id: this.STATE_ID, ...state});
      }),
      catchError(() => this.db.save({_id: this.STATE_ID, ...state}))
    );
  }
}
