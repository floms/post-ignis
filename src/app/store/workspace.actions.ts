import {Action} from '@ngrx/store';

export enum WorkspaceActionTypes {
  Load = '[Workspace] Load',
  LoadSuccess = '[Workspace] Load Success',
  LoadState = '[Workspace] Load State',
  LoadStateSuccess = '[Workspace] Load State Success',
  StateChange = '[Workspace] State Change',
  StateChangeSuccess = '[Workspace] State Change Success',
  LoadEnvironments = '[Workspace] Load Environments',
  LoadEnvironmentsSuccess = '[Workspace] Load Environments Success',
  SelectEnvironment = '[Workspace] Select Environment',
  UpdateEnvironment = '[Workspace] Update Environment',
  NewEnvironment = '[Workspace] New Environment',
  RemoveEnvironment = '[Workspace] Remove Environment',
  AddTab = '[Workspace] Add Tab',
  AddTabSuccess = '[Workspace] Add Tab Success',
  UpdateTab = '[Workspace] Update Tab',
  UpdateTabSuccess = '[Workspace] Update Tab Success',
  RemoveTab = '[Workspace] Remove Tab',
  RemoveTabSuccess = '[Workspace] Remove TabSuccess',
}

export class WorkspaceLoad implements Action {
  readonly type = WorkspaceActionTypes.Load;
}

export class WorkspaceLoadSuccess implements Action {
  readonly type = WorkspaceActionTypes.LoadSuccess;

  constructor(public tabs: any[]) {
  }
}

export class WorkspaceLoadState implements Action {
  readonly type = WorkspaceActionTypes.LoadState;
}


export class WorkspaceLoadStateSuccess implements Action {
  readonly type = WorkspaceActionTypes.LoadStateSuccess;

  constructor(public state: any) {
  }
}

export class WorkspaceStateChange implements Action {
  readonly type = WorkspaceActionTypes.StateChange;

  constructor(public state: any) {
  }
}

export class WorkspaceStateChangeSuccess implements Action {
  readonly type = WorkspaceActionTypes.StateChangeSuccess;

  constructor(public state: any) {
  }
}

export class WorkspaceLoadEnvironments implements Action {
  readonly type = WorkspaceActionTypes.LoadEnvironments;

  constructor(public active = null) {
  }
}

export class WorkspaceLoadEnvironmentsSuccess implements Action {
  readonly type = WorkspaceActionTypes.LoadEnvironmentsSuccess;

  constructor(public environments: any[], public active = null) {
  }
}


export class WorkspaceSelectEnvironment implements Action {
  readonly type = WorkspaceActionTypes.SelectEnvironment;

  constructor(public environment: any) {
  }
}

export class WorkspaceUpdateEnvironment implements Action {
  readonly type = WorkspaceActionTypes.UpdateEnvironment;

  constructor(public environment: any) {
  }
}


export class WorkspaceNewEnvironment implements Action {
  readonly type = WorkspaceActionTypes.NewEnvironment;

  constructor(public environment: any) {
  }
}

export class WorkspaceRemoveEnvironment implements Action {
  readonly type = WorkspaceActionTypes.RemoveEnvironment;

  constructor(public environment: any) {
  }
}

export class WorkspaceAddTab implements Action {
  readonly type = WorkspaceActionTypes.AddTab;

  constructor(public tab: any) {
  }
}

export class WorkspaceUpdateTab implements Action {
  readonly type = WorkspaceActionTypes.UpdateTab;

  constructor(public tab: any) {
  }
}

export class WorkspaceRemoveTab implements Action {
  readonly type = WorkspaceActionTypes.RemoveTab;

  constructor(public tab: any) {
  }
}

export class WorkspaceRemoveTabSuccess implements Action {
  readonly type = WorkspaceActionTypes.RemoveTabSuccess;

  constructor(public tab: any) {
  }
}

export class WorkspaceTabSuccess implements Action {
  readonly type = WorkspaceActionTypes.AddTabSuccess

  constructor(public tab: any) {
  }
}

export class WorkspaceUpdateTabSuccess implements Action {
  readonly type = WorkspaceActionTypes.UpdateTabSuccess;

  constructor(public tab: any) {
  }
}

export type WorkspaceActions =
  WorkspaceLoad
  | WorkspaceLoadSuccess
  | WorkspaceLoadState
  | WorkspaceLoadStateSuccess
  | WorkspaceStateChange
  | WorkspaceStateChangeSuccess
  | WorkspaceLoadEnvironments
  | WorkspaceLoadEnvironmentsSuccess
  | WorkspaceSelectEnvironment
  | WorkspaceUpdateEnvironment
  | WorkspaceNewEnvironment
  | WorkspaceRemoveEnvironment
  | WorkspaceAddTab
  | WorkspaceUpdateTab
  | WorkspaceUpdateTabSuccess
  | WorkspaceRemoveTab
  | WorkspaceRemoveTabSuccess
  | WorkspaceTabSuccess;
