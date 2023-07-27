import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalise'
})
export class CapitalisePipe implements PipeTransform {
  transform(str: any) {
    if (str) {
      if (/[A-Z]/.test(str)) {
        str = str.split(/(?=[A-Z])/).join(' ').toLowerCase();
      }
      str = str.charAt(0).toUpperCase() + str.slice(1);
      return str;
    }
  }
}
