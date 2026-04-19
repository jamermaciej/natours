import { DEFAULT_CURRENCY_CODE, inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'appCurrency',
})
export class AppCurrencyPipe implements PipeTransform {
  private locale = inject(LOCALE_ID);
  private defaultCurrencyCode = inject(DEFAULT_CURRENCY_CODE);
  private currencyPipe = new CurrencyPipe(this.locale, this.defaultCurrencyCode);

  transform(value: number | null | undefined, digitsInfo?: string): string | null {
    return this.currencyPipe.transform(value, undefined, 'code', digitsInfo);
  }
}
