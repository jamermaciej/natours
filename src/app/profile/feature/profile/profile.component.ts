import { Component, OnInit, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { authFeature } from '../../../shared/data-access/auth/store/auth.state';
import { authActions } from '../../../shared/data-access/auth/store/auth.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../../../shared/interfaces/user';
import { PageWrapperComponent } from '../../../layout/ui/page-wrapper/page-wrapper.component';
import { SideNavComponent } from '../../ui/side-nav/side-nav.component';
import { UpdateProfileComponent } from '../../ui/update-profile/update-profile.component';
import { map } from 'rxjs';
import { LoadStatus } from '../../../tours/enums/load-status';
import { AsyncPipe } from '@angular/common';
import { ChangePasswordComponent } from '../../ui/change-password/change-password.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [PageWrapperComponent, SideNavComponent, UpdateProfileComponent, AsyncPipe, ChangePasswordComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  #store = inject(Store);
  isLoading$ = this.#store.select(authFeature.selectLoadStatus).pipe(
    map(loadStatus => loadStatus === LoadStatus.LOADING)
  );
  errorMessage$ = this.#store.select(authFeature.selectError);
  user: Signal<User | null> = toSignal(this.#store.select(authFeature.selectUser), { initialValue: null});

  ngOnInit(): void {
      this.#store.dispatch(authActions.getMe());
  }

  updateProfile(user: User) {
    this.#store.dispatch(authActions.updateMe({ user }));
  }

  changePassword(data: any) {
    this.#store.dispatch(authActions.updatePassword(data));
  }
}
