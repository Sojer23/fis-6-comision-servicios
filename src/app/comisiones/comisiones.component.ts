import { Component, OnInit } from '@angular/core';
import { Comision } from '../comision';
import { ComisionService } from '../comision.service';


@Component({
  selector: 'app-comisiones',
  templateUrl: './comisiones.component.html',
  styleUrls: ['./comisiones.component.css']
})
export class ComisionesComponent implements OnInit {


  comisiones: Comision[];
  selectedComision: Comision;
  newComision: Comision = {
    _id:null,
    investigadorID: null,
    destino: null,
    fechaInicio: null,
    fechaFin: null,
    sustitutoID: null,
    razon: null,
    coste: null,
    proyectoID: null,
    estado: null,
  };

  
  constructor(private comisionService: ComisionService) { }

  addComision() {
    this.comisionService.addComision(this.newComision)
      .subscribe(() => {
        this.comisiones.push(this.newComision);
        this.newComision = {
          _id:null,
          investigadorID: null,
          destino: null,
          fechaInicio: null,
          fechaFin: null,
          sustitutoID: null,
          razon: null,
          coste: null,
          proyectoID: null,
          estado: null
        };
      });
    }

    
  getComisiones() {
    this.comisionService.getComisiones()
      .subscribe((comisiones) => {
        this.comisiones = comisiones;
      });
  }

  onEdit(comision: Comision): void {
    this.selectedComision = comision;
  }

  ngOnInit() {
    this.getComisiones();
  }

}
