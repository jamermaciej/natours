import { ChangeDetectionStrategy, Component, Signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageWrapperComponent } from '../layout/ui/page-wrapper/page-wrapper.component';
import { TourService } from '../tours/data-access/tour.service';
import { ApiResponse } from '../shared/interfaces/api-response';
import { Tour } from '../tours/interfaces/tour';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PageWrapperComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  #tourService = inject(TourService);
  tours: Signal<ApiResponse<Tour[]> | undefined> = toSignal(this.#tourService.getTours());
}
