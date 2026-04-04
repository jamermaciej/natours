import { User } from '../../shared/interfaces/user';
import { CancellationReason } from '../enums/cancellation-reason';

export interface BookingCancellation {
  cancelledAt: Date;
  cancelledBy: Pick<User, 'name' | 'email'>;
  reason: CancellationReason;
  note?: string;
}
