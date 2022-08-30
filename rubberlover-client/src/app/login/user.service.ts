import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Tire } from '../home/tire.model';
import { JwtService } from './jwt.service';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser$ = new BehaviorSubject<User | null>(null);
  baseUrl = environment.apiUrl;

  constructor(private _httpClient: HttpClient,
    private _jwt: JwtService,
    private _router: Router) { }

  public login(email: string, password: string) {
    let body = {
      "emailAddress": email,
      "password": password
    }
    return this._httpClient.post<any>(`${this.baseUrl}/users/login`, body)
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
    return this._httpClient.post<any>(`${this.baseUrl}/users/register`, body)
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
        role: token.role,
        id: token.id
      })
    }
  }

  private handleLoginResponse(result: any) {
    this._jwt.doLoginUser(result['token']);
    this.currentUser$.next({
      name: result["name"],
      email: result['emailAddress'],
      role: result["role"],
      id: result["id"]
    });
    this._router.navigate(["/"]);
  }

  public canEditTire(tire: Tire): boolean {
    if (this.currentUser$?.value?.role === 'admin') return true;
    if (this.currentUser$?.value?.id === tire.createdBy) return true;
    return false;
  }
}
