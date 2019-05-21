import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../model/user';

import { BaseService } from '../services/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private base: BaseService) { }

  //Method will create new user
  createUser() {

    let user: Object = {
      username: "new@new.com",
      password: "12345"
    }

    return this.http.post(`${this.base.getBaseUrl()}/users/register`,user);
  }

  //Method will update existing user
  updateUser(user:User) {
    return this.http.put(`${this.base.getBaseUrl()}/users/` + user.id, user);
  }

  //Method will list all users
  listAllUsers() {
    return this.http.get<User[]>(`${this.base.getBaseUrl()}/users`);
  }

  //Method will delete user with specific id
  deleteUser(id: number) {
    return this.http.delete(`${this.base.getBaseUrl()}/users/` + id);
  }

  //Method will find user with specific id
  findUserById(id:number) {
    return this.http.get(`${this.base.getBaseUrl()}/users/` + id);
  }



}
