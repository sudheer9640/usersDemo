import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sideNavToggle = new EventEmitter();

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  toggleSideNav(): void {
    this.sideNavToggle.emit(null);
  }

  logOut(): void {
    this.auth.logout();
  }
}
