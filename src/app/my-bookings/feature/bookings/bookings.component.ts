import { Component, inject } from '@angular/core';
import { MyBookingsStore } from '../../data-access/my-bookings-store';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { BookingsListComponent } from '../../ui/bookings-list/bookings-list.component';
import { ContentWrapperComponent } from '../../../shared/ui/content-wrapper/content-wrapper.component';
import { EmptyStateComponent } from '../../../shared/ui/empty-state/empty-state.component';
import { FlowRoutes } from '../../../shared/enums/flow-routes';
import { ReviewsStore } from '../../../reviews/data-access/reviews.store';
import { Router } from '@angular/router';
import { LoadErrorComponent } from '../../../shared/ui/load-error/load-error.component';

@Component({
  selector: 'app-bookings',
  imports: [
    LoaderComponent,
    BookingsListComponent,
    ContentWrapperComponent,
    EmptyStateComponent,
    LoadErrorComponent,
  ],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
})
export class BookingsComponent {
  private readonly router = inject(Router);
  private readonly myBookingStore = inject(MyBookingsStore);
  private readonly myReviewsStore = inject(ReviewsStore);
  protected readonly upcomingBookings = this.myBookingStore.upcomingBookings;
  protected readonly pastBookings = this.myBookingStore.pastBookings;
  protected readonly isLoading = this.myBookingStore.isLoading;
  protected readonly error = this.myBookingStore.error;
  protected readonly flowRoutes = FlowRoutes;

  onReviewAction(event: { isReviewable: boolean; tourId: string }) {
    if (event.isReviewable) {
      this.router.navigate([this.flowRoutes.ADD_REVIEW], {
        queryParams: { user: event.tourId },
      });
    } else {
      const review = this.myReviewsStore.getReview(event.tourId);
      this.router.navigate([this.flowRoutes.MY_REVIEWS, review?.id]);
    }
  }

  retry() {
    this.myBookingStore.reload();
  }
}
