import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowRoutes } from '../../../shared/enums/flow-routes';
import { NavItem } from '../../interfaces/nav-item';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
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
      link: FlowRoutes.MY_TOURS,
      name: 'My tours',
      icon: 'briefcase'
    },
    {
      link: FlowRoutes.MY_REVIEWS,
      name: 'My reviews',
      icon: 'star'
    },
    {
      link: FlowRoutes.BILLING,
      name: 'BILLING',
      icon: 'credit-card'
    }
  ]
}
