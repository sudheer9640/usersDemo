import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AlertService} from '../../services/alert/alert.service';
import {HttpService} from '../../services/http/http.service';
import {AuthService} from "../../services/auth/auth.service";
import {LoginModel} from '../../models/loginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loggedInSubscription!: number;
  loginModel: LoginModel = new LoginModel();

  constructor(private router: Router,
              private httpService: HttpService,
              private auth: AuthService,
              private alert: AlertService) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.loginModel).subscribe((res: any) => {
        if (res.status === 200) {
          this.loggedInSubscription = setInterval(() => {
            this.checkIsLoggedIn();
          }, 50);
        } else {
          this.alert.error('Invalid response');
        }
      },
      (err) => {
        console.log(err);
      });
  }

  checkIsLoggedIn(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['./']);
      if (this.loggedInSubscription) {
        clearInterval(this.loggedInSubscription);
      }
    } else {
      this.checkIsLoggedIn();
    }
  }

}
