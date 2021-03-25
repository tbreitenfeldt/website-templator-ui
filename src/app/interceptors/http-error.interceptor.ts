import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
//import { UserService } from '../services/user.service';
import { ErrorService } from '../services/error.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private errorService: ErrorService
  ) //private userService: UserService
  {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.errorService.error = null;

    return next.handle(request).pipe(
      retry(3),
      catchError((err) => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          //this.userService.logout();
        } else if (err.status === 0 && err.statusText === 'Unknown Error') {
          err.statusText =
            'Problem reaching server, please contact the administrator';
        }

        this.errorService.error = err;
        return throwError(this.errorService.errorMessage);
      })
    );
  }
}
