
import { patchState, signalState } from '@ngrx/signals';
import { Injectable, inject } from '@angular/core';
import { exhaustMap, pipe, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { UsersService } from './users.service';
import { User, UserBody } from '../../shared/interfaces/user';
import { Pagination } from '../../shared/interfaces/pagination';
import { Router } from '@angular/router';
import { FlowRoutes } from '../../shared/enums/flow-routes';
import { SnackbarService } from '../../shared/services/snackbar.service';

enum LoadingType {
  List = 'list',
  Submit = 'submit',
  Update = 'update',
  Remove = 'remove'
}

type UsersState = {
    users: User[];
    filters: any;
    listConfig: Pagination;
    loading: Record<LoadingType, boolean>;
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
    loading: {
      [LoadingType.List]: false,
      [LoadingType.Submit]: false,
      [LoadingType.Update]: false,
      [LoadingType.Remove]: false
    },
    errors: []
};

@Injectable({
  providedIn: 'root'
})
export class UsersStore {
    readonly #usersService = inject(UsersService);
    readonly state = signalState(initialState);
    #router = inject(Router);
    #snackbarService = inject(SnackbarService);
    
    readonly users = this.state.users;
    readonly page = this.state.listConfig.page;
    readonly limit = this.state.listConfig.limit;
    readonly total = this.state.listConfig.total;
    readonly pages = this.state.listConfig.pages;
    readonly filters = this.state.filters;
    readonly errors = this.state.errors;
    readonly loadingList = this.state.loading.list;
    readonly loadingSubmit = this.state.loading.submit;
    readonly loadingUpdate = this.state.loading.update;
    readonly loadingRemove = this.state.loading.remove;

    readonly loadUsers = rxMethod<{ filters?: any, page: number }>(
        pipe(
          // filter(() => !this.users().length),
          tap(() => patchState(this.state,
            { loading: {
                ...this.state.loading(),
                [LoadingType.List]: true
              }
            }
          )),
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
                finalize: () => patchState(this.state,
                  { loading: {
                      ...this.state.loading(),
                      [LoadingType.List]: false
                    }
                  }
                ),
              })
            );
          })
        )
    );

    readonly updateUser = rxMethod<{ user: UserBody, id: string }>(
        pipe(
          tap(() => patchState(this.state,
            { loading: {
                ...this.state.loading(),
                [LoadingType.Update]: true
              },
              errors: []
            }
          )),
          exhaustMap(({user, id } ) => {
            return this.#usersService.updateUser(user, id).pipe(
              tapResponse({
                next: (response) => {
                    patchState(this.state, {
                        users: this.state.users().map(r => r._id === id ? response.data.data : r)
                    });
                    this.#router.navigate([FlowRoutes.USERS]);
                },
                error: (error: any) => patchState(this.state,
                  { errors:
                    error?.error?.error?.code == 11000 ? ['This email is already in use, please use a different email!'] : []
                  },
                ),
                //error: console.error,
                finalize: () => patchState(this.state,
                  { loading: {
                      ...this.state.loading(),
                      [LoadingType.Update]: false
                    }
                  }
                ),
              })
            );
          })
        )
    );

 readonly addUser = rxMethod<UserBody>(
        pipe(
          tap(() => patchState(this.state,
            { loading: {
                ...this.state.loading(),
                [LoadingType.Submit]: true
              },
              errors: []
            }
          )),
          exhaustMap(user => {
            return this.#usersService.addUser(user).pipe(
              tapResponse({
                next: (response) => {
                  patchState(this.state, (state) => ({
                    users: [...state.users, response.data.data]
                  }));
                },
                error: (error: any) => patchState(this.state,
                  { errors: [error?.error?.message] },
                ),
                finalize: () => patchState(this.state,
                  { loading: {
                      ...this.state.loading(),
                      [LoadingType.Submit]: false
                    }
                  }
                ),
              })
            );
          })
        )
    );

    readonly removeUser = rxMethod<string>(
      pipe(
        tap(() => patchState(this.state,
          { loading: {
              ...this.state.loading(),
              [LoadingType.Remove]: true
            },
            errors: []
          }
        )),
        exhaustMap(id => {
          return this.#usersService.removeUser(id).pipe(
            tapResponse({
              next: () => {
                patchState(this.state, {
                  users: this.users().filter(user => user._id !== id)
                });
                this.#router.navigate([FlowRoutes.USERS]);
                this.#snackbarService.success('User deleted!')
              },
              error: console.error,
              finalize: () => patchState(this.state,
                { loading: {
                    ...this.state.loading(),
                    [LoadingType.Remove]: false
                  }
                }
              )
            }),
          );
        })
      )
    );

    readonly clearStore = () => {
      patchState(this.state, initialState);
    }
}
