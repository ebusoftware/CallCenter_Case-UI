import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateRequestComponent } from './components/requests/create-request/create-request.component';
import { CreateCallrecordComponent } from './components/callrecords/create-callrecord/create-callrecord.component';
import { AuthGuard } from './guards/common/auth.guard';
import { ListCallRecord } from './contracts/list-call-record';
import { ListCallrecordComponent } from './components/callrecords/list-callrecord/list-callrecord.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [


  {
     path: "callcenter", component: LayoutComponent, children: [
      { path: "", component: DashboardComponent },
      { path:"user", component: UserComponent,canActivate:[AuthGuard] },
      {path:"login", component:LoginComponent , loadChildren:()=> import('./components/login/login.module').then(m=>m.LoginModule)},
      {path:"register", component:RegisterComponent , loadChildren:()=> import('./components/register/register.module').then(m=>m.RegisterModule)},
      {path:"create-request", component:CreateRequestComponent , loadChildren:()=> import('./components/requests/create-request/create-request.module').then(m=>m.CreateRequestModule),canActivate:[AuthGuard]},
      {path:"create-callrecord", component:CreateCallrecordComponent , loadChildren:()=> import('./components/callrecords/create-callrecord/create-callrecord.module').then(m=>m.CreateCallrecordModule),canActivate:[AuthGuard]},
      {path:"list-callrecord", component:ListCallrecordComponent , loadChildren:()=> import('./components/callrecords/list-callrecord/list-callrecord.module').then(m=>m.ListCallrecordModule),canActivate:[AuthGuard]},
      




    ]
  },

  
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
