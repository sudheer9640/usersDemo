import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AlertService} from '../../services/alert/alert.service';
import {SpinnerService} from '../../services/spinner/spinner.service';
import {AuthService} from '../auth/auth.service';

@Injectable()

export class HttpInterceptorService implements HttpInterceptor {

  constructor(private alertService: AlertService,
              private auth: AuthService,
              private spinner: SpinnerService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.display(true);
    const token = this.auth.token;
    if (token) {
      const headers: any = {
        Authorization: `Bearer ${token}`
      };
      request = request.clone({
        setHeaders: headers
      });
    }
    const req = request.clone({});
    const started = Date.now();
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.spinner.display(false);
          const elapsed = Date.now() - started;
          console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
        }
      }, (error) => {
        this.spinner.display(false);
        console.error('ERROR', error.error?.userMessage);
        this.alertService.error(error.error?.userMessage);
      }));
  }

}

