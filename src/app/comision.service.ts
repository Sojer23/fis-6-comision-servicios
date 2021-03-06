import { Injectable } from '@angular/core';
import { Comision } from './comision';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComisionService {

  private comisionesUrl = 'api/v1';

  
  private apikeyUrl =  '?apikey='+ sessionStorage.getItem('apiKey');  

  
  constructor(private http: HttpClient) { 
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    //this.messageService.add(`HeroService: ${message}`);
    console.log(`HeroService: ${message}`);
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
  

  getComision(_id:String): Observable<Comision[]> {
    const url = `${this.comisionesUrl}/comisiones/${_id}${this.apikeyUrl}`;
    return this.http.get<Comision[]>(url)
      .pipe(
          tap(() => this.log('fetched comision')),
          catchError(this.handleError('getComision', []))
      );
  }

  getComisiones(): Observable<Comision[]> {
    const url = `${this.comisionesUrl}/comisiones${this.apikeyUrl}`;
    return this.http.get<Comision[]>(url)
      .pipe(
          tap(() => this.log('fetched comisiones')),
          catchError(this.handleError('getComisiones', []))
      );
  }


  getComisionesByInvestigador(investigadorID: String): Observable<Comision[]> {
    const url = `${this.comisionesUrl}/comisiones/i/${investigadorID}${this.apikeyUrl}`;
    return this.http.get<Comision[]>(url)
      .pipe(
          tap(() => this.log(`fetched comisiones investigador = ${investigadorID}`)),
          catchError(this.handleError('getComisionesByInvestigador', []))
      );
  }


  getComisionesByProject(proyectoID: String): Observable<Comision[]> {
    const url = `${this.comisionesUrl}/comisiones/p/${proyectoID}${this.apikeyUrl}`;
    return this.http.get<Comision[]>(url)
      .pipe(
          tap(() => this.log(`fetched comisiones proyecto = ${proyectoID}`)),
          catchError(this.handleError('getComisionesByProject', []))
      );
  }




  addComision(comision: Comision): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.comisionesUrl}/comisiones${this.apikeyUrl}`;
    return this.http.post(url, comision, {responseType: 'text', headers: headers})
      .pipe(
          tap(() => this.log(`add comision investigadorID =${comision.investigadorID} \
                , destino = ${comision.destino}`)),
          catchError(this.handleError('addComision', []))
      );
  }

  updateComision(comision: Comision): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    const url = `${this.comisionesUrl}/comisiones${this.apikeyUrl}`;
    return this.http.put(url, comision, {responseType: 'text', headers: headers})
        .pipe(
          tap(() => this.log(`updated comision investigadorID =${comision.investigadorID} \
          , destino = ${comision.destino}`)),
          catchError(this.handleError('updateComision', []))
      );    
  }

  deleteComision(_id:String): Observable<Comision[]> {
    const url = `${this.comisionesUrl}/comisiones/${_id}${this.apikeyUrl}`;
    return this.http.delete<Comision[]>(url)
      .pipe(
          tap(() => this.log('fetched comision')),
          catchError(this.handleError('deleteComision', []))
      );
  }


}