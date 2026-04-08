import { User } from '../../shared/interfaces/user';
import { CancellationReason } from '../enums/cancellation-reason';

export interface BookingCancellation {
  cancelledAt: Date;
  cancelledBy: Omit<User, 'photo' | 'passwordChangedAt'>;
  reason: CancellationReason;
  note?: string;
}
