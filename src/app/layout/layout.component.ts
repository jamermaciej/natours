import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './ui/header/header.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `
    <!-- HEADER -->
    <app-header></app-header>

    <!-- CONTENT-->
    <router-outlet></router-outlet>
  `
})
export class LayoutComponent {

}
