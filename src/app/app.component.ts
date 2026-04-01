import { Component, inject, OnInit, signal } from '@angular/core';

import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlowRoutes } from './shared/enums/flow-routes';
import { SpinnerComponent } from './shared/ui/spinner/spinner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSnackBarModule, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  protected readonly loading = signal(false);

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && event.url.includes(FlowRoutes.TOURS)) {
        this.loading.set(true);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loading.set(false);
      }
    });
  }
}
