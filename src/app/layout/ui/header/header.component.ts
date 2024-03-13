import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { authFeature } from '../../../shared/data-access/auth/store/auth.state';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../../../shared/interfaces/user';
import { environment } from '../../../../environments/environment';
import { authActions } from '../../../shared/data-access/auth/store/auth.actions';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  #store = inject(Store);
  user: Signal<User | null> = toSignal(this.#store.select(authFeature.selectUser), { initialValue: null});
  readonly apiHostUrl = environment.apiHostUrl;

  logout() {
    this.#store.dispatch(authActions.logout());
  }
}
