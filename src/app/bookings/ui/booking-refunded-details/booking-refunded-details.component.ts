import { Component, computed, input, signal } from '@angular/core';
import { SectionCardComponent } from '../../../shared/ui/section-card/section-card.component';
import { BookingRefund } from '../../interfaces/booking-refund';
import { RefundItemComponent } from '../refund-item/refund-item.component';
import { ProgressBarComponent } from '../../../shared/progress-bar/progress-bar.component';
import { AppCurrencyPipe } from '../../../shared/pipes/app-currency.pipe';

@Component({
  selector: 'app-booking-refunded-details',
  imports: [SectionCardComponent, RefundItemComponent, AppCurrencyPipe, ProgressBarComponent],
  templateUrl: './booking-refunded-details.component.html',
  styleUrl: './booking-refunded-details.component.scss',
})
export class BookingRefundedDetailsComponent {
  readonly refunds = input.required<BookingRefund[]>();
  readonly price = input.required<number>();
  readonly isAdminView = input<boolean>(false);
  protected readonly totalRefund = computed(() =>
    this.refunds().reduce((total, r) => total + r.amount, 0),
  );
  protected readonly refundPercentage = computed(() =>
    Math.round((this.totalRefund() / this.price()) * 100),
  );
  protected readonly isFullRefund = computed(() => this.totalRefund() >= this.price());
  protected readonly remaining = computed(() => this.price() - this.totalRefund());
  protected readonly INITIAL_LIMIT = 2;
  private readonly displayLimit = signal(this.INITIAL_LIMIT);
  protected readonly visibleRefunds = computed(() => this.refunds().slice(0, this.displayLimit()));
  protected readonly remainingCount = computed(() => this.refunds().length - this.displayLimit());
  //protected readonly isExpanded = computed(() => this.displayLimit() > this.INITIAL_LIMIT);
  protected readonly isExpanded = computed(() => this.remainingCount() <= 0);

  protected toggleList() {
    if (this.isExpanded()) {
      this.displayLimit.set(this.INITIAL_LIMIT);
    } else {
      //this.displayLimit.set(this.refunds().length);
      this.displayLimit.update(limit =>
        Math.min(limit + this.INITIAL_LIMIT, this.refunds().length),
      );
    }
  }
}
