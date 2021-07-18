import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  isAdmin: boolean = false;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    console.log(this.auth.currentUser)
    this.isAdmin = this.auth.isAdmin;
  }

}
