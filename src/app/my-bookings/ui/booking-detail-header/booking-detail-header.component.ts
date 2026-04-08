import { Component, input, output } from '@angular/core';
import { BookingStatus } from '../../../tours/enums/booking-status';
import { StatusBadgeComponent } from '../../../shared/ui/status-badge/status-badge.component';
import { RouterLink } from '@angular/router';
import { FlowRoutes } from '../../../shared/enums/flow-routes';

@Component({
  selector: 'app-booking-detail-header',
  imports: [StatusBadgeComponent, RouterLink],
  templateUrl: './booking-detail-header.component.html',
  styleUrl: './booking-detail-header.component.scss',
})
export class BookingDetailHeaderComponent {
  readonly reservationNumber = input.required<string>();
  readonly status = input.required<BookingStatus>();
  readonly paid = input.required<boolean>();
  readonly canCancel = input.required<boolean>();
  readonly tourSlug = input.required<string>();
  protected readonly bookingCancelled = output<void>();
  protected readonly bookingStatus = BookingStatus;
  protected readonly flowRoutes = FlowRoutes;

  onCancelBooking() {
    this.bookingCancelled.emit();
  }
}
