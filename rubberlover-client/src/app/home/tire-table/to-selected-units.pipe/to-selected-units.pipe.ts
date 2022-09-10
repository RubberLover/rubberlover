import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toSelectedUnits'
})
export class ToSelectedUnitsPipe implements PipeTransform {

  transform(value: number, unitFrom: string, unitTo: string): number {
    if (unitFrom === unitTo) {
      return value;
    }
    if (unitFrom === 'g' && unitTo === 'oz') {
      return Math.round(value * 3.5274)/100;
    }
    if (unitFrom === 'oz' && unitTo === 'g') {
      return Math.round(value * 28.3495);
    }
    if (unitFrom === 'mm' && unitTo === 'inch') {
      return Math.round(value * 3.93701)/100;
    }
    if (unitFrom === 'inch' && unitTo === 'mm') {
      return Math.round(value * 25.4);
    }
    return 0;
  }

}
