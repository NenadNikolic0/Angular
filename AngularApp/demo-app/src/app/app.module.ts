import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { BaseService } from './services/base.service';
import { AuthenticationService } from './services/authentication.service';

import { RestfulApi } from './classes/restful-api';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],

  providers: [
    BaseService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: RestfulApi, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
