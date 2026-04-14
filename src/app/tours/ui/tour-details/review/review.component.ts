import { Component, input } from '@angular/core';
import { UserImgComponent } from '../../../../shared/ui/user-img/user-img.component';
import { RatingComponent } from '../../../../shared/ui/rating/rating.component';
import { ReviewResponse } from '../../../interfaces/review';

@Component({
  selector: 'app-review',
  imports: [UserImgComponent, RatingComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
})
export class ReviewComponent {
  readonly review = input.required<ReviewResponse>();
}
