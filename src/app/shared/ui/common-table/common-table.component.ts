import { Component, input } from '@angular/core';
import { TableColumn } from '../../interfaces/table-column';
import { nestedProperty } from '../../pipes/nested-property';
import { TableConfig } from '../../interfaces/table-config';
import { TableColumnType } from '../../enums/table-column-type';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { AppCurrencyPipe } from '../../pipes/app-currency.pipe';

@Component({
  selector: 'app-common-table',
  imports: [nestedProperty, NgTemplateOutlet, DatePipe, AppCurrencyPipe],
  templateUrl: './common-table.component.html',
  styleUrl: './common-table.component.scss',
})
export class CommonTableComponent<T> {
  readonly columns = input.required<TableColumn[]>();
  readonly data = input.required<T[]>();
  readonly config = input<TableConfig>();
  protected readonly TableColumnType = TableColumnType;
}
