import { Component, input, output } from '@angular/core';
import { TableColumn } from '../../interfaces/table-column';
import { cellProperty } from '../../pipes/cell-property';
import { TableConfig } from '../../interfaces/table-config';
import { TableColumnType } from '../../enums/table-column-type';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { AppCurrencyPipe } from '../../pipes/app-currency.pipe';
import { SortConfig, SortDirection } from '../../interfaces/sort-config';

@Component({
  selector: 'app-common-table',
  imports: [cellProperty, NgTemplateOutlet, DatePipe, AppCurrencyPipe],
  templateUrl: './common-table.component.html',
  styleUrl: './common-table.component.scss',
})
export class CommonTableComponent<T> {
  readonly columns = input.required<TableColumn<T>[]>();
  readonly data = input.required<T[]>();
  readonly config = input<TableConfig>();
  readonly sortConfig = input<SortConfig>();
  readonly emptyMessage = input<string>('No data yet.');
  protected readonly triggerSort = output<string>();
  protected readonly TableColumnType = TableColumnType;

  protected sort(column: TableColumn<T>) {
    const sortKey = column.sortKey ?? (column.key as string);
    if (column.sortable && sortKey) {
      this.triggerSort.emit(sortKey);
    }
  }

  protected getSortDirection(column: TableColumn<T>): SortDirection {
    const sort = this.sortConfig();

    return sort && sort.field === (column.sortKey ?? column.key) ? sort.direction : null;
  }
}
