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
      "_id": "63082936c9585692776a6d0a",
    }
    return this._httpClient.put("http://localhost:2112/api/v1/tires/approve", body);
  }
}
