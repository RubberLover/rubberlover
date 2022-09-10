import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tire } from './tire.model';

@Injectable({
  providedIn: 'root'
})
export class TireService {

  baseUrl = environment.apiUrl;

  constructor(private _httpClient: HttpClient) { }

  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  
  public approve(id: string) {
    let body = {
      "_id": id,
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
  
  public editTire(tire: Tire) {
    let body = JSON.stringify(tire);
    return this._httpClient.put(`${this.baseUrl}/tires/`, body, {headers: this.headers});
  }
}
