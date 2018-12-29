import { Component, OnInit } from '@angular/core';
import * as auth0 from 'auth0-js';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private as: AuthService) { }

  ngOnInit() {
  }

  login(){
    this.as.login();
  }


}
