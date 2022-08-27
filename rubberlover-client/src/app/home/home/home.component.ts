import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { map, Observable, Subject, tap } from 'rxjs';
import { UserService } from 'src/app/login/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUserName: Observable<string>;
  createDialogShown: boolean = false;
  tireAddedSubject: Subject<any> = new Subject();
  constructor(
    private _userService: UserService,
    private _toastService: MessageService
    ) {
    this.currentUserName = this._userService.currentUser$
      .pipe(
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
        }),
        map(user => user ? user.name : "")
      );
   }

  ngOnInit(): void {
  }

  showCreateDialog() {
    this.createDialogShown = true;
  }

  onNewTireSaved(_event: any) {
    this.createDialogShown = false;
    this.tireAddedSubject.next(null);
  }

}
