import { createSelector } from '@ngrx/store';
import { AppState, UserState } from './state';

export const selectAppState = (root: any) => root.state;

export const selectUserState = createSelector(
  selectAppState,
  (state: AppState) => state.userState
);

export const selectKeycloakProfile = createSelector(
    selectUserState,
    (userState: UserState) => userState.profile
  );
  


export const selectIsLoading = createSelector(
    selectAppState,
    (state: AppState) => state.isLoading
  );
  