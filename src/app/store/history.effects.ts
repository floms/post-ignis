import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs/operators';
import {HistoryActionTypes, HistoryLoadSuccess, HistoryUnshift} from './history.actions';
import {HistoryService} from '../data/history.service';

@Injectable()
export class HistoryEffects {

  @Effect()
  loadWorkspace$ = this.actions$.pipe(
    ofType(HistoryActionTypes.Load),
    mergeMap(() => this.history.all()),
    map(requests => new HistoryLoadSuccess(requests))
  );


  @Effect()
  saveRequest$ = this.actions$.pipe(
    ofType(HistoryActionTypes.Send),
    mergeMap((action: any) => {
      return this.history.insert(action.item);
    }),
    map(requests => new HistoryUnshift(requests))
  );

  constructor(private actions$: Actions, private history: HistoryService) {
  }
}
