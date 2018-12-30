import { Component, OnInit,Input } from '@angular/core';
import { Comision } from '../comision';
import { ComisionService } from '../comision.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-comisiones-investigador',
  templateUrl: './comisiones-investigador.component.html',
  styleUrls: ['./comisiones-investigador.component.css']
})

export class ComisionesInvestigadorComponent implements OnInit {

  comisiones: Comision[] = [];
  profile: any;

  constructor(private comisionService: ComisionService, public auth: AuthService) { }

  
  getComisionesByInvestigador(investigadorID: String) {
    this.comisionService.getComisionesByInvestigador(investigadorID.toUpperCase())
      .subscribe((comisiones) => {
        this.comisiones = comisiones;
      });
  }


  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      console.log("Mostrando las comisiones solicitadas por el investigador: "+ this.profile.nickname);
      this.getComisionesByInvestigador(this.profile.nickname);
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        console.log("Mostrando las comisiones solicitadas por el investigador: "+ this.profile.nickname);
        this.getComisionesByInvestigador(this.profile.nickname);
      });
    }


  }

  

}
