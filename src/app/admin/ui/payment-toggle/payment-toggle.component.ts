import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-payment-toggle',
  imports: [],
  templateUrl: './payment-toggle.component.html',
  styleUrl: './payment-toggle.component.scss',
})
export class PaymentToggleComponent {
  readonly paid = input.required<boolean>();
  readonly isUpdating = input<boolean>();
  readonly disabled = input<boolean>();
  readonly paidChanged = output<boolean>();

  protected valueChanged(event: Event) {
    const input = event.target as HTMLInputElement;
    this.paidChanged.emit(input.checked);
  }
}
