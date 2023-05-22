import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { SearchfilterPipe } from 'src/app/pipes/searchfilter.pipe';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserComponent,
    ListUserComponent,
    CreateUserComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class UserModule { }
