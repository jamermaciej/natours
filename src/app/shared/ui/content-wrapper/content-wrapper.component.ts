import { Component } from '@angular/core';

@Component({
  selector: 'app-content-wrapper',
  imports: [],
  template: `
    <div class="content-wrapper">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    @use 'functions' as *;
    @use 'mixins' as *;

    .content-wrapper {
      max-width: toRem(960);
      margin: 0 auto;
      padding: 0 toRem(80);

      @include breakpoint(small) {
        padding: 0 toRem(20);
      }
    }
  `,
})
export class ContentWrapperComponent {}
