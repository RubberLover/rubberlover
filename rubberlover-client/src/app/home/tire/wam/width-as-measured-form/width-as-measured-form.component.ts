import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WamGeneric } from 'src/app/home/wam.model';
import { WamService } from 'src/app/home/wam.service';
import { widthUnitsOptions } from 'src/app/shared/constants';

@Component({
  selector: 'app-width-as-measured-form',
  templateUrl: './width-as-measured-form.component.html',
  styleUrls: ['./width-as-measured-form.component.scss']
})
export class WidthAsMeasuredFormComponent implements OnInit {
  @Input() tireId: string | undefined;
  @Output() widthSubmitted = new EventEmitter();

  widthUnitsOptions = widthUnitsOptions;
  form: FormGroup;
  constructor(private _fb: FormBuilder, private _wamService: WamService) { 
    this.form = this._fb.group({
      width: ["", Validators.required],
      widthUnits: ["", Validators.required],
      rimInnerWidthMM: ["", Validators.required],
      psi: ["", Validators.required]
    })
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.tireId) {
      console.log(this.form.getRawValue());
      let wam = this.form.getRawValue() as WamGeneric;
      wam.tireId = this.tireId;
      this._wamService.submitWam(wam).subscribe(result => {
        this.widthSubmitted.emit();
      })
    }
  }

}
