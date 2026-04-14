import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

import { StatusBadgeComponent } from '../../../shared/ui/status-badge/status-badge.component';
import { RouterLink } from '@angular/router';
import { FlowRoutes } from '../../../shared/enums/flow-routes';
import { ReviewIconComponent } from '../review-icon/review-icon.component';
import { BookingListItem } from '../../interfaces/booking-list-item';

@Component({
  selector: 'app-bookings-list',
  imports: [DatePipe, CurrencyPipe, StatusBadgeComponent, RouterLink, ReviewIconComponent],
  templateUrl: './bookings-list.component.html',
  styleUrl: './bookings-list.component.scss',
})
export class BookingsListComponent {
  readonly bookings = input.required<BookingListItem[]>();
  readonly heading = input<string>();
  readonly reviewAction = output<{ isReviewable: boolean; tourId: string }>();
  protected readonly flowRoutes = FlowRoutes;
}
