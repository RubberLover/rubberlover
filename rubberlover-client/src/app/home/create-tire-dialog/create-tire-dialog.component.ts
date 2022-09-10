import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from 'src/app/login/user.service';
import { Tire } from '../tire.model';
import { TireService } from '../tire.service';

@Component({
  selector: 'app-create-tire-dialog',
  templateUrl: './create-tire-dialog.component.html',
  styleUrls: ['./create-tire-dialog.component.scss']
})
export class CreateTireDialogComponent {
  @Input() tire!: Tire;
  @Output() tireSaved: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  weightUnitsOptions;
  widthUnitsOptions;
  wheelSizeOptions;
  tireTypeOptions;
  isAdmin = false;

  constructor(private _fb: FormBuilder, private _tireService: TireService, private _userService: UserService) { 
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
    ];
    this.form = this._fb.group({
      name: ["", Validators.required],
      brand: ["", Validators.required],
      weight: ["", Validators.required],
      width: ["", Validators.required],
      widthUnits: ["", Validators.required],
      weightUnits: ["", Validators.required],
      wheelSize: ["", Validators.required],
      tireType: ["", Validators.required],
      sources:  this._fb.array([], [Validators.required]),
      bicycleRollingResistanceArticle: [""],
      tpi: [""],
      treadPattern: [""],
      color: [""],
      casingType: [""],
      countryManufactured: [""],
      year: [""],
      icon: [""],
      _id: [""]
    });

    const sourceControl = this._fb.control("", [Validators.required, this.IsValidURL]);
    this.sourcesArray.push(sourceControl);

    this.isAdmin = this._userService.currentUser$.value?.role === "admin";
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (this.tire) {
      this.form.patchValue(this.tire);
      this.form.controls['name'].disable();
      this.form.controls['brand'].disable();
      this.form.controls['width'].disable();
      this.form.controls['widthUnits'].disable();
      this.form.controls['wheelSize'].disable();
      
      this.sourcesArray.clear();
      this.tire.sources.forEach(source => {
        this.addExistingSource(source);
      });
    }
  }

  submit() {
    this.form.setControl('sources', this.sourcesArray);
    if (this.tire) { //if we passed in a tire, we're editing an existing tire
      this._tireService.editTire(this.form.getRawValue()).subscribe(result => {
        if (result) {
          this.tireSaved.emit();
          this.form.reset();
          this.sourcesArray.reset();
        }
      });
    } else { //otherwise we're creating a new one
      this.form.removeControl('_id');
      this._tireService.submitTire(this.form.getRawValue()).subscribe(result => {
        if (result) {
          this.tireSaved.emit();
          this.form.reset();
          this.sourcesArray.reset();
        }
      });
    }
  }

  approve() {
    if (this.isAdmin) {
      this._tireService.approve(this.form.controls['_id'].value).subscribe(result => {
        if (result) {
          this.tireSaved.emit();
        }
      });
    }
  }

  public get sourcesArray() : FormArray{
    return this.form.controls['sources'] as FormArray;
  }

  addSource() {
    const sourceControl = this._fb.control("", [Validators.required, this.IsValidURL]);
    this.sourcesArray.push(sourceControl);
  }

  addExistingSource(source: string) {
    const sourceControl = this._fb.control(source, [Validators.required, this.IsValidURL]);
    this.sourcesArray.push(sourceControl);
  }

  deleteSource(sourceIndex: number) {
    this.sourcesArray.removeAt(sourceIndex);
  }

  IsValidURL(control: FormControl) : ValidationErrors {
    console.log(control.value);
    if (!control.value) return {urlEmpty: true};
    try {
      new URL(control.value);
    }
    catch (error: any) {
      return {invalidUrl: true};
    }
    return {};
  }

}
