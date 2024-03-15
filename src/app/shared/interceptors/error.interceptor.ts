import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { authActions } from '../data-access/auth/store/auth.actions';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);

  return next(req).pipe(
    catchError(err => {
      if (err instanceof HttpErrorResponse) {
        if (err && err.status === 401) {
          store.dispatch(authActions.logout({ message: 'Session expired, you have been logged out.'}));
        }
      }
      return throwError(() => err);
    }
  ));
};
