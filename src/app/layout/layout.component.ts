import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <!-- HEADER -->
    <app-header></app-header>

    <!-- CONTENT-->
    <router-outlet></router-outlet>

    <!-- FOOTER-->
    <app-footer></app-footer>
  `
})
export class LayoutComponent {

}
