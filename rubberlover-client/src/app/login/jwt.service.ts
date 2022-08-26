import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';

  doLoginUser(token: string): void {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  doLogoutUser(): void {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  // getCurrentUser(): Observable<User> {
  //   const token = this.getToken();
  //   if (token) {
  //     const encodedPayload = token.split('.')[1];
  //     const payload = window.atob(encodedPayload);
  //     return of(JSON.parse(payload));
  //   } else {
  //     return of(undefined);
  //   }
  // }

  parseToken() {
    const token = this.getToken();
    if (token) {
      let helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      if (decodedToken) {
        if (!helper.isTokenExpired(token)) {
          return decodedToken;
        }
      }
    }
    return "";
  }

  getToken() : string{
    let token = localStorage.getItem(this.JWT_TOKEN);
    if (token != null) {
      return token;
    }
    else return "";
  }
}
