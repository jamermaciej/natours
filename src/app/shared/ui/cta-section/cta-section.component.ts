import { Component, input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-cta-section',
    imports: [],
    templateUrl: './cta-section.component.html',
    styleUrl: './cta-section.component.scss'
})
export class CtaSectionComponent {
  header = input.required<string>();
  description = input.required<string>();
  images = input<string[]>();

  readonly toursImgUrl = `${environment.apiHostUrl}/img/tours/`;
}
