import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class RestfulApi implements HttpInterceptor {

  constructor() { }

  private users: any = [
    {
      id: 1,
      username: "user@mail.com",
      password: "pass123"
    }
  ];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // this method will execute on login button pressed
    if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
    
    

      if (request.body.username === "user@mail.com" && request.body.password === "pass123") {
        // if login details are valid return 200 OK with user 
        let body = {
          id: 1,
          username: "user@mail.com",      
          token: 'temporary-token'
        };

        return of(new HttpResponse({ status: 200, body: body }));
      } else {
        // else return 400 bad request
        return throwError({ error: { message: 'Username or password is incorrect' } });
      }
    }

    // get users
    if (request.url.endsWith('/users') && request.method === 'GET') {
      // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
      if (request.headers.get('Authorization') === 'Bearer temporary-token') {
        return of(new HttpResponse({ status: 200, body: this.users }));
      } else {
        // return 401 not authorised if token is null or invalid
        return throwError({ status: 401, error: { message: 'Unauthorised' } });
      }
    }

    // get user by id
    if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
      // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
      if (request.headers.get('Authorization') === 'Bearer temporary-token') {
        // find user by id in users array
        let urlParts = request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);
        let matchedUsers = this.users.filter(user => { return user.id === id; });
        let user = matchedUsers.length ? matchedUsers[0] : null;

        return of(new HttpResponse({ status: 200, body: user }));
      } else {
        // return 401 not authorised if token is null or invalid
        return throwError({ status: 401, error: { message: 'Unauthorised' } });
      }
    }



    // delete user
    if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
      // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
      if (request.headers.get('Authorization') === 'Bearer temporary-token') {
        // find user by id in users array
        let urlParts = request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);
        for (let i = 0; i < this.users.length; i++) {
          let user = this.users[i];
          if (user.id === id) {
            // delete user
            this.users.splice(i, 1);
            break;
          }
        }

        // respond 200 OK
        return of(new HttpResponse({ status: 200 }));
      } else {
        // return 401 not authorised if token is null or invalid
        return throwError({ status: 401, error: { message: 'Unauthorised' } });
      }
    }






  }
}

export let restfulApi = {
  provide: HTTP_INTERCEPTORS,
  useClass: RestfulApi,
  multi: true
};
