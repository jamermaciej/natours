import { Component, input, output } from '@angular/core';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-modal-layout',
  imports: [ErrorMessageComponent],
  templateUrl: './modal-layout.component.html',
  styleUrl: './modal-layout.component.scss',
})
export class ModalLayoutComponent {
  readonly heading = input.required<string>();
  readonly subheading = input.required<string>();
  readonly error = input<string | null>(null);
  readonly isLoading = input<boolean>(false);
  readonly cancelText = input<string>('Cancel');
  readonly confirmText = input<string>('Confirm');
  readonly confirmClass = input<string>('btn--outline');
  readonly confirmed = output<void>();
  readonly cancelled = output<void>();
}
