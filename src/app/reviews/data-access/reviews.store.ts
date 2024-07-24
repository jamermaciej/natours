
import { patchState, signalState } from '@ngrx/signals';
import { ReviewBody, Review, ReviewResponse } from '../../tours/interfaces/review';
import { Injectable, inject } from '@angular/core';
import { exhaustMap, filter, pipe, tap } from 'rxjs';
import { ReviewsService } from './reviews.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { Router } from '@angular/router';
import { FlowRoutes } from '../../shared/enums/flow-routes';

type ReviewsState = {
    reviews: ReviewResponse[];
    isLoading: boolean;
}

const initialState: ReviewsState = {
    reviews: [],
    isLoading: false
};

@Injectable({
  providedIn: 'root'
})
export class ReviewsStore {
    #router = inject(Router);
    readonly #reviewsService = inject(ReviewsService);
    readonly state = signalState(initialState);

    readonly reviews = this.state.reviews;
    readonly isLoading = this.state.isLoading;

    readonly loadReviews = rxMethod<void>(
        pipe(
          filter(() => !this.reviews().length),
          tap(() => patchState(this.state, { isLoading: true })),
          exhaustMap(() => {
            return this.#reviewsService.getMyReviews().pipe(
              tapResponse({
                next: (response) => patchState(this.state, { reviews: response.data.data }),
                error: console.error,
                finalize: () => patchState(this.state, { isLoading: false }),
              })
            );
          })
        )
    );

    readonly getReview = (id: string) => (
        this.reviews().find(review => review.id === id)
    );

    readonly updateReview = rxMethod<ReviewBody>(
        pipe(
          exhaustMap(review => {
            return this.#reviewsService.updateReview(review).pipe(
              tapResponse({
                next: (response) => {
                    patchState(this.state, {
                        reviews: this.state.reviews().map(r => r.id === review.id ? response.data.data : r)
                    });
                    this.#router.navigate([FlowRoutes.MY_REVIEWS]);
                },
                error: console.error,
              })
            );
          })
        )
    );

    readonly removeReview = rxMethod<string>(
        pipe(
          exhaustMap(id => {
            return this.#reviewsService.removeReview(id).pipe(
              tapResponse({
                next: () => patchState(this.state, {
                    reviews: this.reviews().filter(review => review.id !== id)
                }),
                error: console.error,
              })
            );
          })
        )
    );

    readonly addReview = rxMethod<ReviewBody>(
        pipe(
          exhaustMap(review => {
            return this.#reviewsService.addReview(review).pipe(
              tapResponse({
                next: (response) => {
                  patchState(this.state, (state) => ({
                    reviews: [...state.reviews, response.data.data]
                  }));
                  this.#router.navigate([FlowRoutes.MY_REVIEWS]);
                },
                error: console.error,
              })
            );
          })
        )
    );

    readonly isTourReviewed = (slug: string) => {
      return !!this.reviews().filter(review => review.tour.slug === slug).length;
    };

    readonly clearStore = () => {
      patchState(this.state, initialState);
    }
}
