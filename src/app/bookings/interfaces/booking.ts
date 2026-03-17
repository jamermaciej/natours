import { User } from '../../shared/interfaces/user';
import { Tour } from '../../tours/interfaces/tour';

export interface Booking {
  _id: string;
  reservationNumber: string;
  createdAt: string;
  paid: boolean;
  tour: Tour;
  user: User;
  price: number;
  startDate: string;
}
