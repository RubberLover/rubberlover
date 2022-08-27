import { Component, Input, OnInit } from '@angular/core';
import { Subject, take } from 'rxjs';
import { Tire } from '../tire.model';
import { TireService } from '../tire.service';

@Component({
  selector: 'tire-table',
  templateUrl: './tire-table.component.html',
  styleUrls: ['./tire-table.component.scss']
})
export class TireTableComponent implements OnInit {
  @Input() tireAddedSubject: Subject<null> | undefined;

  tires: Tire[] = [];
  constructor(private _tireSerivce: TireService) {
    this._tireSerivce.getAllTires().pipe(take(1)).subscribe(tires => {
      this.tires = tires;
    });

    this.tireAddedSubject?.subscribe(_ => {
      this._tireSerivce.getAllTires().pipe(take(1)).subscribe(tires => {
        this.tires = tires;
      })
    });
   }

  ngOnInit(): void {
  }

  getPrettySourceName(source: string) {
    if (!source) return "";
    const url = new URL(source);
    return url.hostname;
  }
}
