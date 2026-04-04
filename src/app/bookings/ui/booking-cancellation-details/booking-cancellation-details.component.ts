import { Component, input } from '@angular/core';
import { SectionCardComponent } from '../../../shared/ui/section-card/section-card.component';
import { DatePipe } from '@angular/common';
import { EnumLabelPipe } from '../../../shared/pipes/enum-label.pipe';
import { BookingCancellation } from '../../interfaces/booking-cancellation';
import { CANCELLATION_REASON_LABELS } from '../../enums/cancellation-reason-labels';

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
