
import { Component, input, OnInit, output } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit {
  totalItems = input.required<number>();
  currentPage = input.required<number>();
  itemsPerPage = input.required<number>();
  totalPages = input.required<number>();
  
  triggerPageChange = output<number>();
  triggerPrevPage = output<number>();
  triggerNextPage = output<number>();

  pages: number[] = [];

  ngOnInit(): void {
    this.pages = Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }

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
