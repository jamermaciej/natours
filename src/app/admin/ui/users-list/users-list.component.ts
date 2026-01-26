import { Component, input, output } from '@angular/core';
import { User } from '../../../shared/interfaces/user';
import { UserImgComponent } from '../../../shared/ui/user-img/user-img.component';
import { FlowRoutes } from '../../../shared/enums/flow-routes';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-users-list',
    imports: [UserImgComponent, RouterLink],
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  users = input.required<User[]>();
  triggerUserDetails = output<string>();
  flowRoutes = FlowRoutes;
  currentUser = input.required<User | null>();

  goToUserDetails(id: string) {
    this.triggerUserDetails.emit(id);
  }
}
