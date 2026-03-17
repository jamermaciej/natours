import { Component, input } from '@angular/core';
import { Guide } from '../../../tours/interfaces/guide';
import { UserImgComponent } from '../../../shared/ui/user-img/user-img.component';
import { RoleBadgeComponent } from '../../../shared/ui/role-badge/role-badge.component';

@Component({
  selector: 'app-guides-list',
  imports: [UserImgComponent, RoleBadgeComponent],
  templateUrl: './guides-list.component.html',
  styleUrl: './guides-list.component.scss',
})
export class GuidesListComponent {
  readonly guides = input.required<Guide[]>();
}
