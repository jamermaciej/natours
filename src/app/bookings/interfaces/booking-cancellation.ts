import { User } from '../../shared/interfaces/user';

export interface BookingCancellation {
  cancelledAt: Date;
  cancelledBy: Pick<User, 'name' | 'email'>;
  reason?: string;
}
