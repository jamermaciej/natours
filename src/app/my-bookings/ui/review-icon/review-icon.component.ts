import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-review-icon',
  imports: [],
  templateUrl: './review-icon.component.html',
  styleUrl: './review-icon.component.scss',
})
export class ReviewIconComponent {
  readonly isReviewable = input.required<boolean>();
  readonly hasReview = input.required<boolean>();
  readonly action = output<void>();
}
