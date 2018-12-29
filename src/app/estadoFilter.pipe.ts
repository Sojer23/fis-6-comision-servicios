import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {Comision} from './comision';

@Pipe({
  name: 'estadoFilter'
})
@Injectable()
export class estadoFilter implements PipeTransform {
  ESTADOS:String[] = ["SOLICITADA", "SUBSANACION","ACEPTADA", "RECHAZADA"]

  transform(comisiones: Comision[], estado:String): any {
    if (this.ESTADOS.includes(estado)){
      return comisiones.filter(comisiones => comisiones.estado == estado);
    }
    else{
      return comisiones
    }
  }
}