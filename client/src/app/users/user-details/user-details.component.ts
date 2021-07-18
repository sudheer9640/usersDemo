import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import {AlertService} from "../../services/alert/alert.service";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user: any;
  userId: string = '';

  constructor(private route: ActivatedRoute,
              private alert: AlertService,
              private auth: AuthService,
              private  userService: UserService) {
    this.userId = route.snapshot.paramMap.get('id') as string;
    if (!this.userId) {
      this.userId = this.auth.currentUser?._id;
    }
  }

  ngOnInit(): void {
    if (this.userId) {
      this.userService.getUser(this.userId).subscribe((res: any) => {
          if (res.data) {
            this.user = res.data;
          } else {
            this.alert.error(res.message)
          }
        },
        err => {
          console.log(err);
        });
    }
  }

}
