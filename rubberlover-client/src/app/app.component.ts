import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { map, Observable, tap } from 'rxjs';
import { UserService } from './login/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rubberlover-client';

  items: MenuItem[] = [];

  loginResult: string = "";
  approveResult: string = "";
  currentUserName: Observable<string>;

  constructor(private _userService: UserService, private _toastService: MessageService) {
    this._userService.checkLocalStorage();
    this.currentUserName = _userService.currentUser$.pipe(
      map(user => user ? user.name : ""),
      tap(user => {
        if (user) {
          this._toastService.add(
            {severity:'success',
              life: 2000,
            summary:'Logged in!'});
        } else {
          this._toastService.add(
            {severity:'info',
            life: 2000,
            summary:'Logged out!'});
        }
      })
    );
  }

  ngOnInit() {
   
  }

  logout() {
    this._userService.logout();
  }
}
