import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {
  WorkspaceActionTypes,
  WorkspaceLoadEnvironments,
  WorkspaceLoadEnvironmentsSuccess,
  WorkspaceLoadSuccess,
  WorkspaceRemoveTabSuccess,
  WorkspaceStateChangeSuccess,
  WorkspaceTabSuccess,
  WorkspaceUpdateTabSuccess
} from './workspace.actions';
import {StateService} from '../data/state.service';
import {EnvironmentService} from '../data/environment.service';
import {WorkspaceService} from '../data/workspace.service';
import {select, Store} from '@ngrx/store';
import {of} from 'rxjs';

@Injectable()
export class WorkspaceEffects {

  @Effect()
  loadTabs$ = this.actions$.pipe(
    ofType(WorkspaceActionTypes.Load),
    mergeMap(() => this.workspace.all()),
    map(tabs => new WorkspaceLoadSuccess(tabs))
  );

  @Effect()
  loadState$ = this.actions$.pipe(
    ofType(WorkspaceActionTypes.LoadState),
    mergeMap(() => this.state.get()),
    map(state => new WorkspaceStateChangeSuccess(state))
  );

  @Effect()
  saveState$ = this.actions$.pipe(
    ofType(WorkspaceActionTypes.StateChange),
    switchMap((state: any) => this.state.set(state.state)),
    map((state) => new WorkspaceStateChangeSuccess(state))
  );

  @Effect()
  loadEnvironments$ = this.actions$.pipe(
    ofType(WorkspaceActionTypes.LoadEnvironments),
    switchMap(() => this.environment.all()),
    map((environments) => new WorkspaceLoadEnvironmentsSuccess(environments))
  );

  @Effect()
  addTab$ = this.actions$.pipe(
    ofType(WorkspaceActionTypes.AddTab),
    switchMap((action: any) => this.workspace.insert(action.tab)),
    map((tab) => new WorkspaceTabSuccess(tab))
  );

  @Effect()
  updateTab$ = this.actions$.pipe(
    ofType(WorkspaceActionTypes.UpdateTab),
    switchMap((action: any) => this.workspace.update(action.tab)),
    // map(() => new WorkspaceLoadEnvironments())
    map(() => new WorkspaceUpdateTabSuccess(null))
  );
  @Effect()
  updateEnvironment$ = this.actions$.pipe(
    ofType(WorkspaceActionTypes.UpdateEnvironment),
    switchMap((action: any) => this.environment.update(action.environment)),
    map(() => new WorkspaceLoadEnvironments())
  );
  @Effect()
  newEnvironment$ = this.actions$.pipe(
    ofType(WorkspaceActionTypes.NewEnvironment),
    switchMap((action: any) => this.environment.insert(action.environment)),
    map((environment: any) => new WorkspaceLoadEnvironments(environment.id))
  );
  @Effect()
  removeEnvironment$ = this.actions$.pipe(
    ofType(WorkspaceActionTypes.RemoveEnvironment),
    switchMap((action: any) => this.environment.remove(action.environment)),
    map(() => new WorkspaceLoadEnvironments(''))
  );
  @Effect()
  removeTab$ = this.actions$.pipe(
    ofType(WorkspaceActionTypes.RemoveTab),
    withLatestFrom(this.store$.pipe(select('workspace'))),
    switchMap(([action, workspace]: any[]) => {
      const tabs: any[] = workspace.tabs;

      if (action.tab >= tabs.length) {
        return of(null);
      }

      return this.workspace.remove(tabs[action.tab]);
    }),
    map((tab) => new WorkspaceRemoveTabSuccess(tab))
  );

  constructor(
    private actions$: Actions,
    private store$: Store<any>,
    private workspace: WorkspaceService,
    private state: StateService,
    private environment: EnvironmentService
  ) {
  }
}
