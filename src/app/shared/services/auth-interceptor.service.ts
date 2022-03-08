import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private authService: ApiService,
    private router: Router
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

      const token = this.authService.getToken();
      console.log('token',token)
      let request = req;

      if (token) {
        request = req.clone({
          setHeaders: {
            authorization: `Bearer ${ token }`
          }
        });
      }

      return next.handle(request).pipe(
        catchError((err: HttpErrorResponse) => {

          if (err.status === 401) {

           // this.router.navigateByUrl('/login');
          }

          return throwError( err );

        })
      );
  }
}
