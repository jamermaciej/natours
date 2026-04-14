import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  input,
} from '@angular/core';

import { environment } from '../../../../environments/environment';
import { RolePipe } from '../../../shared/pipes/role.pipe';
import { SplitParagraphPipe } from '../../../shared/pipes/split-paragraph.pipe';
import { TourReviewsComponent } from './tour-reviews/tour-reviews.component';
import { TourMapComponent } from './tour-map/tour-map.component';
import { Tour } from '../../interfaces/tour';
import { Router, RouterLink } from '@angular/router';
import { FlowRoutes } from '../../../shared/enums/flow-routes';
import { User } from '../../../shared/interfaces/user';
import { CtaSectionComponent } from '../../../shared/ui/cta-section/cta-section.component';
import { AvailableDatePipe } from '../../pipes/available-date.pipe';
import { BookTourComponent } from '../book-tour/book-tour.component';
import { ReviewResponse } from '../../interfaces/review';
import { DatePipe } from '@angular/common';
import { CountdownComponent } from '../../../shared/ui/countdown/countdown.component';
import { ReviewComponent } from './review/review.component';

@Component({
  selector: 'app-tour-details',
  imports: [
    RolePipe,
    SplitParagraphPipe,
    TourReviewsComponent,
    TourMapComponent,
    RouterLink,
    CtaSectionComponent,
    AvailableDatePipe,
    BookTourComponent,
    CountdownComponent,
    DatePipe,
    ReviewComponent,
  ],
  templateUrl: './tour-details.component.html',
  styleUrl: './tour-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TourDetailsComponent {
  router = inject(Router);
  @Input({ required: true }) tour!: Tour;
  @Input({ required: true }) user!: User;
  @Input({ required: true }) isLoggedIn!: boolean;
  isTourBooked = input<boolean>();
  userReview = input<ReviewResponse>();
  isProccessingPayment = input<boolean>();
  isTourCompleted = input<boolean>();
  startDate = input<Date>();
  selectedDate!: Date;

  @Output() tourBooked: EventEmitter<{ tourId: string; date: Date }> = new EventEmitter<{
    tourId: string;
    date: Date;
  }>();

  readonly toursImgUrl = `${environment.apiHostUrl}/img/tours/`;
  readonly usersImgUrl = `${environment.apiHostUrl}/img/users/`;
  readonly flowRoutes = FlowRoutes;

  bookTour() {
    this.tourBooked.emit({ tourId: this.tour._id, date: this.selectedDate });
  }

  isAvailable() {
    const dates = [];
    for (const date of this.tour.startDates) {
      dates.push(date.date);
    }

    return dates.some(d => new Date(d).getTime() > new Date().getTime());
  }
}
