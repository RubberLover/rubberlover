import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WamBase, WamGeneric } from './wam.model';

@Injectable({
  providedIn: 'root'
})
export class WamService {
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  baseUrl = environment.apiUrl;
  constructor(private _httpClient: HttpClient) { }

  getWamsForTire(tireId: string) : Observable<WamGeneric[]>{
    return this._httpClient.get<WamGeneric[]>(`${this.baseUrl}/wam/${tireId}`);
  }

  submitWam(wam: WamGeneric) : Observable<WamGeneric[]>{
    return this._httpClient.post<WamGeneric[]>(`${this.baseUrl}/wam/`, wam, {headers: this.headers});
  }

  deleteWam(wam: WamBase) : Observable<any> {
    return this._httpClient.delete<any>(`${this.baseUrl}/wam/${wam._id}`, {responseType: 'text' as 'json'});
  } 
}
