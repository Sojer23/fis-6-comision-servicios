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

  @Input() investigadorID:String;
  comisiones: Comision[];
  profile: any;


  constructor(private comisionService: ComisionService, public auth: AuthService) { }

  
  getComisionesByID() {
    this.comisionService.getComisionesByID(this.investigadorID.toUpperCase())
      .subscribe((comisiones) => {
        this.comisiones = comisiones;
      });
  }


  ngOnInit() {

    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      console.log("Mostrando las comisiones solicitadas por el investigador: "+ this.profile.nickname);
      this.investigadorID = this.profile.nickname;
      this.getComisionesByID();
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        console.log("Mostrando las comisiones solicitadas por el investigador: "+ this.profile.nickname);
        this.investigadorID = this.profile.nickname;
        this.getComisionesByID();
      });
    }
  }

}
