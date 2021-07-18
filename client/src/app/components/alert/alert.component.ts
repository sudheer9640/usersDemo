import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {AlertService} from '../../services/alert/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  private subscription!: Subscription;
  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.subscription = this.alertService.getMessage().subscribe((message: any) => {
      if (message) {
        this.message = message;
      }
    });
  }

  dismissAlert(): void {
    this.message = '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
