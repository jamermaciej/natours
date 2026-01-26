import { Component, inject, input } from '@angular/core';
import { ReviewFormComponent } from '../../ui/review-form/review-form.component';
import { ReviewsStore } from '../../data-access/reviews.store';
import { PageWrapperComponent } from '../../../layout/ui/page-wrapper/page-wrapper.component';
import { ReviewBody, Review } from '../../../tours/interfaces/review';

@Component({
    selector: 'app-review',
    imports: [PageWrapperComponent, ReviewFormComponent],
    templateUrl: './review.component.html',
    styleUrl: './review.component.scss'
})
export class ReviewComponent {
  readonly reviewsStore = inject(ReviewsStore);
  id = input.required<string>();
  mode = input<string>();

  tour = input<string>();
  user = input<string>();

  ngOnInit() {
    this.reviewsStore.loadReviews();
  }

  onSave(review: ReviewBody) {
    if (this.mode() === 'edit') {
      this.reviewsStore.updateReview(review);
    } else {
      this.reviewsStore.addReview(review);
    }
  }
}
