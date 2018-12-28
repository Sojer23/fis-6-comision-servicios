import { Injectable } from '@angular/core';
import { Comision } from './comision';
import { COMISIONES } from './mock-comisiones';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ComisionService {

  serverUrl = "/api/v1";

  constructor(private httpClient: HttpClient) { }

  getComisiones(): Observable<Comision[]> {
    const url = this.serverUrl + "/comisiones";
    return this.httpClient.get<Comision[]>(url);    
  }
}

