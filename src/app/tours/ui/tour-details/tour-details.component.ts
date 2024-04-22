import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { RolePipe } from '../../../shared/pipes/role.pipe';
import { SplitParagraphPipe } from '../../../shared/pipes/split-paragraph.pipe';
import { TourReviewsComponent } from './tour-reviews/tour-reviews.component';
import { TourMapComponent } from './tour-map/tour-map.component';
import { Tour } from '../../interfaces/tour';
import { Router, RouterLink } from '@angular/router';
import { FlowRoutes } from '../../../shared/enums/flow-routes';
import { User } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-tour-details',
  standalone: true,
  imports: [CommonModule, RolePipe, SplitParagraphPipe, TourReviewsComponent, TourMapComponent, RouterLink],
  templateUrl: './tour-details.component.html',
  styleUrl: './tour-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TourDetailsComponent {
  router = inject(Router);
  @Input({ required: true }) tour!: Tour;
  @Input({ required: true }) user!: User;
  @Input({ required: true }) isLoggedIn!: boolean;
  isProccessingPayment = input<boolean>();

  @Output() onBookTour: EventEmitter<string> = new EventEmitter<string>();

  readonly toursImgUrl = `${environment.apiHostUrl}/img/tours/`;
  readonly usersImgUrl = `${environment.apiHostUrl}/img/users/`;
  readonly flowRoutes = FlowRoutes;

  bookTour() {
    this.onBookTour.emit(this.tour._id);
  }
}
