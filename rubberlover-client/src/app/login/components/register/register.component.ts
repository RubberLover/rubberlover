import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email: string = "";
  password: string = "";

  result: string = "";

  form: FormGroup;

  constructor(private _userService: UserService, private _fb: FormBuilder) { 
    this.form = this._fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.email, Validators.required]],
      password: ["", Validators.required],
    });
    console.log(this.form);
  }

  ngOnInit(): void {
  }

  register() {
    this._userService.register(
      this.form.get("name")?.value,
      this.form.get("email")?.value,
      this.form.get("password")?.value)
      .subscribe(result => {
        this.result = result;
    });
  }
}
