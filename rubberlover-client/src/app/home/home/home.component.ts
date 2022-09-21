import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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
    ) {
    this.currentUser = this._userService.currentUser$;
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
