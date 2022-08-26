import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { TireService } from './shared/tire.service';
import { UserService } from './shared/user.service/user.service';

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

  constructor(private _userService: UserService, private _tireService: TireService) {}

  ngOnInit() {
    let dis = this;
    this.items = [
        {
            label: 'Home',
            command(event?) {
              dis._userService.login().subscribe({
                next(value: any) {
                  dis.loginResult = JSON.stringify(value);
                },
              })
            },
        },
        {
            label: 'About',
            command(event?) {
              dis._tireService.approve().subscribe({
                next(value: any) {
                  dis.approveResult = JSON.stringify(value);
                }
              });
            },
        },
        {
          label: 'Login'
        }
    ];
}
}
