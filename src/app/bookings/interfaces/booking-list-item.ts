import { User } from '../../shared/interfaces/user';
import { BookingStatus } from '../../tours/enums/booking-status';
import { Tour } from '../../tours/interfaces/tour';

export interface BookingListItem {
  _id: string;
  reservationNumber: string;
  user: Pick<User, '_id' | 'name'>;
  tour: Pick<Tour, '_id' | 'name'>;
  createdAt: string;
  price: number;
  startDate: Date;
  status: BookingStatus;
  paid: boolean;
}
