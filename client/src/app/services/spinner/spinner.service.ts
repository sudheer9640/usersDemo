import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  show: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

  display(value: boolean): void {
    this.show.next(value);
  }
}
