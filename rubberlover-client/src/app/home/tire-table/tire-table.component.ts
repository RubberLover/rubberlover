import { Component, OnInit } from '@angular/core';
import { Tire } from '../tire.model';
import { TireService } from '../tire.service';

@Component({
  selector: 'tire-table',
  templateUrl: './tire-table.component.html',
  styleUrls: ['./tire-table.component.scss']
})
export class TireTableComponent implements OnInit {

  tires: Tire[] = [];
  constructor(private _tireSerivce: TireService) {
    this._tireSerivce.getAllTires().subscribe(tires => {
      this.tires = tires;
    })
   }

  ngOnInit(): void {
  }

  getPrettySourceName(source: string) {
    const url = new URL(source);
    return url.hostname;
  }
}
