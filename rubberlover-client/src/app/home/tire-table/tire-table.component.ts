import { Component, Input, OnInit } from '@angular/core';
import { Subject, take } from 'rxjs';
import { UserService } from 'src/app/login/user.service';
import { Tire } from '../tire.model';
import { TireService } from '../tire.service';

@Component({
  selector: 'app-tire-table',
  templateUrl: './tire-table.component.html',
  styleUrls: ['./tire-table.component.scss']
})
export class TireTableComponent implements OnInit {
  @Input() tireAddedSubject: Subject<null> | undefined;
  @Input() currentUserId: string = "";

  tires: Tire[] = [];
  headers;
  _selectedColumns: any[];
  selectedWeightUnit: string = 'g';
  selectedTire!: Tire;
  editDialogShown = false;
  isLoggedIn = false;
  loading = false;

  constructor(private _tireSerivce: TireService, private _userService: UserService) {
    this.loading = true;
    this._tireSerivce.getAllTires().pipe(take(1)).subscribe(tires => {
      this.tires = tires;
      this.loading = false;
    });

    this.headers = [
      "Name", "Brand", "Weight", "Width",
      "Wheel Size", "Tire Type", "Casing", "Color",
      "Tread Pattern", "Made In", "Sources", "BRR Article", "Year"
    ]
    this._selectedColumns = this.headers.slice(0,10);
    this.isLoggedIn = this._userService.currentUser$?.value !== null; 
  }
  ngOnInit(): void {
    this.tireAddedSubject?.subscribe(_ => {
      this.loading = true;
      this._tireSerivce.getAllTires().pipe(take(1)).subscribe(tires => {
        this.tires = tires;
        this.loading = false;
      })
    });
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
      //restore original order
      this._selectedColumns = this.headers.filter(col => val.includes(col));
  }

  editTire(tire: Tire) {
    this.selectedTire = tire;
    this.editDialogShown = true;
  }

  onTireSaved(event: any) {
    this.editDialogShown = false;
    this.tireAddedSubject?.next(null);
  }

  canEditTire(tire: Tire) {
    return this._userService.canEditTire(tire);
  }
}
