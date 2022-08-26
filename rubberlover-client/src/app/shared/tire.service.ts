import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service/user.service';


@Injectable({
  providedIn: 'root'
})
export class TireService {

  constructor(private _httpClient: HttpClient, private _userService: UserService) { }

  
  public approve() {
    let body = {
      "_id": "6306c1de44cae42775a42a7b",
    }
    return this._httpClient.put("http://localhost:2112/api/v1/tires/approve", body);
  }
}
