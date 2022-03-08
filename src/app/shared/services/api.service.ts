import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public activeRol: string;

  private apiRoute = `${environment.apiURL}`;
  public auth_token='Bearer '+localStorage.getItem('tokenscloud')

  constructor(
    private httpClient: HttpClient,
  ) { }

  corporativoAll() {
    return this.httpClient.get(this.apiRoute+"/corporativos").pipe(
      catchError(this.handleError<any>())
    );
  }
  corporativoDetalle(id) {
    return this.httpClient.get(`${this.apiRoute}/corporativos/${id}`).pipe(
      catchError(this.handleError<any>())
    );
  }
  getToken(): any {
    return localStorage.getItem('tokenscloud');
  }

  private handleError<T>() {
    return (error: any): Observable<T> => {
      return of(error as T);
    };
  }



}
