import { Component, input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-user-img',
  standalone: true,
  imports: [],
  templateUrl: './user-img.component.html',
  styleUrl: './user-img.component.scss'
})
export class UserImgComponent {
  readonly apiHostUrl = environment.apiHostUrl;
  photo = input.required<string>();
  name = input.required<string>();
}
