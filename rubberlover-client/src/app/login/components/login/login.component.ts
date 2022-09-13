import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";

  result: string = "";

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
      .subscribe(result => {
        this.result = result;
    });
  }

}
