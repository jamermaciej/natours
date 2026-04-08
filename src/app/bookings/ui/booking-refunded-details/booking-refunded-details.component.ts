import { Component, computed, input } from '@angular/core';
import { SectionCardComponent } from '../../../shared/ui/section-card/section-card.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { EnumLabelPipe } from '../../../shared/pipes/enum-label.pipe';
import { REFUND_REASON_LABELS } from '../../../admin/enums/refund-reason-labels';
import { BookingRefunded } from '../../interfaces/booking-refunded';

@Component({
  selector: 'app-booking-refunded-details',
  imports: [SectionCardComponent, DatePipe, CurrencyPipe, EnumLabelPipe],
  templateUrl: './booking-refunded-details.component.html',
  styleUrl: './booking-refunded-details.component.scss',
})
export class BookingRefundedDetailsComponent {
  readonly refund = input.required<BookingRefunded>();
  readonly isAdminView = input<boolean>(false);
  protected readonly refundReasonLabel = REFUND_REASON_LABELS;

  protected readonly refundedByLabel = computed(() => {
    const { refundedBy } = this.refund();

    if (!refundedBy) return 'Via Stripe';

    return this.isAdminView() ? `${refundedBy.name} (${refundedBy.email})` : 'Administrator';
  });
}
