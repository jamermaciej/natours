import { Component, input, output } from '@angular/core';
import { User } from '../../../shared/interfaces/user';
import { UserImgComponent } from '../../../shared/ui/user-img/user-img.component';
import { DatePipe } from '@angular/common';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [UserImgComponent, UserFormComponent, DatePipe],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {
  user = input.required<User>();
  isLoading = input<boolean>();
  userUpdated = output<User>();
  
  onUpdate(user: User) {
    this.userUpdated.emit(user);
  }
}
