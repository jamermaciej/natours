import { inject } from '@angular/core';
import { toursActions } from './tours.actions';
import { catchError, exhaustMap, filter, map, tap } from 'rxjs/operators';
import { createEffect, Actions } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { TourService } from '../tour.service';
import { EMPTY, of } from 'rxjs';

export const navigate = createEffect(
    (actions$ = inject(Actions), tourService = inject(TourService)) => {
        return actions$.pipe(
            ofType(toursActions.loadTours),
            exhaustMap(() => tourService.getTours()
            .pipe(
                map(data => (toursActions.loadToursSuccess({ tours: data?.data?.data }))),
                catchError(error => of(toursActions.loadToursFailure({ error: error?.error?.message })))
            )
          )
        );
    },
    { functional: true }
);