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

export const historySearch = createSelector(allHistory, (state: any ) => {
  return state.all.filter((record: any) =>
    record.request.url.toLowerCase().indexOf(state.search.term.toLowerCase()) >= 0
  );
});
