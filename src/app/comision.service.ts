import { Injectable } from '@angular/core';
import { Comision } from './comision';
import { COMISIONES } from './mock-comisiones';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';



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

  addComision(comision: Comision): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.serverUrl}/comisiones`;
    return this.httpClient.post(url, comision, {responseType: 'text', headers: headers})
      .pipe(
          // tap(() => this.log(`add comision investigadorID =${comision.investigadorID}`)),
          // catchError(this.handleError('addContact', []))
      );
  }
}

