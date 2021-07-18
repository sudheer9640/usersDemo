import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {apiEndpoints} from '../../constants/apiEndPoints';
import {AlertService} from '../../services/alert/alert.service';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {

  users:any = [];
  searchString: string = '';
  storeSubscription: Subscription[] = [];

  constructor(private userService: UserService,
              private alert: AlertService) {

  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
        this.userService.getUsers().subscribe((res: any) => {
            if (res.data) {
              this.users = res.data;
            } else {
              this.alert.error(res.message);
            }
          },
          (err) => {
            console.log(err);
          });
  }

  ngOnDestroy(): void {
    this.storeSubscription.forEach(s => s.unsubscribe());
  }
}
