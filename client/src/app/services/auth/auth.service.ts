import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {AlertService} from '../alert/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';
import {apiEndpoints} from "../../constants/apiEndPoints";
import {tap} from "rxjs/operators";
import {HttpService} from "../http/http.service";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private jwtHelper: JwtHelperService,
              private router: Router,
              private http: HttpService,
              private alert: AlertService) {
    this.currentUserSubject = new BehaviorSubject<any>(this.getUser());
  }

  login(payLoad: any): Observable<any> {
    const httpOptions = {
      observe: 'response'
    };
    return this.http.post(apiEndpoints.LOGIN, payLoad, httpOptions).pipe(tap((res: any) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      console.log('res', res);
      const token = res.headers.get('Authorization');
      this.startSession(token);
      return res;
    }));
  }

  startSession(token: string): boolean {
    // console.log('startSession', token);
    if (!!token) {
      localStorage.setItem('token', token);
      this.currentUserSubject.next(this.getUser(token));
      return true;
    } else {
      this.alert.error('Authorization failed');
      return false;
    }
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  getUser(token?: any): any {
    try {
      const usertoken = token || this.token;
      if (usertoken) {
        return decode(usertoken);
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  get token(): any {
    return localStorage.getItem('token');
  }

  get currentUser(): any {
    if (!!this.currentUserSubject.value) {
      return this.currentUserSubject.value;
    } else {
      this.currentUserSubject.next(this.getUser());
      return this.currentUserSubject.value;
    }
  }

  get isAdmin(): boolean {
    return this.currentUser && (this.currentUser.role === 'admin');
  }

  get isEmployee(): boolean {
    return this.currentUser && (this.currentUser.role === 'employee');
  }

  logout(): void {
    if (!!this.token) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }

}
