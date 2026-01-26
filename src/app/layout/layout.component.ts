import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';

@Component({
    selector: 'app-layout',
    imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
    template: `
    <div class="layout">
      <!-- HEADER -->
      <app-header></app-header>

      <!-- CONTENT-->
      <main class="main">
        <router-outlet></router-outlet>
      </main>

      <!-- FOOTER-->
      <app-footer></app-footer>
    </div>
  `,
    styles: `
    .layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      padding: 3rem;
    }

    .main {
      background-color: var(--color-gray-1);
      flex: 1;
      position: relative;
    }
  `
})
export class LayoutComponent {

}
