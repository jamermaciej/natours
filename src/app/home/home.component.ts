import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PageWrapperComponent } from '../layout/ui/page-wrapper/page-wrapper.component';
import { ToursComponent } from '../tours/feature/tours/tours.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [PageWrapperComponent, ToursComponent, RouterModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
