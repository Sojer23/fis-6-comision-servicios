import { Injectable } from '@angular/core';
import { Researcher } from './researcher';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ResearcherService {

  private researcherUrl = 'api/v1/researchers/';
  private apikeyUrl = '?apikey='+ environment.apikey;

  constructor(
    private http: HttpClient
  ) { }

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
  

  getResearcher(dni:String): Observable<Researcher[]> {
    const url = `${this.researcherUrl}${dni}${this.apikeyUrl}`;
    console.log(url);
    return this.http.get<Researcher[]>(url)
      .pipe(
          tap(() => this.log('fetched researcher')),
          catchError(this.handleError('getResearcher', []))
      );
  }

}