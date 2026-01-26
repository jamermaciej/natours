import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavItem } from '../../interfaces/nav-item';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'app-nav-item',
    imports: [RouterLink, RouterLinkActive, NgStyle],
    templateUrl: './nav-item.component.html',
    styleUrl: './nav-item.component.scss'
})
export class NavItemComponent {
  item = input.required<NavItem>();
  depth = input(0);
}
