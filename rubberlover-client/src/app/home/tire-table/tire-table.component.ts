import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SortEvent } from 'primeng/api';
import { Subject, take } from 'rxjs';
import { UserService } from 'src/app/login/user.service';
import { Tire } from '../tire.model';
import { TireService } from '../tire.service';
import { ToSelectedUnitsPipe } from './to-selected-units.pipe/to-selected-units.pipe';

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
  isLoggedIn = false;; 
  loading = false;
  tireBrands: string[] = [];
  wheelSizes: string[] = [];
  tireTypes: string[] = [];
 
  constructor(private _tireSerivce: TireService, private _userService: UserService, private _router: Router) {
    this.loading = true;
    this._tireSerivce.getAllTires().pipe(take(1)).subscribe(tires => {
      this.updateTable(tires);
    });

    this.headers = [
      "Name", "Brand", "Weight", "Width",
      "Wheel Size", "Tire Type", "Sources", "Color",
      "Tread Pattern", "Made In", "Casing", "BRR Article", "Year"
    ]
    this._selectedColumns = this.headers.slice(0,7);
    this._userService.currentUser$?.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
      }
      else {
        this.isLoggedIn = false;
      }
    });
  }
  ngOnInit(): void {
    this.tireAddedSubject?.subscribe(_ => {
      this.loading = true;
      this._tireSerivce.getAllTires().pipe(take(1)).subscribe(tires => {
        this.updateTable(tires);
      })
    });
  }
  private updateTable(tires: Tire[]) {
    this.tires = tires;
    this.loading = false;
    this.tireBrands = [...new Set<string>(this.tires.map(tire => tire.brand))];
    this.wheelSizes = [...new Set<string>(this.tires.map(tire => tire.wheelSize))];
    this.tireTypes = [...new Set<string>(this.tires.map(tire => tire.tireType))];
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
    return this._tireSerivce.canEditTire(tire);
  }
  
  navigateToTire(tireId: string) {
    this._router.navigate(['/tire/', tireId])
  }

  customSort(event: SortEvent) {
    event.data?.sort((data1: Tire, data2: Tire) => {
      if (event && event.field) {
        let value1 = data1[event.field as keyof Tire];
        let value2 = data2[event.field as keyof Tire];
        let result = null;
        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
          result = value1.localeCompare(value2);
        else if (event.field === 'weight') { //pipe and then compare
          let data1g = new ToSelectedUnitsPipe().transform(parseInt(value1.toString()), data1['weightUnits' as keyof Tire].toString(), 'g');
          let data2g = new ToSelectedUnitsPipe().transform(parseInt(value2.toString()), data2['weightUnits' as keyof Tire].toString(), 'g');
          result = (data1g < data2g) ? -1 : (data1g > data2g) ? 1 : 0;
        }
        else if (event.field === 'width') { //pipe and then compare
          let data1g = new ToSelectedUnitsPipe().transform(parseInt(value1.toString()), data1['widthUnits' as keyof Tire].toString(), 'mm');
          let data2g = new ToSelectedUnitsPipe().transform(parseInt(value2.toString()), data2['widthUnits' as keyof Tire].toString(), 'mm');
          result = (data1g < data2g) ? -1 : (data1g > data2g) ? 1 : 0;
        }
        else 
          result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
        return (event.order ? event.order * result : 0);
      }
      return 0;
    });
  }
}
