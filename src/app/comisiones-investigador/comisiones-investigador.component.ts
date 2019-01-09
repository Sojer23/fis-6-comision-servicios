import { Component, OnInit,Input } from '@angular/core';
import { Comision } from '../comision';
import { ComisionService } from '../comision.service';
import { AuthService } from '../services/auth.service';
import { ResearcherService } from '../researcher.service';

@Component({
  selector: 'app-comisiones-investigador',
  templateUrl: './comisiones-investigador.component.html',
  styleUrls: ['./comisiones-investigador.component.css']
})

export class ComisionesInvestigadorComponent implements OnInit {

  comisiones: Comision[] = [];
  profile: any;
  researcher: any;

  constructor(private comisionService: ComisionService, private researcherService: ResearcherService, public auth: AuthService) { }

  getComisionesByInvestigador(investigadorID: String) {
    this.comisionService.getComisionesByInvestigador(investigadorID.toUpperCase())
      .subscribe((comisiones) => {
        this.comisiones = comisiones;
      });
  }

  getResearcher(dni: String) {
    this.researcherService.getResearcher(dni.toUpperCase())
      .subscribe((researcher) => {
        this.researcher = researcher;
      });
  }

  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      console.log("Mostrando las comisiones solicitadas por el investigador: "+ this.profile.nickname);
      this.getComisionesByInvestigador(this.profile.nickname);
      this.getResearcher(this.profile.nickname);
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        console.log("Mostrando las comisiones solicitadas por el investigador: "+ this.profile.nickname);
        this.getComisionesByInvestigador(this.profile.nickname);
        this.getResearcher(this.profile.nickname);
      });
    }
  }
}
