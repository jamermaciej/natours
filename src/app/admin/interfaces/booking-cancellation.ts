import { CancellationReason } from '../enums/cancellation-reason';
import { User } from '../../shared/interfaces/user';

export interface BookingCancellation {
  cancelledAt: Date;
  cancelledBy: Pick<User, 'name' | 'email'>;
  reason: CancellationReason;
  note?: string;
}
