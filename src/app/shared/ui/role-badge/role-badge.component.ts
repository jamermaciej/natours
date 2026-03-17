import { Component, input } from '@angular/core';

@Component({
  selector: 'app-role-badge',
  imports: [],
  templateUrl: './role-badge.component.html',
  styleUrl: './role-badge.component.scss',
})
export class RoleBadgeComponent {
  role = input.required<string>();
}
