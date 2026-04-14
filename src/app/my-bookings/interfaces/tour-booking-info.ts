import { ReviewResponse } from '../../tours/interfaces/review';

export interface TourBookingInfo {
  startDate: Date | null;
  review: ReviewResponse | null;
}
