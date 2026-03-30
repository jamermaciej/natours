import { Component, input } from '@angular/core';
import { SectionCardComponent } from '../../../shared/ui/section-card/section-card.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { BookingRefunded } from '../../../bookings/interfaces/booking-refunded';
import { RefundReasonPipe } from '../../../bookings/pipes/refund-reason.pipe';

@Component({
  selector: 'app-booking-refunded-details',
  imports: [SectionCardComponent, DatePipe, CurrencyPipe, RefundReasonPipe],
  templateUrl: './booking-refunded-details.component.html',
  styleUrl: './booking-refunded-details.component.scss',
})
export class BookingRefundedDetailsComponent {
  readonly refund = input.required<BookingRefunded>();
}
