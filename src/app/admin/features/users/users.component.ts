import { Component, inject, OnInit } from '@angular/core';
import { UsersStore } from '../../data-access/users-store';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { PageHeaderComponent } from '../../../shared/ui/page-header/page-header.component';
import { UsersListComponent } from "../../ui/users-list/users-list.component";
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [LoaderComponent, PageHeaderComponent, UsersListComponent, UsersListComponent, PaginationComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  readonly usersStore = inject(UsersStore);

  ngOnInit() {
    this.usersStore.loadUsers(1);
  }

  changePage(page: number) {
    this.usersStore.loadUsers(page);
  }

  prevPage(page: number) {
    this.usersStore.loadUsers(--page);
  }

  nextPage(page: number) {
    this.usersStore.loadUsers(++page);
  }
}
