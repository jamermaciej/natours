
import { patchState, signalState } from '@ngrx/signals';
import { Injectable, inject } from '@angular/core';
import { exhaustMap, filter, pipe, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { UsersService } from './users.service';
import { User } from '../../shared/interfaces/user';

type UsersState = {
    users: User[];
    isLoading: boolean;
}

const initialState: UsersState = {
    users: [],
    isLoading: false
};

@Injectable({
  providedIn: 'root'
})
export class UsersStore {
    readonly #usersService = inject(UsersService);
    readonly state = signalState(initialState);

    readonly users = this.state.users;
    readonly isLoading = this.state.isLoading;

    readonly loadUsers = rxMethod<void>(
        pipe(
          filter(() => !this.users().length),
          tap(() => patchState(this.state, { isLoading: true })),
          exhaustMap(() => {
            return this.#usersService.getAllUsers().pipe(
              tapResponse({
                next: (response) => patchState(this.state, { users: response.data.data }),
                error: console.error,
                finalize: () => patchState(this.state, { isLoading: false }),
              })
            );
          })
        )
    );

    readonly clearStore = () => {
      patchState(this.state, initialState);
    }
}
