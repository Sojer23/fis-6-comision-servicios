import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Researcher } from '../researcher';
import { ResearcherService } from '../researcher.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any;
  researcher: Researcher[]=[];
  rol: string;

  constructor(private researcherService: ResearcherService, public auth: AuthService) { }

    
  getResearcher(dni: String) {
    this.researcherService.getResearcher(dni.toUpperCase())
      .subscribe((researcher) => {
        this.researcher = researcher;
        console.log(researcher);
      });
  }

  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      console.log("Here 1");
      this.getResearcher(this.profile.nickname);
      this.rol = this.profile['http://sos1617-02.com/roles'][0];
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        console.log("Here 2");
        this.getResearcher(this.profile.nickname);
        this.rol = this.profile['http://sos1617-02.com/roles'][0];
      });
    }
  }

}