import { Component, input } from '@angular/core';
import { UserImgComponent } from '../user-img/user-img.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-info-card',
  imports: [UserImgComponent, RouterLink],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss',
})
export class InfoCardComponent {
  photo = input<string>();
  title = input.required<string>();
  subtitle = input.required<string>();
  buttonLabel = input.required<string>();
  link = input.required<string[]>();
}
