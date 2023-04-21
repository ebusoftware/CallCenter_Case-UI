import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { RegisterModule } from './register/register.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule,
    CommonModule,
    DashboardModule,
    LoginModule,
    RegisterModule,
    FormsModule
  ]
})
export class ComponentsModule { }
