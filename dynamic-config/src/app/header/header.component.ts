import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { KeycloakProfile } from 'keycloak-js';
import {
  selectIsLoading,
  selectKeycloakProfile,
  selectUserState,
} from '../store/selectors';
import { AppState } from '../store/state';
import { Observable, filter, map } from 'rxjs';
import { login, logout } from '../store/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  public isLoggedIn = false;

  public $userProfile: Observable<KeycloakProfile | null>;
  public $isLogedin: Observable<boolean>;
  public $isLoading: Observable<boolean>;

  public roles: string[] = [];

  constructor(private readonly store: Store<AppState>) {
    this.$userProfile = store
      .select(selectKeycloakProfile)
      .pipe(map((x) => x ?? null));
    this.$isLogedin = store.select(selectUserState).pipe(map((x) => x.logedIn));
    this.$isLoading = store.select(selectIsLoading);
  }

  public onLoginClick(): void {
    this.store.dispatch(login());
  }
  public onLogoutClick(): void {
    this.store.dispatch(logout());
  }
}
