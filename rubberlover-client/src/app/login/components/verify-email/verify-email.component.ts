import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  verified = false;
  error = false;
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { 
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(take(1)).subscribe(params =>{
      this.userService.verifyEmail(params['token']).pipe(take(1)).subscribe((result) => {
        if (result) {
          this.verified = true;
        }
      }, (_error) => {
        this.error = true;
      });
    });
  }

}
