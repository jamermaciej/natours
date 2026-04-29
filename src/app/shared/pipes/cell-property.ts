import { Pipe, PipeTransform } from '@angular/core';
import { TableColumn } from '../interfaces/table-column';

@Pipe({
  name: 'cellProperty',
})
export class cellProperty implements PipeTransform {
  transform<T>(item: T, column: TableColumn<T>): any {
    if (!item || !column) return item;

    if (column.accessor) {
      return column.accessor(item);
    }

    return column.key && item[column.key];
  }
}
