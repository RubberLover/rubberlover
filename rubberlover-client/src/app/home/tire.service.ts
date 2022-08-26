import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tire } from './tire.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TireService {

  constructor(private _httpClient: HttpClient) { }

  
  public approve() {
    let body = {
      "_id": "63082936c9585692776a6d0a",
    }
    return this._httpClient.put("http://localhost:2112/api/v1/tires/approve", body);
  }

  public getAllTires() : Observable<Tire[]> {
    return this._httpClient.get<Tire[]>("http://localhost:2112/api/v1/tires");
  }
}
