import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { map, Observable, Subject, tap } from 'rxjs';
import { User } from 'src/app/login/models/user.model';
import { UserService } from 'src/app/login/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: Observable<User | null>;
  createDialogShown: boolean = false;
  tireAddedSubject: Subject<any> = new Subject();
  constructor(
    private _userService: UserService,
    private _toastService: MessageService
    ) {
    this.currentUser = this._userService.currentUser$
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
        })
      );
   }

  ngOnInit(): void {
  }

  showCreateDialog() {
    this.createDialogShown = true;
  }

  onTireSaved(_event: any) {
    this.createDialogShown = false;
    this.tireAddedSubject.next(null);
  }


}
