import { inject } from '@angular/core';
import { authActions } from './auth.actions';
import { catchError, concatMap, exhaustMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { createEffect, Actions } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { routerActions } from '../../router/store/router.actions';
import { FlowRoutes } from '../../../enums/flow-routes';
import { SnackbarService } from '../../../services/snackbar.service';
import { constants } from '../../../constants/constants';
import { selectQueryParams } from '../../router/store/router.selectors';
import { Store } from '@ngrx/store';
import { ReviewsStore } from '../../../../reviews/data-access/reviews.store';
import { BookingStore } from '../../../../bookings/data-access/booking-store';
import { UsersStore } from '../../../../admin/data-access/users-store';

export const signup = createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService)) => {
        return actions$.pipe(
            ofType(authActions.signup),
            exhaustMap(({ signupData }) => authService.signup(signupData)
            .pipe(
                map(data => (authActions.signupSuccess({ user: data?.data?.data }))),
                catchError(error => of(authActions.signupFailure({ error: error?.error?.message })))
            )
          )
        );
    },
    { functional: true }
);

export const signupSuccess = createEffect(
    (actions$ = inject(Actions), snackbarService = inject(SnackbarService)) => {
        return actions$.pipe(
            ofType(authActions.signupSuccess),
            tap(({ user }) => localStorage.setItem(constants.CURRENT_USER, JSON.stringify(user))),
            map(() => {
                snackbarService.success('Account created and you have been logged in!');
                return routerActions.go({ path: [FlowRoutes.PROFILE] });
            })
        );
    },
    { functional: true }
);

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
    (actions$ = inject(Actions), snackbarService = inject(SnackbarService), store = inject(Store)) => {
        return actions$.pipe(
            ofType(authActions.loginSuccess),
            tap(({ user }) => localStorage.setItem(constants.CURRENT_USER, JSON.stringify(user))),
            withLatestFrom(store.select(selectQueryParams)),
            concatMap(([, queryParams]) => {
                snackbarService.success('Logged in successfully!');
                const returnUrl = queryParams.returnUrl;
                return [routerActions.go({ path: [returnUrl ? returnUrl : FlowRoutes.TOURS] })];
            })
        );
    },
    { functional: true }
);

export const logout = createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService)) => {
        return actions$.pipe(
            ofType(authActions.logout),
            exhaustMap(message => authService.logout()
            .pipe(
                map(() => authActions.logoutSuccess(message)),
                catchError(() => of(authActions.logoutFailure()))
            )
          )
        );
    },
    { functional: true }
);

export const logoutSuccess = createEffect(
    (actions$ = inject(Actions), snackbarService = inject(SnackbarService), reviewsStore = inject(ReviewsStore), bookingStore = inject(BookingStore), usersStore = inject(UsersStore)) => {
        return actions$.pipe(
            ofType(authActions.logoutSuccess),
            tap(() => localStorage.removeItem(constants.CURRENT_USER)),
            map(( {  message }) => {
                reviewsStore.clearStore();
                bookingStore.clearState();
                usersStore.clearStore();

                snackbarService.success(message);
                return routerActions.go({ path: [FlowRoutes.TOURS] });
            })
        );
    },
    { functional: true }
);

export const getMe = createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService)) => {
        return actions$.pipe(
            ofType(authActions.getMe),
            exhaustMap(() => authService.getMe()
            .pipe(
                map(data => authActions.getMeSuccess({ user: data?.data?.data })),
                catchError(error => of(authActions.getMeFailure({ error: error?.error?.message })))
            )
          )
        );
    },
    { functional: true }
);

export const getMeSuccess = createEffect(
    (actions$ = inject(Actions)) => {
        return actions$.pipe(
            ofType(authActions.getMeSuccess),
            tap(({ user }) => localStorage.setItem(constants.CURRENT_USER, JSON.stringify(user)))
        );
    },
    { functional: true, dispatch: false }
);

export const updateMe = createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService)) => {
        return actions$.pipe(
            ofType(authActions.updateMe),
            exhaustMap(({ user, callback }) => authService.updateMe(user)
            .pipe(
                tap(() => callback()),
                map(data => authActions.updateSuccess({ user: data?.data?.data })),
                catchError(error => of(authActions.updateFailure({ error: error?.error?.message })))
            )
          )
        );
    },
    { functional: true }
);

export const updateMeSuccess = createEffect(
    (actions$ = inject(Actions), snackbarService = inject(SnackbarService)) => {
        return actions$.pipe(
            ofType(authActions.updateSuccess),
            tap(({ user }) => localStorage.setItem(constants.CURRENT_USER, JSON.stringify(user))),
            map(() => snackbarService.success('DATA updated successfully!'))
        );
    },
    { functional: true, dispatch: false }
);

export const updatePassword = createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService)) => {
        return actions$.pipe(
            ofType(authActions.updatePassword),
            exhaustMap(({ passwordUpdateData, callback }) => authService.updatePassword(passwordUpdateData)
            .pipe(
                tap(() => callback()),
                map(data => authActions.updatePasswordSuccess({ user: data?.data?.data })),
                catchError(error => of(authActions.updatePasswordFailure({ error: error?.error?.message })))
            )
          )
        );
    },
    { functional: true }
);

export const updatePasswordSuccess = createEffect(
    (actions$ = inject(Actions), snackbarService = inject(SnackbarService)) => {
        return actions$.pipe(
            ofType(authActions.updatePasswordSuccess),
            map(() => snackbarService.success('Password changed successfully!'))
        );
    },
    { functional: true, dispatch: false }
);