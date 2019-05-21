import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
              private base: BaseService) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.base.getBaseUrl()}/users/authenticate`, { username: username, password: password })
      .pipe(map(loggedUser => {
        //check if user contains token 
        if (loggedUser && loggedUser.token) {
          // if so put user in local storage as loggedUser
          localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        }

        return loggedUser;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('loggedUser');
  }

}
