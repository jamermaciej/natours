import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, take, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { authActions } from '../data-access/auth/store/auth.actions';
import { authFeature } from '../../shared/data-access/auth/store/auth.state';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);

  return next(req).pipe(
    catchError(err => {
      if (err instanceof HttpErrorResponse) {
        if (err && err.status === 401) {
          return store.select(authFeature.selectIsLoggedIn).pipe(
            take(1),
            switchMap((isLoggedIn) => {
              if (isLoggedIn) {
                store.dispatch(authActions.logout({ message: 'Session expired, you have been logged out.'}));
              }
      
              return next(req);
            })
          );
        }
      }
      return throwError(() => err);
    }
  ));
};
