import { Component, OnInit, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { authFeature } from '../../../shared/data-access/auth/store/auth.state';
import { authActions } from '../../../shared/data-access/auth/store/auth.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../../../shared/interfaces/user';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  #store = inject(Store);

  user: Signal<User | null> = toSignal(this.#store.select(authFeature.selectUser), { initialValue: null});

  ngOnInit(): void {
      this.#store.dispatch(authActions.getMe());
  }
}
