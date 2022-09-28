import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { UserService } from 'src/app/login/user.service';
import { tireTypeOptions, weightUnitsOptions, wheelSizeOptions, widthUnitsOptions } from 'src/app/shared/constants';
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
  weightUnitsOptions = weightUnitsOptions;
  widthUnitsOptions = widthUnitsOptions;
  wheelSizeOptions = wheelSizeOptions;
  tireTypeOptions = tireTypeOptions;
  isAdmin = false;

  constructor(private _fb: FormBuilder, private _tireService: TireService, private _userService: UserService, private _confirmationService: ConfirmationService) { 
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

  ngOnChanges(_: SimpleChanges) {
    if (this.tire) {
      this.form.patchValue(this.tire);
      // this.form.controls['name'].disable();
      // this.form.controls['brand'].disable();
      // this.form.controls['width'].disable();
      // this.form.controls['widthUnits'].disable();
      // this.form.controls['wheelSize'].disable();
      
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
      this.saveAsNew();
    }
  }

  saveAsNew() {
    this.form.removeControl('_id');
      this._tireService.submitTire(this.form.getRawValue()).subscribe(result => {
        if (result) {
          this.tireSaved.emit();
          this.form.reset();
          this.sourcesArray.reset();
        }
      });
  }

  approve() {
    if (this.isAdmin) {
      this._confirmationService.confirm({message: "Are you sure you want to verify this tire?", accept: () => {
        this._tireService.approve(this.form.controls['_id'].value).subscribe(result => {
          if (result) {
            this.tireSaved.emit();
          }
        });
      }})
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

  deleteTire() {
    this._confirmationService.confirm({message: "Are you sure you want to delete this tire?", accept: () => {
      this._tireService.deleteTire(this.tire._id).subscribe(_ => {
        this.tireSaved.emit();
      });
    }})
  }

  IsValidURL(control: FormControl) : ValidationErrors {
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
