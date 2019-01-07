import { Component, OnInit } from '@angular/core';
import { Comision } from '../comision';
import { ComisionService } from '../comision.service';
import { estadoFilter } from '../estadoFilter.pipe'

@Component({
  selector: 'app-comisiones-admin',
  templateUrl: './comisiones-admin.component.html',
  styleUrls: ['./comisiones-admin.component.css']
})
export class ComisionesAdminComponent implements OnInit {

  comisiones: Comision[];
  selectedEstado: String = "TODAS";
  selectedID: string = "";
  estados = ["SOLICITADA", "SUBSANACION","ACEPTADA", "RECHAZADA"]


  constructor(private comisionService: ComisionService) { }

  getComisiones() {
    this.comisionService.getComisiones()
      .subscribe((comisiones) => {
        this.comisiones = comisiones;
      });
  }


  ngOnInit() {
    this.getComisiones();
  }

  clear(){
    this.selectedEstado = "TODAS";
    this.selectedID = "";
  }

}
