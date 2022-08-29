import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toPrettyUrl'
})
export class ToPrettyUrlPipe implements PipeTransform {

  transform(source: string): string {
    if (!source) return "";
    const url = new URL(source);
    return url.hostname;
  }

}
