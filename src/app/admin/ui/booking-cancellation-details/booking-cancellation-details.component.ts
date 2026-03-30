import { Component, input } from '@angular/core';
import { BookingCancellation } from '../../../bookings/interfaces/booking-cancellation';
import { SectionCardComponent } from '../../../shared/ui/section-card/section-card.component';
import { DatePipe } from '@angular/common';
import { EnumLabelPipe } from '../../../shared/pipes/enum-label.pipe';
import { CANCELLATION_REASON_LABELS } from '../../../bookings/models/cancellation-reason-labels';

@Component({
  selector: 'app-booking-cancellation-details',
  imports: [SectionCardComponent, DatePipe, EnumLabelPipe],
  templateUrl: './booking-cancellation-details.component.html',
  styleUrl: './booking-cancellation-details.component.scss',
})
export class BookingCancellationDetailsComponent {
  readonly cancellation = input.required<BookingCancellation>();
  protected readonly cancellationReasonLabel = CANCELLATION_REASON_LABELS;
}
