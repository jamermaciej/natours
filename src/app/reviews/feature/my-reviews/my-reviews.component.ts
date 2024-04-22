import { Component, OnInit, inject } from '@angular/core';
import { ReviewsStore } from '../../data-access/reviews.store';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { ReviewListComponent } from '../../ui/review-list/review-list.component';
import { Store } from '@ngrx/store';
import { routerActions } from '../../../shared/data-access/router/store/router.actions';
import { FlowRoutes } from '../../../shared/enums/flow-routes';

@Component({
  selector: 'app-my-reviews',
  standalone: true,
  imports: [LoaderComponent, ReviewListComponent],
  template: `
    @if (reviewsStore.isLoading()) {
        <app-loader />
    } @else {
        <app-review-list [reviews]="reviewsStore.reviews()" (remove)="remove($event)" (edit)="edit($event)" />
    }
  `
})
export class MyReviewsComponent implements OnInit {
  readonly reviewsStore = inject(ReviewsStore);
  #store = inject(Store);

  ngOnInit() {
    this.reviewsStore.loadReviews();
  }

  edit(id: string) {
    this.#store.dispatch(routerActions.go({ path: [`${FlowRoutes.MY_REVIEWS}/${id}`] }));
  }

  remove(id: string) {
    this.reviewsStore.removeReview(id);
  }
}
