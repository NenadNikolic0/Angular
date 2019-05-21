import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router) { }

  public currentUser: any;
  public username: string;
  public logoutDialog: boolean = false;

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('loggedUser'));

    if (this.currentUser && this.currentUser.username) {
      this.username = String(this.currentUser.username);
    }

    else {
      this.router.navigate(['/login']);
    }

    
  }

  showDialog() {
    this.logoutDialog ? this.logoutDialog = false : this.logoutDialog = true;
  }


}
