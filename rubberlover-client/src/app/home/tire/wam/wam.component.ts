import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/login/models/user.model';
import { UserService } from 'src/app/login/user.service';
import { WamBase, WamWeight, WamWidth } from '../../wam.model';
import { WamService } from '../../wam.service';

@Component({
  selector: 'app-wam',
  templateUrl: './wam.component.html',
  styleUrls: ['./wam.component.scss']
})
export class WamComponent implements OnInit {
  @Input() tireId: string | undefined;

  wamWeights: WamWeight[] = [];
  wamWidths: WamWidth[] = [];
  addingNewWidth = false;
  addingNewWeight = false;
  $currentUser: BehaviorSubject<User | null>;
  selectedWeightUnit: 'g' | 'oz' = 'g'
  canSubmit = false;

  constructor(private _wamService: WamService, private _userService: UserService) { 
    this.$currentUser = this._userService.currentUser$;
    this.canSubmit = !!this.$currentUser.value; //need to be logged in to submit a measurement
  }

  ngOnInit(): void {
    this.getWamsForTire();
  }

  getWamsForTire() {
    if (this.tireId) {
      this.wamWeights = [];
      this.wamWidths = [];
      this._wamService.getWamsForTire(this.tireId).subscribe(wams => {
        wams.forEach(wam => {
          if (wam.weight) {
            this.wamWeights.push(wam as WamWeight);
          } else if (wam.width) {
            this.wamWidths.push(wam as WamWidth);
          }
        });
      });
    }
  }

  onWidthSubmitted(_event: any) {
    this.getWamsForTire();
    this.addingNewWidth = false;
  }

  onWeightSubmitted(_event: any) {
    this.getWamsForTire();
    this.addingNewWeight = false;
  }

  deleteWam(wam: WamBase, isWeight: boolean) {
    if (this.canDelete(wam)) {
      this._wamService.deleteWam(wam).subscribe(_ => {
        if (isWeight) {
          this.wamWeights = this.wamWeights.filter(weight => weight._id !== wam._id);
        } else {
          this.wamWidths = this.wamWidths.filter(width => width._id !== wam._id);
        }
      })
    }
  }

  canDelete(wam: WamBase) {
    if (wam.createdBy == this.$currentUser.value?.id) {
      return true;
    }
    return this.$currentUser.value?.role == 'admin';
  }
}
