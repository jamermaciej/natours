
import { patchState, signalState } from '@ngrx/signals';
import { Injectable, inject } from '@angular/core';
import { delay, exhaustMap, filter, pipe, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { UsersService } from './users.service';
import { User } from '../../shared/interfaces/user';
import { Pagination } from '../../shared/interfaces/pagination';
import { Router } from '@angular/router';
import { FlowRoutes } from '../../shared/enums/flow-routes';


type UsersState = {
    users: User[];
    filters: any;
    listConfig: Pagination;
    isLoading: boolean;
    errors: string[];
}

const initialState: UsersState = {
    users: [],
    filters: {
      query: '',
      role: ''
    },
    listConfig: {
      page: 1,
      limit: 10,
      total: 0,
      pages: 0
    },
    isLoading: false,
    errors: []
};

@Injectable({
  providedIn: 'root'
})
export class UsersStore {
    readonly #usersService = inject(UsersService);
    readonly state = signalState(initialState);
    #router = inject(Router);
    
    readonly users = this.state.users;
    readonly page = this.state.listConfig.page;
    readonly limit = this.state.listConfig.limit;
    readonly total = this.state.listConfig.total;
    readonly pages = this.state.listConfig.pages;
    readonly isLoading = this.state.isLoading;
    readonly filters = this.state.filters;
    readonly errors = this.state.errors;

    readonly loadUsers = rxMethod<{ filters?: any, page: number }>(
        pipe(
          // filter(() => !this.users().length),
          tap(() => patchState(this.state, { isLoading: true })),
          exhaustMap(params => {
            return this.#usersService.getAllUsers(params.filters, params.page).pipe(
              tapResponse({
                next: (response) => patchState(this.state,
                  { users: response.data.data,
                    filters: {
                      query: params.filters?.query,
                      role: params.filters?.role
                    },
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

    readonly updateUser = rxMethod<User>(
        pipe(
          tap(() => patchState(this.state, { isLoading: true, errors: [] })),
          exhaustMap(user => {
            return this.#usersService.updateUser(user).pipe(
              tapResponse({
                next: (response) => {
                    patchState(this.state, {
                        users: this.state.users().map(r => r._id === user._id ? response.data.data : r)
                    });
                    this.#router.navigate([FlowRoutes.USERS]);
                },
                error: (error: any) => patchState(this.state,
                  { errors: error?.error?.error?.code == 11000 ? ['This email is already in use, please use a different email!'] : [] },
                ),
                //error: console.error,
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
