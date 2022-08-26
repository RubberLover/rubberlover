import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtService } from '../jwt.service';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private _httpClient: HttpClient, private _jwt: JwtService) { }

  public login() {
    let body = {
      "emailAddress": "test2@test.test",
      "password": "passwordtest"
    }
    return this._httpClient.post<any>("http://localhost:2112/api/v1/users/login", body)
      .pipe(tap((result) => {
        this._jwt.doLoginUser(result['token']);
      }));
  }
}
