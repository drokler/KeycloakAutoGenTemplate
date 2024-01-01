import { Injectable } from '@angular/core';
import { AppState } from './state';
import { Action, Store } from '@ngrx/store';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as StoreActions from './actions';
import {
  EMPTY,
  Observable,
  catchError,
  concatMap,
  from,
  map,
  mergeMap,
  of,
  switchMap,
} from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class Effects {
  constructor(
    private readonly $actions: Actions,
    private readonly store: Store<AppState>,
    private readonly keycloak: KeycloakService
  ) {}

  public $initing = createEffect(() =>
    this.$actions.pipe(
      ofType(StoreActions.init),
      concatMap(() => this.loadingWrap(this.internalInit())),
      concatMap(async (x) => await x)
    )
  );

  public $logining = createEffect(
    () =>
      this.$actions.pipe(
        ofType(StoreActions.login),
        map(() => from(this.keycloak.login()))
      ),
    { dispatch: false }
  );

  public $logout = createEffect(
    () =>
      this.$actions.pipe(
        ofType(StoreActions.logout),
        map(() => from(this.keycloak.logout()))
      ),
    { dispatch: false }
  );




  private async internalInit(): Promise<Action> {
    const isLoggedIn = await this.keycloak.isLoggedIn();
    if (isLoggedIn) {
      return await this.loadUserData();
    }
    return StoreActions.userStateUpdate({
      logedIn: false,
      roles: [],
    });
  }

  private async loadUserData(): Promise<Action> {
    const profile = await this.keycloak.loadUserProfile();
    const roles = await this.keycloak.getUserRoles(false, 'dynamic-config');
    return StoreActions.userStateUpdate({
      logedIn: true,
      roles: roles,
      profile: profile,
    });
  }

  private loadingWrap(toWrap: Promise<Action>): Observable<Promise<Action>> {
    const observable = new Observable<Promise<Action>>((subscriber) => {
      subscriber.next(
        new Promise((res) =>
          res(StoreActions.changeLoading({ isLoading: true }))
        )
      );
      subscriber.next(toWrap);
      subscriber.next(
        new Promise((res) =>
          res(StoreActions.changeLoading({ isLoading: false }))
        )
      );
    });
    return observable;
  }
}
