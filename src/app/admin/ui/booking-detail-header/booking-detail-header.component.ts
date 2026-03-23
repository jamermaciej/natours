import { Component, input, output } from '@angular/core';
import { StatusBadgeComponent } from '../../../shared/ui/status-badge/status-badge.component';
import { BookingStatus } from '../../../tours/enums/booking-status';

@Component({
  selector: 'app-booking-detail-header',
  imports: [StatusBadgeComponent],
  templateUrl: './booking-detail-header.component.html',
  styleUrl: './booking-detail-header.component.scss',
})
export class BookingDetailHeaderComponent {
  reservationNumber = input.required<string>();
  status = input.required<BookingStatus>();
  dateChanged = output<void>();
  bookingCancelled = output<void>();
  protected readonly bookingStatus = BookingStatus;

  onChangeDate() {
    this.dateChanged.emit();
  }

  onCancelBooking() {
    this.bookingCancelled.emit();
  }
}
