import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators'
import { JwtService } from './jwt.service';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser$ = new BehaviorSubject<User | null>(null);

  constructor(private _httpClient: HttpClient,
    private _jwt: JwtService,
    private _router: Router) { }

  public login(email: string, password: string) {
    let body = {
      "emailAddress": email,
      "password": password
    }
    return this._httpClient.post<any>("http://localhost:2112/api/v1/users/login", body)
      .pipe(tap((result) => {
        this.handleLoginResponse(result);
      }));
  }

  public logout() {
    this._jwt.doLogoutUser();
    this.currentUser$.next(null);
  }

  public register(username: string, email: string, password: string) {
    let body = {
      "name": username,
      "emailAddress": email,
      "password": password
    }
    return this._httpClient.post<any>("http://localhost:2112/api/v1/users/register", body)
      .pipe(tap((result) => {
        this.handleLoginResponse(result)
      }));
  }

  public checkLocalStorage() {
    const token = this._jwt.parseToken();
    if (token) {
      this.currentUser$.next({
        name: token.name,
        email: token.emailAddress,
        role: token.role
      })
    }
  }

  private handleLoginResponse(result: any) {
    this._jwt.doLoginUser(result['token']);
    this.currentUser$.next({
      name: result["name"],
      email: result['emailAddress'],
      role: result["role"]
    });
    this._router.navigate(["/"]);
  }
}
