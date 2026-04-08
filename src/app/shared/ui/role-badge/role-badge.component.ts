import { Component, input } from '@angular/core';
import { ROLE_LABELS } from '../../../tours/enums/role-labels';
import { Role } from '../../../tours/enums/role';

@Component({
  selector: 'app-role-badge',
  imports: [],
  templateUrl: './role-badge.component.html',
  styleUrl: './role-badge.component.scss',
})
export class RoleBadgeComponent {
  readonly role = input.required<Role>();
  protected readonly roleLabels = ROLE_LABELS;
}
