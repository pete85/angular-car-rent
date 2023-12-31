import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | undefined, limit: number): string {
    if (value) {
      return value.length < limit ? value : value.slice(0, limit) + '...';
    } else {
      return '';
    }
  }
}
