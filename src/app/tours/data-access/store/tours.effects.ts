import { inject } from '@angular/core';
import { toursActions } from './tours.actions';
import { catchError, exhaustMap, filter, map } from 'rxjs/operators';
import { createEffect, Actions, concatLatestFrom } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { TourService } from '../tour.service';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { toursFeature } from './tours.state';
import { LoadStatus } from '../../enums/load-status';

export const getTours = createEffect(
    (actions$ = inject(Actions), store = inject(Store)) => {
        return actions$.pipe(
            ofType(toursActions.getTours),
            concatLatestFrom(() => store.select(toursFeature.selectLoadStatus)),
            filter(([ ,loadStatus ]) => loadStatus === LoadStatus.NOT_LOADED),
            map(() => toursActions.loadTours())
        );
    },
    { functional: true }
);

export const loadTours = createEffect(
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