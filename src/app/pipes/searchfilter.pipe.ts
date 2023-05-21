import { Pipe, PipeTransform } from '@angular/core';
import { ListCallRecord } from '../contracts/list-call-record';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform<T>(data: T[], searchValue: string, searchOption: keyof T): T[] {
    if (!data || !searchValue || !searchOption) {
      return data;
    }
  
    return data.filter(item => {
      const fieldValue = item[searchOption];
      if (typeof fieldValue === 'string') {
        return fieldValue.toLowerCase().includes(searchValue.toLowerCase());
      }
      return false;
    });
  }

}
