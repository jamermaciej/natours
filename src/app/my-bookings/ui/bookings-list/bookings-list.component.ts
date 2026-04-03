import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Booking } from '../../../shared/interfaces/booking';
import { StatusBadgeComponent } from '../../../shared/ui/status-badge/status-badge.component';
import { RouterLink } from '@angular/router';
import { FlowRoutes } from '../../../shared/enums/flow-routes';

@Component({
  selector: 'app-bookings-list',
  imports: [DatePipe, CurrencyPipe, StatusBadgeComponent, RouterLink],
  templateUrl: './bookings-list.component.html',
  styleUrl: './bookings-list.component.scss',
})
export class BookingsListComponent {
  readonly bookings = input.required<Booking[]>();
  protected readonly flowRoutes = FlowRoutes;
}
