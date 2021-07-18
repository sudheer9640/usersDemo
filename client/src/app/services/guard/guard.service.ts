import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {AlertService} from '../alert/alert.service';
import {routeConstants} from "../../constants/constants";

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(private auth: AuthService,
              private router: Router,
              private alert: AlertService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const currentUser = this.auth.getUser();
    if (currentUser) {
      if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
        this.alert.error('Access Forbidden!');
        this.router.navigate([routeConstants.LOGIN]);
        return false;
      } else {
        return true;
      }
    } else {
      this.router.navigate([routeConstants.LOGIN]);
    }
    return false;
  }
}
