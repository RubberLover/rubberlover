import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service/user.service';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _userService: UserService, private _jwt: JwtService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this._jwt.getToken()) {
      request = this.addToken(request, this._jwt.getToken());
    }

    return next.handle(request)
    // .pipe(catchError(error => {
    //   if (error.status === 401) {
    //     this.authService.doLogoutAndRedirectToLogin();
    //   }
    //   return throwError(error);
    // }));

  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: { 'Authorization': `Bearer ${token}` }
    });
  }

}