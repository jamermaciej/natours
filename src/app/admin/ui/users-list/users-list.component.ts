import { Component, input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  users = input.required<User[]>();
  readonly apiHostUrl = environment.apiHostUrl;
}
