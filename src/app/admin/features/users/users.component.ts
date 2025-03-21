import { Component, inject, OnInit } from '@angular/core';
import { UsersStore } from '../../data-access/users-store';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { PageHeaderComponent } from '../../../shared/ui/page-header/page-header.component';
import { UsersListComponent } from "../../ui/users-list/users-list.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [LoaderComponent, PageHeaderComponent, UsersListComponent, UsersListComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  readonly usersStore = inject(UsersStore);

  ngOnInit() {
    this.usersStore.loadUsers();
  }
}
