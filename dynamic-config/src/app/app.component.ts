import { Component, OnInit } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { AppState } from './store/state';
import { Store } from '@ngrx/store';
import { init } from './store/actions';
import { ConfigApi } from '../gen';
import { ServiceFactoryService } from '../services/service-factory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  public roles: string[] = [];
  private apiService: ConfigApi;

  constructor(private readonly store: Store<AppState>,private readonly factory: ServiceFactoryService) {
    this.apiService = factory.activate(ConfigApi);
  }

  public async ngOnInit() {
    this.store.dispatch(init())
  }

  public async testCall(): Promise<void> {
    const test = await this.apiService.configGet();
    console.log(test);
  }

}
