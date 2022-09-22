import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  token: string = "";
  userId: string = "";
  error$: BehaviorSubject<string> = new BehaviorSubject("");
  result$: BehaviorSubject<string> = new BehaviorSubject("");

  form: FormGroup;

  constructor(private _userService: UserService, private _fb: FormBuilder, private _route: ActivatedRoute) { 
    this._route.queryParams.subscribe(params => {
      console.log(params);
      this.token = params['token'];
      this.userId = params['id'];
    })
    this.form = this._fb.group({
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
    }, { validators: this.checkPasswords });
  }

  ngOnInit(): void {
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true }
  }

  resetPassword(): void {
    this._userService.resetPassword(this.token, this.userId, this.form.get("password")?.value)
      .subscribe({
        next: () => {
          this.result$.next(`Your password was successfully reset!`)
        },
        error: (_: any) => {
          this.error$.next("Sorry, that username or password isn't right.")
        }
      });
  }

}
