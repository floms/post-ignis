import {HistoryActions, HistoryActionTypes} from './history.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const initialState: any = {
  all: [],
  search: {
    term: ''
  }
};

export function historyReducer(state = initialState, action: HistoryActions) {
  switch (action.type) {
    case HistoryActionTypes.LoadSuccess:
      return {
        ...state,
        all: action.history
      };
    case HistoryActionTypes.Push:
      return {
        ...state,
        all: [
          ...state.all,
          action.item
        ]
      };
    case HistoryActionTypes.Unshift:
      return {
        ...state,
        all: [
          action.item,
          ...state.all
        ]
      };
    case HistoryActionTypes.Search:
      return {
        ...state,
        search: {
          term: action.term
        }
      };
    default:
      return state;
  }
}

const allHistory = createFeatureSelector('history');

export const historySearch = createSelector(allHistory, (state: any) => {
  let term: string = state.search.term;

  const methodFilter = /(.*)method\:(GET|POST|PUT|PATCH|DELETE)(.*)/gi.exec(term);

  if (methodFilter) {
    term = methodFilter[1] + methodFilter[3];
  }

  return state.all.filter((record: any) => {
    if (methodFilter && record.request.type !== methodFilter[2]) {
      return false;
    }

    return record.request.url.toLowerCase().indexOf(term.trim().toLowerCase()) >= 0;
  });
});
