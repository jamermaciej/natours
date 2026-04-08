import { Component, input } from '@angular/core';
import { User } from '../../../shared/interfaces/user';
import { UserImgComponent } from '../../../shared/ui/user-img/user-img.component';
import { FlowRoutes } from '../../../shared/enums/flow-routes';
import { RouterLink } from '@angular/router';
import { ROLE_LABELS } from '../../../tours/enums/role-labels';
import { RoleBadgeComponent } from '../../../shared/ui/role-badge/role-badge.component';

@Component({
  selector: 'app-users-list',
  imports: [UserImgComponent, RouterLink, RoleBadgeComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  readonly users = input.required<User[]>();
  readonly currentUser = input.required<User | null>();
  protected readonly flowRoutes = FlowRoutes;
  protected readonly roleLabels = ROLE_LABELS;
}
