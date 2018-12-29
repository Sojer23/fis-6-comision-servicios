import { Component, OnInit } from '@angular/core';
import { Comision } from '../comision';
import { ComisionService } from '../comision.service';
import { estadoFilter } from '../estadoFilter.pipe'

@Component({
  selector: 'app-list-comisiones',
  templateUrl: './list-comisiones.component.html',
  styleUrls: ['./list-comisiones.component.css']
})
export class ListComisionesComponent implements OnInit {

  comisiones: Comision[];
  selectedEstado: String = "TODAS";
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

}
