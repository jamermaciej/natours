import { Component, computed, input } from '@angular/core';
import { BookingRefund } from '../../interfaces/booking-refund';
import { DatePipe } from '@angular/common';
import { EnumLabelPipe } from '../../../shared/pipes/enum-label.pipe';
import { REFUND_REASON_LABELS } from '../../../admin/enums/refund-reason-labels';
import { AppCurrencyPipe } from '../../../shared/pipes/app-currency.pipe';

@Component({
  selector: 'app-refund-item',
  imports: [DatePipe, AppCurrencyPipe, EnumLabelPipe],
  templateUrl: './refund-item.component.html',
  styleUrl: './refund-item.component.scss',
})
export class RefundItemComponent {
  readonly refund = input.required<BookingRefund>();
  readonly isAdminView = input<boolean>(false);
  protected readonly refundReasonLabel = REFUND_REASON_LABELS;

  protected readonly refundedByLabel = computed(() => {
    const { refundedBy } = this.refund();

    if (!refundedBy) return 'Via Stripe';

    return this.isAdminView() ? `${refundedBy.name} (${refundedBy.email})` : 'Administrator';
  });
}
