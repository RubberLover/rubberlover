import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toSelectedUnits'
})
export class ToSelectedUnitsPipe implements PipeTransform {

  transform(value: number, unitFrom: string, unitTo: string): number {
    console.log(`${value} from ${unitFrom} to ${unitTo}`);
    if (unitFrom === 'g' && unitTo === 'g') {
      return value;
    }
    if (unitFrom === 'oz' && unitTo === 'oz') {
      return value;
    }
    if (unitFrom === 'g' && unitTo === 'oz') {
      return Math.round(value * 0.035274);
    }
    if (unitFrom === 'oz' && unitTo === 'g') {
      return Math.round(value * 28.3495);
    }
    return 0;
  }

}
