import { User } from '../../shared/interfaces/user';
import { BookingStatus } from '../../tours/enums/booking-status';
import { Tour } from '../../tours/interfaces/tour';
import { BookingCancellation } from './booking-cancellation';
import { BookingRefunded } from './booking-refunded';

export interface Booking {
  _id: string;
  reservationNumber: string;
  createdAt: string;
  paid: boolean;
  tour: Tour;
  user: User;
  price: number;
  startDate: Date;
  status: BookingStatus;
  stripePaymentIntentId?: string;
  stripeSessionId?: string;
  cancellation?: BookingCancellation;
  refund?: BookingRefunded;
}
