import {Action} from '@ngrx/store';

export enum HistoryActionTypes {
  Load = '[History] Load',
  LoadSuccess = '[History] Load Success',
  Push = '[History] Push',
  Unshift = '[History] Unshift',
  Search = '[History] Search',
  Send = '[History] Send',
}

export class HistoryLoad implements Action {
  readonly type = HistoryActionTypes.Load;
}

export class HistoryLoadSuccess implements Action {
  readonly type = HistoryActionTypes.LoadSuccess;

  constructor(public history: any[]) {
  }
}

export class HistoryPush implements Action {
  readonly type = HistoryActionTypes.Push;

  constructor(public item: any) {
  }
}

export class HistorySend implements Action {
  readonly type = HistoryActionTypes.Send;

  constructor(public item: any) {
  }
}


export class HistoryUnshift implements Action {
  readonly type = HistoryActionTypes.Unshift;

  constructor(public item: any) {
  }
}

export class HistorySearch implements Action {
  readonly type = HistoryActionTypes.Search;

  constructor(public term: string) {
  }
}



export type HistoryActions = HistoryLoad | HistoryLoadSuccess | HistoryPush | HistoryUnshift | HistorySearch | HistorySend;
