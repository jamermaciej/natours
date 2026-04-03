import { Component, OnInit, inject } from '@angular/core';
import { MyBookingsStore } from '../../data-access/my-bookings-store';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { BookingsListComponent } from '../../ui/bookings-list/bookings-list.component';
import { ContentWrapperComponent } from '../../../shared/ui/content-wrapper/content-wrapper.component';
import { EmptyStateComponent } from '../../../shared/ui/empty-state/empty-state.component';
import { FlowRoutes } from '../../../shared/enums/flow-routes';

@Component({
  selector: 'app-bookings',
  imports: [LoaderComponent, BookingsListComponent, ContentWrapperComponent, EmptyStateComponent],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
})
export class BookingsComponent implements OnInit {
  #myBookingStore = inject(MyBookingsStore);
  bookings = this.#myBookingStore.bookings;
  isLoading = this.#myBookingStore.isLoading;
  protected readonly upcomingBookings = this.#myBookingStore.upcomingBookings;
  protected readonly pastBookings = this.#myBookingStore.pastBookings;
  protected readonly flowRoutes = FlowRoutes;

  ngOnInit() {
    this.#myBookingStore.load();
  }
}
