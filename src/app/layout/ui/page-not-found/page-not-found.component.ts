import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageWrapperComponent } from '../page-wrapper/page-wrapper.component';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule, PageWrapperComponent],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {

}
