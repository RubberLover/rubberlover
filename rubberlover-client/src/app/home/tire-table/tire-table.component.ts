import { Component, Input, OnInit } from '@angular/core';
import { Subject, take } from 'rxjs';
import { Tire } from '../tire.model';
import { TireService } from '../tire.service';

@Component({
  selector: 'app-tire-table',
  templateUrl: './tire-table.component.html',
  styleUrls: ['./tire-table.component.scss']
})
export class TireTableComponent {
  @Input() tireAddedSubject: Subject<null> | undefined;

  tires: Tire[] = [];
  headers;
  _selectedColumns: any[];

  constructor(private _tireSerivce: TireService) {
    this._tireSerivce.getAllTires().pipe(take(1)).subscribe(tires => {
      this.tires = tires;
    });

    this.tireAddedSubject?.subscribe(_ => {
      this._tireSerivce.getAllTires().pipe(take(1)).subscribe(tires => {
        this.tires = tires;
      })
    });
    this.headers = [
      "Name", "Brand", "Weight", "Width",
      "Wheel Size", "Tire Type", "Color", "Casing",
      "Tread Pattern", "Made In", "Sources", "BRR Article", "Year"
    ]
    this._selectedColumns = this.headers.slice(0,10);
   }

  getPrettySourceName(source: string) {
    if (!source) return "";
    const url = new URL(source);
    return url.hostname;
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
      //restore original order
      this._selectedColumns = this.headers.filter(col => val.includes(col));
  }
}
