import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCallrecordComponent } from './create-callrecord.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CreateCallrecordComponent
  ],
  imports: [
    CommonModule,
    
    RouterModule.forChild([
      { path: "", component: CreateCallrecordComponent }
    ]),
  ]
})
export class CreateCallrecordModule { }
