import { TemplateRef } from '@angular/core';
import { TableColumnType } from '../enums/table-column-type';

export interface TableColumn {
  key?: string;
  header: string;
  type?: TableColumnType;
  templateRef?: TemplateRef<any>;
  format?: string;
  currency?: string;
}
