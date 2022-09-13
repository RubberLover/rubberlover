import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Tire } from '../tire.model';
import { TireService } from '../tire.service';

@Component({
  selector: 'app-tire',
  templateUrl: './tire.component.html',
  styleUrls: ['./tire.component.scss']
})
export class TireComponent implements OnInit {

  tireId = "";
  tire: Tire | undefined;
  $error = new Subject<string>();
  constructor(private _tireService: TireService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tireId = this._route.snapshot.params['id'];
    this._tireService.getTireById(this.tireId).subscribe({next: (tire) => {
      this.tire = tire;
    }, error: (_) => {
      this.$error.next("Tire not found!");
    }});
  }

}
