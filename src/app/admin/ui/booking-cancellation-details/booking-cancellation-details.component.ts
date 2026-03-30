import { Component, input } from '@angular/core';
import { BookingCancellation } from '../../../bookings/interfaces/booking-cancellation';
import { SectionCardComponent } from '../../../shared/ui/section-card/section-card.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-booking-cancellation-details',
  imports: [SectionCardComponent, DatePipe],
  templateUrl: './booking-cancellation-details.component.html',
  styleUrl: './booking-cancellation-details.component.scss',
})
export class BookingCancellationDetailsComponent {
  readonly cancellation = input.required<BookingCancellation>();
}
