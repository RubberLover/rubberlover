import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tire } from './tire.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TireService {

  constructor(private _httpClient: HttpClient) { }

  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  
  public approve() {
    let body = {
      "_id": "63082936c9585692776a6d0a",
    }
    return this._httpClient.put("http://localhost:2112/api/v1/tires/approve", body);
  }

  public getAllTires() : Observable<Tire[]> {
    return this._httpClient.get<Tire[]>("http://localhost:2112/api/v1/tires");
  }

  public submitTire(tire: Tire) {
    let body = JSON.stringify(tire);
    return this._httpClient.post("http://localhost:2112/api/v1/tires/submit", body, {headers: this.headers});
  }
}
