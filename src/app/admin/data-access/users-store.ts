
import { patchState, signalState } from '@ngrx/signals';
import { Injectable, inject } from '@angular/core';
import { exhaustMap, filter, pipe, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { UsersService } from './users.service';
import { User } from '../../shared/interfaces/user';
import { Pagination } from '../../shared/interfaces/pagination';


type UsersState = {
    users: User[];
    listConfig: Pagination;
    isLoading: boolean;
}

const initialState: UsersState = {
    users: [],
    listConfig: {
      page: 1,
      limit: 10,
      total: 0,
      pages: 0
    },
    isLoading: false
};

@Injectable({
  providedIn: 'root'
})
export class UsersStore {
    readonly #usersService = inject(UsersService);
    readonly state = signalState(initialState);

    readonly users = this.state.users;
    readonly page = this.state.listConfig.page;
    readonly limit = this.state.listConfig.limit;
    readonly total = this.state.listConfig.total;
    readonly pages = this.state.listConfig.pages;
    readonly isLoading = this.state.isLoading;

    readonly loadUsers = rxMethod<number>(
        pipe(
          // filter(() => !this.users().length),
          tap(() => patchState(this.state, { isLoading: true })),
          exhaustMap(page => {
            return this.#usersService.getAllUsers(page).pipe(
              tapResponse({
                next: (response) => patchState(this.state,
                  { users: response.data.data,
                    listConfig: {
                      page: response.pagination.page,
                      limit: response.pagination.limit,
                      total: response.pagination.total,
                      pages: response.pagination.pages
                    }
                  }
                ),
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
