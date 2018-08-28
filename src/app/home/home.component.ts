import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service:LoginService) { }
  loggedIn: string;
  userType: string;
  user: string;
  ngOnInit() {
    this.loggedIn = localStorage.getItem("loggedIn");
    this.userType = localStorage.getItem("userType");
    this.user = localStorage.getItem("user");
  }

  logout() {
    this.service.logout();
  }

}
