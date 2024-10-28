
import { patchState, signalState } from '@ngrx/signals';
import { Injectable, inject } from '@angular/core';
import { exhaustMap, filter, pipe, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { TourService } from '../../tour.service';
import { Tour } from '../../../interfaces/tour';

type RecommendedToursState = {
    tours: Tour[];
    isLoading: boolean;
}

const initialState: RecommendedToursState = {
    tours: [],
    isLoading: false
};

@Injectable({
  providedIn: 'root'
})
export class RecommendedToursStore {
    readonly #tourService = inject(TourService);
    readonly state = signalState(initialState);

    readonly tours = this.state.tours;
    readonly isLoading = this.state.isLoading;

    readonly loadRecommendedTours = rxMethod<void>(
        pipe(
          filter(() => !this.tours().length),
          tap(() => patchState(this.state, { isLoading: true })),
          exhaustMap(() => {
            return this.#tourService.getRecommendedTours().pipe(
              tapResponse({
                next: (response) => patchState(this.state, { tours: response.data.data }),
                error: console.error,
                finalize: () => patchState(this.state, { isLoading: false }),
              })
            );
          })
        )
    );

    readonly clearStore = () => {
      patchState(this.state, initialState);
    }
}
