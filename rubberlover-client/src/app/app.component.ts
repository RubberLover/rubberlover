import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { map, Observable } from 'rxjs';
import { UserService } from './login/user.service';
import { TireService } from './shared/tire.service';

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

  constructor(private _tireService: TireService, private _userService: UserService) {
    this._userService.checkLocalStorage();
    this.currentUserName = _userService.currentUser$.pipe(map(user => user ? user.name : ""));
  }

  ngOnInit() {
   
  }

  logout() {
    this._userService.logout();
  }
}
