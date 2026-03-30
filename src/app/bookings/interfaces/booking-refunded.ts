import { User } from '../../shared/interfaces/user';
import { RefundReason } from '../models/refund-reason';

export interface BookingRefunded {
  refundedAt: Date;
  refundedBy: Pick<User, 'name' | 'email'>;
  amount: number;
  reason?: RefundReason;
  note?: string;
}
