import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{ 

  profile: any;

  constructor(public auth:AuthService){ }

  ngOnInit(){
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        if(this.auth.isAuthenticated()){
          console.log("El usuario "+profile.nickname+" ha iniciado sesión.");
        }
      });
    }
  }
}