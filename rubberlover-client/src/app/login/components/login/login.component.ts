import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";

  error$: BehaviorSubject<string> = new BehaviorSubject("");
  result$: BehaviorSubject<string> = new BehaviorSubject("");

  form: FormGroup;

  constructor(private _userService: UserService, private _fb: FormBuilder) { 
    this.form = this._fb.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", Validators.required],
    });
  }

  ngOnInit(): void {
  }

  login() {
    this._userService.login(this.form.get("email")?.value, this.form.get("password")?.value)
      .subscribe({
        error: (_: any) => {
          this.error$.next("Sorry, that username or password isn't right.")
        }
      });
  }

  forgotPassword() {
    if (this.result$.value.length === 0) {
      let email = this.form.get("email")?.value;
      if (email) {
        this._userService.forgotPassword(email).subscribe(res => {
          this.result$.next(`An email was sent to ${email} with instructions to reset your password`);
        })
      } else this.error$.next("Enter your email.")
    }
  }
}
