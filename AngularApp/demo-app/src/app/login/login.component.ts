import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authSvc: AuthenticationService
    ) { }

  ngOnInit() {
    this.login = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // clear all user data 
    this.authSvc.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.login.controls; }

  submitForm() {
    this.submitted = true;

    // if form is not valid return 
    if (this.login.invalid) {
      return;
    }

    this.loading = true;

    //Call authentication service login method 
    this.authSvc.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        // if callback is received with success
        data => {
          this.router.navigate(['/dashboard']);
      },
        // if error occured (bad authentication or something)
      error => {       
          alert('Error occured during login: '+error.error.message);
          this.loading = false;
        });
  }

}
