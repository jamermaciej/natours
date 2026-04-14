import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-load-error',
  imports: [],
  templateUrl: './load-error.component.html',
  styleUrl: './load-error.component.scss',
})
export class LoadErrorComponent {
  readonly message = input<string>('Something went wrong. Please try again.');
  protected readonly retry = output<void>();

  onRetry() {
    this.retry.emit();
  }
}
