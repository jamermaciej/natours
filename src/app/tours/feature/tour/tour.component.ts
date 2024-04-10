import { Component, DestroyRef, Input, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { toursFeature } from '../../data-access/store/tours.state';
import { CommonModule } from '@angular/common';
import { TourDetailsComponent } from '../../ui/tour-details/tour-details.component';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { Router } from '@angular/router';
import { authFeature } from '../../../shared/data-access/auth/store/auth.state';
import { BookingService } from '../../../shared/data-access/bookings/booking.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-tour',
  standalone: true,
  imports: [CommonModule, TourDetailsComponent, LoaderComponent],
  templateUrl: './tour.component.html',
  styleUrl: './tour.component.scss'
})
export class TourComponent {
  #store = inject(Store);
  #destroyRef = inject(DestroyRef);
  router = inject(Router);
  @Input() slug!: string;
  tour$ = this.#store.select(toursFeature.selectTour);
  isLoggedIn$ = this.#store.select(authFeature.selectIsLoggedIn);
  isProccessingPayment = signal(false);

  #bookingService = inject(BookingService);

  bookTour(tourId: string) {
    this.isProccessingPayment.set(true);

    this.#bookingService.bookTour(tourId).pipe(
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe((s: any) => window.location.href = s.session.url);
  }
}
