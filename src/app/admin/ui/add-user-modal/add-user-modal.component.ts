import { Component, effect, inject, signal } from '@angular/core';
import { UserBody } from '../../../shared/interfaces/user';
import { UserFormComponent } from '../user-form/user-form.component';
import { DialogRef } from '@angular/cdk/dialog';
import { ErrorMessageComponent } from '../../../shared/ui/error-message/error-message.component';
import { UsersStore } from '../../data-access/users-store';
import { PageHeaderComponent } from '../../../shared/ui/page-header/page-header.component';

@Component({
    selector: 'app-add-user-modal',
    imports: [UserFormComponent, ErrorMessageComponent, PageHeaderComponent],
    templateUrl: './add-user-modal.component.html',
    styleUrl: './add-user-modal.component.scss'
})
export class AddUserModalComponent {
  dialogRef = inject<DialogRef<UserBody>>(DialogRef<AddUserModalComponent>);
  usersStore = inject(UsersStore)
  wasSubmitting = signal(false);

  constructor() {
    effect(() => {
      const isSubmitting = this.usersStore.loadingSubmit();
      
      if (this.wasSubmitting() && !isSubmitting) {
        this.dialogRef.close()
      }
    });
  }

  addUser(user: UserBody) {
    this.wasSubmitting.set(true);
    this.usersStore.addUser(user);
  }
}
