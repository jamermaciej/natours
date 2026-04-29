import { Component, input, output } from '@angular/core';
import { ActiveFilter } from '../../interfaces/active-filter';

@Component({
  selector: 'app-filters',
  imports: [],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  readonly activeFilters = input.required<ActiveFilter[]>();
  readonly resultsLabel = input.required<string>();
  readonly removeFilter = output<string>();
  readonly clearFilters = output<void>();
}
