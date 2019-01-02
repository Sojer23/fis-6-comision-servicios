import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any;
  rol: string;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      this.rol = this.profile['http://sos1617-02.com/roles'][0];
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        this.rol = this.profile['http://sos1617-02.com/roles'][0];
      });
    }
  }

}