import { Component } from '@angular/core';


@Component({
    selector: 'app-page-wrapper',
    imports: [],
    template: `
    <div class="page-wrapper">
      <ng-content></ng-content>
    </div>
  `,
    styles: `
    @use 'mixins' as *;

    .page-wrapper {
      padding: 8rem 6rem;

      @include breakpoint(small) {
        padding: 4rem 2rem;
      }
    }
  `
})
export class PageWrapperComponent {

}
