import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {routeConstants} from "../../constants/constants";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  mobileQuery!: MediaQueryList;
  private mobileQueryListener: any;

  constructor(private media: MediaMatcher,
              private auth: AuthService,
              private router: Router,
              private changeDetectorRef: ChangeDetectorRef) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener(this.mobileQueryListener, () => {});
  }

  ngOnInit(): void {
    if (this.auth.isAdmin) {
      this.router.navigate([routeConstants.USERS]);
    } else {
      this.router.navigate([routeConstants.PROFILE]);
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener(this.mobileQueryListener, () => {
    });
  }

}
