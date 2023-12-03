import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-wrapper">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    .page-wrapper {
      padding: 8rem 6rem;
    }
  `
})
export class PageWrapperComponent {

}
