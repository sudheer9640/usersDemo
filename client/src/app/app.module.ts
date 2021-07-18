import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {JwtHelperService, JwtModule, JwtModuleOptions} from "@auth0/angular-jwt";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import {UsersModule} from "./users/users.module";
import {SharedModule} from "./shared/shared.module";

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AlertComponent } from './components/alert/alert.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import {HttpInterceptorService} from "./services/httpInterceptor/http-interceptor.service";

const tokenGetter = (): string => {
  return <string>localStorage.getItem('token');
};

const jwtModuleOptions: JwtModuleOptions = {
  config: {
    tokenGetter,
    allowedDomains: []
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    SpinnerComponent,
    SideNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot(jwtModuleOptions),
    UsersModule,
    SharedModule
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
