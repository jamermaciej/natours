import { inject } from '@angular/core';
import { authActions } from './auth.actions';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { createEffect, Actions } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { routerActions } from '../../router/store/router.actions';
import { FlowRoutes } from '../../../enums/flow-routes';
import { SnackbarService } from '../../../services/snackbar.service';

export const login = createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService)) => {
        return actions$.pipe(
            ofType(authActions.login),
            exhaustMap(({ email, password }) => authService.login(email, password)
            .pipe(
                map(data => (authActions.loginSuccess({ user: data?.data?.data }))),
                catchError(error => of(authActions.loginFailure({ error: error?.error?.message })))
            )
          )
        );
    },
    { functional: true }
);

export const loginSuccess = createEffect(
    (actions$ = inject(Actions), snackbarService = inject(SnackbarService)) => {
        return actions$.pipe(
            ofType(authActions.loginSuccess),
            tap(({ user }) => localStorage.setItem('user', JSON.stringify(user))),
            map(() => {
                snackbarService.success('Logged in successfully!');
                return routerActions.go({ path: [FlowRoutes.TOURS] });
            })
        );
    },
    { functional: true }
);

export const logout = createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService), snackbarService = inject(SnackbarService)) => {
        return actions$.pipe(
            ofType(authActions.logout),
            exhaustMap(() => authService.logout()
            .pipe(
                map(() => {
                    snackbarService.success('Logged out successfully!');
                    return authActions.logoutSuccess();
                }),
                catchError(() => of(authActions.logoutFailure()))
            )
          )
        );
    },
    { functional: true }
);

export const logoutSuccess = createEffect(
    (actions$ = inject(Actions)) => {
        return actions$.pipe(
            ofType(authActions.logoutSuccess),
            tap(() => localStorage.removeItem('user')),
            map(() => routerActions.go({ path: [FlowRoutes.TOURS] }))
        );
    },
    { functional: true }
);