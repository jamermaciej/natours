import { Component, input, output } from '@angular/core';
import { User, UserBody } from '../../../shared/interfaces/user';
import { UserImgComponent } from '../../../shared/ui/user-img/user-img.component';
import { DatePipe, NgClass } from '@angular/common';
import { UserFormComponent } from '../user-form/user-form.component';
import { PageHeaderComponent } from '../../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [UserImgComponent, UserFormComponent, DatePipe, PageHeaderComponent, NgClass],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {
  user = input.required<User>();
  loadingUpdate = input<boolean>();
  loadingRemove = input<boolean>();
  userUpdated = output<UserBody>();
  userDeleted = output<string>();
  
  onUpdate(user: UserBody) {
    this.userUpdated.emit(user);
  }

  deleteUser(id: string) {
    this.userDeleted.emit(id);
  }
}
