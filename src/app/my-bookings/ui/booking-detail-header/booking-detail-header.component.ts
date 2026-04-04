import { Component, input, output } from '@angular/core';
import { BookingStatus } from '../../../tours/enums/booking-status';
import { StatusBadgeComponent } from '../../../shared/ui/status-badge/status-badge.component';

@Component({
  selector: 'app-booking-detail-header',
  imports: [StatusBadgeComponent],
  templateUrl: './booking-detail-header.component.html',
  styleUrl: './booking-detail-header.component.scss',
})
export class BookingDetailHeaderComponent {
  readonly reservationNumber = input.required<string>();
  readonly status = input.required<BookingStatus>();
  readonly paid = input.required<boolean>();
  protected readonly bookingCancelled = output<void>();
  protected readonly bookingStatus = BookingStatus;

  onCancelBooking() {
    this.bookingCancelled.emit();
  }
}
