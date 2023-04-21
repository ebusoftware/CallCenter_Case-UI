import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { LoginModule } from './components/login/login.module';
import { RegisterComponent } from './components/register/register.component';
import { CreateRequestComponent } from './components/requests/create-request/create-request.component';
import { CreateCallrecordComponent } from './components/callrecords/create-callrecord/create-callrecord.component';

const routes: Routes = [


  {
     path: "callcenter", component: LayoutComponent, children: [
      { path: "", component: DashboardComponent },
      {path:"login", component:LoginComponent , loadChildren:()=> import('./components/login/login.module').then(m=>m.LoginModule)},
      {path:"register", component:RegisterComponent , loadChildren:()=> import('./components/register/register.module').then(m=>m.RegisterModule)},
      {path:"create-request", component:CreateRequestComponent , loadChildren:()=> import('./components/requests/create-request/create-request.module').then(m=>m.CreateRequestModule)},
      {path:"create-callrecord", component:CreateCallrecordComponent , loadChildren:()=> import('./components/callrecords/create-callrecord/create-callrecord.module').then(m=>m.CreateCallrecordModule)}



    ]
  },

  
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
