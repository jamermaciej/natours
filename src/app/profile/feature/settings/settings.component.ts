import { AsyncPipe } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { ChangePasswordComponent } from '../../ui/change-password/change-password.component';
import { UpdateProfileComponent } from '../../ui/update-profile/update-profile.component';
import { Store } from '@ngrx/store';
import { map, of } from 'rxjs';
import { authActions } from '../../../shared/data-access/auth/store/auth.actions';
import { User } from '../../../shared/interfaces/user';
import { toSignal } from '@angular/core/rxjs-interop';
import { authFeature } from '../../../shared/data-access/auth/store/auth.state';
import { LoadStatus } from '../../../tours/enums/load-status';
import { PasswordUpdateData } from '../../../shared/interfaces/password-update-data';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [UpdateProfileComponent, AsyncPipe, ChangePasswordComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  #store = inject(Store);
  isLoading$ = this.#store.select(authFeature.selectLoadStatus).pipe(
    map(loadStatus => loadStatus === LoadStatus.LOADING)
  );
  errorMessage$ = this.#store.select(authFeature.selectError);
  user: Signal<User | null> = toSignal(this.#store.select(authFeature.selectUser), { initialValue: null});
  loadingUpdateProfile = false;
  loadingChangePassword = false;

  loading = false;

  ngOnInit(): void {
      this.#store.dispatch(authActions.getMe());
  }

  updateProfile(user: User) {
    this.#store.dispatch(authActions.updateMe({ user, callback: () => (this.loadingUpdateProfile = false) }));
  }

  changePassword(passwordUpdateData: PasswordUpdateData) {
    this.#store.dispatch(authActions.updatePassword({ passwordUpdateData, callback: () => (this.loadingChangePassword = false)}));
  }
}
