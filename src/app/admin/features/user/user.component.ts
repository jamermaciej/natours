import { Component, inject, input, signal } from '@angular/core';
import { UsersService } from '../../data-access/users.service';
import { finalize, map, switchMap, tap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { UpdateUserComponent } from '../../ui/update-user/update-user.component';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { UsersStore } from '../../data-access/users-store';
import { User, UserBody } from '../../../shared/interfaces/user';
import { ErrorMessageComponent } from '../../../shared/ui/error-message/error-message.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [UpdateUserComponent, LoaderComponent, ErrorMessageComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  usersService = inject(UsersService);
  userId = input.required<string>();
  isLoading = signal(false);
  readonly usersStore = inject(UsersStore);
  
  user = toSignal(
    toObservable(this.userId).pipe(
      tap(() => this.isLoading.set(true)),
      switchMap(id => this.usersService.getUser(id).pipe(
        finalize(() => this.isLoading.set(false))
      )),
      map(res => res.data.data)
    ),
    { initialValue: null }
  );

  onUserUpdated(user: UserBody) {
    this.usersStore.updateUser({ user: user, id: this.userId() });    
  }

  onUserDeleted(id: string) {
    this.usersStore.removeUser(id);
  }
}
