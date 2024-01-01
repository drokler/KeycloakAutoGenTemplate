import { createAction, props } from '@ngrx/store';
import { UserState } from './state';

export const nope = createAction('nope');

export const init = createAction('[App] Init');
export const changeLoading = createAction('[App] Loading',  props<{isLoading: boolean}>());


export const userStateUpdate = createAction('[Hader] User State Update',  props<UserState>());

export const login = createAction('[Hader] Login');
export const logout = createAction('[Hader] Logout');
