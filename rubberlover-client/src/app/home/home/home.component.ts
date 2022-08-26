import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserService } from 'src/app/login/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUserName: Observable<string>;

  constructor(private _userService: UserService) {
    this.currentUserName = this._userService.currentUser$.pipe(map(user => user ? user.name : ""));
   }


  ngOnInit(): void {
  }

}
