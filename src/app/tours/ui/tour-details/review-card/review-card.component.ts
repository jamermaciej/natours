import { Component, input } from '@angular/core';
import { ReviewResponse } from '../../../interfaces/review';
import { environment } from '../../../../../environments/environment';
import { RatingComponent } from '../../../../shared/ui/rating/rating.component';

@Component({
  selector: 'app-review-card',
  imports: [RatingComponent],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss',
})
export class ReviewCardComponent {
  readonly review = input.required<ReviewResponse>();
  protected readonly apiHostUrl = environment.apiHostUrl;
}
