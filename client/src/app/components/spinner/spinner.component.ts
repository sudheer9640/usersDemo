import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner/spinner.service';
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  showSpinner = false;
  constructor(private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    console.log('dkjdksd');
    this.spinnerService.show.subscribe((val: boolean) => {
      this.showSpinner = val;
    });
  }

}
