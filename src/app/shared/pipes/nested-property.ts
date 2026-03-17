import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nestedProperty',
})
export class nestedProperty implements PipeTransform {
  transform(obj: any, path: string): any {
    if (!path || !obj) return obj;

    return path.split('.').reduce((current, prop) => current?.[prop], obj);
  }
}
