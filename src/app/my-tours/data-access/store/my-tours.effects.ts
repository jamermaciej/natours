import { inject } from '@angular/core';
import { bookingsActions } from './my-tours.actions';
import { catchError, exhaustMap, filter, map, tap } from 'rxjs/operators';
import { createEffect, Actions } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { myToursFeature } from './my-tours.state';
import { TourService } from '../../../tours/data-access/tour.service';
import { LoadStatus } from '../../../tours/enums/load-status';

export const getMyBookedTours = createEffect(
    (actions$ = inject(Actions), store = inject(Store)) => {
        return actions$.pipe(
            ofType(bookingsActions.getMyBookedTours),
            concatLatestFrom(() => store.select(myToursFeature.selectLoadStatus)),
            filter(([ ,loadStatus ]) => loadStatus === LoadStatus.NOT_LOADED),
            map(() => bookingsActions.loadMyBookedTours())
        );
    },
    { functional: true }
);

export const loadMyBookedTours = createEffect(
    (actions$ = inject(Actions), tourService = inject(TourService)) => {
        return actions$.pipe(
            ofType(bookingsActions.loadMyBookedTours),
            exhaustMap(() => tourService.getMyTours()
            .pipe(
                map(data => (bookingsActions.loadMyBookedToursSuccess({ tours: data?.data?.data }))),
                catchError(error => of(bookingsActions.loadMyBookedToursFailure({ error: error?.error?.message })))
            )
          )
        );
    },
    { functional: true }
);