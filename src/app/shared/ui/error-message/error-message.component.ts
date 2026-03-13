import { Component, computed, input } from '@angular/core';

@Component({
    selector: 'app-error-message',
    imports: [],
    templateUrl: './error-message.component.html',
    styleUrl: './error-message.component.scss'
})
export class ErrorMessageComponent {
  message = input.required<string[], string | string[]>({
    transform: (m: string | string[]) =>
      Array.isArray(m) ? m : [m]
  });
}
