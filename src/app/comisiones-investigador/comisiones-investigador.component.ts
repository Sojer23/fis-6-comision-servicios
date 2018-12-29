import { Component, OnInit,Input } from '@angular/core';
import { Comision } from '../comision';
import { ComisionService } from '../comision.service';

@Component({
  selector: 'app-comisiones-investigador',
  templateUrl: './comisiones-investigador.component.html',
  styleUrls: ['./comisiones-investigador.component.css']
})
export class ComisionesInvestigadorComponent implements OnInit {

  @Input() investigadorID:String;
  comisiones: Comision[];


  constructor(private comisionService: ComisionService) { }

  
  getComisionesByID() {
    this.comisionService.getComisionesByID(this.investigadorID)
      .subscribe((comisiones) => {
        this.comisiones = comisiones;
      });
  }


  ngOnInit() {
    this.investigadorID = "25353345E";
    this.getComisionesByID();
  }

}
