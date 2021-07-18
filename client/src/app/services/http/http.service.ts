import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url = environment.apiURL;

  constructor(private http: HttpClient) { }

  post(endPoint: string, data: any, headers?: any) {
    return this.http.post(this.url + endPoint, data, headers);
  }

  get(endPoint: string) {
    return this.http.get(this.url + endPoint);
  }


}
