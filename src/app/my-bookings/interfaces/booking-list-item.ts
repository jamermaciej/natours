import { Booking } from '../../bookings/interfaces/booking';

export interface BookingListItem extends Booking {
  isReviewable?: boolean;
  hasReview?: boolean;
}
