import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Booking } from '../../interfaces/booking';

@Component({
  selector: 'app-bookings-list',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './bookings-list.component.html',
  styleUrl: './bookings-list.component.scss'
})
export class BookingsListComponent {
  bookings = input.required<Booking[]>();
}
