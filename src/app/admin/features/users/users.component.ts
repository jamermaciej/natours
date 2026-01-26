import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { UsersStore } from '../../data-access/users-store';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { PageHeaderComponent } from '../../../shared/ui/page-header/page-header.component';
import { UsersListComponent } from "../../ui/users-list/users-list.component";
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component';
import { SearchInputComponent } from "../../../shared/ui/search-input/search-input.component";
import { FormControl } from '@angular/forms';
import { RoleSelectComponent } from '../../../shared/ui/role-select/role-select.component';
import { Router } from '@angular/router';
import { FlowRoutes } from '../../../shared/enums/flow-routes';
import { Dialog } from '@angular/cdk/dialog';
import { AddUserModalComponent } from '../../ui/add-user-modal/add-user-modal.component';
import { UserBody } from '../../../shared/interfaces/user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    LoaderComponent,
    PageHeaderComponent,
    UsersListComponent,
    UsersListComponent,
    PaginationComponent,
    SearchInputComponent,
    RoleSelectComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  readonly usersStore = inject(UsersStore);
  router = inject(Router)
  #dialog = inject(Dialog);
  #destroyRef = inject(DestroyRef);
  role = signal('');

  options: string[] = ['admin', 'lead-guide', 'guide', 'user'];
  selectedRole = signal<string>('');

  searchControl = new FormControl('');

  ngOnInit() {
    this.usersStore.loadUsers({ page: 1 });
  }

  changePage(page: number) {
    this.usersStore.loadUsers({ filters: { query: this.usersStore.filters().query, role: this.role() }, page });
  }

  prevPage(page: number) {
    this.usersStore.loadUsers({ filters: { query: this.usersStore.filters().query, role: this.role() }, page: --page });
  }

  nextPage(page: number) {
    this.usersStore.loadUsers({ filters: { query: this.usersStore.filters().query, role: this.role() }, page: ++page });
  }

  search(value: string) {
    this.usersStore.loadUsers({ filters: { query: value, role: this.role() }, page: 1 });
  }

  selectRole(value: string) {
    this.usersStore.loadUsers({ filters: { query: this.usersStore.filters().query, role: value }, page: 1 });
    this.role.set(value);
  }

  goToUserDetails(id: string) {
    this.router.navigate([FlowRoutes.USERS, id])
  }

  openAddUserModal() {
    const dialogRef = this.#dialog.open<UserBody>(AddUserModalComponent, { autoFocus: false });
  }
}
