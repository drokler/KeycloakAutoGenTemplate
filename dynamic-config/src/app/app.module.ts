import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakBearerInterceptor, KeycloakService } from 'keycloak-angular';
import { HeaderComponent } from './header/header.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from './store/effects';
import { stateReducer } from './store/reducer';
import { Configuration } from '../gen';
import { ConfigurationFactoryService } from '../services/configuration-factory.service';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        realm: 'master',
        url: 'https://keycloak.isnot.dev/',
        clientId: 'dynamic-config',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      }
    });
}

export const configurationProvider = {
  provide: Configuration,
  useFactory: (factory: ConfigurationFactoryService) => factory.configuration,
  deps: [ConfigurationFactoryService],
};

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    StoreModule.forRoot({state: stateReducer}),
    EffectsModule.forRoot([Effects]),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    configurationProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
