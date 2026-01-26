import { Component, DestroyRef, Input, Signal, computed, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { toursFeature } from '../../data-access/store/tours/tours.state';
import { CommonModule } from '@angular/common';
import { TourDetailsComponent } from '../../ui/tour-details/tour-details.component';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { Router } from '@angular/router';
import { authFeature } from '../../../shared/data-access/auth/store/auth.state';
import { BookingService } from '../../../shared/data-access/bookings/booking.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { BookingStore } from '../../../bookings/data-access/booking-store';
import { filter, tap } from 'rxjs';
import { ReviewsStore } from '../../../reviews/data-access/reviews.store';
import { Tour } from '../../interfaces/tour';

@Component({
    selector: 'app-tour',
    imports: [CommonModule, TourDetailsComponent, LoaderComponent],
    templateUrl: './tour.component.html',
    styleUrl: './tour.component.scss'
})
export class TourComponent {
  #store = inject(Store);
  #destroyRef = inject(DestroyRef);
  #bookingService = inject(BookingService);
  #bookingStore = inject(BookingStore);
  #reviewStore = inject(ReviewsStore);
  router = inject(Router);
  @Input() slug!: string;
  user$ = this.#store.select(authFeature.selectUser);
  isLoggedIn$ = this.#store.select(authFeature.selectIsLoggedIn).pipe(
    filter(isLoggedIn => isLoggedIn),
    tap(() => {
      this.#bookingStore.load();
      this.#reviewStore.loadReviews();
    })
  );
  tour: Signal<Tour | undefined> = toSignal(this.#store.select(toursFeature.selectTour));

  isProccessingPayment = signal(false);

  isTourBooked = computed(() => (
    this.#bookingStore.isTourBooked(this.tour()?._id!)
  ));
    
  isTourRewieved = computed(() => (
    this.#reviewStore.isTourReviewed(this.slug))
  );

  bookTour(data: { tourId: string, date: Date}) {
    this.isProccessingPayment.set(true);
    const { tourId, date } = data;

    this.#bookingService.bookTour(tourId, date).pipe(
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe((s: any) => window.location.href = s.session.url);
  }
}
