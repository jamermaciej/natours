import { TemplateRef } from '@angular/core';
import { TableColumnType } from '../enums/table-column-type';

export interface TableColumn<T> {
  key?: keyof T;
  accessor?: (row: T) => any;
  header: string;
  type?: TableColumnType;
  cssClass?: string;
  templateRef?: TemplateRef<any>;
  format?: string;
  digitsInfo?: string;
  sortable?: boolean;
  sortKey?: string;
}
