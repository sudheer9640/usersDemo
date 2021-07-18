import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {routeConstants} from './constants/constants';
import {LayoutComponent} from './components/layout/layout.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {UserListComponent} from './users/user-list/user-list.component';
import {UserDetailsComponent} from './users/user-details/user-details.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {GuardService} from './services/guard/guard.service';

const routes: Routes = [{
  path: '', component: LayoutComponent, canActivate: [GuardService], children: [
    {path: '', redirectTo: '/users', pathMatch: 'full'},
    {path: routeConstants.USERS, component: UserListComponent},
    {path: routeConstants.PROFILE, component: UserDetailsComponent},
    {path: routeConstants.PROFILE + '/:id', component: UserDetailsComponent}
  ]
},
  {path: routeConstants.LOGIN, component: LoginComponent},
  {path: routeConstants.REGISTER, component: RegisterComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
