import { Component, input } from '@angular/core';
import { StatusBadgeComponent } from '../../../shared/ui/status-badge/status-badge.component';

@Component({
  selector: 'app-booking-detail-header',
  imports: [StatusBadgeComponent],
  templateUrl: './booking-detail-header.component.html',
  styleUrl: './booking-detail-header.component.scss',
})
export class BookingDetailHeaderComponent {
  reservationNumber = input.required<string>();
  status = input.required<string>();
}
