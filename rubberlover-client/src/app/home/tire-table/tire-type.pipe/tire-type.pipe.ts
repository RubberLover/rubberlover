import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toPrettyTireType'
})
export class TireTypePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case "tubelessHooked": return "TL Hooked"; 
      case "tubelessHookless": return "TL Hookless"; 
      case "tubular": return "Tubular"; 
      case "tube": return "Clincher (Tubed)"; 
      case "": "";
    }
    return `Invalid - ${value}`;
  }

}
