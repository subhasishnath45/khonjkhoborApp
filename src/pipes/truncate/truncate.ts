import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TruncatePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'truncatePipe',
})
export class TruncatePipe implements PipeTransform {
  /**
   * Takes a  string value and truncates that string 
   * to show as brief in losting page.
   */
  transform(value: string, args: number): string  {
    let limit = value.substring(0,args);
    return limit.toLowerCase() + '...';
  }
}
