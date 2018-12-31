import { Component, OnInit, Input } from '@angular/core';
import { Comision } from '../comision'
import { ComisionService } from '../comision.service';

@Component({
  selector: '[app-editable-comision]',
  templateUrl: './editable-comision.component.html',
  styleUrls: ['./editable-comision.component.css']
})
export class EditableComisionComponent implements OnInit {


  @Input() comision: Comision;
  editable = false;
  updatedEstado = null;
  estados = ["SOLICITADA", "ACEPTADA", "RECHAZADA", "SUBSANACION"]



  constructor(private comisionService: ComisionService) { }

  
  onEdit(): void {
    if (this.editable) {
      this.comision.estado = this.updatedEstado;
      this.comisionService.updateComision(this.comision)
         .subscribe(() => this.editable = !this.editable);
    } else {
      this.editable = ! this.editable;
    }
  }
  
  onDelete(): void {
    this.comisionService.deleteComision(this.comision._id).subscribe()
  }


  ngOnInit() {
    this.updatedEstado = this.comision.estado;
  }

}
