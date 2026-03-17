import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, take, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { authActions } from '../data-access/auth/store/auth.actions';
import { authFeature } from '../../shared/data-access/auth/store/auth.state';
import { Router } from '@angular/router';
import { FlowRoutes } from '../enums/flow-routes';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const router = inject(Router);

  return next(req).pipe(
    catchError(err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          return store.select(authFeature.selectIsLoggedIn).pipe(
            take(1),
            switchMap(isLoggedIn => {
              if (isLoggedIn) {
                store.dispatch(
                  authActions.logout({ message: 'Session expired, you have been logged out.' }),
                );
              }

              return throwError(() => err);
            }),
          );
        }
        if (err.status === 403) {
          router.navigate([FlowRoutes.PROFILE]);
        }
      }
      return throwError(() => err);
    }),
  );
};
