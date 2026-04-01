import { CancellationReason } from '../enums/cancellation-reason';

export interface CancelBookingRequest {
  reason: CancellationReason;
  note?: string;
}
