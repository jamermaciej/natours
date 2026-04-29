import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  totalItems = input<number>();
  itemsPerPage = input<number>();

  triggerPageChange = output<number>();
  triggerPrevPage = output<number>();
  triggerNextPage = output<number>();

  protected readonly pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1),
  );

  changePage(page: number) {
    this.triggerPageChange.emit(page);
  }

  prevPage() {
    this.triggerPrevPage.emit(this.currentPage());
  }

  nextPage() {
    this.triggerNextPage.emit(this.currentPage());
  }
}
