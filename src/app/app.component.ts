import { Component, OnInit } from '@angular/core';
import * as auth0 from 'auth0-js';
import { AuthService } from './services/auth.service';
import { Profile } from 'selenium-webdriver/firefox';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  // profile: any;

  constructor(public auth: AuthService, private router: Router) {
    auth.handleAuthentication();
  }

  ngOnInit() {

    if (this.auth.isAuthenticated()) {
      this.auth.renewTokens();
      // Esto ya se hace en handleAuthentication()
      // if (this.auth.userProfile) {
      //   this.profile = this.auth.userProfile;
      // } else {
      //   this.auth.getProfile((err, profile) => {
      //     this.profile = profile;
      //   });
      // }
    }
    else{
      this.router.navigate(['/']);
    }

  
    
  }


}