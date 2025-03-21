import { Component, input } from '@angular/core';
import { User } from '../../../shared/interfaces/user';
import { UserImgComponent } from '../../../shared/ui/user-img/user-img.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserImgComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  users = input.required<User[]>();
}
