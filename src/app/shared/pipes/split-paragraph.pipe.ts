import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitParagraph',
  standalone: true
})
export class SplitParagraphPipe implements PipeTransform {

  transform(description: string): string[] {
    return description.split('\n');
  }

}
