import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }
  public show: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  display(value: boolean): void {
    this.show.next(value);
  }
}

