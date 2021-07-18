import { Component, OnInit } from '@angular/core';
import {apiEndpoints} from "../../constants/apiEndPoints";
import {HttpService} from "../../services/http/http.service";
import {Router} from "@angular/router";
import {AlertService} from "../../services/alert/alert.service";
import {routeConstants} from "../../constants/constants";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerModel = {
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: ''
  };
  cPassword: string = '';
  userRoles: string[] = ['employee', 'admin'];

  registerFormValid: boolean = false;

  constructor(private router: Router,
              private http: HttpService,
              private alert: AlertService) { }

  ngOnInit(): void {
  }

  register(): void {
    const data = {
      ...this.registerModel
    };
    this.http.post(apiEndpoints.REGISTER, data).subscribe((res: any) => {
        if (res.message) {
          this.alert.success(res.message);
          this.router.navigate([routeConstants.LOGIN]);
        } else {
          this.alert.error(res.message);
        }
      },
      (err) => {
        console.log(err);
      });
  }

  confirmPassword() {
   if (this.registerModel.password === this.cPassword) {
     // this.registerModel
   }
  }

}
