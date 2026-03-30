import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumLabel',
})
export class EnumLabelPipe implements PipeTransform {
  transform(value: string, labels: Record<string, string>): string {
    return labels[value] ?? value;
  }
}
