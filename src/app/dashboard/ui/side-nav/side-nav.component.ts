import { Component } from '@angular/core';
import { FlowRoutes } from '../../../shared/enums/flow-routes';
import { Role } from '../../../tours/enums/role';
import { NavItem } from '../../interfaces/nav-item';
import { NavItemComponent } from "../nav-item/nav-item.component";
import { HasRoleDirective } from '../../../shared/directives/has-role.directive';

@Component({
    selector: 'app-side-nav',
    imports: [NavItemComponent, HasRoleDirective],
    templateUrl: './side-nav.component.html',
    styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  protected navItems: NavItem[] = [
    {
      link: FlowRoutes.PROFILE,
      name: 'Settings',
      icon: 'settings'
    },
    {
      link: FlowRoutes.MY_BOOKINGS,
      name: 'My bookings',
      icon: 'book-open'
    },
    {
      link: FlowRoutes.MY_TOURS,
      name: 'My tours',
      icon: 'briefcase'
    },
    {
      link: FlowRoutes.MY_REVIEWS,
      name: 'My reviews',
      icon: 'star',
    },
    {
      link: FlowRoutes.ADMIN,
      name: 'Admin',
      icon: 'database',
      role: [Role.ADMIN],
      children: [
        {
          link: FlowRoutes.USERS,
          name: 'Users',
          icon: 'user'
        }
      ]
    },
    {
      link: FlowRoutes.LEAD_GUIDE,
      name: 'Lead guide',
      icon: 'credit-card',
      role: [Role.ADMIN, Role.LEAD_GUIDE]
    }
  ]
}
