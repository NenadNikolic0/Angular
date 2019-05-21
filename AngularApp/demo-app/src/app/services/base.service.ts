import { Injectable } from '@angular/core';
import { PlatformLocation } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private platformLocation: PlatformLocation) {
  }

  //Method will return application url
  getBaseUrl() {
    let currLoc = String((this.platformLocation as any).location).split('/')[0];
    return currLoc;
  }

}
