import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tire } from './tire.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TireService {

  baseUrl = environment.apiUrl;

  constructor(private _httpClient: HttpClient) { }

  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  
  public approve() {
    let body = {
      "_id": "63082936c9585692776a6d0a",
    }
    return this._httpClient.put(`${this.baseUrl}/tires/approve`, body);
  }

  public getAllTires() : Observable<Tire[]> {
    return this._httpClient.get<Tire[]>(`${this.baseUrl}/tires`);
  }

  public submitTire(tire: Tire) {
    let body = JSON.stringify(tire);
    return this._httpClient.post(`${this.baseUrl}/tires/submit`, body, {headers: this.headers});
  }
}
