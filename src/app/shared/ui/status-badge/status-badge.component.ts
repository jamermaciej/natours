import { Component, input } from '@angular/core';
import { BOOKING_STATUS_LABELS } from '../../../tours/enums/booking-status-labels';
import { BookingStatus } from '../../../tours/enums/booking-status';

@Component({
  selector: 'app-status-badge',
  imports: [],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.scss',
})
export class StatusBadgeComponent {
  readonly status = input.required<BookingStatus>();
  protected readonly bookingStatusLabels = BOOKING_STATUS_LABELS;
}
