import { Injectable } from '@angular/core';
import { Configuration } from '../gen';
import { KeycloakService } from 'keycloak-angular';


@Injectable({
  providedIn: 'root',
})
export class ConfigurationFactoryService {
  private _configuration: Configuration | null = null;
  constructor(public readonly kcService: KeycloakService) {
    this.getToken = this.getToken.bind(this);
  }

  public get configuration() {
    this._configuration = this._configuration ?? new Configuration({
      basePath: 'http://localhost:5171',
      accessToken: this.getToken,
    });
    return this._configuration;
  }

  private async getToken(): Promise<string> {
    if (this.kcService.isTokenExpired()) {
      await this.kcService.updateToken();
    }
    return await this.kcService.getToken();
  }

}
