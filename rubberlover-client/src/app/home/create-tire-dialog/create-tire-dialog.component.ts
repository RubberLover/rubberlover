import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TireService } from '../tire.service';

@Component({
  selector: 'app-create-tire-dialog',
  templateUrl: './create-tire-dialog.component.html',
  styleUrls: ['./create-tire-dialog.component.scss']
})
export class CreateTireDialogComponent {
  @Output() newTireSaved: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  weightUnitsOptions;
  widthUnitsOptions;
  wheelSizeOptions;
  tireTypeOptions;

  constructor(private _fb: FormBuilder, private _tireService: TireService) { 
    this.weightUnitsOptions = ["g", "oz"];
    this.widthUnitsOptions = ["mm", "inch"];

    this.wheelSizeOptions = ["700c/29\"", "650b/27.5\"", "650c", "26"];
    this.tireTypeOptions = [
      {
        label: "Tubed Clincher",
        value: "tube"
      },
      {
        label: "Tubeless - Hooked",
        value: "tubelessHooked"
      },
      {
        label: "Tubeless - Hookless",
        value: "tubelessHookless"
      },
      {
        label: "Tubular",
        value: "tubular"
      }
    ]
    this.form = this._fb.group({
      name: ["", Validators.required],
      brand: ["", Validators.required],
      weight: ["", Validators.required],
      width: ["", Validators.required],
      widthUnits: ["", Validators.required],
      weightUnits: ["", Validators.required],
      wheelSize: ["", Validators.required],
      tireType: ["", Validators.required],
      sources: ["", Validators.required],
      bicycleRollingResistanceArticle: [""],
      tpi: [""],
      treadPattern: [""],
      color: [""],
      casingType: [""],
      countryManufactured: [""],
      year: [""],
      icon: [""],
    })
  }

  submit() {
    console.log(this.form.getRawValue());
    this._tireService.submitTire(this.form.getRawValue()).subscribe(result => {
      console.log(result);
      if (result) {
        this.newTireSaved.emit();
        this.form.reset();
      }
    })
  }

}
