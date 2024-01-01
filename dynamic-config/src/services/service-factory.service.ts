import { Injectable, OnInit } from '@angular/core';
import { Configuration } from '../gen';


@Injectable({
  providedIn: 'root',
})
export class ServiceFactoryService {
  constructor(private readonly configuration: Configuration) {}


  public activate<T>(type: { new (configuration: Configuration): T }): T {
    return new type(this.configuration);
  }


}
