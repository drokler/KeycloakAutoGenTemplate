import { Action, createReducer, on } from '@ngrx/store';
import { AppState, initState } from './state';
import * as StoreActions from './actions';

export const stateReducer = createReducer(
  initState,

  on(StoreActions.userStateUpdate, (state, userState) => {
    return { ...state, userState };
  }),
  on(StoreActions.changeLoading, (state, loadingState) => {
    return { ...state, isLoading: loadingState.isLoading };
  }),

  on(StoreActions.login, (state) => state)
);
