import { Component, input } from '@angular/core';
import { SectionCardComponent } from '../../../shared/ui/section-card/section-card.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { EnumLabelPipe } from '../../../shared/pipes/enum-label.pipe';
import { BookingRefunded } from '../../interfaces/booking-refunded';
import { REFUND_REASON_LABELS } from '../../enums/refund-reason-labels';

@Component({
  selector: 'app-booking-refunded-details',
  imports: [SectionCardComponent, DatePipe, CurrencyPipe, EnumLabelPipe],
  templateUrl: './booking-refunded-details.component.html',
  styleUrl: './booking-refunded-details.component.scss',
})
export class BookingRefundedDetailsComponent {
  readonly refund = input.required<BookingRefunded>();
  protected readonly refundReasonLabel = REFUND_REASON_LABELS;
}
