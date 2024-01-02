import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { routerActions } from './router.actions';
import { tap } from 'rxjs/operators';
import { createEffect, Actions } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';

export const navigate = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
        return actions$.pipe(
            ofType(routerActions.go),
            tap(({ path, query: queryParams, extras }) => {
                router.navigate(path, { queryParams, ...extras });
            })
        );
    },
    { functional: true, dispatch: false }
);

export const navigateBack = createEffect(
    (actions$ = inject(Actions), location = inject(Location)) => {
        return actions$.pipe(
            ofType(routerActions.back),
            tap(() => location.back())
        );
    },
    { functional: true, dispatch: false }
);

export const navigateForward = createEffect(
    (actions$ = inject(Actions), location = inject(Location)) => {
        return actions$.pipe(
            ofType(routerActions.forward),
            tap(() => location.forward())
        );
    },
    { functional: true, dispatch: false }
);