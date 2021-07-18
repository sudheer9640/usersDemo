import { Injectable } from '@angular/core';
import {HttpService} from "../../services/http/http.service";
import {apiEndpoints} from "../../constants/apiEndPoints";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService) { }

  getUsers(): Observable<any> {
   return this.http.get(apiEndpoints.USERS);
  }

  getUser(userId: string): Observable<any> {
    return this.http.get(apiEndpoints.USERS + '/' + userId);
  }
}
