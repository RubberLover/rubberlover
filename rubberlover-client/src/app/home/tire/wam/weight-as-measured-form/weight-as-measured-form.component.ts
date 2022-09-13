import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WamGeneric } from 'src/app/home/wam.model';
import { WamService } from 'src/app/home/wam.service';
import { weightUnitsOptions } from 'src/app/shared/constants';

@Component({
  selector: 'app-weight-as-measured-form',
  templateUrl: './weight-as-measured-form.component.html',
  styleUrls: ['./weight-as-measured-form.component.scss']
})
export class WeightAsMeasuredFormComponent implements OnInit {
  @Input() tireId: string | undefined;
  @Output() weightSubmitted = new EventEmitter();

  weightUnitsOptions = weightUnitsOptions;
  form: FormGroup;
  constructor(private _fb: FormBuilder, private _wamService: WamService) { 
    this.form = this._fb.group({
      weight: ["", Validators.required],
      weightUnits: ["", Validators.required]
    })
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.tireId) {
      let wam = this.form.getRawValue() as WamGeneric;
      wam.tireId = this.tireId;
      this._wamService.submitWam(wam).subscribe(result => {
        this.weightSubmitted.emit();
      })
    }
  }

}
