import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../layout/ui/page-wrapper/page-wrapper.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [PageWrapperComponent, SideNavComponent, RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

}
