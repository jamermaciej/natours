import { Component, EventEmitter, Output, input, output } from '@angular/core';
import { Review, ReviewResponse } from '../../../tours/interfaces/review';
import { RatingComponent } from '../../../shared/ui/rating/rating.component';
import { FlowRoutes } from '../../../shared/enums/flow-routes';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [RatingComponent, RouterLink, RouterOutlet],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.scss'
})
export class ReviewListComponent {
  reviews = input.required<ReviewResponse[]>();
  edit = output<string>();
  remove = output<string>();

  flowRoutes = FlowRoutes;
}
