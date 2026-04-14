import { Component, inject, input } from '@angular/core';
import { ReviewFormComponent } from '../../ui/review-form/review-form.component';
import { ReviewsStore } from '../../data-access/reviews.store';
import { ReviewBody } from '../../../tours/interfaces/review';
import { ContentWrapperComponent } from '../../../shared/ui/content-wrapper/content-wrapper.component';

@Component({
  selector: 'app-review',
  imports: [ContentWrapperComponent, ReviewFormComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
})
export class ReviewComponent {
  readonly reviewsStore = inject(ReviewsStore);
  id = input.required<string>();
  mode = input<string>();

  tour = input<string>();
  user = input<string>();

  onSave(review: ReviewBody) {
    if (this.mode() === 'edit') {
      this.reviewsStore.updateReview(review);
    } else {
      this.reviewsStore.addReview(review);
    }
  }
}
