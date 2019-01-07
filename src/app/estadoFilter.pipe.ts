import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {Comision} from './comision';

@Pipe({
  name: 'estadoFilter'
})
@Injectable()
export class estadoFilter implements PipeTransform {
  ESTADOS:String[] = ["SOLICITADA", "SUBSANACION","ACEPTADA", "RECHAZADA"]

  transform(comisiones: Comision[], estado:String, id:string): any {
    if (this.ESTADOS.includes(estado)){
      return comisiones.filter(comision => 
        comision.estado == estado && comision.investigadorID.includes(id));
    }
    else{
      if(comisiones){
        return comisiones.filter(comision => comision.investigadorID.includes(id))
        .sort((a,b) => this.ESTADOS.indexOf(a.estado)- this.ESTADOS.indexOf(b.estado));
      }
    }
  }
}